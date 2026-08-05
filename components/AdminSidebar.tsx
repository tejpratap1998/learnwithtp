"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CreditCard, 
  Inbox,
  BarChart,
  Settings,
  LogOut
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Enrollments", href: "/admin/enrollments", icon: BookOpen },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Leads CRM", href: "/admin/leads", icon: Inbox },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border h-full flex flex-col">
      <div className="p-6 border-b border-border bg-primary/5">
        <Link href="/admin" className="font-bold text-xl text-primary flex items-center gap-2">
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded">TP</span>
          Admin Portal
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                isActive 
                  ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-2 mb-4 bg-muted/50 rounded-lg">
          <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-xs">
            TP
          </div>
          <div className="text-sm">
            <p className="font-medium">Tejpratap</p>
            <p className="text-xs text-muted-foreground">Super Admin</p>
          </div>
        </div>
        <button className="flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
