import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { forms } from '../db/schema';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

type Bindings = {
  DB: D1Database;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
};

const billingRouter = new Hono<{ Bindings: Bindings }>();

// POST /api/billing/create-checkout-session
billingRouter.post('/create-checkout-session', async (c) => {
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);
  const { formId } = await c.req.json();

  if (!formId) {
    return c.json({ error: 'formId is required' }, 400);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'MakePDFForm Pro',
              description: 'Unlock custom branding and unlimited submissions for your form.',
            },
            unit_amount: 1900, // $19.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${new URL(c.req.url).origin}/billing/success?id=${formId}`,
      cancel_url: `${new URL(c.req.url).origin}/editor?id=${formId}`,
      metadata: {
        formId,
      },
    });

    return c.json({ url: session.url });
  } catch (e: any) {
    console.error(e);
    return c.json({ error: e.message }, 500);
  }
});

// POST /api/billing/webhook
billingRouter.post('/webhook', async (c) => {
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);
  const signature = c.req.header('stripe-signature');

  if (!signature) {
    return c.text('No signature', 400);
  }

  try {
    const body = await c.req.text();
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      c.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const formId = session.metadata?.formId;

      if (formId) {
        const db = drizzle(c.env.DB);
        await db.update(forms)
          .set({ isPro: true })
          .where(eq(forms.id, formId))
          .run();
        
        console.log(`Form ${formId} upgraded to Pro`);
      }
    }

    return c.json({ received: true });
  } catch (e: any) {
    console.error(`Webhook Error: ${e.message}`);
    return c.text(`Webhook Error: ${e.message}`, 400);
  }
});

export default billingRouter;
