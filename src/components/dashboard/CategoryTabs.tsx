import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trees, CloudSun, Droplets, Heart, Bird, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { id: "land", label: "Land", icon: Trees },
  { id: "carbon", label: "Carbon", icon: CloudSun },
  { id: "water", label: "Water", icon: Droplets },
  { id: "health", label: "Health", icon: Heart },
  { id: "biodiversity", label: "Biodiversity", icon: Bird },
  { id: "jobs", label: "Jobs", icon: Briefcase },
];

const categoryData = {
  land: [
    { label: "Hectares Restored", value: "10,240", change: "+14.2%" },
    { label: "Soil Health Score", value: "7.4", change: "+0.8" },
    { label: "Vegetation Density", value: "68%", change: "+12%" },
    { label: "Survival Rate", value: "82%", change: "+3%" },
  ],
  carbon: [
    { label: "Carbon Removed", value: "156,400", unit: "tCO₂e", change: "+22%" },
    { label: "Avoided Emissions", value: "48,200", unit: "tCO₂e", change: "+8%" },
    { label: "Sequestration Rate", value: "2.4", unit: "t/ha/yr", change: "+15%" },
    { label: "Permanence Score", value: "0.91", change: "+0.04" },
  ],
  water: [
    { label: "River Flow Recovery", value: "+34%", change: "stable" },
    { label: "Wetlands Restored", value: "1,240", unit: "ha", change: "+18%" },
    { label: "Groundwater Recharge", value: "+28%", change: "+6%" },
    { label: "Water Quality Index", value: "B+", change: "improved" },
  ],
  health: [
    { label: "Lives Improved", value: "48,500", change: "+12%" },
    { label: "Clinic Access", value: "+23%", change: "+5%" },
    { label: "Morbidity Reduction", value: "-18%", change: "-4%" },
    { label: "Sanitation Coverage", value: "74%", change: "+8%" },
  ],
  biodiversity: [
    { label: "Species Richness", value: "+24", change: "+6" },
    { label: "Habitat Connectivity", value: "67%", change: "+11%" },
    { label: "Pollinator Index", value: "0.78", change: "+0.12" },
    { label: "Ecosystem Integrity", value: "B", change: "stable" },
  ],
  jobs: [
    { label: "Regenerative Jobs", value: "2,840", change: "+340" },
    { label: "Local Participation", value: "89%", change: "+4%" },
    { label: "Youth Employment", value: "34%", change: "+8%" },
    { label: "Income Uplift", value: "+42%", change: "+6%" },
  ],
};

export function CategoryTabs() {
  return (
    <Tabs defaultValue="land" className="w-full">
      <TabsList className="mb-4 w-full justify-start gap-1 bg-muted/50 p-1">
        {categories.map((cat) => (
          <TabsTrigger
            key={cat.id}
            value={cat.id}
            className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-soft"
          >
            <cat.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{cat.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {Object.entries(categoryData).map(([key, metrics]) => (
        <TabsContent key={key} value={key} className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-soft"
              >
                <span className="data-label">{metric.label}</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-2xl font-semibold">{metric.value}</span>
                  {"unit" in metric && (
                    <span className="text-sm text-muted-foreground">{metric.unit}</span>
                  )}
                </div>
                <span className="mt-1 text-sm text-verified">{metric.change}</span>
              </div>
            ))}
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
