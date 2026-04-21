import { NextResponse } from "next/server";
<<<<<<< Updated upstream
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    // 1. Récupérer le token depuis les cookies (comme dans ton fichier me)
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Non authentifié" },
        { status: 401 }
      );
    }

    // 2. Vérifier le token et extraire l'ID de l'utilisateur (payload.sub)
    const payload = await verifyToken(token);
    const userId = payload.sub;

    // 3. Récupérer les données envoyées par le formulaire
    const { oldPassword, newPassword } = await req.json();

    const db = await getDb();
    
    // 4. Chercher l'utilisateur par son ID unique
    const user = await db.collection("users").findOne({ 
      _id: new ObjectId(userId) 
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, message: "Utilisateur introuvable" },
        { status: 404 }
      );
    }

    // 5. Vérifier si l'ancien mot de passe est correct
    // Note: Utilise le nom exact du champ dans ta DB (password ou passwordHash)
    const currentPasswordInDb = user.password || user.passwordHash;
    
    const isMatch = await bcrypt.compare(oldPassword, currentPasswordInDb);
    if (!isMatch) {
      return NextResponse.json(
        { ok: false, message: "L'ancien mot de passe est incorrect" },
        { status: 400 }
      );
    }

    // 6. Hasher le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 7. Mettre à jour dans MongoDB
    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          // On met à jour le champ que tu utilises (password ou passwordHash)
          password: hashedPassword 
        } 
      }
    );

    return NextResponse.json({ 
      ok: true, 
      message: "Mot de passe modifié avec succès !" 
    }, { status: 200 });

  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    return NextResponse.json(
      { ok: false, message: "Erreur lors de la modification" },
      { status: 500 }
    );
=======
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { oldPassword, newPassword } = await request.json();
    
    const cookieStore = await cookies();
    const email = cookieStore.get("user-email")?.value;

    if (!email) {
      return NextResponse.json({ ok: false, error: "Session expirée" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("qualityandresearch");
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ ok: false, error: "Utilisateur non trouvé" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return NextResponse.json({ ok: false, error: "Ancien mot de passe incorrect" }, { status: 400 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await db.collection("users").updateOne(
      { email },
      { $set: { password: hashedNewPassword, updatedAt: new Date() } }
    );

    return NextResponse.json({ ok: true, message: "Mot de passe modifié !" });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Erreur serveur" }, { status: 500 });
>>>>>>> Stashed changes
  }
}