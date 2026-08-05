"use client";

import { useState } from "react";
import { Save, Bell, Shield, Key } from "lucide-react";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate save
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-muted-foreground">Manage your preferences and security settings.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium text-left">
            <Shield size={20} />
            Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground font-medium text-left transition-colors">
            <Bell size={20} />
            Notifications
          </button>
        </div>

        <div className="md:col-span-3 space-y-8">
          <form onSubmit={handleSave} className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
              <Key className="text-primary" size={24} />
              <h2 className="text-xl font-bold">Change Password</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm New Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                type="submit" 
                disabled={isSaving}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
              >
                <Save size={18} />
                {isSaving ? "Saving..." : "Update Password"}
              </button>
            </div>
          </form>

          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-bold text-destructive">Danger Zone</h3>
            <p className="text-muted-foreground text-sm">Once you delete your account, there is no going back. Please be certain.</p>
            <button type="button" className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-medium hover:bg-destructive/90 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
