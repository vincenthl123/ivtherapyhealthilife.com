import { useMemo, useState } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useCurrency } from "@/lib/currency";
import { getCurrencyList } from "@/lib/rates";
import { cn } from "@/lib/utils";

/**
 * Currency picker for the footer. Live FX rates (~166 currencies, 12h-cached,
 * static fallback). THB first, searchable. Reuses the satellite's shadcn
 * dropdown + lucide icons. Styled light for the dark footer.
 */
const CurrencySwitcher = ({ className }: { className?: string }) => {
  const { currency, setCurrency, meta, version } = useCurrency();
  const [query, setQuery] = useState("");

  // Recomputed when fresh rates arrive (version) so static 21 → ~166 shows.
  const all = useMemo(() => getCurrencyList(), [version]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      (c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
  }, [all, query]);

  return (
    <div className={cn("flex items-center", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1 px-2 text-xs font-normal text-background/80 hover:text-background hover:bg-background/10"
          >
            <span className="font-medium">{meta.symbol}</span>
            <span>{currency}</span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 bg-background text-foreground">
          <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
            Currency
          </DropdownMenuLabel>
          <div className="px-2 pb-2 pt-1">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                placeholder="Search currency…"
                className="h-8 w-full rounded-md border border-input bg-background pl-7 pr-2 text-xs outline-none focus:border-primary"
              />
            </div>
          </div>
          <DropdownMenuSeparator />
          <div className="max-h-72 overflow-y-auto">
            {filtered.length === 0 && (
              <div className="px-3 py-4 text-center text-xs text-muted-foreground">
                No match
              </div>
            )}
            {filtered.map((curr) => (
              <DropdownMenuItem
                key={curr.code}
                onClick={() => setCurrency(curr.code)}
                onSelect={(e) => e.preventDefault()}
                className={cn(
                  "flex items-center gap-2 cursor-pointer",
                  currency === curr.code && "bg-accent"
                )}
              >
                <span className="w-7 shrink-0 text-center font-medium">{curr.symbol}</span>
                <span className="w-10 shrink-0 font-medium">{curr.code}</span>
                <span className="flex-1 truncate text-xs text-muted-foreground">{curr.name}</span>
                {currency === curr.code && (
                  <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CurrencySwitcher;
