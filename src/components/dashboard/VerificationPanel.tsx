import { Satellite, Users, Cpu, ClipboardCheck, Calendar, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationSource {
  type: "satellite" | "field" | "community" | "ai" | "audit";
  label: string;
  coverage: number;
  lastUpdate: string;
  icon: React.ComponentType<{ className?: string }>;
}

const verificationSources: VerificationSource[] = [
  { type: "satellite", label: "Satellite Verified", coverage: 94, lastUpdate: "2 hours ago", icon: Satellite },
  { type: "field", label: "Ground Sampled", coverage: 67, lastUpdate: "3 days ago", icon: ClipboardCheck },
  { type: "community", label: "Community Reported", coverage: 82, lastUpdate: "1 day ago", icon: Users },
  { type: "ai", label: "AI Inferred", coverage: 100, lastUpdate: "Real-time", icon: Cpu },
  { type: "audit", label: "Third-party Audited", coverage: 45, lastUpdate: "Q3 2024", icon: Shield },
];

export function VerificationPanel() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold">Verification & Trust</h3>
          <p className="text-xs text-muted-foreground">Data provenance and confidence signals</p>
        </div>
        <span className="confidence-badge status-verified">
          <Shield className="h-3 w-3" />
          High Confidence
        </span>
      </div>

      <div className="space-y-3">
        {verificationSources.map((source) => (
          <div
            key={source.type}
            className="flex items-center gap-4 rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card shadow-soft">
              <source.icon className="h-5 w-5 text-primary" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{source.label}</span>
                <span className="text-xs text-muted-foreground">{source.lastUpdate}</span>
              </div>
              <div className="mt-1.5 flex items-center gap-3">
                <div className="h-1.5 flex-1 rounded-full bg-border">
                  <div
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      source.coverage >= 80 && "bg-verified",
                      source.coverage >= 50 && source.coverage < 80 && "bg-fragile",
                      source.coverage < 50 && "bg-muted-foreground"
                    )}
                    style={{ width: `${source.coverage}%` }}
                  />
                </div>
                <span className="min-w-[3rem] text-right text-xs font-medium">
                  {source.coverage}% coverage
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>Methodology version 2.4 • Last audit: October 2024</span>
      </div>
    </div>
  );
}
