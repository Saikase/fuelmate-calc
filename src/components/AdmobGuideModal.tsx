import React, { useState } from 'react';

interface AdmobGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const AdmobGuideModal: React.FC<AdmobGuideModalProps> = ({
  isOpen,
  onClose,
  isDark,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className={`w-full max-w-lg rounded-3xl p-5 shadow-2xl border transition-colors max-h-[90vh] flex flex-col ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div>
            <h3 className="font-bold text-sm sm:text-base">
              Lộ Trình Đóng Gói Android & Kiếm Tiền AdMob
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Xuất bản lên Samsung Galaxy Store & Xiaomi GetApps
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        {/* Step Navigation */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl my-3 shrink-0">
          {[
            { step: 1, label: '1. Đóng gói' },
            { step: 2, label: '2. Nộp Store' },
            { step: 3, label: '3. Nối AdMob' },
            { step: 4, label: '4. Thu tiền' },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`py-1.5 rounded-lg text-[11px] font-bold transition text-center cursor-pointer ${
                activeStep === item.step
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto space-y-3 pr-1 text-xs text-slate-600 dark:text-slate-300 flex-1">
          {activeStep === 1 && (
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Bước 1: Chuyển web này thành App Android với Capacitor
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Chạy các lệnh sau trong thư mục dự án để tạo mã nguồn Android Studio:
              </p>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400 space-y-1.5 overflow-x-auto">
                <div className="text-slate-400"># Cài đặt Capacitor</div>
                <div className="text-slate-200">npm install @capacitor/core @capacitor/cli @capacitor/android</div>
                <div className="text-slate-400 pt-1"># Build & khởi tạo</div>
                <div className="text-slate-200">npx cap init "FuelMate" "com.fuelmate.app"</div>
                <div className="text-slate-200">npm run build</div>
                <div className="text-slate-200">npx cap add android</div>
                <div className="text-slate-400 pt-1"># Mở trong Android Studio</div>
                <div className="text-slate-200">npx cap open android</div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Bước 2: Nộp lên Samsung Galaxy Store & Xiaomi GetApps
              </h4>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                <li>Samsung Developer Portal: <code>seller.samsungapps.com</code> (Miễn phí, 2-4 ngày duyệt)</li>
                <li>Xiaomi Developer Global: <code>global.developer.mi.com</code> (Miễn phí, 1-3 ngày duyệt)</li>
                <li>Cả hai đều <strong>không yêu cầu 20 tester trong 14 ngày</strong>.</li>
              </ul>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Bước 3: Liên kết Store vào Google AdMob
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-[11px]">
                <li>Khi app có link công khai trên Store, vào Google AdMob &gt; Thêm ứng dụng.</li>
                <li>Đánh dấu chọn Samsung Galaxy Store hoặc Xiaomi GetApps.</li>
                <li>Dán link app vào để AdMob tự động duyệt và kích hoạt quảng cáo thật.</li>
              </ol>
            </div>
          )}

          {activeStep === 4 && (
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Bước 4: Nhận tiền về tài khoản ngân hàng Việt Nam
              </h4>
              <div className="space-y-1.5 text-[11px]">
                <p>• Ngưỡng rút tiền tối thiểu: <strong>100 USD</strong> (~2.500.000 VNĐ).</p>
                <p>• Hình thức: Chuyển khoản trực tiếp (Wire Transfer) vào bất kỳ ngân hàng nào tại VN.</p>
                <p>• Chu kỳ: Tự động thanh toán từ ngày 21 đến 26 hàng tháng.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
