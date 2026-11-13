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
              {isVi ? 'Tuân thủ chính sách Google AdSense, GDPR & An toàn thông tin Web/PWA' : 'Compliant with Google AdSense, GDPR & Web Privacy Standards'}
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
                <div className="font-bold text-slate-800 dark:text-slate-100">1. Quyền riêng tư & Bảo vệ dữ liệu cá nhân</div>
                <p>
                  Ứng dụng web <strong>FuelMate</strong> tôn trọng và cam kết bảo vệ tối đa quyền riêng tư của bạn. Chúng tôi KHÔNG yêu cầu đăng ký tài khoản, KHÔNG thu thập, lưu trữ hay chia sẻ bất kỳ thông tin danh tính cá nhân (PII) nào như họ tên, số điện thoại, danh bạ hay vị trí GPS thời gian thực.
                </p>

                <div className="font-bold text-slate-800 dark:text-slate-100">2. Lưu trữ cục bộ trên trình duyệt (LocalStorage)</div>
                <p>
                  Mọi thông tin do bạn tự nhập như: danh sách xe tùy chỉnh, thông số tiêu hao, và lịch sử các chuyến đi đã tính đều được lưu 100% trong bộ nhớ máy của bạn (LocalStorage). Dữ liệu này không gửi về bất kỳ máy chủ nào và bạn có toàn quyền xóa vĩnh viễn bất kỳ lúc nào.
                </p>

                <div className="font-bold text-slate-800 dark:text-slate-100">3. Quảng cáo Google AdSense & Cookie bên thứ ba</div>
                <p>
                  Trang web sử dụng dịch vụ quảng cáo của <strong>Google AdSense</strong>. Google và các đối tác nhà cung cấp bên thứ ba sử dụng cookie (chẳng hạn như cookie DoubleClick) để phân phát quảng cáo dựa trên các lần truy cập trước đây của bạn vào trang web này hoặc các trang web khác trên Internet.
                </p>
                <p>
                  Bạn có thể tắt tính năng cá nhân hóa quảng cáo bất cứ lúc nào bằng cách truy cập trang{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-500 underline hover:text-amber-400"
                  >
                    Cài đặt quảng cáo của Google
                  </a>{' '}
                  hoặc thông qua{' '}
                  <a
                    href="https://www.aboutads.info"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-500 underline hover:text-amber-400"
                  >
                    aboutads.info
                  </a>.
                </p>

                <div className="font-bold text-slate-800 dark:text-slate-100">4. Kết nối mạng & Dữ liệu giá xăng</div>
                <p>
                  Ứng dụng chỉ sử dụng kết nối mạng Internet để đồng bộ bảng giá xăng dầu công khai mới nhất (từ Petrolimex, Cục Đăng kiểm) và tải các định dạng quảng cáo hợp lệ từ Google AdSense.
                </p>
              </>
            ) : (
              <>
                <div className="font-bold text-slate-800 dark:text-slate-100">1. Zero Personal Data Collection</div>
                <p>
                  <strong>FuelMate</strong> respects your digital privacy. We do NOT require user account registration, nor do we collect, harvest, or store any Personally Identifiable Information (PII) such as names, emails, phone numbers, or real-time GPS locations.
                </p>

                <div className="font-bold text-slate-800 dark:text-slate-100">2. Client-Side Storage (LocalStorage)</div>
                <p>
                  All user inputs, including customized vehicle specifications, calculated expense history, and fuel prices, are stored strictly within your browser's local sandbox (LocalStorage). No trip logs are transmitted to external application servers.
                </p>

                <div className="font-bold text-slate-800 dark:text-slate-100">3. Google AdSense & Third-Party Cookies</div>
                <p>
                  This website displays advertisements served by <strong>Google AdSense</strong>. Google and its partner advertising networks use cookies to serve ads based on your prior visits to this website or other sites across the Web.
                </p>
                <p>
                  You can opt out of personalized advertising by visiting{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-500 underline hover:text-amber-400"
                  >
                    Google Ads Settings
                  </a>{' '}
                  or via{' '}
                  <a
                    href="https://www.aboutads.info"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-500 underline hover:text-amber-400"
                  >
                    aboutads.info
                  </a>.
                </p>

                <div className="font-bold text-slate-800 dark:text-slate-100">4. Network Connectivity</div>
                <p>
                  Internet connectivity is solely employed to retrieve updated public benchmark fuel prices and display approved Google AdSense ad units.
                </p>
              </>
            )
          ) : isVi ? (
            <>
              <div className="font-bold text-slate-800 dark:text-slate-100">1. Mục đích tham khảo & Tính toán ước tính</div>
              <p>
                <strong>FuelMate</strong> cung cấp công cụ tính toán và dự toán chi phí nhiên liệu dựa trên mức tiêu hao công bố của nhà sản xuất (hoặc Cục Đăng kiểm Việt Nam) kết hợp với biểu giá nhiên liệu tham chiếu tại thời điểm sử dụng.
              </p>

              <div className="font-bold text-slate-800 dark:text-slate-100">2. Giới hạn trách nhiệm</div>
              <p>
                Chi phí thực tế trong chuyến đi của bạn có thể dao động tùy theo điều kiện thực tế (thời tiết, tải trọng, tình trạng tắc đường, thói quen tăng giảm tốc và tình trạng bảo dưỡng xe). FuelMate đóng vai trò là công cụ hỗ trợ và không chịu trách nhiệm tài chính cho bất kỳ sai lệch thực tế nào.
              </p>

              <div className="font-bold text-slate-800 dark:text-slate-100">3. Bản quyền & Sở hữu trí tuệ</div>
              <p>
                Toàn bộ thiết kế giao diện, logo, nhãn hiệu và mã nguồn thuộc sở hữu của nhà phát triển FuelMate. Người dùng được tự do truy cập, cài đặt dưới dạng PWA và sử dụng miễn phí cho mục đích cá nhân.
              </p>

              <div className="font-bold text-slate-800 dark:text-slate-100">4. Cập nhật điều khoản</div>
              <p>
                Các điều khoản và chính sách này có thể được cập nhật định kỳ để luôn tuân thủ các quy định hiện hành của Google AdSense và pháp luật liên quan.
              </p>
            </>
          ) : (
            <>
              <div className="font-bold text-slate-800 dark:text-slate-100">1. Informational & Estimation Purpose</div>
              <p>
                <strong>FuelMate</strong> is an estimation calculator that models trip fuel expenses using certified manufacturer specifications and public retail energy price feeds.
              </p>

              <div className="font-bold text-slate-800 dark:text-slate-100">2. Disclaimer of Financial Warranties</div>
              <p>
                Actual travel costs may differ due to traffic bottlenecks, payload weights, driving style, weather conditions, and vehicle mechanical health. The tool is provided "as is" for guidance.
              </p>

              <div className="font-bold text-slate-800 dark:text-slate-100">3. Intellectual Property</div>
              <p>
                All interface assets, logos, and code are the intellectual property of the FuelMate developer. Users enjoy a free, personal, non-exclusive license to use and install this Progressive Web App.
              </p>

              <div className="font-bold text-slate-800 dark:text-slate-100">4. Terms Modifications</div>
              <p>
                These terms and policies may be amended from time to time to stay compliant with Google AdSense guidelines and web regulatory standards.
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
