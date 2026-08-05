import { Search, Plus, Filter } from "lucide-react";

export default function EnrollmentsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-1">Enrollments</h1>
          <p className="text-muted-foreground">Manage and track course enrollments.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Plus size={18} />
          Add Enrollment
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/20">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search enrollments..." 
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-3 py-2 border border-border rounded-lg bg-background text-sm font-medium transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>
        <div className="p-16 text-center text-muted-foreground">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚧</span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Coming Soon</h3>
          <p className="max-w-md mx-auto">This module is currently under development. The data tables and management features will be available in a future update.</p>
        </div>
      </div>
    </div>
  );
}
