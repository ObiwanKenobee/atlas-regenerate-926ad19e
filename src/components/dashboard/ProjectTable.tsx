import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  name: string;
  region: string;
  type: string;
  baseline: number;
  current: number;
  confidence: number;
  value: number;
  trend: "up" | "down" | "stable";
  risk: "low" | "medium" | "high";
}

const projects: Project[] = [
  { name: "Mau Forest Restoration", region: "Rift Valley", type: "Forest", baseline: 1200, current: 3400, confidence: 0.92, value: 1200000, trend: "up", risk: "low" },
  { name: "Tana River Watershed", region: "Coast", type: "Water", baseline: 45, current: 78, confidence: 0.85, value: 890000, trend: "up", risk: "low" },
  { name: "Amboseli Wildlife Corridor", region: "Kajiado", type: "Biodiversity", baseline: 12, current: 24, confidence: 0.78, value: 650000, trend: "up", risk: "medium" },
  { name: "Nairobi Peri-Urban Health", region: "Nairobi", type: "Health", baseline: 8500, current: 14200, confidence: 0.88, value: 420000, trend: "up", risk: "low" },
  { name: "Northern Rangelands", region: "Laikipia", type: "Land", baseline: 4500, current: 4100, confidence: 0.71, value: 380000, trend: "down", risk: "high" },
  { name: "Lake Nakuru Buffer Zone", region: "Nakuru", type: "Water", baseline: 320, current: 340, confidence: 0.82, value: 290000, trend: "stable", risk: "medium" },
];

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const riskStyles = {
  low: "bg-verified/15 text-verified border-verified/30",
  medium: "bg-fragile/15 text-fragile border-fragile/30",
  high: "bg-reversal/15 text-reversal border-reversal/30",
};

export function ProjectTable() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h3 className="font-display font-semibold">Project Impact Explorer</h3>
          <p className="text-xs text-muted-foreground">Drill down into individual restoration projects</p>
        </div>
        <Badge variant="secondary" className="font-mono">
          {projects.length} projects
        </Badge>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-semibold uppercase tracking-wider">Project</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">Region</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">Type</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wider">Baseline</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wider">Current</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wider">Confidence</TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase tracking-wider">Value Est.</TableHead>
              <TableHead className="text-center text-xs font-semibold uppercase tracking-wider">Trend</TableHead>
              <TableHead className="text-center text-xs font-semibold uppercase tracking-wider">Risk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, idx) => {
              const TrendIcon = trendIcons[project.trend];
              const change = ((project.current - project.baseline) / project.baseline * 100).toFixed(0);
              
              return (
                <TableRow key={idx} className="cursor-pointer transition-colors hover:bg-muted/50">
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell className="text-muted-foreground">{project.region}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {project.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {project.baseline.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm font-medium">
                    {project.current.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={cn(
                        "font-mono text-sm",
                        project.confidence >= 0.85 && "text-verified",
                        project.confidence >= 0.7 && project.confidence < 0.85 && "text-fragile",
                        project.confidence < 0.7 && "text-muted-foreground"
                      )}
                    >
                      {project.confidence.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    ${(project.value / 1000).toFixed(0)}k
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <TrendIcon
                        className={cn(
                          "h-4 w-4",
                          project.trend === "up" && "text-verified",
                          project.trend === "down" && "text-reversal",
                          project.trend === "stable" && "text-muted-foreground"
                        )}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
                          riskStyles[project.risk]
                        )}
                      >
                        {project.risk === "high" && <AlertTriangle className="h-3 w-3" />}
                        {project.risk}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
