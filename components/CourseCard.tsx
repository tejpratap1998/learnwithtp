import Link from "next/link";
import { Clock, User, ArrowRight, PlayCircle } from "lucide-react";

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
      className="group flex flex-col bg-card/80 backdrop-blur-sm border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_0_40px_-10px_rgba(43,27,84,0.3)] dark:hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.2)] transition-all duration-500 hover:border-primary/50 dark:hover:border-accent/50 relative h-full hover:-translate-y-2"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 dark:bg-accent/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Thumbnail */}
      <div className="relative aspect-video w-full bg-muted overflow-hidden">
        {course.thumbnail ? (
          <>
            <img 
              src={course.thumbnail} 
              alt={course.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-80" />
            
            {/* Play icon overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayCircle size={48} className="text-white drop-shadow-lg" />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-primary/20 flex items-center justify-center text-foreground/50 font-semibold">
            {course.title}
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold border border-border text-foreground shadow-sm">
          {course.category}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
        <h3 className="font-bold text-2xl mb-3 line-clamp-2 text-foreground group-hover:text-primary dark:group-hover:text-accent transition-colors">
          {course.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-grow leading-relaxed">
          {course.shortDescription || course.description}
        </p>
        
        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-2 font-medium">
            <Clock size={16} className="text-primary/80 dark:text-accent/80" /> {course.duration}
          </span>
          <span className="flex items-center gap-2 font-medium">
            <User size={16} className="text-primary/80 dark:text-accent/80" /> {course.level}
          </span>
        </div>
        
        {/* Footer: Instructor & Price */}
        <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-border bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-xs font-bold text-foreground shadow-inner">
              {initials}
            </div>
            <span className="text-sm font-medium text-foreground/80">{course.instructor}</span>
          </div>
          
          <div className="text-right flex items-center gap-2">
            {course.originalPrice && (
              <div className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</div>
            )}
            <div className="font-bold text-xl text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent dark:group-hover:from-accent dark:group-hover:to-yellow-300 transition-all">
              ₹{course.price}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
