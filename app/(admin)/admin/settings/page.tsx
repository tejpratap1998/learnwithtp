"use client";
import { useState, useEffect } from "react";
import { Save, Loader2, CreditCard } from "lucide-react";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    platformName: "",
    supportEmail: "",
    razorpayKeyId: "",
    razorpayKeySecret: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setFormData({
            platformName: data.platformName || "LearnWithTP",
            supportEmail: data.supportEmail || "support@learnwithtp.com",
            razorpayKeyId: data.razorpayKeyId || "",
            razorpayKeySecret: data.razorpayKeySecret || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch settings", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        // Optional: show toast notification
        console.log("Settings saved successfully!");
      }
    } catch (error) {
      console.error("Failed to save settings", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-1">Platform Settings</h1>
        <p className="text-muted-foreground">Manage global configurations for the application.</p>
      </div>

      <form onSubmit={handleSave} className="bg-card border border-border rounded-xl shadow-sm p-6 md:p-8 space-y-8">
        
        {/* General Settings */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold border-b border-border pb-2">General</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform Name</label>
              <input 
                type="text" 
                name="platformName"
                value={formData.platformName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Support Email</label>
              <input 
                type="email" 
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" 
              />
            </div>
          </div>
        </div>

        {/* Payment Gateway (Razorpay) */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <CreditCard className="text-primary w-6 h-6" />
            <h2 className="text-xl font-bold">Payment Gateway (Razorpay)</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Configure your Razorpay API keys to accept course payments. If these are left blank, the platform will fall back to using your local .env configuration.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Razorpay Key ID</label>
              <input 
                type="text" 
                name="razorpayKeyId"
                value={formData.razorpayKeyId}
                onChange={handleChange}
                placeholder="rzp_test_xxxxxxxxxx"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Razorpay Key Secret</label>
              <input 
                type="password" 
                name="razorpayKeySecret"
                value={formData.razorpayKeySecret}
                onChange={handleChange}
                placeholder="••••••••••••••••••••••••"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm" 
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button 
            type="submit" 
            disabled={isSaving}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
