import { MapPin, Calendar, Filter, Layers, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  className?: string;
}

export function FilterBar({ className }: FilterBarProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <Select defaultValue="kenya">
          <SelectTrigger className="h-auto w-auto border-0 bg-transparent p-0 shadow-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="global">Global</SelectItem>
            <SelectItem value="kenya">Kenya / Rift Valley</SelectItem>
            <SelectItem value="brazil">Brazil / Amazon</SelectItem>
            <SelectItem value="indonesia">Indonesia / Borneo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <Select defaultValue="12m">
          <SelectTrigger className="h-auto w-auto border-0 bg-transparent p-0 shadow-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
            <SelectItem value="5y">Last 5 years</SelectItem>
            <SelectItem value="inception">Since inception</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
        <Layers className="h-4 w-4 text-muted-foreground" />
        <Select defaultValue="all">
          <SelectTrigger className="h-auto w-auto border-0 bg-transparent p-0 shadow-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Domains</SelectItem>
            <SelectItem value="forest">Forest</SelectItem>
            <SelectItem value="water">Water</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="biodiversity">Biodiversity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
        <CheckCircle className="h-4 w-4 text-muted-foreground" />
        <Select defaultValue="verified">
          <SelectTrigger className="h-auto w-auto border-0 bg-transparent p-0 shadow-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="verified">Verified Only</SelectItem>
            <SelectItem value="pending">Pending Verification</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" size="sm" className="ml-auto gap-2">
        <Filter className="h-4 w-4" />
        More Filters
      </Button>
    </div>
  );
}
