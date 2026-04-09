"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { LayoutDashboard, Briefcase, Users, Zap, BarChart3, Brain, LogOut } from "lucide-react";
import { clsx } from "clsx";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/candidates", label: "Candidates", icon: Users },
  { href: "/screening", label: "AI Screening", icon: Zap },
  { href: "/results", label: "Results", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">TalentAI</p>
            <p className="text-xs text-gray-500">by Umurava</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                active
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-400 hover:text-gray-100 hover:bg-gray-800"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 space-y-3">
        {/* Gemini status */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-900/30 to-violet-900/30 border border-blue-800/30">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-gray-400">Gemini AI · Active</span>
        </div>

        {/* User info + logout */}
        {session?.user && (
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-800 transition group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center overflow-hidden flex-shrink-0">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-bold text-white">
                  {session.user.name?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-200 truncate">{session.user.name}</p>
              <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              title="Sign out"
              className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
