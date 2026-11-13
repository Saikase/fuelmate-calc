import React, { useState } from 'react';
import type { CountryFuelData } from '../types';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: CountryFuelData;
  isDark: boolean;
  qrImageUrl?: string; // QR code image URL or path when provided
}

export const DonateModal: React.FC<DonateModalProps> = ({
  isOpen,
  onClose,
  selectedCountry,
  isDark,
  qrImageUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const isEnglish = selectedCountry.language !== 'vi';

  if (!isOpen) return null;

  // Placeholder bank info (ready to be customized with author's exact details)
  const bankInfo = {
    bankName: 'MB Bank (Ngân hàng Quân Đội)',
    accountNumber: '0988888888', // Sẽ thay bằng STK thật của bạn
    accountHolder: 'NGUYEN HOANG VI', // Sẽ thay bằng tên thật của bạn
    transferContent: 'FuelMate Cafe',
  };

  const handleCopyAccount = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(bankInfo.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div
        className={`w-full max-w-sm rounded-3xl p-5 shadow-2xl border transition-all flex flex-col ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">☕</span>
            <h3 className="font-black text-base">
              {isEnglish ? 'Support Developer' : 'Mời Tác Giả Ly Cà Phê'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="my-3 space-y-3.5 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed px-1">
            {isEnglish
              ? 'If FuelMate helps you save money and track your travel fuel expenses, a small coffee donation keeps the developer fueled!'
              : 'Nếu FuelMate giúp bạn tiết kiệm chi phí và quản lý xăng xe hiệu quả, bạn có thể gửi tặng tác giả một ly cà phê để tiếp thêm động lực phát triển ứng dụng nhé! ❤️'}
          </p>

          {/* QR Code Container */}
          <div
            className={`p-4 rounded-2xl border flex flex-col items-center justify-center relative ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            {qrImageUrl ? (
              <img
                src={qrImageUrl}
                alt="QR Donate"
                className="w-56 h-56 object-contain rounded-xl shadow-md border border-slate-200 dark:border-slate-700 bg-white p-2"
              />
            ) : (
              <div className="w-56 h-56 rounded-xl border-2 border-dashed border-amber-500/50 flex flex-col items-center justify-center p-3 bg-amber-500/5 text-center">
                <span className="text-4xl mb-2 animate-bounce">📱</span>
                <span className="font-black text-xs text-amber-500">
                  {isEnglish ? 'VietQR Code Coming Soon' : 'Mã QR Ngân Hàng'}
                </span>
                <span className="text-[10px] text-slate-400 mt-1 leading-tight">
                  {isEnglish
                    ? 'QR Code image will appear right here'
                    : 'Hình mã QR tài khoản ngân hàng sẽ hiển thị tại khung này'}
                </span>
                <div className="mt-3 px-2 py-1 rounded bg-amber-500/20 text-amber-400 text-[10px] font-mono font-bold">
                  VietQR · Napas247
                </div>
              </div>
            )}

            {/* Bank details badge */}
            <div className="mt-3 w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400">{isEnglish ? 'Bank:' : 'Ngân hàng:'}</span>
                <strong className="text-slate-800 dark:text-slate-200">{bankInfo.bankName}</strong>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400">{isEnglish ? 'Account:' : 'Số tài khoản:'}</span>
                <div className="flex items-center gap-1.5">
                  <strong className="font-mono text-amber-500 font-bold">{bankInfo.accountNumber}</strong>
                  <button
                    onClick={handleCopyAccount}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition cursor-pointer"
                  >
                    {copied ? '✓' : (isEnglish ? 'Copy' : 'Chép')}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400">{isEnglish ? 'Holder:' : 'Chủ tài khoản:'}</span>
                <strong className="text-slate-800 dark:text-slate-200">{bankInfo.accountHolder}</strong>
              </div>
            </div>
          </div>

          {copied && (
            <div className="text-center text-xs font-bold text-emerald-500 animate-fadeIn">
              ✓ {isEnglish ? 'Account number copied to clipboard!' : 'Đã sao chép số tài khoản!'}
            </div>
          )}
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl font-black text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition cursor-pointer"
        >
          {isEnglish ? 'Close' : 'Đóng'}
        </button>
      </div>
    </div>
  );
};
