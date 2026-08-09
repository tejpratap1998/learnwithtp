"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function CreateCoursePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    price: "",
    originalPrice: "",
    category: "Marketing",
    level: "Beginner",
    duration: "",
    instructor: "Tejpratap (TP)",
    isPublished: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      router.push("/admin/courses");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/courses" className="p-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create New Course</h1>
          <p className="text-muted-foreground">Add a new training program to your platform</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl flex items-center gap-3">
            <AlertCircle size={20} />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Basic Info */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold border-b border-border pb-4">Basic Information</h2>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="title">Course Title <span className="text-destructive">*</span></label>
            <input 
              type="text" 
              id="title" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Meta Ad Mastery" 
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="description">Description <span className="text-destructive">*</span></label>
            <textarea 
              id="description" 
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4} 
              placeholder="Describe what students will learn..." 
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
              required
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="thumbnail">Thumbnail Image URL</label>
            <input 
              type="text" 
              id="thumbnail" 
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg" 
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <p className="text-xs text-muted-foreground">Paste a direct link to the course cover image.</p>
          </div>
        </div>

        {/* Pricing & Details */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold border-b border-border pb-4">Pricing</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="price">Current Price (₹) <span className="text-destructive">*</span></label>
              <input 
                type="number" 
                id="price" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="4999" 
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
                min="0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="originalPrice">Original Price (₹) (Optional)</label>
              <input 
                type="number" 
                id="originalPrice" 
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="9999" 
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                min="0"
              />
              <p className="text-xs text-muted-foreground">Used to show a discount strike-through.</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold border-b border-border pb-4">Details</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="category">Category <span className="text-destructive">*</span></label>
              <select 
                id="category" 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="Marketing">Marketing</option>
                <option value="AI">AI</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="level">Skill Level <span className="text-destructive">*</span></label>
              <select 
                id="level" 
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="duration">Duration (e.g. "4 Weeks", "10 Hours") <span className="text-destructive">*</span></label>
              <input 
                type="text" 
                id="duration" 
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 4 Weeks" 
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
          </div>
        </div>

        {/* Settings & Publish */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-lg mb-1">Publish Status</h3>
            <p className="text-sm text-muted-foreground mb-4">Unpublished courses are saved as drafts and are not visible to students.</p>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="w-5 h-5 rounded border-border bg-background text-primary focus:ring-primary/50"
              />
              <span className="font-medium">Publish this course immediately</span>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70"
          >
            <Save size={20} />
            {isSubmitting ? "Saving..." : "Save Course"}
          </button>
        </div>
      </form>
    </div>
  );
}
