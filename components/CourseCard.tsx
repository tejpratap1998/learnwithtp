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
      className="group flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.3)] transition-all duration-500 hover:border-primary/50 relative h-full hover:-translate-y-2"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Thumbnail */}
      <div className="relative aspect-video w-full bg-[#080808] overflow-hidden">
        {course.thumbnail ? (
          <>
            <img 
              src={course.thumbnail} 
              alt={course.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent opacity-80" />
            
            {/* Play icon overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayCircle size={48} className="text-white drop-shadow-lg" />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-primary/20 flex items-center justify-center text-white/50 font-semibold">
            {course.title}
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold border border-white/10 text-white shadow-xl">
          {course.category}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
        <h3 className="font-bold text-2xl mb-3 line-clamp-2 text-white group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        
        <p className="text-sm text-white/50 line-clamp-2 mb-6 flex-grow leading-relaxed">
          {course.shortDescription || course.description}
        </p>
        
        <div className="flex items-center gap-6 text-sm text-white/40 mb-6">
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-primary/70" /> {course.duration}
          </span>
          <span className="flex items-center gap-2">
            <User size={16} className="text-accent/70" /> {course.level}
          </span>
        </div>
        
        {/* Footer: Instructor & Price */}
        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-white/10 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-xs font-bold text-white shadow-inner">
              {initials}
            </div>
            <span className="text-sm font-medium text-white/70">{course.instructor}</span>
          </div>
          
          <div className="text-right flex items-center gap-2">
            {course.originalPrice && (
              <div className="text-sm text-white/30 line-through">₹{course.originalPrice}</div>
            )}
            <div className="font-bold text-xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-blue-400 transition-all">
              ₹{course.price}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
