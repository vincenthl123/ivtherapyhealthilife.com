import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const Breadcrumb = ({ items = [] }: BreadcrumbProps) => {
  const { language } = useLanguage();
  
  const homeLabel = language === 'th' ? 'หน้าแรก' : 'Home';
  const ivTherapyLabel = language === 'th' ? 'IV Therapy กรุงเทพ' : 'IV Therapy Bangkok';

  const defaultItems: BreadcrumbItem[] = [
    { label: homeLabel, href: '/' },
    { label: ivTherapyLabel }
  ];

  const breadcrumbItems = items.length > 0 ? items : defaultItems;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="py-3 px-4 md:px-8 bg-secondary/30"
    >
      <ol 
        className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground max-w-7xl mx-auto"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {breadcrumbItems.map((item, index) => (
          <li 
            key={index} 
            className="flex items-center"
            itemScope 
            itemProp="itemListElement" 
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground/50" />
            )}
            {item.href && index < breadcrumbItems.length - 1 ? (
              <a 
                href={item.href} 
                className="hover:text-primary transition-colors flex items-center gap-1"
                itemProp="item"
              >
                {index === 0 && <Home className="w-3.5 h-3.5" />}
                <span itemProp="name">{item.label}</span>
              </a>
            ) : (
              <span 
                className="text-foreground font-medium"
                itemProp="name"
              >
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
