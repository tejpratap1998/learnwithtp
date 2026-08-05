"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, AlertCircle, Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function EditCoursePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("basic"); // "basic" or "curriculum"
  
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
    curriculum: [] as any[],
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/admin/courses/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();
        setFormData({
          title: data.title || "",
          description: data.description || "",
          thumbnail: data.thumbnail || "",
          price: data.price?.toString() || "",
          originalPrice: data.originalPrice?.toString() || "",
          category: data.category || "Marketing",
          level: data.level || "Beginner",
          duration: data.duration || "",
          instructor: data.instructor || "Tejpratap (TP)",
          isPublished: data.isPublished || false,
          curriculum: data.curriculum || [],
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [params.id]);

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
      const res = await fetch(`/api/admin/courses/${params.id}`, {
        method: "PUT",
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

  // Curriculum Builder Functions
  const addModule = () => {
    setFormData((prev) => ({
      ...prev,
      curriculum: [
        ...prev.curriculum,
        { id: Date.now().toString(), title: "New Module", lessons: [] }
      ]
    }));
  };

  const removeModule = (moduleId: string) => {
    setFormData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.filter((m) => m.id !== moduleId)
    }));
  };

  const updateModuleTitle = (moduleId: string, newTitle: string) => {
    setFormData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((m) => m.id === moduleId ? { ...m, title: newTitle } : m)
    }));
  };

  const addLesson = (moduleId: string) => {
    setFormData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((m) => {
        if (m.id === moduleId) {
          return {
            ...m,
            lessons: [
              ...m.lessons,
              { id: Date.now().toString(), title: "New Lesson", duration: "10:00", videoUrl: "", description: "" }
            ]
          };
        }
        return m;
      })
    }));
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    setFormData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((m) => {
        if (m.id === moduleId) {
          return { ...m, lessons: m.lessons.filter((l: any) => l.id !== lessonId) };
        }
        return m;
      })
    }));
  };

  const updateLesson = (moduleId: string, lessonId: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((m) => {
        if (m.id === moduleId) {
          return {
            ...m,
            lessons: m.lessons.map((l: any) => l.id === lessonId ? { ...l, [field]: value } : l)
          };
        }
        return m;
      })
    }));
  };

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading course data...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/courses" className="p-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Course</h1>
          <p className="text-muted-foreground">Manage your course details and curriculum</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-border mb-8">
        <button 
          onClick={() => setActiveTab("basic")}
          className={`pb-3 font-medium text-lg px-2 border-b-2 transition-colors ${activeTab === "basic" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          Basic Details
        </button>
        <button 
          onClick={() => setActiveTab("curriculum")}
          className={`pb-3 font-medium text-lg px-2 border-b-2 transition-colors ${activeTab === "curriculum" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          Curriculum Builder
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl flex items-center gap-3">
            <AlertCircle size={20} />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {activeTab === "basic" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
                  required
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="thumbnail">Thumbnail Image URL</label>
                <input 
                  type="url" 
                  id="thumbnail" 
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="originalPrice">Original Price (₹)</label>
                  <input 
                    type="number" 
                    id="originalPrice" 
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    min="0"
                  />
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
                  <label className="text-sm font-medium" htmlFor="duration">Duration <span className="text-destructive">*</span></label>
                  <input 
                    type="text" 
                    id="duration" 
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "curriculum" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-card border border-border p-6 rounded-xl">
              <div>
                <h2 className="text-xl font-bold">Curriculum Builder</h2>
                <p className="text-muted-foreground text-sm">Add modules and lessons to your course.</p>
              </div>
              <button 
                type="button" 
                onClick={addModule}
                className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
                Add Module
              </button>
            </div>

            <div className="space-y-4">
              {formData.curriculum.map((module, mIndex) => (
                <div key={module.id} className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="bg-muted/30 p-4 border-b border-border flex items-center gap-4">
                    <GripVertical size={20} className="text-muted-foreground cursor-grab" />
                    <span className="font-medium text-muted-foreground">Module {mIndex + 1}:</span>
                    <input 
                      type="text"
                      value={module.title}
                      onChange={(e) => updateModuleTitle(module.id, e.target.value)}
                      className="flex-1 bg-transparent border-none focus:ring-0 font-bold text-lg p-0"
                      placeholder="Module Title"
                    />
                    <button 
                      type="button" 
                      onClick={() => removeModule(module.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="p-4 space-y-4">
                    {module.lessons.map((lesson: any, lIndex: number) => (
                      <div key={lesson.id} className="bg-background border border-border rounded-lg p-4 flex gap-4">
                        <div className="mt-2 text-muted-foreground"><GripVertical size={20} className="cursor-grab" /></div>
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground">Lesson Title</label>
                                <input 
                                  type="text"
                                  value={lesson.title}
                                  onChange={(e) => updateLesson(module.id, lesson.id, "title", e.target.value)}
                                  className="w-full px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground">Duration</label>
                                <input 
                                  type="text"
                                  value={lesson.duration}
                                  onChange={(e) => updateLesson(module.id, lesson.id, "duration", e.target.value)}
                                  className="w-full px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                              </div>
                              <div className="space-y-1 md:col-span-2">
                                <label className="text-xs font-medium text-muted-foreground">Video URL (YouTube, Vimeo, MP4)</label>
                                <input 
                                  type="text"
                                  value={lesson.videoUrl}
                                  onChange={(e) => updateLesson(module.id, lesson.id, "videoUrl", e.target.value)}
                                  className="w-full px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                              </div>
                              <div className="space-y-1 md:col-span-2">
                                <label className="text-xs font-medium text-muted-foreground">Description</label>
                                <textarea 
                                  rows={2}
                                  value={lesson.description || ""}
                                  onChange={(e) => updateLesson(module.id, lesson.id, "description", e.target.value)}
                                  className="w-full px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-y"
                                ></textarea>
                              </div>
                            </div>
                            <button 
                              type="button" 
                              onClick={() => removeLesson(module.id, lesson.id)}
                              className="p-2 mt-4 text-muted-foreground hover:text-destructive transition-colors bg-muted/50 rounded-md"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <button 
                      type="button" 
                      onClick={() => addLesson(module.id)}
                      className="w-full py-3 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      <Plus size={18} />
                      Add Lesson to Module
                    </button>
                  </div>
                </div>
              ))}
              {formData.curriculum.length === 0 && (
                <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
                  <p>No modules yet. Click "Add Module" to start building your curriculum.</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 sticky bottom-6 shadow-xl shadow-black/20 z-10">
          <div>
            <h3 className="font-bold text-lg mb-1">Publish Status</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="w-5 h-5 rounded border-border bg-background text-primary focus:ring-primary/50"
              />
              <span className="font-medium text-muted-foreground">Course is visible to students</span>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70"
          >
            <Save size={20} />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
