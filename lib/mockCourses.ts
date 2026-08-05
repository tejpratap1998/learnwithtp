export type CurriculumModule = {
  title: string;
  count: string;
};

export type CourseType = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  price: number;
  originalPrice?: number;
  category: string;
  level: string;
  duration: string;
  instructor: string;
  instructorInitials: string;
  instructorRole: string;
  isPublished: boolean;
  totalStudents: number;
  whatYouWillLearn: string[];
  curriculum: CurriculumModule[];
};

export const mockCourses: CourseType[] = [
  {
    _id: "course_1",
    title: "AI Mastery for Marketers",
    slug: "ai-mastery",
    description: "Harness the Power of AI to Automate, Create, and Scale Your Marketing Efforts. This comprehensive course takes you from beginner to advanced AI user, focusing entirely on practical marketing use cases.",
    shortDescription: "Automate and scale your marketing with AI tools, Prompt Engineering, and Content Automation.",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    price: 3999,
    originalPrice: 7999,
    category: "Marketing",
    level: "All Levels",
    duration: "15+ Hours",
    instructor: "Tejpratap (TP)",
    instructorInitials: "TP",
    instructorRole: "Performance Marketer",
    isPublished: true,
    totalStudents: 1250,
    whatYouWillLearn: [
      "Understanding the AI Tools Landscape",
      "Advanced Prompt Engineering Masterclass",
      "AI Ad Copywriting & Video Scripting",
      "Content Calendar Automation",
      "AI Audience Research & Strategy",
      "Automated Reporting workflows with AI",
      "Midjourney & DALL-E for Creatives",
      "Building Full AI Marketing Systems"
    ],
    curriculum: [
      { title: "Module 1: AI Foundations for Marketers", count: "4 lessons" },
      { title: "Module 2: AI-Powered Content Creation", count: "4 lessons" },
      { title: "Module 3: AI for Performance Marketing", count: "4 lessons" },
      { title: "Module 4: AI Tools Ecosystem", count: "5 lessons" },
      { title: "Module 5: Building AI Marketing Systems", count: "4 lessons" },
    ]
  },
  {
    _id: "course_2",
    title: "Next.js 14 Full Stack Development",
    slug: "nextjs-fullstack",
    description: "Learn to build production-ready full-stack applications with Next.js 14 App Router, Tailwind CSS, and MongoDB.",
    shortDescription: "Master React, Next.js App Router, and server actions by building real-world projects.",
    thumbnail: "https://images.unsplash.com/photo-1618477388954-7852f32655c7?auto=format&fit=crop&q=80&w=800",
    price: 4999,
    originalPrice: 9999,
    category: "Development",
    level: "Intermediate",
    duration: "20+ Hours",
    instructor: "Tejpratap (TP)",
    instructorInitials: "TP",
    instructorRole: "Full Stack Engineer",
    isPublished: true,
    totalStudents: 890,
    whatYouWillLearn: [
      "Next.js App Router Architecture",
      "Server Actions & Data Fetching",
      "Authentication with NextAuth",
      "MongoDB & Mongoose Integration",
      "Advanced Tailwind CSS Styling",
      "Stripe Payments Integration"
    ],
    curriculum: [
      { title: "Module 1: Next.js Fundamentals", count: "6 lessons" },
      { title: "Module 2: Database & Backend", count: "5 lessons" },
      { title: "Module 3: Authentication", count: "4 lessons" },
      { title: "Module 4: UI & Styling", count: "8 lessons" },
      { title: "Module 5: Deployment & Optimization", count: "3 lessons" },
    ]
  }
];

export function getCourseBySlug(slug: string): CourseType | undefined {
  return mockCourses.find(course => course.slug === slug);
}
