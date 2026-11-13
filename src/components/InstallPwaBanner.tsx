import React, { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallPwaBannerProps {
  isDark: boolean;
  language: string;
}

export const InstallPwaBanner: React.FC<InstallPwaBannerProps> = ({ isDark, language }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as unknown as { standalone?: boolean }).standalone) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  if (isInstalled || !deferredPrompt || isDismissed) {
    return null;
  }

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const isEn = language !== 'vi';

  return (
    <div
      className={`mx-3.5 my-2 p-2.5 rounded-2xl border flex items-center justify-between text-xs transition-all shadow-md animate-fadeIn ${
        isDark
          ? 'bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border-amber-500/30 text-white'
          : 'bg-gradient-to-r from-amber-50 via-white to-amber-50 border-amber-300 text-slate-900'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">📲</span>
        <div>
          <div className="font-black text-xs text-amber-500">
            {isEn ? 'Install FuelMate App' : 'Cài đặt FuelMate vào điện thoại'}
          </div>
          <div className="text-[10px] opacity-75">
            {isEn ? 'Use full-screen & offline without an app store' : 'Mở toàn màn hình, dùng offline không cần App Store'}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 ml-2">
        <button
          type="button"
          onClick={handleInstallClick}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 transition cursor-pointer shadow-xs active:scale-95"
        >
          {isEn ? 'Install' : 'Cài đặt'}
        </button>
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="p-1 rounded-full text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
