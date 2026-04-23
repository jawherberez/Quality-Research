"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  Camera,
  CheckCircle,
  ChevronRight,
  Loader2,
  Lock,
  Save,
  User,
} from "lucide-react";

type MessageState = {
  type: "" | "success" | "error";
  text: string;
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"public" | "security">("public");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageState>({ type: "", text: "" });
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    bio: "",
    profileImage: "",
  });
  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          cache: "no-store",
          credentials: "include",
        });
        const data = await res.json();

        if (data.ok && data.user) {
          setUserData({
            username: data.user.fullName || "",
            email: data.user.email || "",
            bio: data.user.bio || "",
            profileImage: data.user.profileImage || "",
          });
        }
      } catch (error) {
        console.error("PROFILE_LOAD_ERROR:", error);
      }
    };

    fetchUser();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData((current) => ({
        ...current,
        profileImage: String(reader.result || ""),
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdatePublic = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          bio: userData.bio,
          profileImage: userData.profileImage,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setMessage({
          type: "error",
          text: data.message || data.error || "Erreur de mise a jour.",
        });
        return;
      }

      setMessage({
        type: "success",
        text: "Profil mis a jour avec succes.",
      });
    } catch {
      setMessage({
        type: "error",
        text: "Erreur de connexion au serveur.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSecurity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwords.new !== passwords.confirm) {
      setMessage({
        type: "error",
        text: "Les nouveaux mots de passe ne correspondent pas.",
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: passwords.old,
          newPassword: passwords.new,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setMessage({
          type: "error",
          text: data.message || data.error || "Erreur de mise a jour.",
        });
        return;
      }

      setMessage({
        type: "success",
        text: data.message || "Mot de passe modifie.",
      });
      setPasswords({ old: "", new: "", confirm: "" });
    } catch {
      setMessage({
        type: "error",
        text: "Erreur de connexion au serveur.",
      });
    } finally {
      setLoading(false);
    }
  };

  const tabBase =
    "w-full flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-300";
  const tabActive = "bg-[#15803d] text-white shadow-lg shadow-green-100";
  const tabInactive =
    "border border-transparent text-gray-500 hover:border-gray-200 hover:bg-white hover:text-gray-900";
  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-base font-medium text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-[#15803d] focus:ring-4 focus:ring-green-50";
  const labelClass = "mb-2 block text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen bg-white pb-20 pt-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row">
        <aside className="w-full md:w-72">
          <h2 className="mb-4 px-2 text-3xl font-semibold tracking-tight text-gray-900">
            Parametres
          </h2>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setActiveTab("public");
                setMessage({ type: "", text: "" });
              }}
              className={`${tabBase} ${activeTab === "public" ? tabActive : tabInactive}`}
            >
              <div className="flex items-center gap-3 text-[15px] font-medium">
                <User size={20} />
                <span>Profil public</span>
              </div>
              <ChevronRight size={18} />
            </button>

            <button
              onClick={() => {
                setActiveTab("security");
                setMessage({ type: "", text: "" });
              }}
              className={`${tabBase} ${activeTab === "security" ? tabActive : tabInactive}`}
            >
              <div className="flex items-center gap-3 text-[15px] font-medium">
                <Lock size={20} />
                <span>Securite</span>
              </div>
              <ChevronRight size={18} />
            </button>
          </div>
        </aside>

        <main className="flex-1">
          {message.text && (
            <div
              className={`mb-8 flex items-center gap-4 rounded-2xl border p-5 ${
                message.type === "success"
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-red-200 bg-red-50 text-red-800"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle size={22} />
              ) : (
                <AlertCircle size={22} />
              )}
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          )}

          <div className="rounded-[36px] border border-gray-200 bg-gray-50 px-6 py-8 shadow-sm md:px-10 md:py-10">
            {activeTab === "public" ? (
              <form onSubmit={handleUpdatePublic} className="space-y-10">
                <div className="flex flex-col items-center gap-8 md:flex-row">
                  <div className="group relative">
                    <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-[30px] border-4 border-white bg-white shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
                      {userData.profileImage ? (
                        <Image
                          src={userData.profileImage}
                          alt="Photo de profil"
                          width={128}
                          height={128}
                          unoptimized
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-green-50 text-4xl font-semibold text-[#15803d]">
                          {userData.username.charAt(0).toUpperCase() || "M"}
                        </div>
                      )}
                    </div>

                    <label className="absolute -bottom-2 -right-2 cursor-pointer rounded-2xl bg-gray-900 p-3 text-white shadow-lg transition-all hover:bg-[#15803d]">
                      <Camera size={18} />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>

                  <div className="text-center md:text-left">
                    <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
                      Mon profil
                    </h1>
                    <p className="mt-2 text-base font-medium text-gray-500">
                      Mettez a jour vos informations publiques
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Nom complet</label>
                    <input
                      type="text"
                      value={userData.username}
                      onChange={(e) =>
                        setUserData((current) => ({
                          ...current,
                          username: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Adresse e-mail</label>
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData((current) => ({
                          ...current,
                          email: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Bio</label>
                  <textarea
                    rows={5}
                    value={userData.bio}
                    onChange={(e) =>
                      setUserData((current) => ({
                        ...current,
                        bio: e.target.value,
                      }))
                    }
                    placeholder="Dites-en un peu plus sur vous..."
                    className={`${inputClass} min-h-[150px] resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-3 rounded-2xl bg-[#15803d] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-green-100 transition-all hover:bg-[#11632f] disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Save size={20} />
                  )}
                  {loading ? "Chargement..." : "Enregistrer le profil"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleUpdateSecurity} className="space-y-10">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-green-100 bg-green-50 text-[#15803d] shadow-sm">
                    <Lock size={26} strokeWidth={1.7} />
                  </div>

                  <div>
                    <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
                      Securite
                    </h1>
                    <p className="mt-2 text-base font-medium text-gray-500">
                      Gere la protection de ton compte
                    </p>
                  </div>
                </div>

                <div className="mx-auto max-w-xl space-y-6">
                  <div>
                    <label className={labelClass}>Ancien mot de passe</label>
                    <input
                      type="password"
                      required
                      value={passwords.old}
                      onChange={(e) =>
                        setPasswords((current) => ({
                          ...current,
                          old: e.target.value,
                        }))
                      }
                      placeholder="Votre mot de passe actuel"
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-6 border-t border-gray-200 pt-6">
                    <div>
                      <label className={labelClass}>Nouveau mot de passe</label>
                      <input
                        type="password"
                        required
                        value={passwords.new}
                        onChange={(e) =>
                          setPasswords((current) => ({
                            ...current,
                            new: e.target.value,
                          }))
                        }
                        placeholder="Nouveau mot de passe"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Confirmer le mot de passe</label>
                      <input
                        type="password"
                        required
                        value={passwords.confirm}
                        onChange={(e) =>
                          setPasswords((current) => ({
                            ...current,
                            confirm: e.target.value,
                          }))
                        }
                        placeholder="Repetez le nouveau mot de passe"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <div className="mx-auto max-w-xl">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#15803d] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-green-100 transition-all hover:bg-[#11632f] disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <CheckCircle size={20} />
                    )}
                    {loading ? "Mise a jour..." : "Enregistrer les modifications"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
