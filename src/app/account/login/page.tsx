"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginWithEmail, friendlyAuthError } from "@/lib/auth";
import toast from "react-hot-toast";

const inputCls = "w-full bg-transparent border border-ftm-line px-4 py-3 text-[12px] text-ftm-white placeholder:text-ftm-dim focus:border-ftm-offwhite outline-none transition-colors";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password) { toast.error("Enter your email and password."); return; }
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      toast.success("Welcome back");
      router.push("/account");
    } catch (err: any) {
      toast.error(friendlyAuthError(err.code));
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-sm mx-auto px-8 pt-40 pb-28">
      <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-3 text-center">Welcome Back</p>
      <h1 className="font-display font-light text-[32px] text-center mb-10">Sign In</h1>

      <div className="flex flex-col gap-4">
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className={inputCls} onKeyDown={(e)=>e.key==="Enter"&&handleSubmit()} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className={inputCls} onKeyDown={(e)=>e.key==="Enter"&&handleSubmit()} />
        <button onClick={handleSubmit} disabled={loading}
          className="mt-2 w-full py-4 bg-ftm-white text-ftm-black text-[10px] uppercase tracking-[0.22em] hover:bg-ftm-offwhite transition-colors disabled:opacity-40"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>

      <p className="text-center text-[12px] text-ftm-muted mt-8">
        New to FocusTM?{" "}
        <Link href="/account/register" className="text-ftm-white underline-slide">Create an account</Link>
      </p>
    </div>
  );
}
