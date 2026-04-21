import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const client = await clientPromise;
    const db = client.db("qualityandresearch");

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }

    const cookieStore = await cookies();
    
    cookieStore.set("user-role", user.role, {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60 * 24,
    });

    cookieStore.set("user-email", user.email, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({ role: user.role, ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}