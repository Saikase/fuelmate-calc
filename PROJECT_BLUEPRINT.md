# FuelMate - Cẩm Nang Thiết Kế, Yêu Cầu Dự Án & Quy Trình Nâng Cấp Ứng Dụng

Tài liệu này lưu trữ toàn bộ **lối đi thiết kế, các yêu cầu & sở thích cốt lõi của chủ dự án**, cấu trúc kỹ thuật và quy trình thao tác nhanh để tiện cho việc nâng cấp, mở rộng và phát hành ứng dụng FuelMate lâu dài.

---

## 1. Thông Tin Tổng Quan Dự Án

* **Tên ứng dụng:** FuelMate - Fuel Cost Calculator (Tính Tiền Xăng Thông Minh)
* **Package Name (Android):** `com.fuelmate.fuelcalc`
* **Phiên bản hiện tại:** `1.0.0` (VersionCode: `1`, VersionName: `"1.0"`)
* **Mô hình kinh doanh:** Kiếm tiền tự động qua Google AdMob (Adaptive Banner, Interstitial, Rewarded Video)
* **Kênh phân phối trọng tâm:** **Samsung Galaxy Store** (`seller.samsungapps.com`) và **Xiaomi GetApps** (`global.developer.mi.com`) — Miễn phí 100%, không cần 20 tester, duyệt nhanh trong 24–48h.
* **Kho mã nguồn GitHub:** [https://github.com/Saikase/fuelmate-calc](https://github.com/Saikase/fuelmate-calc)
* **Đường link chính sách bảo mật công khai (dành cho Store):**  
  [https://github.com/Saikase/fuelmate-calc/blob/main/PRIVACY_POLICY.md](https://github.com/Saikase/fuelmate-calc/blob/main/PRIVACY_POLICY.md)

---

## 2. Triết Lý Thiết Kế & Yêu Cầu Cốt Lõi Của Chủ Dự Án (User Preferences)

Tất cả các đợt cập nhật trong tương lai **bắt buộc phải tuân theo các nguyên tắc đã thống nhất sau**:

### A. Tối Giản, Thực Dụng, Tuyệt Đối Tránh "AI Clichés"
1. **Không icon/emoji lòe loẹt:** Không chèn icon tùy tiện vào nút bấm hoặc tiêu đề để giao diện giữ nét chuyên nghiệp của một công cụ tài chính/di chuyển.
2. **Không huy hiệu rườm rà:** Không để các badge như *"20+ nước"*, *"AI-Powered"*, *"Smart Engine"*.
3. **Nút đổi quốc gia:** Chỉ dùng chữ tối giản: **`Change country`** (tiếng Anh) hoặc **`Đổi quốc gia`** (tiếng Việt).
4. **Không đưa ghi chú kỹ thuật vào giao diện:** Các mục như *"Hướng dẫn xuất bản Store"*, *"Lộ trình AdMob"* chỉ nằm ở tài liệu bên ngoài, tuyệt đối không đưa vào app người dùng cuối.

### B. Kiến Trúc Wizard 3 Bước Tuần Tự (Không cuộn trang dài)
Giao diện chia thành 3 bước độc lập, chuyển bước mượt mà:
* **Bước 1 (Chọn Phương Tiện):**
  - Tab chuyển đổi: **Xe máy (Motorcycles)** / **Ô tô & Bán tải (Cars & Trucks)**.
  - Phân loại rõ ràng từng hãng và từng dòng xe chi tiết tại địa phương (Honda SH 125i/160i/350i, Air Blade, Vision, Lead, Wave, Exciter, Grande Hybrid, Vios, Accent, CX-5, Everest...). Tại Mỹ/quốc tế tự động chuyển sang mô tô Rebel, Ninja, Harley-Davidson, Ford F-150, Silverado, RAV4...
  - Điều chỉnh điều kiện vận hành (-15% đường cao tốc đến +20% kẹt xe/tải nặng).
  - Nút **"+ Thêm xe mới"** có tính năng tìm kiếm thông số trực tuyến mô phỏng.
* **Bước 2 (Quãng Đường & Giá Nhiên Liệu):**
  - **Chỉ sử dụng thanh trượt (slider) và ô nhập cự ly**: Tuyệt đối **không dùng các nút preset chặng mẫu** (*"Đi làm", "Hà Nội - Hải Phòng"...*).
  - Công tắc chuyển đổi: **1 chiều (1-way)** hoặc **Khứ hồi (Round-trip)**.
  - Chọn loại nhiên liệu chuẩn xác (Xăng RON 95, E5 RON 92, Dầu Diesel).
  - Nút **"Sửa giá"** (Adjust Price): Bật pop-up cho phép tài xế chỉnh giá theo cây xăng thực tế tại địa phương nếu có biến động.
* **Bước 3 (Kết Quả Chi Phí & Doanh Thu AdMob):**
  - Hiển thị nổi bật: Tổng tiền theo tiền tệ bản địa (VND, USD, EUR, JPY...), số lít hoặc gallon cần đổ, chi phí bình quân trên mỗi km/mile.
  - Nút **Lưu chuyến đi** (lưu vào bộ nhớ LocalStorage của máy) & nút **Tính chuyến mới**.
  - **Banner AdMob Adaptive**: Neo cố định tại chân trang trên toàn bộ ứng dụng để tối ưu doanh thu.

### C. Đa Ngôn Ngữ & Thích Ứng Đơn Vị Tự Động (100% Đồng Bộ)
* Hỗ trợ 9 ngôn ngữ: `vi`, `en`, `ja`, `ko`, `th`, `de`, `fr`, `es`, `zh`.
* Khi đổi quốc gia:
  - Tự động chuyển đổi ngôn ngữ tương ứng (hoặc tiếng Anh cho các nước quốc tế).
  - Tự động đổi hệ đo lường:
    - **Metric (Việt Nam, Châu Á, Châu Âu):** Đơn vị tính là **`Km`**, dung tích **`Lít (L)`**, định mức **`L/100km`**, giá **`₫/lít`** hoặc **`€/L`**.
    - **Imperial (Mỹ):** Đơn vị tính là **`Miles`**, dung tích **`Gallons (gal)`**, định mức **`MPG`**, giá **`$/gal`**.
  - **Không pha trộn ngôn ngữ (Zero Vietnamese Leakage):** Khi ở chế độ tiếng Anh/quốc tế, 100% chữ phải là tiếng Anh, không sót bất kỳ từ tiếng Việt nào (`/lít`, `Thêm xe`, `Đóng`...).

### D. Tiêu Chuẩn Bản Địa Hóa Toàn Diện Cho Modal Tra Cứu & Thêm Phương Tiện (Bắt Buộc Nhớ)
> [!IMPORTANT]
> **Quy định bất biến chống sót tiếng Việt:** Tuyệt đối không hardcode text tiếng Việt vào bất kỳ nút bấm, tiêu đề hoặc thông báo nào trong `CustomVehicleModal.tsx` và `VehicleSelector.tsx`. Mọi nội dung hiển thị phải đi qua hàm `t(...)` trong `src/i18n/translations.ts` hoặc rẽ nhánh theo `isEnglish`.
>
> **Cụ thể các vị trí thường bị sót đã được chốt chuẩn hóa:**
> 1. **Nút tra cứu:**
>    - Tiếng Việt: `🔍 Tra cứu thông số kỹ thuật (Cục Đăng Kiểm)`
>    - Tiếng Anh: `🔍 Look up official specs (EPA / Registry)`
> 2. **Huy hiệu đã xác thực:**
>    - Tiếng Việt: `✓ Đã xác thực thông số`
>    - Tiếng Anh: `✓ Verified Specs`
> 3. **Nhãn thông số kỹ thuật:**
>    - Mẫu xe kiểm định: `MẪU XE KIỂM ĐỊNH:` ➔ `OFFICIAL MODEL:`
>    - Động cơ: `Động cơ:` ➔ `Engine:`
>    - Nhiên liệu khuyên dùng: `Nhiên liệu khuyên dùng:` ➔ `Recommended fuel:` (và hiển thị đúng tên xăng bản địa như US: `Premium Gasoline (91/93)`, không dùng chữ `RON95` tĩnh).
>    - Nguồn: `🏛️ Nguồn:` ➔ `🏛️ Source:`
> 4. **Trường hợp lệch phiên bản (Variant Mismatch):**
>    - Tiếng Việt: `Không tồn tại phiên bản...` / `Hồ sơ Cục Đăng kiểm không có số hiệu này...` / `Chọn bản này →`
>    - Tiếng Anh: `Variant not found...` / `Official registry / EPA does not have this variant number...` / `Select this model →`
> 5. **Trường hợp không tìm thấy (Not Found):**
>    - Tiếng Việt: `Không tìm thấy thông số cho...` / `Chuỗi ký tự không khớp...`
>    - Tiếng Anh: `No official specs found for...` / `No matching vehicle in official EPA / Registry records...`
> 6. **Form nhập tay thủ công (Manual Entry):**
>    - Tiếng Việt: `📝 Nhập thông số thực tế thủ công:` / `Định mức tiêu hao thực tế:` / `Lưu xe & Áp dụng ngay`
>    - Tiếng Anh: `📝 Enter manual specifications:` / `Real fuel consumption:` / `Save vehicle & Use now`
> 7. **Placeholder ô nhập:**
>    - Phải dùng tiền tố chuẩn: `e.g. Ninja 400, Ducati 821...` thay vì `Ví dụ: ...` khi chuyển sang tiếng Anh.

---

## 3. Kiến Trúc Kỹ Thuật (Tech Stack)

```
[React 19 + TypeScript + Tailwind CSS v4] (Frontend Web UI)
           │
           ▼
[Capacitor 7 Native Wrapper]
           │
           ├─► [Android Native Project (android/)]
           │     ├─ Target SDK 36, Min SDK 24
           │     ├─ Java 17 Temurin Compatibility
           │     ├─ Google AdMob Native SDK (@capacitor-community/admob)
           │     └─ Output: FuelMate-v1.0.apk
           │
           └─► [Automated Fuel Feeds (0đ / tháng)]
                 ├─ scripts/fetch_fuel_prices.mjs
                 ├─ public/fuel_prices.json
                 └─ .github/workflows/update_fuel_prices.yml
```

* **Core Framework:** React 19, TypeScript, Vite 8.
* **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`).
* **Mobile Runtime:** Capacitor 7 (`@capacitor/core`, `@capacitor/android`).
* **Ads Monetization:** `@capacitor-community/admob` kết hợp Google Play Services Ads SDK.
* **Dữ liệu xăng dầu:**
  - File tĩnh: `src/data/countries.ts` (offline baseline).
  - File động online: `public/fuel_prices.json` (tự động nạp qua internet khi app khởi động).

---

## 4. Hệ Thống Tự Động Cập Nhật Giá Xăng (0 VND / Tháng)

* **Script cào dữ liệu:** [`scripts/fetch_fuel_prices.mjs`](file:///D:/Work/Admob%20ki%E1%BA%BFm%20c%C6%A1m/scripts/fetch_fuel_prices.mjs).
  - Tự động lấy giá xăng Petrolimex Việt Nam (RON 95-III, E5 RON 92, DO 0.05S) từ các cổng công khai (`giacahomnay.vn`, `webgia.com`).
  - Lấy giá xăng 22+ quốc gia tham chiếu theo `GlobalPetrolPrices` và `U.S. EIA`.
  - Xuất ra file chuẩn hóa: `public/fuel_prices.json`.
* **Lịch trình GitHub Actions:** [`.github/workflows/update_fuel_prices.yml`](file:///D:/Work/Admob%20ki%E1%BA%BFm%20c%C6%A1m/.github/workflows/update_fuel_prices.yml).
  - Chạy lúc **15:05 GMT+7 thứ Năm hàng tuần** (kỳ điều hành giá xăng dầu Việt Nam).
  - Chạy lúc **07:00 GMT+7 thứ Hai hàng tuần** (chu kỳ giá dầu thế giới).
* **Hiệu quả:** Người dùng mở app trên điện thoại luôn có giá mới nhất mà **bạn không cần phải build hay cập nhật lại app lên Store**.

---

## 5. Nhận Diện Thương Hiệu & Bộ Icon Ứng Dụng (Production Icon Assets)

* **Concept được chọn chính thức:** **Concept 3 - Minimalist Fuel Coin** (Giọt xăng 3D tối giản kết hợp đồng xu tiết kiệm).
* **Tone màu:** Nền xanh đen Midnight Slate (`#0B0F19` - `#0F172A`), biểu tượng giọt nhiên liệu vàng hổ phách 3D (`#FEF08A` -> `#F59E0B` -> `#EA580C`), vết cắt đồng xu tài chính vàng kim (`#FDE68A`).
* **Đặc tính kỹ thuật:** Thiết kế tuân thủ nghiêm ngặt **Safe Zone 80%**, đảm bảo khi hiển thị trên Samsung One UI và Xiaomi HyperOS hay Pixel Launcher không bị cắt phạm vi biểu tượng.
* **Tài nguyên ảnh xuất xưởng:**
  - **Master Store Icon (512x512 px):** [`store_icon_512.png`](file:///D:/Work/Admob%20ki%E1%BA%BFm%20c%C6%A1m/store_icon_512.png) (nằm ngay thư mục gốc dự án, sẵn sàng kéo thả upload lên Samsung Seller Portal và Xiaomi Developer Console).
  - **Android Adaptive & Legacy Icons:** Được tạo tự động vào `android/app/src/main/res/` cho toàn bộ 5 mật độ phân giải (`mdpi`, `hdpi`, `xhdpi`, `xxhdpi`, `xxxhdpi`):
    - `ic_launcher.png` (Squircle)
    - `ic_launcher_round.png` (Circle)
    - `ic_launcher_foreground.png` (Adaptive Foreground)
    - `ic_launcher_background.xml` (`#0F172A`)
  - **Web Favicon & Apple Touch Icon:** `public/favicon.png`, `public/apple-touch-icon.png`, `public/icon_master.svg`.
* **Lệnh tái tạo toàn bộ icon một chạm:**
  ```powershell
  npm run icons
  ```

---

## 6. Quy Trình Cập Nhật & Đóng Gói Lại Ứng Dụng (Quick Maintenance Cheatsheet)

Mỗi khi bạn muốn sửa đổi code, thêm mẫu xe hoặc đổi giao diện:

### Bước 1: Khởi động môi trường xem trước (Dev Server)
```powershell
npm run dev
# Mở trình duyệt tại: http://localhost:5173/
```

### Bước 2: Build mã nguồn web và đồng bộ sang Android
```powershell
npm run build
npx cap sync android
```

### Bước 3: Đảm bảo tương thích Java 17 cho Capacitor
Kiểm tra file `android/app/capacitor.build.gradle`, đảm bảo `compileOptions` là Java 17:
```groovy
android {
  compileOptions {
      sourceCompatibility JavaVersion.VERSION_17
      targetCompatibility JavaVersion.VERSION_17
  }
}
```

### Bước 4: Biên dịch file cài đặt Android APK
Chạy lệnh Gradle trong thư mục `android`:
```powershell
cd android
java -jar .\gradle\wrapper\gradle-wrapper.jar assembleDebug
cd ..
copy android\app\build\outputs\apk\debug\app-debug.apk FuelMate-v1.0.apk
```
👉 File APK mới sẽ nằm ngay tại: **`D:\Work\Admob kiếm cơm\FuelMate-v1.0.apk`** sẵn sàng kéo thả vào Zalo.

### Bước 5: Đẩy mã nguồn lưu trữ lên GitHub
```powershell
git add .
git commit -m "feat: nội dung cập nhật mới"
git push origin main
```

---

## 6. Checklist Khi Đăng Tải Lên Samsung Galaxy Store & Xiaomi GetApps

1. **File APK nộp duyệt:** [`FuelMate-v1.0.apk`](file:///D:/Work/Admob%20ki%E1%BA%BFm%20c%C6%A1m/FuelMate-v1.0.apk).
2. **Package Name:** `com.fuelmate.fuelcalc`.
3. **Kiểm tra độ sạch bản địa hóa (Zero Vietnamese Leak):** Chuyển app sang cờ Mỹ (US/English), mở thử Modal Thêm phương tiện mới (`+ Add vehicle`), tra cứu thử 1 xe bất kỳ để bảo đảm 100% tiếng Anh không lọt bất kỳ chuỗi tiếng Việt nào.
4. **Mục Privacy Policy URL:** Điền đường link:  
   `https://github.com/Saikase/fuelmate-calc/blob/main/PRIVACY_POLICY.md`
5. **Mục Quảng Cáo (Ad Declaration):** Chọn *"Yes, this app contains ads"*.
6. **Kích hoạt tiền AdMob:** Khi app được Samsung/Xiaomi duyệt, vào [AdMob Console](https://apps.admob.com/) > Apps > Liên kết kho ứng dụng > Dán link app trên Store vào để bắt đầu nhận doanh thu quảng cáo thật.
