import { motion } from "framer-motion";
import { Globe, Download, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { RegenerationMap } from "@/components/dashboard/RegenerationMap";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { CategoryTabs } from "@/components/dashboard/CategoryTabs";
import { VerificationPanel } from "@/components/dashboard/VerificationPanel";
import { RVEPanel } from "@/components/dashboard/RVEPanel";
import { ProjectTable } from "@/components/dashboard/ProjectTable";

const heroMetrics = [
  {
    title: "Hectares Restored",
    value: "10,240",
    unit: "ha",
    delta: 14.2,
    confidence: 0.87,
    sparklineData: [2400, 2800, 3200, 4100, 5200, 6400, 7800, 8600, 9200, 10240],
    sourceType: "satellite" as const,
  },
  {
    title: "Net Carbon Removed",
    value: "156,400",
    unit: "tCO₂e",
    delta: 22.1,
    confidence: 0.91,
    sparklineData: [45000, 58000, 72000, 89000, 105000, 124000, 138000, 156400],
    sourceType: "satellite" as const,
  },
  {
    title: "Water Systems Recovered",
    value: "34",
    unit: "watersheds",
    delta: 8.3,
    confidence: 0.78,
    sparklineData: [18, 21, 24, 26, 28, 30, 32, 34],
    sourceType: "field" as const,
  },
  {
    title: "Lives Improved",
    value: "48,500",
    delta: 12.4,
    confidence: 0.84,
    sparklineData: [22000, 28000, 32000, 36000, 40000, 44000, 48500],
    sourceType: "community" as const,
  },
  {
    title: "Biodiversity Recovery",
    value: "0.72",
    unit: "index",
    delta: 6.2,
    confidence: 0.69,
    sparklineData: [0.45, 0.52, 0.58, 0.62, 0.66, 0.70, 0.72],
    sourceType: "model" as const,
  },
  {
    title: "Regenerative Jobs",
    value: "2,840",
    delta: 18.6,
    confidence: 0.92,
    sparklineData: [1200, 1480, 1720, 1980, 2200, 2480, 2840],
    sourceType: "field" as const,
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Globe className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold tracking-tight">Atlas</h1>
              <p className="text-xs text-muted-foreground">Regenerative Impact Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Filters */}
        <FilterBar />

        {/* Hero Metrics */}
        <section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
          >
            {heroMetrics.map((metric, idx) => (
              <MetricCard key={idx} {...metric} />
            ))}
          </motion.div>
        </section>

        {/* Map + Verification */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RegenerationMap />
          </div>
          <div>
            <VerificationPanel />
          </div>
        </section>

        {/* Trend Charts */}
        <section className="grid gap-6 lg:grid-cols-2">
          <TrendChart title="Hectares Restored Over Time" unit="cumulative hectares" />
          <TrendChart
            title="Carbon Sequestration Trajectory"
            unit="tCO₂e removed"
            data={[
              { month: "Jan", actual: 45000, target: 50000, lower: 40000, upper: 50000 },
              { month: "Feb", actual: 58000, target: 60000, lower: 52000, upper: 64000 },
              { month: "Mar", actual: 72000, target: 70000, lower: 64000, upper: 80000 },
              { month: "Apr", actual: 89000, target: 80000, lower: 78000, upper: 100000 },
              { month: "May", actual: 105000, target: 90000, lower: 92000, upper: 118000 },
              { month: "Jun", actual: 124000, target: 100000, lower: 108000, upper: 140000 },
              { month: "Jul", actual: 138000, target: 110000, lower: 120000, upper: 156000 },
              { month: "Aug", actual: 156400, target: 120000, lower: 136000, upper: 177000 },
              { month: "Sep", actual: undefined as unknown as number, target: 130000, forecast: 172000, lower: 150000, upper: 194000 },
              { month: "Oct", actual: undefined as unknown as number, target: 140000, forecast: 188000, lower: 164000, upper: 212000 },
              { month: "Nov", actual: undefined as unknown as number, target: 150000, forecast: 205000, lower: 178000, upper: 232000 },
              { month: "Dec", actual: undefined as unknown as number, target: 160000, forecast: 224000, lower: 194000, upper: 254000 },
            ]}
          />
        </section>

        {/* Category Breakdown */}
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4">
            <h2 className="font-display text-lg font-semibold">Impact by Category</h2>
            <p className="text-sm text-muted-foreground">Detailed metrics across restoration domains</p>
          </div>
          <CategoryTabs />
        </section>

        {/* RVE Panel */}
        <section>
          <RVEPanel />
        </section>

        {/* Project Table */}
        <section>
          <ProjectTable />
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>
            Data last refreshed: 2 hours ago • Methodology v2.4 • 
            <a href="#" className="ml-1 text-primary hover:underline">View audit trail</a>
          </p>
        </footer>
      </main>
    </div>
  );
}
