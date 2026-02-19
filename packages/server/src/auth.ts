import { betterAuth } from "better-auth";
import { passkey } from "@better-auth/passkey";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";

export const createAuth = (env: any) => {
    const polarClient = new Polar({
      accessToken: env.POLAR_ACCESS_TOKEN,
    });
    return betterAuth({
      baseURL: env.BETTER_AUTH_URL,
      database: drizzleAdapter(drizzle(env.DB), {
    provider: "sqlite",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
      },
      organization: {
        type: "string",
        required: false,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    passkey(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "db14d3f1-59eb-4192-83aa-340c9d08091e",
              slug: "Business"
            },
            {
              productId: "562b02bf-13f1-4aad-b316-b36e565b1642",
              slug: "Team"
            },
            {
              productId: "50f2f190-59ca-481d-9a4c-305c7a10fa67",
              slug: "Pro"
            },
            {
              productId: "040c9d6f-ac27-448f-a441-d0625d1e7bf2",
              slug: "Free"
            }
          ],
          successUrl: env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true
        }),
        portal(),
        usage(),
        // webhooks({
        //     secret: env.POLAR_WEBHOOK_SECRET,
        //     onPayload: (payload) => console.log('Polar Webhook:', payload)
        // })
      ],
    })
  ],
  trustedOrigins: ["http://localhost:5173", "http://localhost:8787"],
});
};
