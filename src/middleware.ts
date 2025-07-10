import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Jika user sudah login (ada token)
  if (token) {
    // Cegah akses ke halaman sign-in dan sign-up jika sudah login
    if (pathname === "/sign-in" || pathname === "/sign-up") {
      // Redirect ke homepage atau dashboard misal
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    // User belum login
    // Cegah akses ke halaman /admin kalau belum login
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  // Cek role admin jika akses /admin
  if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
