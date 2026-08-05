"use client";

import { useState } from "react";
import Link from "next/link";
import { PlayCircle, CheckCircle, Lock, ChevronDown, ChevronUp, ArrowLeft, Download, MessageSquare, FileText } from "lucide-react";

export default function CoursePlayerClient({ course, enrollment }: { course: any, enrollment: any }) {
  const [activeModule, setActiveModule] = useState(course.curriculum?.[0]?.id || null);
  const [activeLesson, setActiveLesson] = useState(course.curriculum?.[0]?.lessons?.[0] || null);
  const [activeTab, setActiveTab] = useState("description");
  const [completedLessons, setCompletedLessons] = useState<string[]>(enrollment.completedLessons || []);
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);

  const handleLessonSelect = (moduleId: string, lesson: any) => {
    if (lesson.isLocked) return;
    setActiveModule(moduleId);
    setActiveLesson(lesson);
  };

  const markAsComplete = async () => {
    if (!activeLesson || isMarkingComplete || completedLessons.includes(activeLesson.id)) return;
    
    setIsMarkingComplete(true);
    try {
      const res = await fetch("/api/enrollments/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug: course.slug, lessonId: activeLesson.id })
      });
      
      if (res.ok) {
        const data = await res.json();
        setCompletedLessons(data.completedLessons);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsMarkingComplete(false);
    }
  };

  const renderVideoPlayer = () => {
    if (!activeLesson || !activeLesson.videoUrl) {
      return (
        <div className="bg-black aspect-video flex items-center justify-center relative">
           <p className="text-muted-foreground">No video available for this lesson.</p>
        </div>
      );
    }

    const url = activeLesson.videoUrl;
    
    // Basic YouTube embed conversion
    let embedUrl = url;
    if (url.includes("youtube.com/watch?v=")) {
      embedUrl = url.replace("watch?v=", "embed/");
    } else if (url.includes("youtu.be/")) {
      embedUrl = url.replace("youtu.be/", "youtube.com/embed/");
    }

    if (embedUrl.includes("youtube.com/embed") || embedUrl.includes("vimeo.com")) {
      return (
        <div className="bg-black aspect-video w-full relative">
          <iframe 
            src={embedUrl} 
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }

    // Default HTML5 Video
    return (
      <div className="bg-black aspect-video w-full relative flex items-center justify-center group">
        <video 
          src={url} 
          controls 
          className="w-full h-full object-contain"
          onEnded={markAsComplete}
        ></video>
      </div>
    );
  };

  if (!course.curriculum || course.curriculum.length === 0) {
    return (
      <div className="flex flex-col h-[calc(100vh-64px)] -m-6 md:-m-8">
        <div className="bg-card border-b border-border p-4 flex items-center gap-4 shrink-0">
          <Link href="/dashboard/my-courses" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-bold text-lg truncate">{course.title}</h1>
        </div>
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          This course doesn't have any content yet.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] -m-6 md:-m-8">
      {/* Top Bar */}
      <div className="bg-card border-b border-border p-4 flex items-center gap-4 shrink-0 justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/my-courses" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-bold text-lg truncate">{course.title}</h1>
        </div>
        
        {activeLesson && (
          <button 
            onClick={markAsComplete}
            disabled={isMarkingComplete || completedLessons.includes(activeLesson.id)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
              completedLessons.includes(activeLesson.id) 
                ? "bg-success/10 text-success border border-success/20" 
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            <CheckCircle size={16} />
            {completedLessons.includes(activeLesson.id) ? "Completed" : "Mark as Complete"}
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* Video & Tabs Area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {renderVideoPlayer()}

          {/* Lesson Info & Tabs */}
          {activeLesson && (
            <div className="p-6 flex-1">
              <h2 className="text-2xl font-bold mb-6">{activeLesson.title}</h2>
              
              <div className="flex gap-6 border-b border-border mb-6">
                {["description", "resources", "q&a"].map(tab => (
                  <button 
                    key={tab}
                    className={`pb-2 capitalize font-medium ${activeTab === tab ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="prose prose-invert max-w-none text-muted-foreground">
                {activeTab === "description" && (
                  <div className="whitespace-pre-wrap">
                    {activeLesson.description || "No description provided for this lesson."}
                  </div>
                )}
                {activeTab === "resources" && (
                  <div className="space-y-4">
                    <p>No resources attached to this lesson.</p>
                  </div>
                )}
                {activeTab === "q&a" && (
                  <div className="text-center py-8">
                    <MessageSquare size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                    <p>Have a question? Leave a comment below.</p>
                    <button className="mt-4 bg-secondary text-secondary-foreground px-4 py-2 rounded">Ask a Question</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Curriculum Sidebar */}
        <div className="w-full lg:w-[400px] border-l border-border bg-card flex flex-col shrink-0 overflow-y-auto">
          <div className="p-4 border-b border-border font-bold">Course Curriculum</div>
          <div className="flex-1">
            {course.curriculum.map((module: any) => (
              <div key={module.id} className="border-b border-border last:border-0">
                <button 
                  className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors text-left font-medium"
                  onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                >
                  {module.title}
                  {activeModule === module.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {activeModule === module.id && (
                  <div className="py-2">
                    {module.lessons.map((lesson: any) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      const isActive = activeLesson?.id === lesson.id;
                      
                      return (
                        <button 
                          key={lesson.id}
                          disabled={lesson.isLocked}
                          onClick={() => handleLessonSelect(module.id, lesson)}
                          className={`w-full flex items-start gap-3 p-3 pl-6 text-left transition-colors ${
                            isActive ? "bg-primary/10 border-l-2 border-primary" : "hover:bg-muted/30"
                          } ${lesson.isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          <div className="mt-1 shrink-0">
                            {isCompleted ? (
                              <CheckCircle size={16} className="text-success" />
                            ) : lesson.isLocked ? (
                              <Lock size={16} className="text-muted-foreground" />
                            ) : (
                              <PlayCircle size={16} className={isActive ? "text-primary" : "text-muted-foreground"} />
                            )}
                          </div>
                          <div>
                            <p className={`font-medium text-sm ${isActive ? "text-primary" : "text-foreground"}`}>{lesson.title}</p>
                            <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
