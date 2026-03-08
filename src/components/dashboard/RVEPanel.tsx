import { motion } from "framer-motion";
import { ArrowUpRight, Wallet, TrendingUp, Lock, CircleDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface Asset {
  name: string;
  type: "forest" | "carbon" | "water" | "biodiversity";
  hectares: number;
  carbonEquivalent: number;
  multiplier: number;
  value: number;
  liquidity: "high" | "medium" | "low";
  permanence: number;
}

const mockAssets: Asset[] = [
  {
    name: "Rift Valley Forest Corridor",
    type: "forest",
    hectares: 5100,
    carbonEquivalent: 76500,
    multiplier: 1.4,
    value: 2840000,
    liquidity: "high",
    permanence: 0.94,
  },
  {
    name: "Lake Victoria Watershed",
    type: "water",
    hectares: 2800,
    carbonEquivalent: 35000,
    multiplier: 1.2,
    value: 1420000,
    liquidity: "medium",
    permanence: 0.88,
  },
  {
    name: "Mount Kenya Biodiversity Zone",
    type: "biodiversity",
    hectares: 1900,
    carbonEquivalent: 31000,
    multiplier: 1.6,
    value: 1980000,
    liquidity: "medium",
    permanence: 0.91,
  },
];

const typeColors = {
  forest: "bg-verified/10 text-verified",
  carbon: "bg-muted-foreground/10 text-muted-foreground",
  water: "bg-water/10 text-water",
  biodiversity: "bg-accent/10 text-accent",
};

const liquidityStyles = {
  high: "text-verified",
  medium: "text-fragile",
  low: "text-muted-foreground",
};

export function RVEPanel() {
  const totalValue = mockAssets.reduce((sum, a) => sum + a.value, 0);
  const totalCarbon = mockAssets.reduce((sum, a) => sum + a.carbonEquivalent, 0);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="font-display font-semibold">Regenerative Value Exchange</h3>
          <p className="text-xs text-muted-foreground">Economic translation of verified impact</p>
        </div>
        <a
          href="#"
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View Portfolio <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>

      {/* Summary Stats */}
      <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-4">
          <div className="flex items-center gap-2 text-primary">
            <CircleDollarSign className="h-4 w-4" />
            <span className="data-label text-primary/70">Total Value</span>
          </div>
          <p className="mt-2 font-display text-xl font-semibold">
            ${(totalValue / 1000000).toFixed(2)}M
          </p>
        </div>
        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="data-label">Yield (12m)</span>
          </div>
          <p className="mt-2 font-display text-xl font-semibold text-verified">+18.4%</p>
        </div>
        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <span className="data-label">Carbon Units</span>
          </div>
          <p className="mt-2 font-display text-xl font-semibold">
            {(totalCarbon / 1000).toFixed(0)}k <span className="text-sm text-muted-foreground">tCO₂e</span>
          </p>
        </div>
        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span className="data-label">Avg Permanence</span>
          </div>
          <p className="mt-2 font-display text-xl font-semibold">91%</p>
        </div>
      </div>

      {/* Asset List */}
      <div className="space-y-3">
        {mockAssets.map((asset, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group rounded-lg border border-border bg-muted/30 p-4 transition-all hover:border-primary/30 hover:shadow-soft"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium capitalize", typeColors[asset.type])}>
                    {asset.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {asset.hectares.toLocaleString()} ha
                  </span>
                </div>
                <h4 className="mt-1 font-medium group-hover:text-primary">{asset.name}</h4>
              </div>
              <div className="text-right">
                <p className="font-display text-lg font-semibold">
                  ${(asset.value / 1000000).toFixed(2)}M
                </p>
                <p className="text-xs text-muted-foreground">estimated value</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Carbon:</span>
                <span className="font-medium">{(asset.carbonEquivalent / 1000).toFixed(0)}k tCO₂e</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Multiplier:</span>
                <span className="font-medium">{asset.multiplier}x</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Liquidity:</span>
                <span className={cn("font-medium capitalize", liquidityStyles[asset.liquidity])}>
                  {asset.liquidity}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Permanence:</span>
                <span className="font-medium">{(asset.permanence * 100).toFixed(0)}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
