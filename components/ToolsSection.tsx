"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, Linkedin, Bot, Cpu, Sparkles, Wand2, BrainCircuit } from "lucide-react";

const tools = [
  { name: "Instagram", icon: Instagram, color: "text-[#E1306C]" },
  { name: "Facebook", icon: Facebook, color: "text-[#1877F2]" },
  { name: "YouTube", icon: Youtube, color: "text-[#FF0000]" },
  { name: "LinkedIn", icon: Linkedin, color: "text-[#0A66C2]" },
  { name: "ChatGPT", icon: Bot, color: "text-[#10A37F]" },
  { name: "Midjourney", icon: Sparkles, color: "text-[#9333EA]" },
  { name: "AI Automation", icon: BrainCircuit, color: "text-accent" },
  { name: "Generative AI", icon: Wand2, color: "text-[#F59E0B]" },
  { name: "Machine Learning", icon: Cpu, color: "text-[#06B6D4]" },
];

export function ToolsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-background border-y border-border">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 text-center mb-16 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <Cpu size={14} /> The Ultimate Stack
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">
          Master the Tools of <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-400">Tomorrow</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
          We train you on the most powerful social media platforms and cutting-edge AI technologies to dominate the digital landscape.
        </p>
      </motion.div>

      <div className="relative w-full flex overflow-x-hidden py-10 group">
        {/* Gradient overlays for smooth fading on edges */}
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div 
          className="flex space-x-6 md:space-x-10 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {/* Double the array for seamless infinite scroll */}
          {[...tools, ...tools, ...tools].map((tool, i) => (
            <motion.div
              key={i}
              whileHover={{ 
                scale: 1.15, 
                rotateZ: Math.random() > 0.5 ? 4 : -4, 
                y: -15,
                transition: { type: "spring", stiffness: 300 } 
              }}
              className="relative flex flex-col items-center justify-center w-36 h-36 md:w-48 md:h-48 rounded-[2rem] bg-card border border-border shadow-[0_10px_40px_-10px_rgba(43,27,84,0.3)] dark:shadow-[0_10px_40px_-15px_rgba(212,175,55,0.15)] cursor-pointer overflow-visible z-0 hover:z-20 group/icon"
            >
              {/* 3D Glass Effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[2rem] opacity-30 pointer-events-none" />
              <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] pointer-events-none" />
              
              {/* Glowing aura behind icon */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover/icon:opacity-30 transition-opacity duration-500 ${tool.color.replace('text-', 'bg-')}`} />

              <tool.icon 
                size={56} 
                className={`mb-4 ${tool.color} drop-shadow-[0_10px_15px_currentColor] group-hover/icon:drop-shadow-[0_0_25px_currentColor] transition-all duration-300 relative z-10`} 
              />
              <span className="text-sm font-bold text-foreground/90 relative z-10">{tool.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
