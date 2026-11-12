# FuelMate - Cẩm Nang & Hướng Dẫn Tải App Lên App Store
*(Dành cho Samsung Galaxy Store & Xiaomi GetApps)*

Thư mục `HA&HD` này chứa **toàn bộ tài nguyên hoàn thiện 100%** (file APK release đã ký, biểu tượng 512x512 px, bộ ảnh chụp màn hình chuẩn Store và cẩm nang hướng dẫn) để bạn có thể mở các cổng nhà phát triển và đăng tải ứng dụng lên Store trong vòng 15–20 phút.

---

## 📁 1. Danh Mục Tài Nguyên Trong Thư Mục `HA&HD`

| Tên Tệp / Thư Mục | Định Dạng | Mô Tả & Mục Đích Sử Dụng |
| :--- | :--- | :--- |
| **`FuelMate-v1.0.apk`** | Android APK | **File cài đặt ứng dụng chính thức** (Release signed với Keystore, dung lượng ~9.35 MB, Target SDK 36, Min SDK 24). Dùng để upload trực tiếp lên Store. |
| **`store_icon_512.png`** | PNG (512x512) | **Biểu tượng ứng dụng Store Master** (Concept đồng xu & giọt nhiên liệu 3D, nền Midnight Slate, chuẩn 32-bit không trong suốt, Safe Zone 80%). |
| **`screenshots/`** | Thư mục ảnh | **Bộ 6 ảnh chụp màn hình marketing chuẩn tỉ lệ smartphone (412 × 915 px)** thể hiện trọn vẹn các tính năng đột phá của FuelMate. |
| **`HUONG_DAN_UP_APP_STORE.md`** | Markdown | Tài liệu hướng dẫn thao tác từng bước này. |

---

## 📋 2. Thông Tin Ứng Dụng (Metadata Chuẩn Cho Store)

Bạn chỉ cần sao chép (copy) các thông tin dưới đây và dán trực tiếp vào các ô tương ứng trên cổng nhà phát triển:

### A. Thông Tin Kỹ Thuật (App Identification)
* **Tên ứng dụng (App Name):** `FuelMate - Tính Tiền Xăng Thông Minh`
* **Tên tiếng Anh (International Name):** `FuelMate - Fuel & EV Cost Calculator`
* **Package Name:** `com.fuelmate.fuelcalc`
* **Version Code:** `1`
* **Version Name:** `1.0`
* **Chính sách bảo mật công khai (Privacy Policy URL):**  
  `https://github.com/Saikase/fuelmate-calc/blob/main/PRIVACY_POLICY.md`
* **Email liên hệ hỗ trợ (Support Email):** `vi.nguyenoagami@hcmut.edu.vn` (hoặc email của bạn)
* **Phân loại nội dung (Content Rating):** `3+` (Mọi lứa tuổi / Everyone - Không chứa nội dung nhạy cảm)
* **Khai báo quảng cáo (Contains Ads):** **Có (Yes)** — Ứng dụng có tích hợp Google AdMob.

---

### B. Tiêu Đề Ngắn (Short Description / Promo Text - Tối đa 80 ký tự)
* **Tiếng Việt:**  
  `Tính tiền xăng & xe điện thông minh, tra cứu định mức Cục Đăng kiểm & lịch xài xăng`
* **Tiếng Anh (English):**  
  `Smart fuel & EV charging cost calculator, official registry specs & expense log`

---

### C. Mô Tả Chi Tiết (Full Description)

#### Bản Tiếng Việt:
```text
FuelMate là ứng dụng tính tiền xăng và chi phí sạc xe điện thông minh, tiện lợi và chính xác hàng đầu hiện nay. Được thiết kế tối giản, trực quan và chuẩn hóa theo biểu phí công khai, FuelMate giúp tài xế xe máy, ô tô và xe điện lập dự toán chuyến đi, kiểm soát ngân sách nhiên liệu và theo dõi chi tiêu hàng tháng dễ dàng.

CÁC TÍNH NĂNG VƯỢT TRỘI:

1. HẠM ĐỘI PHƯƠNG TIỆN PHONG PHÚ:
- Hơn 50+ dòng xe máy và ô tô phổ biến nhất tại Việt Nam (Honda SH, Air Blade, Vision, Wave, Exciter, Grande Hybrid, Toyota Vios, Accent, Mazda CX-5, Ford Ranger...).
- Đầy đủ thông số dung tích động cơ và loại nhiên liệu khuyến nghị (RON 95, E5 RON 92, Diesel).

2. CHUYÊN BIỆT CHO XE ĐIỆN (EV) & BIỂU PHÍ SẠC CÔNG KHAI:
- Tích hợp trọn vẹn hạm đội xe điện VinFast (VF 3, VF 5 Plus, VF 6, VF 7, VF 8, VF 9, xe máy điện Evo 200, Feliz S, Klara S, Dat Bike Quantum...) cùng các mẫu xe toàn cầu (Tesla Model 3, Model Y, BYD, Hyundai Ioniq 5...).
- Áp dụng biểu phí sạc điện công khai chuẩn xác: Trạm sạc nhanh V-GREEN (3.858 ₫/kWh) và Sạc tại nhà EVN (2.600 ₫/kWh).
- Đơn vị tính kWh/100km và bảng so sánh tiết kiệm năng lượng hơn 70% so với xe xăng truyền thống.

3. TRA CỨU ĐỊNH MỨC KỸ THUẬT CÔNG KHAI (CỤC ĐĂNG KIỂM & US EPA):
- Dễ dàng thêm xe mới chỉ với tên xe: Hệ thống tự động truy xuất định mức tiêu thụ nhiên liệu công khai đã kiểm định.
- Cơ chế nhận diện thông minh: Bác bỏ số hiệu ảo, tự động đề xuất phiên bản gốc và kiểm tra tương thích hãng sản xuất nghiêm ngặt.

4. CẬP NHẬT GIÁ XĂNG DẦU TỰ ĐỘNG (PETROLIMEX & THẾ GIỚI):
- Tự động nạp giá xăng dầu Petrolimex mới nhất (RON 95-III, E5 RON 92, DO 0.05S) mà không cần cập nhật ứng dụng.
- Cho phép tài xế linh hoạt sửa giá theo đúng cây xăng thực tế tại địa phương.

5. QUẢN LÝ CHUYẾN ĐI & LỊCH XÀI XĂNG THEO THÁNG:
- Tự động cộng dồn tổng chi phí, quãng đường và số lít xăng/kWh của các chuyến đi gần nhất.
- Lưới lịch xài xăng trực quan: Lưu trữ vĩnh viễn số tiền đã chi theo từng ngày và từng tháng, giúp bạn so sánh và đối soát ngân sách xe cộ qua thời gian.
- Tự động dọn dẹp lịch sử chi tiết sau 30 ngày để ứng dụng luôn nhẹ và mượt mà.

6. HỖ TRỢ 22 QUỐC GIA & 9 NGÔN NGỮ:
- Tự động đổi hệ đơn vị Km / Lít (Metric) sang Miles / Gallon MPG (Imperial) khi sang các quốc gia khác.
- Giao diện Dark Mode sang trọng, không cần tạo tài khoản, bảo vệ tuyệt đối dữ liệu người dùng.
```

#### Bản Tiếng Anh (English):
```text
FuelMate is the smart, all-in-one trip fuel and electric vehicle (EV) charging cost calculator designed for motorists worldwide. With verified fuel economy data and official public energy rates, FuelMate helps you plan your journeys and track monthly travel expenses with pinpoint accuracy.

KEY FEATURES:

1. EXTENSIVE VEHICLE FLEET:
- Covers dozens of popular motorcycles, sedans, SUVs, and pickup trucks across global and local markets.
- Accurate fuel requirements: Premium Gasoline, Regular Octane, and Diesel.

2. COMPREHENSIVE ELECTRIC VEHICLE (EV) SUITE:
- Full fleet coverage: VinFast VF series (VF 3, VF 5, VF 8...), Tesla (Model 3, Model Y, Cybertruck), BYD, Hyundai Ioniq 5, and electric motorbikes.
- Built-in authentic public charging tariffs: Public Fast Charging (Tesla Supercharger, V-GREEN) and Residential Home Charging rates.
- Clear energy consumption in kWh/100km (or kWh/100mi) with eco-cost comparison showing up to 70% savings over gas.

3. OFFICIAL REGISTRY & US EPA SPEC LOOKUP:
- Add custom vehicles by typing their name: Auto-retrieves certified public fuel economy and battery specifications.
- Smart variant mismatch detection with official suggestions.

4. REAL-TIME FUEL PRICES:
- Synchronized fuel rates across 22+ countries.
- Custom price adjustment for local station variances.

5. TRIP LOG & INTERACTIVE MONTHLY FUEL CALENDAR:
- Auto-consolidates total travel spending, distance, and fuel volume.
- Interactive calendar grid tracks daily fuel purchases and monthly expense history.
- Auto-archives detailed trips older than 30 days to keep the app blazing fast.

6. GLOBAL COMPATIBILITY:
- Seamless switching between Metric (km, L, L/100km) and Imperial (miles, gallons, MPG).
- 9 supported languages with zero privacy intrusion—no login required, 100% offline-ready.
```

### D. Từ Khóa Tìm Kiếm (Keywords / Tags)
`tính tiền xăng, fuel calculator, tiền xăng, giá xăng hôm nay, trạm sạc xe điện, vgreen, xe điện ev, vinfast vf3, định mức xăng, cục đăng kiểm, xăng dầu petrolimex, gas trip calculator, ev charging cost`

---

## 🚀 3. Hướng Dẫn Từng Bước Đăng Tải Lên Samsung Galaxy Store

Samsung Galaxy Store (`seller.samsungapps.com`) miễn phí 100%, không yêu cầu 20 tester như Google Play, và xét duyệt tự động rất nhanh (24–48 giờ).

### Bước 1: Đăng nhập Cổng Nhà Phát Triển Samsung
1. Truy cập: [https://seller.samsungapps.com/](https://seller.samsungapps.com/)
2. Đăng nhập bằng tài khoản Samsung của bạn (nếu chưa có thì đăng ký tài khoản miễn phí).

### Bước 2: Tạo Ứng Dụng Mới
1. Tại bảng điều khiển chính, nhấn nút **`Add New Application`** (hoặc `Thêm ứng dụng mới`).
2. Chọn loại ứng dụng: **`Android`**.
3. Chọn ngôn ngữ mặc định: **`Vietnamese`** (hoặc `English (US)` nếu hướng quốc tế).

### Bước 3: Điền Thông Tin Ứng Dụng (App Information)
1. **App Title:** Dán tên `FuelMate - Tính Tiền Xăng Thông Minh`.
2. **Category (Thể loại):** Chọn `Tools` (Công cụ) hoặc `Productivity` (Năng suất).
3. **Age Restriction (Độ tuổi):** Chọn `General Audience / 3+` (Mọi lứa tuổi).
4. **Description (Mô tả):** Dán đoạn mô tả chi tiết ở Mục 2.C ở trên.
5. **Privacy Policy:** Dán URL:  
   `https://github.com/Saikase/fuelmate-calc/blob/main/PRIVACY_POLICY.md`

### Bước 4: Tải Lên Biểu Tượng & Ảnh Chụp Màn Hình (Visual Assets)
1. **Icon:** Kéo thả tệp **`HA&HD/store_icon_512.png`** vào ô Icon (512 × 512 px).
2. **Screenshots:** Vào thư mục **`HA&HD/screenshots/`**, chọn từ 4 đến 6 ảnh chụp màn hình tải lên ô `Phone Screenshots`.

### Bước 5: Tải Lên File Cài Đặt (Binary Upload)
1. Chuyển sang thẻ **`Binary`** (hoặc `App Files`).
2. Nhấn **`Add Binary`** -> Kéo thả tệp **`HA&HD/FuelMate-v1.0.apk`** vào.
3. Hệ thống sẽ tự động đọc: Package `com.fuelmate.fuelcalc`, Target SDK 36, Version 1.0.

### Bước 6: Khai Báo Quảng Cáo & Phân Phối
1. **Contains Ads:** Chọn **`Yes`** (Ứng dụng có quảng cáo AdMob).
2. **Price:** Chọn **`Free`** (Miễn phí 100%).
3. **Country / Region:** Chọn **`All Countries`** (hoặc chọn Việt Nam và các thị trường trọng điểm).

### Bước 7: Nộp Đơn Xét Duyệt (Submit)
1. Rà soát lại một lượt các mục có dấu tích xanh.
2. Nhấn nút **`Submit`** ở góc trên cùng bên phải.
3. Ứng dụng sẽ chuyển sang trạng thái *Under Review* và xuất hiện trên Store sau 24–48 giờ!

---

## 📱 4. Hướng Dẫn Từng Bước Đăng Tải Lên Xiaomi GetApps

Xiaomi GetApps (`global.developer.mi.com`) là kho ứng dụng mặc định trên tất cả điện thoại Xiaomi, Redmi, POCO với hàng trăm triệu người dùng trên toàn cầu.

### Bước 1: Đăng nhập Cổng Nhà Phát Triển Xiaomi
1. Truy cập: [https://global.developer.mi.com/](https://global.developer.mi.com/)
2. Đăng nhập bằng tài khoản Mi Account (hoặc đăng ký tài khoản Developer miễn phí).

### Bước 2: Tạo Ứng Dụng Mới
1. Vào menu **`App Manage`** -> Chọn **`Create App`**.
2. Chọn loại: **`Phone App`**.
3. Điền **App Name**: `FuelMate - Tính Tiền Xăng Thông Minh`.
4. Điền **Package Name**: `com.fuelmate.fuelcalc`.

### Bước 3: Tải Lên File APK
1. Nhấn **`Upload APK`**.
2. Chọn tệp **`HA&HD/FuelMate-v1.0.apk`**.
3. Cổng sẽ tự động phân tích và xác nhận chữ ký số cùng quyền truy cập hợp lệ.

### Bước 4: Cập Nhật Thông Tin & Đồ Họa
1. **App Icon:** Tải lên tệp **`HA&HD/store_icon_512.png`**.
2. **Screenshots:** Tải lên các ảnh từ thư mục **`HA&HD/screenshots/`** (tối thiểu 3 ảnh).
3. **Category:** Chọn `Tools` hoặc `Automotive`.
4. **Description:** Dán mô tả chi tiết ở Mục 2.C.
5. **Privacy Policy Link:** Dán link GitHub:  
   `https://github.com/Saikase/fuelmate-calc/blob/main/PRIVACY_POLICY.md`

### Bước 5: Khai Báo Bản Quyền & Nộp Xét Duyệt
1. Tại phần Ad Declaration: Chọn **`Contains Ads`**.
2. Nhấn **`Submit for Review`**. Xiaomi GetApps thường duyệt trong vòng 24–36 giờ.

---

## 💡 5. Các Mẹo Quan Trọng Giúp Ứng Dụng Được Duyệt Ngay Lần Đầu

1. **Link Privacy Policy bắt buộc phải mở được:** Đường link GitHub đã được cấu hình công khai và tuân thủ đúng chuẩn GDPR, CCPA và chính sách Google/Samsung/Xiaomi.
2. **Khai báo có quảng cáo:** Vì FuelMate có tích hợp Google AdMob Adaptive Banner ở chân trang, bạn **bắt buộc chọn "Yes"** ở mục hỏi quảng cáo để không bị từ chối do thiếu trung thực.
3. **Cập nhật giá xăng tự động:** Nhờ có GitHub Actions chạy ngầm định kỳ hàng tuần, người dùng mở app sẽ luôn có giá xăng mới nhất từ Petrolimex mà bạn **không bao giờ phải build lại app hay up bản mới** chỉ vì giá xăng đổi.

---
*Chúc bạn phát hành FuelMate thành công và tối ưu nguồn doanh thu thụ động bền vững từ Google AdMob!*
