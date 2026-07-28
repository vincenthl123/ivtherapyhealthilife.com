import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";
import { Price } from "@/lib/currency";
import CurrencySwitcher from "@/components/CurrencySwitcher";

const PriceList = () => {
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Print button - hidden on print */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex items-center gap-2">
        <div className="rounded-md bg-foreground text-background shadow-lg">
          <CurrencySwitcher />
        </div>
        <Button onClick={handlePrint} size="lg" className="shadow-lg">
          <Printer className="h-5 w-5 mr-2" />
          Save as PDF / Print
        </Button>
      </div>

      <div className="max-w-[210mm] mx-auto px-8 py-10 print:px-6 print:py-4">
        {/* Header */}
        <div className="text-center mb-8 print:mb-4">
          <h1 className="text-3xl font-bold text-primary print:text-2xl">HEALTHI LIFE CLINIC</h1>
          <p className="text-sm text-muted-foreground mt-1">IV Therapy & Personalized Wellness Programs — Bangkok, Thailand</p>
          <p className="text-xs text-muted-foreground/70 mt-1">WhatsApp: +66 91 999 1744 · healthilifeclinic.com</p>
          <div className="w-full h-px bg-primary mt-4" />
        </div>

        {/* Most Popular */}
        <Section title="🔥 Most Popular IV Therapy">
          <PriceTable
            headers={["IV Drip", "Price", "Note"]}
            rows={[
              ["NAD+ IV Drip 250mg", "8,500 THB", "🎁 Foot Massage"],
              ["Glutathione IV Drip", "8,500 THB", "🎁 Foot Massage"],
              ["NAD+ IV Drip 500mg", "17,000 THB", "🎁 Foot Massage"],
              ["NAD+ IV Drip 100mg", "6,000 THB", "🎁 Foot Massage"],
              ["Full Body Detox IV Drip", "8,500 THB", "🎁 Foot Massage"],
              ["NAD+ 100mg + Resveratrol 500mg", "7,500 THB", "Limited"],
            ]}
          />
        </Section>

        {/* Body Booster */}
        <Section title="💊 Body Booster IV">
          <PriceTable
            headers={["IV Drip", "Price", "Note"]}
            rows={[
              ["NAD+ IV Drip 100mg", "6,000 THB", "🎁 Foot Massage"],
              ["NAD+ IV Drip 250mg", "8,500 THB", "🎁 Foot Massage"],
              ["NAD+ IV Drip 500mg", "17,000 THB", "🎁 Foot Massage"],
              ["Glutathione IV Drip", "8,500 THB", "🎁 Foot Massage"],
              ["NAD+ 100mg + Resveratrol 500mg", "7,500 THB", "Limited"],
              ["Fat Burner IV Drip", "4,500 THB", ""],
              ["Vital Boost / Myer's Cocktail", "4,500 THB", ""],
              ["Athlete Pro IV Drip", "4,500 THB", ""],
              ["Athlete Pro Max IV Drip", "8,500 THB", "🎁 Foot Massage"],
              ["Resveratrol IV Drip", "8,500 THB", "🎁 Foot Massage"],
              ["Vitamin D IM", "4,500 THB", ""],
              ["Liver Detox IV Drip", "4,500 THB", ""],
              ["Curcumin IV Drip", "8,500 THB", "🎁 Foot Massage"],
              ["ProGut IV Drip", "8,500 THB", "🎁 Foot Massage"],
              ["Full Body Detox IV Drip", "8,500 THB", "🎁 Foot Massage"],
              ["C Max IV Drip", "4,500 THB", ""],
              ["Party Shield IV Drip", "4,500 THB", ""],
              ["Hangover IV Drip", "4,500 THB", ""],
            ]}
          />
        </Section>

        {/* Brain Booster */}
        <Section title="🧠 Brain Booster IV">
          <PriceTable
            headers={["IV Drip", "Price", "Note"]}
            rows={[
              ["Time Zone IV Drip", "4,500 THB", ""],
              ["Stress Ease IV Drip", "4,500 THB", ""],
              ["Neuro Boost IV Drip", "4,500 THB", ""],
              ["Dream Ease IV Drip", "4,500 THB", ""],
            ]}
          />
        </Section>

        {/* Skin Booster */}
        <Section title="✨ Skin Booster IV">
          <PriceTable
            headers={["IV Drip", "Price", "Note"]}
            rows={[
              ["Glow Vita IV Drip", "4,500 THB", ""],
              ["Glow Restore IV Drip", "8,500 THB", "🎁 Foot Massage"],
              ["Glow Revive IV Therapy", "15,000 THB", "Premium"],
            ]}
          />
        </Section>

        {/* Page break before packages */}
        <div className="print:break-before-page" />

        {/* Wellness Packages */}
        <Section title="📦 WELLNESS PACKAGES™">
          <PriceTable
            headers={["Package", "Promo Price", "Original Price", "Discount", "Per Session"]}
            rows={[
              ["NAD+ 100mg — 5 Sessions", "27,000 THB", "30,000 THB", "10%", "5,400 THB"],
              ["NAD+ 100mg — 10 Sessions", "51,000 THB", "60,000 THB", "15%", "5,100 THB"],
              ["NAD+ 250mg — 5 Sessions", "38,250 THB", "42,500 THB", "10%", "7,650 THB"],
              ["NAD+ 250mg — 10 Sessions", "72,250 THB", "85,000 THB", "15%", "7,225 THB"],
              ["NAD+ 500mg — 5 Sessions", "76,500 THB", "85,000 THB", "10%", "15,300 THB"],
              ["NAD+ 500mg — 10 Sessions", "144,500 THB", "170,000 THB", "15%", "14,450 THB"],
            ]}
          />
          <p className="text-xs text-muted-foreground mt-2">🎁 All packages include Complimentary Foot Massage</p>
        </Section>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-border text-center print:mt-4">
          <p className="text-xs text-muted-foreground">Healthi Life Clinic · Bangkok, Thailand · All prices in Thai Baht (THB)</p>
          <p className="text-xs text-muted-foreground">Prices subject to change. Contact us for current pricing.</p>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6 print:mb-4">
    <h2 className="text-lg font-bold text-primary mb-2 print:text-base">{title}</h2>
    {children}
  </div>
);

const PriceTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <table className="w-full text-sm border-collapse">
    <thead>
      <tr>
        {headers.map((h, i) => (
          <th key={i} className="text-left py-1.5 px-2 bg-secondary border border-border font-semibold text-primary text-xs print:text-[10px]">
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
          {row.map((cell, j) => (
            <td key={j} className="py-1.5 px-2 border border-border text-xs print:text-[10px]">
              {cell.includes("was ") ? (
                <>
                  <strong><Price value={cell.split(" (")[0]} /></strong>{" "}
                  <span className="text-muted-foreground line-through text-[10px]">(<Price value={cell.split("(")[1].replace(")", "")} />)</span>
                </>
              ) : (
                <Price value={cell} />
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default PriceList;
