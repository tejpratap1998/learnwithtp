"use client";
import { useState } from "react";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-1">Platform Settings</h1>
        <p className="text-muted-foreground">Manage global configurations for the application.</p>
      </div>

      <form onSubmit={handleSave} className="bg-card border border-border rounded-xl shadow-sm p-6 md:p-8 space-y-8">
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold border-b border-border pb-2">General</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform Name</label>
              <input type="text" defaultValue="LearnWithTP" className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Support Email</label>
              <input type="email" defaultValue="support@learnwithtp.com" className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold border-b border-border pb-2">Integrations</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/20">
              <div>
                <p className="font-bold">Stripe Payments</p>
                <p className="text-sm text-muted-foreground">Accept credit cards and subscriptions</p>
              </div>
              <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold uppercase tracking-wider">Connected</span>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/20">
              <div>
                <p className="font-bold">SendGrid Email</p>
                <p className="text-sm text-muted-foreground">Deliver automated emails and newsletters</p>
              </div>
              <span className="px-3 py-1 bg-muted text-muted-foreground border border-border rounded-full text-xs font-bold uppercase tracking-wider">Not Connected</span>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button 
            type="submit" 
            disabled={isSaving}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
          >
            <Save size={18} />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
