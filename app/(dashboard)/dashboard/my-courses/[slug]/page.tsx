"use client";
import { useState } from "react";
import Link from "next/link";
import { PlayCircle, CheckCircle, Lock, ChevronDown, ChevronUp, ArrowLeft, Download, MessageSquare, FileText } from "lucide-react";

export default function CoursePlayerPage({ params }: { params: { slug: string } }) {
  const [activeModule, setActiveModule] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const courseTitle = params.slug === "meta-ad-mastery" ? "Meta Ad Mastery" : "AI Mastery for Marketers";

  const curriculum = [
    {
      id: 1,
      title: "Module 1: Fundamentals",
      lessons: [
        { id: 101, title: "Introduction", duration: "5:30", isCompleted: true, isLocked: false },
        { id: 102, title: "Setup & Installation", duration: "12:45", isCompleted: true, isLocked: false },
      ]
    },
    {
      id: 2,
      title: "Module 2: Core Concepts",
      lessons: [
        { id: 201, title: "Understanding the Framework", duration: "18:20", isCompleted: true, isLocked: false },
        { id: 202, title: "Practical Application", duration: "25:10", isCompleted: false, isLocked: false }, // Current lesson
      ]
    },
    {
      id: 3,
      title: "Module 3: Advanced Strategies",
      lessons: [
        { id: 301, title: "Scaling Up", duration: "22:15", isCompleted: false, isLocked: true },
        { id: 302, title: "Case Studies", duration: "15:40", isCompleted: false, isLocked: true },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] -m-6 md:-m-8">
      {/* Top Bar */}
      <div className="bg-card border-b border-border p-4 flex items-center gap-4 shrink-0">
        <Link href="/dashboard/my-courses" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-bold text-lg truncate">{courseTitle}</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* Video & Tabs Area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Video Player Placeholder */}
          <div className="bg-black aspect-video flex items-center justify-center relative group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle size={80} className="text-white opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="w-full bg-white/30 rounded-full h-1.5 mb-2 cursor-pointer">
                <div className="bg-primary h-full rounded-full" style={{ width: "35%" }}></div>
              </div>
              <div className="flex justify-between text-white text-sm">
                <span>08:45 / 25:10</span>
                <span>⚙️ [ ]</span>
              </div>
            </div>
          </div>

          {/* Lesson Info & Tabs */}
          <div className="p-6 flex-1">
            <h2 className="text-2xl font-bold mb-6">Practical Application</h2>
            
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
                <p>In this lesson, we will cover the practical application of the concepts we discussed in the previous module. Make sure to follow along with your own account open.</p>
              )}
              {activeTab === "resources" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="text-primary" />
                      <span className="font-medium text-foreground">Cheat Sheet PDF</span>
                    </div>
                    <button className="text-primary hover:text-primary/80"><Download size={20} /></button>
                  </div>
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
        </div>

        {/* Curriculum Sidebar */}
        <div className="w-full lg:w-[400px] border-l border-border bg-card flex flex-col shrink-0 overflow-y-auto">
          <div className="p-4 border-b border-border font-bold">Course Curriculum</div>
          <div className="flex-1">
            {curriculum.map((module) => (
              <div key={module.id} className="border-b border-border last:border-0">
                <button 
                  className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors text-left font-medium"
                  onClick={() => setActiveModule(activeModule === module.id ? 0 : module.id)}
                >
                  {module.title}
                  {activeModule === module.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {activeModule === module.id && (
                  <div className="py-2">
                    {module.lessons.map(lesson => (
                      <button 
                        key={lesson.id}
                        disabled={lesson.isLocked}
                        className={`w-full flex items-start gap-3 p-3 pl-6 text-left transition-colors ${
                          lesson.id === 202 ? "bg-primary/10 border-l-2 border-primary" : "hover:bg-muted/30"
                        } ${lesson.isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <div className="mt-1 shrink-0">
                          {lesson.isCompleted ? (
                            <CheckCircle size={16} className="text-success" />
                          ) : lesson.isLocked ? (
                            <Lock size={16} className="text-muted-foreground" />
                          ) : (
                            <PlayCircle size={16} className={lesson.id === 202 ? "text-primary" : "text-muted-foreground"} />
                          )}
                        </div>
                        <div>
                          <p className={`font-medium text-sm ${lesson.id === 202 ? "text-primary" : "text-foreground"}`}>{lesson.title}</p>
                          <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                        </div>
                      </button>
                    ))}
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
