import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Smartphone, Check, Apple, Wifi, Zap, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant loading with offline support'
    },
    {
      icon: Wifi,
      title: 'Works Offline',
      description: 'Browse IV therapies even without internet'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data stays on your device'
    },
    {
      icon: Smartphone,
      title: 'Native Feel',
      description: 'Full-screen app experience'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Install Healthi-Life App | IV Therapy Bangkok PWA</title>
        <meta name="description" content="Install the Healthi-Life IV Therapy Bangkok app on your phone. Works offline, loads instantly, and provides quick access to book your IV drip sessions." />
        <link rel="canonical" href="https://ivtherapyhealthilife.com/install" />
      </Helmet>

      <Header />
      
      <main className="min-h-screen pt-20 pb-16 bg-gradient-subtle">
        <div className="container px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-medical mb-6">
              <Download className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Install Healthi-Life App
            </h1>
            <p className="text-lg text-muted-foreground">
              Get instant access to Bangkok's premium IV therapy clinic. Book sessions, browse treatments, and stay updated - all from your home screen.
            </p>
          </div>

          {/* Install Card */}
          <Card className="max-w-lg mx-auto mb-12 border-2 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                {isInstalled ? (
                  <>
                    <Check className="w-6 h-6 text-green-500" />
                    App Installed!
                  </>
                ) : (
                  'Install Now'
                )}
              </CardTitle>
              <CardDescription>
                {isInstalled 
                  ? 'You can now access Healthi-Life from your home screen'
                  : 'Add to your home screen for the best experience'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isInstalled ? (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-muted-foreground">
                    The app is ready to use! Look for the Healthi-Life icon on your home screen.
                  </p>
                </div>
              ) : isIOS ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Apple className="w-6 h-6 text-foreground" />
                    <div>
                      <p className="font-medium">iOS Installation</p>
                      <p className="text-sm text-muted-foreground">
                        Tap the Share button, then "Add to Home Screen"
                      </p>
                    </div>
                  </div>
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
                      <span>Tap the <strong>Share</strong> button in Safari's toolbar</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</span>
                      <span>Scroll down and tap <strong>"Add to Home Screen"</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</span>
                      <span>Tap <strong>"Add"</strong> to confirm</span>
                    </li>
                  </ol>
                </div>
              ) : deferredPrompt ? (
                <Button 
                  size="lg" 
                  className="w-full" 
                  onClick={handleInstall}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Install App
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Smartphone className="w-6 h-6 text-foreground" />
                    <div>
                      <p className="font-medium">Android Installation</p>
                      <p className="text-sm text-muted-foreground">
                        Tap the menu button, then "Install app" or "Add to Home screen"
                      </p>
                    </div>
                  </div>
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
                      <span>Tap the <strong>menu (⋮)</strong> in Chrome</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</span>
                      <span>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</span>
                      <span>Tap <strong>"Install"</strong> to confirm</span>
                    </li>
                  </ol>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Why Install Our App?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default InstallPage;
