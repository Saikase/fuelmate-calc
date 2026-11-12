import React from 'react';

interface AdMobBannerProps {
  isDark: boolean;
  language?: string;
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({ isDark, language }) => {
  const isVi = language === 'vi';

  return (
    <div className="w-full mt-2">
      <div
        className={`rounded-xl px-3 py-2 border transition relative overflow-hidden flex items-center justify-between shadow-xs ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-100'
            : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}
      >
        {/* Ad Badge */}
        <div className="absolute top-1 right-2 flex items-center gap-1 text-[9px] text-slate-400 font-medium">
          <span className="px-1 py-0.2 rounded bg-amber-500/10 text-amber-500 font-bold border border-amber-500/20">
            Ad
          </span>
          <span className="opacity-60">Google AdMob</span>
        </div>

        {/* Ad Creative Body */}
        <div className="pr-16 py-0.5">
          <div className="text-xs font-bold leading-snug">
            {isVi ? 'Bảo hiểm xe máy & ô tô chỉ từ 66k/năm' : 'Vehicle Insurance & Roadside Coverage'}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">
            {isVi ? 'Cấp chứng nhận điện tử tức thì qua điện thoại' : 'Compare rates from top insurers and save 25%'}
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-[11px] font-bold shrink-0 shadow-xs cursor-pointer transition active:scale-95"
        >
          {isVi ? 'Xem ngay' : 'Get Quote'}
        </button>
      </div>
    </div>
  );
};
