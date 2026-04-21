import { NextResponse } from "next/server";
<<<<<<< Updated upstream
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

export async function PATCH(req: Request) {
  try {
    // 1. Récupération du token depuis les cookies (comme dans ta route /me)
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Non authentifié" },
        { status: 401 }
      );
    }

    // 2. Vérification du token pour obtenir l'ID de l'utilisateur
    const payload = await verifyToken(token);
    const userId = payload.sub;

    // 3. Récupération des données du formulaire
    const body = await req.json();
    const { username, email, bio, profileImage } = body;

    // 4. Connexion à la base de données
    const db = await getDb();
    
    // 5. Mise à jour de l'utilisateur par son _id (plus besoin de currentEmail)
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          fullName: username, 
          email: email, 
          bio: bio, 
          profileImage: profileImage 
        } 
      }
    );

    // 6. Vérification du résultat
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { ok: false, message: "Utilisateur introuvable" },
=======
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function PATCH(request: Request) {
  try {
    const { username, email, bio, profileImage } = await request.json();

    const client = await clientPromise;
    const db = client.db("qualityandresearch");

    // On met à jour l'utilisateur en utilisant l'email comme identifiant
    const result = await db.collection("users").updateOne(
      { email: email },
      {
        $set: {
          fullName: username, // On mappe 'username' du front vers 'fullName' en base
          bio: bio,
          profileImage: profileImage,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { ok: false, error: "Utilisateur non trouvé" },
>>>>>>> Stashed changes
        { status: 404 }
      );
    }

<<<<<<< Updated upstream
    return NextResponse.json({ 
      ok: true, 
      message: "Profil mis à jour avec succès !" 
    }, { status: 200 });

  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);
    return NextResponse.json(
      { ok: false, message: "Erreur serveur lors de la mise à jour" },
      { status: 500 }
    );
  }
}
=======
    return NextResponse.json({ ok: true, message: "Profil mis à jour avec succès !" });
  } catch (error) {
    console.error("Erreur API Profile:", error);
    return NextResponse.json(
      { ok: false, error: "Erreur lors de la mise à jour sur le serveur" },
      { status: 500 }
    );
  }
}

// Configuration pour autoriser les photos lourdes (Base64)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
>>>>>>> Stashed changes
