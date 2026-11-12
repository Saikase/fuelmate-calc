import React, { useState } from 'react';

interface TermsPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  language: string;
}

export const TermsPrivacyModal: React.FC<TermsPrivacyModalProps> = ({
  isOpen,
  onClose,
  isDark,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  if (!isOpen) return null;

  const isVi = language === 'vi';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className={`w-full max-w-md rounded-2xl shadow-2xl border flex flex-col max-h-[85vh] transition-colors ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm">
              {isVi ? 'Điều Khoản & Chính Sách Bảo Mật' : 'Terms & Privacy Policy'}
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              {isVi ? 'Tuân thủ tiêu chuẩn Samsung Store, Xiaomi & Google AdMob' : 'Compliant with App Store & Google AdMob policies'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-2.5 text-center transition cursor-pointer border-b-2 ${
              activeTab === 'privacy'
                ? 'border-amber-500 text-amber-500'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {isVi ? 'Chính sách bảo mật (Privacy)' : 'Privacy Policy'}
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-2.5 text-center transition cursor-pointer border-b-2 ${
              activeTab === 'terms'
                ? 'border-amber-500 text-amber-500'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {isVi ? 'Điều khoản dịch vụ (Terms)' : 'Terms of Service'}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto text-xs space-y-3 leading-relaxed text-slate-600 dark:text-slate-300">
          {activeTab === 'privacy' ? (
            isVi ? (
              <>
                <div className="font-bold text-slate-800 dark:text-slate-100">1. Không thu thập dữ liệu cá nhân</div>
                <p>
                  Ứng dụng <strong>FuelMate</strong> tôn trọng quyền riêng tư của bạn. Chúng tôi KHÔNG thu thập, lưu trữ hay chia sẻ bất kỳ thông tin cá nhân nào như: Họ tên, số điện thoại, danh bạ, email hay vị trí GPS thời gian thực.
                </p>

                <div className="font-bold text-slate-800 dark:text-slate-100">2. Lưu trữ nội bộ trên thiết bị</div>
                <p>
                  Tất cả các thông tin do bạn nhập như: Danh sách xe tùy chỉnh, lịch sử các chuyến đi đã lưu, và mức giá xăng tự điều chỉnh đều được lưu cục bộ trên bộ nhớ máy (LocalStorage). Bạn có thể xóa dữ liệu này bất kỳ lúc nào bằng nút "Xóa tất cả".
                </p>

                <div className="font-bold text-slate-800 dark:text-slate-100">3. Dịch vụ bên thứ ba (Google AdMob)</div>
                <p>
                  Ứng dụng hiển thị quảng cáo thông qua nền tảng <strong>Google AdMob</strong>. Google có thể sử dụng các mã định danh thiết bị ẩn danh (Advertising ID) để tối ưu hóa hiển thị quảng cáo phù hợp theo chính sách quyền riêng tư của Google. Bạn có thể đặt lại mã nhận dạng quảng cáo trong phần Cài đặt của điện thoại.
                </p>

                <div className="font-bold text-slate-800 dark:text-slate-100">4. Quyền truy cập mạng (INTERNET)</div>
                <p>
                  Ứng dụng chỉ sử dụng quyền truy cập Internet để nạp dữ liệu bảng giá xăng dầu công khai mới nhất và tải quảng cáo AdMob.
                </p>
              </>
            ) : (
              <>
                <div className="font-bold text-slate-800 dark:text-slate-100">1. Zero Personal Data Collection</div>
                <p>
                  <strong>FuelMate</strong> respects your privacy. We do NOT collect, store, or transmit any personal identifiable information, such as your name, contacts, phone number, email, or exact GPS coordinates.
                </p>

                <div className="font-bold text-slate-800 dark:text-slate-100">2. Local Device Storage</div>
                <p>
                  All user inputs, including customized vehicle specifications, calculated trip logs, and manual fuel price adjustments, are stored strictly on your local device (LocalStorage). You maintain full control and can clear this data anytime.
                </p>

                <div className="font-bold text-slate-800 dark:text-slate-100">3. Third-Party Advertising (Google AdMob)</div>
                <p>
                  This application utilizes <strong>Google AdMob</strong> to display advertisements. Google may process non-personalized device identifiers and cookies to serve ads in compliance with Google's Privacy Policy. You can reset your Advertising ID via your device settings.
                </p>

                <div className="font-bold text-slate-800 dark:text-slate-100">4. Network Permissions</div>
                <p>
                  Internet permission is solely required to fetch the latest public benchmark fuel prices and deliver AdMob ad inventory.
                </p>
              </>
            )
          ) : isVi ? (
            <>
              <div className="font-bold text-slate-800 dark:text-slate-100">1. Mục đích tham khảo</div>
              <p>
                <strong>FuelMate</strong> cung cấp công cụ tính toán ước tính chi phí nhiên liệu dựa trên mức tiêu hao công bố của nhà sản xuất và giá xăng dầu tham chiếu tại thời điểm tra cứu.
              </p>

              <div className="font-bold text-slate-800 dark:text-slate-100">2. Giới hạn trách nhiệm</div>
              <p>
                Chi phí thực tế trong chuyến đi của bạn có thể chênh lệch do các yếu tố khách quan: Điều kiện thời tiết, mật độ giao thông, thói quen đạp ga/phanh, tải trọng xe và tình trạng bảo dưỡng phương tiện. Người dùng tự chịu trách nhiệm về các quyết định chi tiêu thực tế.
              </p>

              <div className="font-bold text-slate-800 dark:text-slate-100">3. Bản quyền & Giấy phép</div>
              <p>
                Toàn bộ thiết kế giao diện, logo và mã nguồn thuộc sở hữu của nhà phát triển FuelMate. Người dùng được cấp quyền cài đặt và sử dụng miễn phí cho mục đích cá nhân.
              </p>

              <div className="font-bold text-slate-800 dark:text-slate-100">4. Cập nhật điều khoản</div>
              <p>
                Điều khoản có thể được cập nhật định kỳ để phù hợp với quy định mới của các chợ ứng dụng (Google Play, Samsung Galaxy Store, Xiaomi GetApps).
              </p>
            </>
          ) : (
            <>
              <div className="font-bold text-slate-800 dark:text-slate-100">1. Reference Purpose</div>
              <p>
                <strong>FuelMate</strong> is designed as an estimation utility. Fuel consumption metrics are sourced from official manufacturer test cycles and public retail fuel price feeds.
              </p>

              <div className="font-bold text-slate-800 dark:text-slate-100">2. Disclaimer of Warranties</div>
              <p>
                Actual trip expenditures may vary depending on driving style, traffic conditions, cargo payload, vehicle maintenance, and local station variations. The app is provided on an "as-is" basis without financial warranties.
              </p>

              <div className="font-bold text-slate-800 dark:text-slate-100">3. Intellectual Property</div>
              <p>
                All interface designs, branding, and code are owned by FuelMate developers. Users are granted a personal, non-exclusive license to use the app free of charge.
              </p>

              <div className="font-bold text-slate-800 dark:text-slate-100">4. Terms Modifications</div>
              <p>
                These terms may be updated periodically to align with evolving app store policies and regulatory requirements.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition cursor-pointer shadow-xs"
          >
            {isVi ? 'Đã hiểu' : 'Understood'}
          </button>
        </div>
      </div>
    </div>
  );
};
