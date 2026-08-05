import { Search, Filter } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-1">Analytics</h1>
          <p className="text-muted-foreground">View platform performance and student engagement.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
          Export Report
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/20">
          <div className="flex gap-4">
            <select className="bg-background border border-border rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-3 py-2 border border-border rounded-lg bg-background text-sm font-medium transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>
        <div className="p-16 text-center text-muted-foreground">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📈</span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Coming Soon</h3>
          <p className="max-w-md mx-auto">This module is currently under development. The data tables and management features will be available in a future update.</p>
        </div>
      </div>
    </div>
  );
}
