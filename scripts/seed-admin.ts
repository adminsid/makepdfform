import { fetch } from "undici";

const API_URL = process.env.API_URL || "http://localhost:8787/api";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "password123";
const ADMIN_NAME = "System Admin";

async function main() {
  console.log(`Creating admin account for ${ADMIN_EMAIL} at ${API_URL}...`);

  // 1. Sign Up
  const signUpRes = await fetch(`${API_URL}/auth/sign-up/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      name: ADMIN_NAME,
    }),
  });

  if (!signUpRes.ok) {
    const error = await signUpRes.text();
    // If user already exists, we might still want to promote them
    if (!error.includes("User already exists")) {
        console.error("Failed to sign up:", error);
        // proceed to try promoting anyway if user exists
    } else {
        console.log("User already exists. Proceeding to promote...");
    }
  } else {
      console.log("User signed up successfully.");
  }

  // 2. Promote to Admin
  const promoteRes = await fetch(`${API_URL}/admin/setup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
    }),
  });

  if (!promoteRes.ok) {
    const error = await promoteRes.text();
    console.error("Failed to promote user:", error);
    process.exit(1);
  }

  const promoteData = await promoteRes.json();
  console.log("Success:", (promoteData as any).message);
}

main();
