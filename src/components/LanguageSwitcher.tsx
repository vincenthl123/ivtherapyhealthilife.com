import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 bg-secondary/50 rounded-full p-1">
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        className={`rounded-full px-2.5 py-1 h-7 text-xs font-medium ${
          language === 'en' ? '' : 'hover:bg-secondary'
        }`}
        onClick={() => setLanguage('en')}
      >
        EN
      </Button>
      <Button
        variant={language === 'th' ? 'default' : 'ghost'}
        size="sm"
        className={`rounded-full px-2.5 py-1 h-7 text-xs font-medium ${
          language === 'th' ? '' : 'hover:bg-secondary'
        }`}
        onClick={() => setLanguage('th')}
      >
        TH
      </Button>
      <Button
        variant={language === 'ja' ? 'default' : 'ghost'}
        size="sm"
        className={`rounded-full px-2.5 py-1 h-7 text-xs font-medium ${
          language === 'ja' ? '' : 'hover:bg-secondary'
        }`}
        onClick={() => setLanguage('ja')}
      >
        日本語
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
