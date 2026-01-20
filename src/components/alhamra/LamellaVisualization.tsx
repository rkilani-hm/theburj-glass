import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";

interface LamellaModel {
  id: number;
  label: string;
  elements: string[];
  capacity: number;
  percentage: number;
}

const lamellaModels: LamellaModel[] = [
  { id: 1, label: "Model 1", elements: ["A"], capacity: 50000, percentage: 26.5 },
  { id: 2, label: "Model 2", elements: ["A", "B"], capacity: 48500, percentage: 25.7 },
  { id: 3, label: "Model 3", elements: ["A", "B", "C", "E"], capacity: 49500, percentage: 26.2 },
  { id: 4, label: "Model 4", elements: ["A", "B", "C", "D", "E"], capacity: 189000, percentage: 100 },
];

const elementColors: Record<string, string> = {
  A: "hsl(var(--primary))",
  B: "hsl(var(--primary) / 0.8)",
  C: "hsl(var(--primary) / 0.6)",
  D: "hsl(142, 76%, 36%)", // Accent green for the breakthrough element
  E: "hsl(var(--primary) / 0.4)",
};

const LamellaVisualization = () => {
  const [activeModel, setActiveModel] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Count up hooks for each model
  const count1 = useCountUp({ end: 50000, duration: 1500, delay: 200 });
  const count2 = useCountUp({ end: 48500, duration: 1500, delay: 400 });
  const count3 = useCountUp({ end: 49500, duration: 1500, delay: 600 });
  const count4 = useCountUp({ end: 189000, duration: 2000, delay: 800 });
  const counts = [count1, count2, count3, count4];

  const isElementActive = (element: string, modelId: number | null) => {
    if (modelId === null) return false;
    const model = lamellaModels.find((m) => m.id === modelId);
    return model?.elements.includes(element) ?? false;
  };

  return (
    <div ref={containerRef} className="space-y-12">
      {/* SVG Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative bg-background border border-border p-8 lg:p-12"
      >
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
          Lamella Bracing Elements
        </p>
        
        {/* Interactive SVG Diagram */}
        <svg viewBox="0 0 400 200" className="w-full max-w-lg mx-auto">
          {/* Base structure outline */}
          <motion.path
            d="M 40 180 L 40 40 Q 200 20 360 40 L 360 180 Z"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Element A - Primary diagonal braces */}
          {[0, 1, 2, 3].map((i) => (
            <motion.line
              key={`a-${i}`}
              x1={60 + i * 80}
              y1={160}
              x2={100 + i * 80}
              y2={60}
              stroke={isElementActive("A", activeModel) || activeModel === null ? elementColors.A : "hsl(var(--border))"}
              strokeWidth={isElementActive("A", activeModel) ? 4 : 2}
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              className="transition-all duration-300"
            />
          ))}

          {/* Element B - Cross braces */}
          {[0, 1, 2, 3].map((i) => (
            <motion.line
              key={`b-${i}`}
              x1={100 + i * 80}
              y1={160}
              x2={60 + i * 80}
              y2={60}
              stroke={isElementActive("B", activeModel) || activeModel === null ? elementColors.B : "hsl(var(--border))"}
              strokeWidth={isElementActive("B", activeModel) ? 4 : 2}
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              className="transition-all duration-300"
            />
          ))}

          {/* Element C - Horizontal stabilizers */}
          {[0, 1, 2].map((i) => (
            <motion.line
              key={`c-${i}`}
              x1={60 + i * 80}
              y1={110}
              x2={140 + i * 80}
              y2={110}
              stroke={isElementActive("C", activeModel) || activeModel === null ? elementColors.C : "hsl(var(--border))"}
              strokeWidth={isElementActive("C", activeModel) ? 4 : 2}
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
              className="transition-all duration-300"
            />
          ))}

          {/* Element D - Critical diagonal reinforcements (the breakthrough) */}
          {[0, 1, 2].map((i) => (
            <motion.line
              key={`d-${i}`}
              x1={80 + i * 80}
              y1={40}
              x2={120 + i * 80}
              y2={110}
              stroke={isElementActive("D", activeModel) || activeModel === null ? elementColors.D : "hsl(var(--border))"}
              strokeWidth={isElementActive("D", activeModel) ? 5 : 2}
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.1 + i * 0.1 }}
              className="transition-all duration-300"
            />
          ))}

          {/* Element E - Secondary stabilizers */}
          {[0, 1, 2].map((i) => (
            <motion.line
              key={`e-${i}`}
              x1={80 + i * 80}
              y1={180}
              x2={120 + i * 80}
              y2={110}
              stroke={isElementActive("E", activeModel) || activeModel === null ? elementColors.E : "hsl(var(--border))"}
              strokeWidth={isElementActive("E", activeModel) ? 4 : 2}
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.3 + i * 0.1 }}
              className="transition-all duration-300"
            />
          ))}
        </svg>

        {/* Element Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {Object.entries(elementColors).map(([element, color]) => (
            <div key={element} className="flex items-center gap-2">
              <div
                className="w-4 h-1"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-muted-foreground">Element {element}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Capacity Bars */}
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Buckling Capacity Analysis
        </p>
        
        {lamellaModels.map((model, index) => (
          <motion.div
            key={model.id}
            ref={counts[index].ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
            className="group cursor-pointer"
            onMouseEnter={() => setActiveModel(model.id)}
            onMouseLeave={() => setActiveModel(null)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{model.label}</span>
                <span className="text-xs text-muted-foreground">
                  ({model.elements.join(" + ")})
                </span>
              </div>
              <span className={`font-light transition-all duration-300 ${
                model.id === 4 
                  ? "text-xl text-primary" 
                  : activeModel === model.id 
                    ? "text-foreground" 
                    : "text-muted-foreground"
              }`}>
                {counts[index].count.toLocaleString()} kN
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full transition-all duration-300 ${
                  model.id === 4 
                    ? "bg-primary" 
                    : activeModel === model.id 
                      ? "bg-foreground" 
                      : "bg-muted-foreground/50"
                }`}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${model.percentage}%` } : {}}
                transition={{ duration: 1, delay: 0.5 + index * 0.2, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}

        {/* Improvement Callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="flex items-center justify-end gap-2 pt-4"
        >
          <span className="text-sm text-muted-foreground">D elements contribution:</span>
          <span className="text-lg font-medium text-primary">3.8× capacity increase</span>
        </motion.div>
      </div>
    </div>
  );
};

export default LamellaVisualization;
