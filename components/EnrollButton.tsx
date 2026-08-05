"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

interface EnrollButtonProps {
  courseId: string;
}

export default function EnrollButton({ courseId }: EnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleEnroll = async () => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to enroll");
      }
    } catch (error) {
      alert("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleEnroll}
      disabled={isLoading}
      className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-6 shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] disabled:opacity-70"
    >
      {isLoading ? <Loader2 className="animate-spin" /> : "Enroll Now (Free Test)"}
    </button>
  );
}
