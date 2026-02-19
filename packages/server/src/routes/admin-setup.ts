import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { user } from "../schema";

const app = new Hono<{ Bindings: { DB: D1Database } }>();

app.post("/setup", async (c) => {
	const { email } = await c.req.json();

	if (!email) {
		return c.json({ error: "Email is required" }, 400);
	}

	const db = drizzle(c.env.DB);

	const existingUser = await db
		.select()
		.from(user)
		.where(eq(user.email, email))
		.get();

	if (!existingUser) {
		return c.json({ error: "User not found" }, 404);
	}

	await db
		.update(user)
		.set({ role: "admin" })
		.where(eq(user.email, email))
		.execute();

	return c.json({ success: true, message: `User ${email} promoted to admin` });
});

export default app;
