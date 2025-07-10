/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserFromCookie() {
  const cookieStore = await cookies(); // <--- tambahkan await di sini
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as {
      userId: number;
      email: string;
      role: string;
    };
    return decoded;
  } catch (e) {
    return null;
  }
}
