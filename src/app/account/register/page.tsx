"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerWithEmail, friendlyAuthError } from "@/lib/auth";
import toast from "react-hot-toast";

const inputCls = "w-full bg-transparent border border-ftm-line px-4 py-3 text-[12px] text-ftm-white placeholder:text-ftm-dim focus:border-ftm-offwhite outline-none transition-colors";

export default function RegisterPage() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password) { toast.error("Enter an email and password."); return; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      await registerWithEmail(name, email, password);
      toast.success("Account created — welcome to FocusTM");
      router.push("/account");
    } catch (err: any) {
      toast.error(friendlyAuthError(err.code));
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-sm mx-auto px-8 pt-40 pb-28">
      <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-3 text-center">Join FocusTM</p>
      <h1 className="font-display font-light text-[32px] text-center mb-10">Create Account</h1>

      <div className="flex flex-col gap-4">
        <input placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)} className={inputCls} />
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className={inputCls} />
        <input type="password" placeholder="Password (min. 6 characters)" value={password} onChange={(e)=>setPassword(e.target.value)} className={inputCls} onKeyDown={(e)=>e.key==="Enter"&&handleSubmit()} />
        <button onClick={handleSubmit} disabled={loading}
          className="mt-2 w-full py-4 bg-ftm-white text-ftm-black text-[10px] uppercase tracking-[0.22em] hover:bg-ftm-offwhite transition-colors disabled:opacity-40"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </div>

      <p className="text-center text-[12px] text-ftm-muted mt-8">
        Already have an account?{" "}
        <Link href="/account/login" className="text-ftm-white underline-slide">Sign in</Link>
      </p>
    </div>
  );
}
