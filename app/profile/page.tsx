"use client";

<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';
import { User, Lock, Camera, CheckCircle, AlertCircle, ChevronRight, Save, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('public'); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
=======
import React, { useState, useEffect } from "react";
import {
  User,
  Lock,
  Camera,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Save,
  Loader2,
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("public");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
>>>>>>> Stashed changes

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    bio: "",
<<<<<<< Updated upstream
    profileImage: ""
  });

  const [passwords, setPasswords] = useState({
    old: '',
    new: '',
    confirm: ''
=======
    profileImage: "",
  });

  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: "",
>>>>>>> Stashed changes
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
<<<<<<< Updated upstream
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        
=======
        const res = await fetch("/api/auth/me");
        const data = await res.json();

>>>>>>> Stashed changes
        if (data.ok && data.user) {
          setUserData({
            username: data.user.fullName || data.user.username || "",
            email: data.user.email || "",
            bio: data.user.bio || "",
<<<<<<< Updated upstream
            profileImage: data.user.profileImage || ""
=======
            profileImage: data.user.profileImage || "",
>>>>>>> Stashed changes
          });
        }
      } catch (err) {
        console.error("Erreur chargement profil:", err);
      }
    };
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    fetchUser();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdatePublic = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
<<<<<<< Updated upstream
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
=======
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
>>>>>>> Stashed changes
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          bio: userData.bio,
<<<<<<< Updated upstream
          profileImage: userData.profileImage
=======
          profileImage: userData.profileImage,
>>>>>>> Stashed changes
        }),
      });

      const data = await res.json();
<<<<<<< Updated upstream
      if (res.ok || data.ok) {
        setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
      } else {
        setMessage({ type: 'error', text: data.message || data.error });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Erreur de connexion au serveur.' });
=======

      if (res.ok || data.ok) {
        setMessage({
          type: "success",
          text: "Profil mis à jour avec succès !",
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || data.error,
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Erreur de connexion au serveur.",
      });
>>>>>>> Stashed changes
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< Updated upstream
    if (passwords.new !== passwords.confirm) {
      return setMessage({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas.' });
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          oldPassword: passwords.old, 
          newPassword: passwords.new 
=======

    if (passwords.new !== passwords.confirm) {
      return setMessage({
        type: "error",
        text: "Les nouveaux mots de passe ne correspondent pas.",
      });
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
>>>>>>> Stashed changes
        }),
      });

      const data = await res.json();
<<<<<<< Updated upstream
      if (res.ok || data.ok) {
        setMessage({ type: 'success', text: data.message || "Mot de passe modifié !" });
        setPasswords({ old: '', new: '', confirm: '' });
      } else {
        setMessage({ type: 'error', text: data.message || data.error });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Erreur de connexion au serveur.' });
=======

      if (res.ok || data.ok) {
        setMessage({
          type: "success",
          text: data.message || "Mot de passe modifié !",
        });
        setPasswords({ old: "", new: "", confirm: "" });
      } else {
        setMessage({
          type: "error",
          text: data.message || data.error,
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Erreur de connexion au serveur.",
      });
>>>>>>> Stashed changes
    } finally {
      setLoading(false);
    }
  };

<<<<<<< Updated upstream
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-12">
        
        {/* BARRE LATÉRALE */}
        <aside className="w-full md:w-72 flex flex-col gap-2">
          <h2 className="text-black font-black text-2xl px-4 mb-6 uppercase tracking-tighter">Paramètres</h2>
          
          <button 
            onClick={() => {setActiveTab('public'); setMessage({type:'', text:''})}}
            className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 font-bold ${activeTab === 'public' ? 'bg-[#15803d] text-white shadow-xl shadow-green-100' : 'text-gray-400 hover:bg-gray-50 hover:text-black'}`}
          >
            <div className="flex items-center gap-4"><User size={22}/> Profil Public</div>
            <ChevronRight size={18}/>
          </button>

          <button 
            onClick={() => {setActiveTab('security'); setMessage({type:'', text:''})}}
            className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 font-bold ${activeTab === 'security' ? 'bg-[#15803d] text-white shadow-xl shadow-green-100' : 'text-gray-400 hover:bg-gray-50 hover:text-black'}`}
          >
            <div className="flex items-center gap-4"><Lock size={22}/> Sécurité</div>
            <ChevronRight size={18}/>
          </button>
        </aside>

        {/* SECTION CONTENU */}
        <main className="flex-1">
          {message.text && (
            <div className={`mb-8 p-5 rounded-2xl flex items-center gap-4 border animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
              {message.type === 'success' ? <CheckCircle size={24}/> : <AlertCircle size={24}/>}
              <p className="font-semibold">{message.text}</p>
            </div>
          )}

          <div className="bg-gray-50 rounded-[45px] p-8 md:p-12 border border-gray-100 shadow-sm">
            {activeTab === 'public' ? (
              <form onSubmit={handleUpdatePublic} className="space-y-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative group">
                    <div className="w-32 h-32 bg-white rounded-[35px] overflow-hidden border-4 border-white shadow-2xl transition-transform group-hover:scale-105">
                      {userData.profileImage ? (
                        <img src={userData.profileImage} className="w-full h-full object-cover" alt="Profile" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#15803d] font-black text-4xl bg-green-50">
=======
  const tabBase =
    "w-full flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-300";
  const tabActive =
    "bg-[#15803d] text-white shadow-lg shadow-green-100";
  const tabInactive =
    "text-gray-500 hover:bg-white hover:text-gray-900 border border-transparent hover:border-gray-200";

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-base font-medium text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-[#15803d] focus:ring-4 focus:ring-green-50";

  const labelClass =
    "mb-2 block text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row">
        {/* BARRE LATÉRALE */}
        <aside className="w-full md:w-72">
          <h2 className="mb-4 px-2 text-3xl font-semibold tracking-tight text-gray-900">
           Paramètres
          </h2>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setActiveTab("public");
                setMessage({ type: "", text: "" });
              }}
              className={`${tabBase} ${
                activeTab === "public" ? tabActive : tabInactive
              }`}
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
              className={`${tabBase} ${
                activeTab === "security" ? tabActive : tabInactive
              }`}
            >
              <div className="flex items-center gap-3 text-[15px] font-medium">
                <Lock size={20} />
                <span>Sécurité</span>
              </div>
              <ChevronRight size={18} />
            </button>
          </div>
        </aside>

        {/* CONTENU */}
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
                <div className="flex flex-col items-center gap-8 md:flex-row md:items-center">
                  <div className="relative group">
                    <div className="h-32 w-32 overflow-hidden rounded-[30px] border-4 border-white bg-white shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
                      {userData.profileImage ? (
                        <img
                          src={userData.profileImage}
                          className="h-full w-full object-cover"
                          alt="Profile"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-green-50 text-4xl font-semibold text-[#15803d]">
>>>>>>> Stashed changes
                          {userData.username?.charAt(0).toUpperCase() || "M"}
                        </div>
                      )}
                    </div>
<<<<<<< Updated upstream
                    <label className="absolute -bottom-2 -right-2 bg-black text-white p-3 rounded-2xl cursor-pointer hover:bg-[#15803d] transition-all shadow-xl">
                      <Camera size={20} />
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                  <div className="text-center md:text-left">
                    <h1 className="text-3xl font-black text-black tracking-tight">Mon Profil</h1>
                    <p className="text-gray-500 font-medium mt-1">Mettez à jour vos informations publiques</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-black text-black uppercase ml-1">Nom Complet</label>
                    <input 
                      type="text" 
                      value={userData.username} 
                      onChange={(e)=>setUserData({...userData, username: e.target.value})} 
                      className="w-full p-5 bg-white border border-gray-100 rounded-3xl focus:border-[#15803d] outline-none transition-all font-medium text-black"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-black uppercase ml-1">Adresse Email</label>
                    <input 
                      type="email" 
                      value={userData.email} 
                      onChange={(e)=>setUserData({...userData, email: e.target.value})} 
                      className="w-full p-5 bg-white border border-gray-100 rounded-3xl focus:border-[#15803d] outline-none transition-all font-medium text-black"
=======

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
                      Mettez à jour vos informations publiques
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
                        setUserData({ ...userData, username: e.target.value })
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
                        setUserData({ ...userData, email: e.target.value })
                      }
                      className={inputClass}
>>>>>>> Stashed changes
                    />
                  </div>
                </div>

<<<<<<< Updated upstream
                <div className="space-y-3">
                  <label className="text-sm font-black text-black uppercase ml-1">Bio / Description</label>
                  <textarea 
                    rows={4} 
                    value={userData.bio} 
                    onChange={(e)=>setUserData({...userData, bio: e.target.value})} 
                    placeholder="Dites-en un peu plus sur vous..."
                    className="w-full p-5 bg-white border border-gray-100 rounded-3xl focus:border-[#15803d] outline-none transition-all font-medium text-black resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-[#15803d] text-white px-10 py-5 rounded-[25px] font-black hover:bg-black transition-all flex items-center gap-3 shadow-xl shadow-green-100 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Save size={22}/>}
=======
                <div>
                  <label className={labelClass}>Bio</label>
                  <textarea
                    rows={5}
                    value={userData.bio}
                    onChange={(e) =>
                      setUserData({ ...userData, bio: e.target.value })
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
>>>>>>> Stashed changes
                  {loading ? "Chargement..." : "Enregistrer le profil"}
                </button>
              </form>
            ) : (
<<<<<<< Updated upstream
              <form onSubmit={handleUpdateSecurity} className="space-y-12 animate-in fade-in duration-700">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 bg-green-50 text-[#15803d] rounded-2xl flex items-center justify-center border border-green-100 shadow-sm">
                    <Lock size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-black text-black tracking-tight">Sécurité</h1>
                    <p className="text-gray-400 font-medium mt-1">Gérez la protection de votre compte personnel</p>
                  </div>
                </div>

                <div className="max-w-xl mx-auto space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 ml-1">Ancien mot de passe</label>
                    <input 
                      type="password" 
                      required 
                      value={passwords.old} 
                      onChange={(e)=>setPasswords({...passwords, old: e.target.value})} 
                      placeholder="Votre mot de passe actuel"
                      className="w-full p-5 bg-white border border-gray-100 rounded-2xl focus:border-[#15803d] focus:ring-4 focus:ring-green-50/50 outline-none transition-all font-medium text-black placeholder:text-gray-300"
                    />
                  </div>

                  <div className="pt-4 space-y-6 border-t border-gray-50">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 ml-1">Nouveau mot de passe</label>
                      <input 
                        type="password" 
                        required 
                        value={passwords.new} 
                        onChange={(e)=>setPasswords({...passwords, new: e.target.value})} 
                        placeholder="Nouveau mot de passe"
                        className="w-full p-5 bg-white border border-gray-100 rounded-2xl focus:border-[#15803d] focus:ring-4 focus:ring-green-50/50 outline-none transition-all font-medium text-black placeholder:text-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 ml-1">Confirmer le mot de passe</label>
                      <input 
                        type="password" 
                        required 
                        value={passwords.confirm} 
                        onChange={(e)=>setPasswords({...passwords, confirm: e.target.value})} 
                        placeholder="Répétez le nouveau mot de passe"
                        className="w-full p-5 bg-white border border-gray-100 rounded-2xl focus:border-[#15803d] focus:ring-4 focus:ring-green-50/50 outline-none transition-all font-medium text-black placeholder:text-gray-300"
=======
              <form onSubmit={handleUpdateSecurity} className="space-y-10">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-green-100 bg-green-50 text-[#15803d] shadow-sm">
                    <Lock size={26} strokeWidth={1.7} />
                  </div>

                  <div>
                    <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
                      Sécurité
                    </h1>
                    <p className="mt-2 text-base font-medium text-gray-500">
                      Gérez la protection de votre compte personnel
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
                        setPasswords({ ...passwords, old: e.target.value })
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
                          setPasswords({ ...passwords, new: e.target.value })
                        }
                        placeholder="Nouveau mot de passe"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Confirmer le mot de passe
                      </label>
                      <input
                        type="password"
                        required
                        value={passwords.confirm}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            confirm: e.target.value,
                          })
                        }
                        placeholder="Répétez le nouveau mot de passe"
                        className={inputClass}
>>>>>>> Stashed changes
                      />
                    </div>
                  </div>
                </div>

<<<<<<< Updated upstream
                <div className="max-w-xl mx-auto pt-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#15803d] text-white py-5 rounded-full font-black hover:bg-black hover:shadow-2xl hover:shadow-green-100 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.97]"
                  >
                    {loading ? <Loader2 className="animate-spin" size={22} /> : <CheckCircle size={22}/>}
                    {loading ? "Mise à jour..." : "Enregistrer les modifications"}
=======
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
                    {loading
                      ? "Mise à jour..."
                      : "Enregistrer les modifications"}
>>>>>>> Stashed changes
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