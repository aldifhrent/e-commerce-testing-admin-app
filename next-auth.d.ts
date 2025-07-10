/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Session, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & User;
  }

  interface User {
    role: string;
  }
}
