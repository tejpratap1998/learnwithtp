import Link from "next/link";
import { Clock, User, ArrowRight } from "lucide-react";

export default function CourseCard({ course }: { course: any }) {
  // Generate initials if not explicitly provided
  const getInitials = (name: string) => {
    if (!name) return "TP";
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const initials = course.instructorInitials || getInitials(course.instructor);

  return (
    <Link 
      href={`/courses/${course.slug}`}
      className="group flex flex-col bg-card border border-border rounded-[2rem] overflow-hidden hover:border-foreground/30 transition-colors relative h-full min-h-[450px]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full bg-muted overflow-hidden border-b border-border">
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-mono uppercase tracking-widest text-xs">
            {course.title}
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-background text-foreground font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-border">
          {course.category}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
        <h3 className="font-semibold text-2xl mb-3 line-clamp-2 text-foreground group-hover:underline decoration-1 underline-offset-4">
          {course.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-8 flex-grow leading-relaxed">
          {course.shortDescription || course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground font-mono uppercase tracking-widest text-[10px] mb-8 pb-8 border-b border-border">
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <User size={14} /> {course.level}
          </span>
        </div>
        
        {/* Footer: Instructor & Price */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-border bg-muted flex items-center justify-center font-mono text-[10px] font-bold text-foreground">
              {initials}
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{course.instructor}</span>
          </div>
          
          <div className="text-right flex items-center gap-2">
            {course.originalPrice && (
              <div className="font-mono text-[10px] text-muted-foreground line-through">₹{course.originalPrice}</div>
            )}
            <div className="font-semibold text-xl text-foreground">
              ₹{course.price}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
