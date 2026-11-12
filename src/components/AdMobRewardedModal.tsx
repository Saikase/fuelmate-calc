import React, { useState, useEffect } from 'react';
import { Gift, X, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdMobRewardedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdMobRewardedModal: React.FC<AdMobRewardedModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [adState, setAdState] = useState<'prompt' | 'watching' | 'rewarded'>('prompt');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer: any;
    if (adState === 'watching' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (adState === 'watching' && countdown === 0) {
      setAdState('rewarded');
      confetti({ particleCount: 70, spread: 80 });
    }
    return () => clearInterval(timer);
  }, [adState, countdown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-5 relative shadow-2xl overflow-hidden">
        {/* Close button */}
        {adState !== 'watching' && (
          <button
            onClick={() => {
              setAdState('prompt');
              setCountdown(5);
              onClose();
            }}
            className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* State 1: Prompt */}
        {adState === 'prompt' && (
          <div className="text-center py-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3 border border-amber-500/30">
              <Gift className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-white mb-1">Mở khóa Mẹo Tiết Kiệm 20% Xăng</h3>
            <p className="text-xs text-slate-400 mb-4 px-2">
              Xem 1 video quảng cáo ngắn (5 giây) để mở khóa cẩm nang 5 mẹo chạy xe tiết kiệm xăng được kiểm chứng thực tế!
            </p>

            <div className="bg-slate-950/70 rounded-xl p-2.5 border border-slate-800 text-[11px] text-amber-400/90 mb-4 font-mono">
              💡 Đây là mô phỏng <strong>AdMob Rewarded Video</strong> — định dạng quảng cáo có giá thầu (eCPM) cao nhất trên AdMob!
            </div>

            <button
              onClick={() => {
                setAdState('watching');
                setCountdown(5);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Xem Video Nhận Quà (5s)</span>
            </button>
          </div>
        )}

        {/* State 2: Watching Simulation */}
        {adState === 'watching' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full border-4 border-amber-500 border-t-transparent animate-spin mx-auto mb-4" />
            
            <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30 mb-2">
              Quảng cáo sẽ thưởng sau: {countdown}s
            </div>

            <h4 className="text-white font-bold text-sm">Game 3D Siêu Đỉnh: Chiến Thần Tốc Độ</h4>
            <p className="text-xs text-slate-400 mt-1">
              Đang giả lập hiển thị AdMob Rewarded Video... Vui lòng không đóng màn hình.
            </p>
          </div>
        )}

        {/* State 3: Rewarded Tips Revealed */}
        {adState === 'rewarded' && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Đã Mở Khóa Thành Công!</h4>
                <p className="text-[10px] text-emerald-400 font-medium">Bạn đã nhận phần thưởng</p>
              </div>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 text-xs">
                <span className="font-bold text-amber-400">1. Giữ đều tay ga (40-50 km/h):</span>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Thói quen thốc ga đột ngột và phanh gấp làm xe ngốn thêm tới 25% lượng xăng.
                </p>
              </div>

              <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 text-xs">
                <span className="font-bold text-amber-400">2. Áp suất lốp xe chuẩn:</span>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Lốp non hơi làm tăng ma sát mặt đường, khiến xe máy tốn thêm 5-10% xăng và máy mau nóng.
                </p>
              </div>

              <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 text-xs">
                <span className="font-bold text-amber-400">3. Đổ xăng vào sáng sớm hoặc chiều mát:</span>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Xăng dãn nở theo nhiệt độ. Lúc trời mát mật độ xăng đặc hơn, bạn sẽ nhận được nhiều nhiên liệu hơn cùng số tiền.
                </p>
              </div>

              <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 text-xs">
                <span className="font-bold text-amber-400">4. Tắt máy khi dừng đèn đỏ &gt; 25 giây:</span>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Xe tay ga có chế độ Idling Stop giúp tiết kiệm đáng kể khi đi trong các đô thị lớn kẹt xe.
                </p>
              </div>

              <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 text-xs">
                <span className="font-bold text-amber-400">5. Thay nhớt & lọc gió định kỳ:</span>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Lọc gió bẩn làm nghẽn khí nạp khiến hỗn hợp cháy dư xăng, máy yếu và khói đen.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setAdState('prompt');
                onClose();
              }}
              className="w-full mt-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
            >
              Đóng lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
