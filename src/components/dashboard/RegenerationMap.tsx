import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ZoomIn, ZoomOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Region {
  id: string;
  name: string;
  x: number;
  y: number;
  size: number;
  status: "verified" | "fragile" | "reversal";
  hectares: number;
  carbon: number;
  confidence: number;
}

const mockRegions: Region[] = [
  { id: "1", name: "Nairobi Watershed", x: 65, y: 45, size: 45, status: "verified", hectares: 3200, carbon: 48000, confidence: 0.89 },
  { id: "2", name: "Rift Valley Corridor", x: 40, y: 35, size: 60, status: "verified", hectares: 5100, carbon: 76500, confidence: 0.92 },
  { id: "3", name: "Lake Victoria Basin", x: 25, y: 55, size: 50, status: "fragile", hectares: 2800, carbon: 35000, confidence: 0.71 },
  { id: "4", name: "Mount Kenya Zone", x: 72, y: 28, size: 35, status: "verified", hectares: 1900, carbon: 31000, confidence: 0.85 },
  { id: "5", name: "Coastal Mangroves", x: 85, y: 65, size: 40, status: "reversal", hectares: 890, carbon: 12000, confidence: 0.78 },
  { id: "6", name: "Northern Savanna", x: 50, y: 18, size: 55, status: "fragile", hectares: 4200, carbon: 42000, confidence: 0.65 },
];

const statusColors = {
  verified: "fill-verified/30 stroke-verified",
  fragile: "fill-fragile/30 stroke-fragile",
  reversal: "fill-reversal/30 stroke-reversal",
};

export function RegenerationMap() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [activeLayer, setActiveLayer] = useState<"restoration" | "carbon" | "water">("restoration");

  return (
    <div className="relative h-full min-h-[400px] rounded-xl border border-border bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
      {/* Map Controls */}
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
        <Button variant="secondary" size="icon" className="h-8 w-8 shadow-elevated">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="h-8 w-8 shadow-elevated">
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Layer Toggle */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-lg bg-card/90 p-1 shadow-elevated backdrop-blur-sm">
        {(["restoration", "carbon", "water"] as const).map((layer) => (
          <button
            key={layer}
            onClick={() => setActiveLayer(layer)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors",
              activeLayer === layer
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {layer}
          </button>
        ))}
      </div>

      {/* Map Visualization */}
      <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="hsl(var(--border))" strokeWidth="0.1" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />

        {/* Region circles */}
        {mockRegions.map((region) => (
          <g key={region.id}>
            <motion.circle
              cx={region.x}
              cy={region.y}
              r={region.size / 10}
              className={cn(statusColors[region.status], "cursor-pointer stroke-2")}
              onClick={() => setSelectedRegion(region)}
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.circle
              cx={region.x}
              cy={region.y}
              r={region.size / 10 + 2}
              fill="none"
              className={cn(
                "stroke-1",
                region.status === "verified" && "stroke-verified/40",
                region.status === "fragile" && "stroke-fragile/40",
                region.status === "reversal" && "stroke-reversal/40"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4 rounded-lg bg-card/90 px-4 py-2 text-xs shadow-elevated backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-verified" />
          <span>Verified Recovery</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-fragile" />
          <span>Fragile</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-reversal" />
          <span>Reversal Risk</span>
        </div>
      </div>

      {/* Region Detail Panel */}
      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute right-0 top-0 h-full w-80 border-l border-border bg-card/95 p-5 shadow-floating backdrop-blur-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold">{selectedRegion.name}</h3>
                <span
                  className={cn(
                    "confidence-badge mt-1",
                    selectedRegion.status === "verified" && "status-verified",
                    selectedRegion.status === "fragile" && "status-fragile",
                    selectedRegion.status === "reversal" && "status-reversal"
                  )}
                >
                  {selectedRegion.status.charAt(0).toUpperCase() + selectedRegion.status.slice(1)} Recovery
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setSelectedRegion(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg bg-muted p-3">
                <span className="data-label">Hectares Restored</span>
                <p className="mt-1 font-display text-2xl font-semibold">
                  {selectedRegion.hectares.toLocaleString()} <span className="text-sm text-muted-foreground">ha</span>
                </p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <span className="data-label">Carbon Sequestered</span>
                <p className="mt-1 font-display text-2xl font-semibold">
                  {selectedRegion.carbon.toLocaleString()} <span className="text-sm text-muted-foreground">tCO₂e</span>
                </p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <span className="data-label">Verification Confidence</span>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-2 flex-1 rounded-full bg-border">
                    <div
                      className={cn(
                        "h-2 rounded-full",
                        selectedRegion.confidence >= 0.8 && "bg-verified",
                        selectedRegion.confidence >= 0.6 && selectedRegion.confidence < 0.8 && "bg-fragile",
                        selectedRegion.confidence < 0.6 && "bg-reversal"
                      )}
                      style={{ width: `${selectedRegion.confidence * 100}%` }}
                    />
                  </div>
                  <span className="font-display font-semibold">{(selectedRegion.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="data-label mb-3">Verification Methods</h4>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Satellite
                </span>
                <span className="rounded-full bg-water/10 px-3 py-1 text-xs font-medium text-water">
                  Ground Sampling
                </span>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  AI Analysis
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
