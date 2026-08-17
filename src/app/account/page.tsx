"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { logout } from "@/lib/auth";
import toast from "react-hot-toast";
import { Package, LogOut, PenSquare } from "lucide-react";

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="max-w-md mx-auto px-8 pt-40 pb-28">
        <div className="h-6 w-40 ftm-skeleton mb-4" />
        <div className="h-4 w-64 ftm-skeleton" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-8 pt-40 pb-28 text-center">
        <h1 className="font-display font-light text-[32px] mb-5">
          Your Account
        </h1>
        <p className="text-[13px] text-ftm-muted mb-8 leading-[1.85]">
          Sign in to track your orders, save your details, and check out faster.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/account/login"
            className="px-8 py-4 bg-ftm-white text-ftm-black text-[10px] uppercase tracking-[0.22em] hover:bg-ftm-offwhite transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/account/register"
            className="px-8 py-4 border border-ftm-line text-[10px] uppercase tracking-[0.22em] hover:border-ftm-offwhite transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    toast.success("Signed out");
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto px-8 pt-40 pb-28">
      <p className="text-[9px] uppercase tracking-[0.35em] text-ftm-muted mb-3">
        Account
      </p>
      <h1 className="font-display font-light text-[32px] mb-2">
        {user.displayName || "Welcome"}
      </h1>
      <p className="text-[13px] text-ftm-muted mb-10">{user.email}</p>

      <div className="flex flex-col gap-px bg-ftm-line">
        <Link
          href="/account/orders"
          className="flex items-center gap-3 bg-ftm-black px-6 py-5 hover:bg-ftm-deep transition-colors"
        >
          <Package className="h-4 w-4 text-ftm-muted" />
          <span className="text-[12px] uppercase tracking-[0.15em]">
            My Orders
          </span>
        </Link>
        <Link
          href="/custom-order"
          className="flex items-center gap-3 bg-ftm-black px-6 py-5 hover:bg-ftm-deep transition-colors"
        >
          <PenSquare className="h-4 w-4 text-ftm-muted" />
          <span className="text-[12px] uppercase tracking-[0.15em]">
            Request Custom Order
          </span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 bg-ftm-black px-6 py-5 hover:bg-ftm-deep transition-colors text-left"
        >
          <LogOut className="h-4 w-4 text-ftm-muted" />
          <span className="text-[12px] uppercase tracking-[0.15em] text-red-400/80">
            Sign Out
          </span>
        </button>
      </div>
    </div>
  );
}
