import React, { useState } from 'react';

interface AdMobBannerProps {
  isDark: boolean;
  language?: string;
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({ isDark, language }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const isVi = language === 'vi';

  return (
    <div className="w-full mt-3">
      <div
        className={`rounded-xl p-2.5 border transition flex flex-col items-center ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}
      >
        {/* AdMob Test Label Tag */}
        <div className="w-full flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 font-mono">
          <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-500 font-bold border border-amber-500/20">
            AdMob Demo Banner (320x50)
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1 cursor-pointer"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Ad Content */}
        <div className="w-full h-12 flex items-center justify-between px-2 mt-1 rounded-lg">
          <div>
            <div className="text-xs font-bold leading-tight">
              {isVi ? 'Bảo hiểm xe máy & ô tô chỉ từ 66k/năm' : 'Vehicle Insurance & Roadside Assistance'}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              {isVi ? 'Cấp chứng nhận điện tử tức thì qua điện thoại' : 'Compare top rates and save up to 25% today'}
            </div>
          </div>

          <button className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 text-[11px] font-bold shrink-0 shadow-xs cursor-pointer">
            {isVi ? 'Xem ngay' : 'Get Quote'}
          </button>
        </div>
      </div>
    </div>
  );
};
