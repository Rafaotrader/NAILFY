"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Calendar, Users, DollarSign, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/agenda", label: "Agenda", icon: Calendar },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/financeiro", label: "Financeiro", icon: DollarSign },
  { href: "/mensagens", label: "Mensagens", icon: MessageCircle },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative">
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-zinc-900 border-t border-zinc-800 z-50">
        <div className="flex">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link key={href} href={href} className={cn(
                "flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs transition-colors",
                active ? "text-[#e91e8c]" : "text-zinc-500 hover:text-zinc-300"
              )}>
                <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
                <span className="font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
