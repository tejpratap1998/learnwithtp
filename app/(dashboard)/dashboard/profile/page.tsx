import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { User, Mail, Shield, Calendar } from "lucide-react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const user = session.user as any;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and account settings.</p>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="h-32 bg-gradient-to-r from-primary/40 to-primary/10 relative">
          <div className="absolute -bottom-12 left-8 p-1 bg-card rounded-full border-4 border-background">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-primary text-3xl font-bold uppercase">
              {user.name ? user.name.charAt(0) : user.email?.charAt(0)}
            </div>
          </div>
        </div>
        
        <div className="pt-16 pb-8 px-8 border-b border-border">
          <h2 className="text-2xl font-bold">{user.name || "Student"}</h2>
          <p className="text-muted-foreground">{user.email}</p>
        </div>

        <div className="p-8 space-y-6">
          <h3 className="font-semibold text-lg mb-4">Account Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <User size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{user.name || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Address</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Account Role</p>
                <p className="font-medium capitalize">{user.role || "student"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">Recently Joined</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
