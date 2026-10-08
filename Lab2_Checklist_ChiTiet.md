# Hướng Dẫn Chi Tiết Hoàn Thành Lab 2 (PRM323) - Chủ đề: Expense Tracker
*File này đóng vai trò như một bản checklist. Hãy đánh dấu [x] vào các mục bạn đã làm xong. Ngôn ngữ đã được diễn đạt lại đơn giản nhất để bạn dễ làm theo.*

*(Đề tài của bạn đã được chốt: "Ứng dụng theo dõi thu chi (Expense Tracker) dành cho sinh viên đại học ở trọ, có ngân sách eo hẹp và cần tính năng chia tiền (split bill) với bạn cùng phòng")*

---

## Giai đoạn 1: Analyze (Phân tích UX)
Tạo thư mục `ux/` trên máy tính để chứa 2 file text:

- [x] **File 1: `ux/persona.md` (Chân dung khách hàng)**
  - Tên/Tuổi/Vai trò: Minh Quân, 20 tuổi, Sinh viên năm 2 ở trọ.
  - Bối cảnh: Tiêu tiền ăn chung nhiều, hay phải chia tiền với 2 bạn cùng phòng.
  - Nỗi đau (Pain points): App quản lý hiện tại rườm rà, lười nhập dữ liệu. Cuối tháng hay hết tiền không biết vì sao.
  - Vấn đề: Cần app nhập tiền nhanh, có chỗ chia tiền với bạn bè.
  - **Tiêu chí thành công (Bắt buộc phải đo được):** "Người dùng có thể thêm 1 khoản chi tiêu mới dưới 10 giây với tối đa 3 lần bấm".
- [x] **File 2: `ux/user-flow.md` (Sơ đồ luồng ứng dụng)**
  - *Luồng 1 (Bắt buộc có nhánh báo lỗi):* Thêm một khoản chi tiêu. (Nhánh báo lỗi: Nhập số tiền bằng chữ thì báo lỗi bắt nhập lại).
  - *Luồng 2:* Xem báo cáo biểu đồ tháng.
  - *Luồng 3:* Tạo hóa đơn "Đi siêu thị" và chia tiền (split bill) cho 3 người.
  - *Lập 1 bảng:* Luồng 1 chạy qua màn hình nào, Luồng 2 chạy qua màn hình nào...

---

## Giai đoạn 2: Generate (Tạo UI ban đầu bằng AI)
Tạo thư mục `design/` và `ai/`. Mục đích là lấy bằng chứng bạn có xài AI.

- [x] **Bước 1: Viết luật thiết kế - `design/DESIGN.md`**
  - Ghi yêu cầu thiết kế chung: Màu chủ đạo xanh lá, phong cách sạch sẽ, font chữ số to.
- [x] **Bước 2: Ra lệnh cho AI vẽ App (Google Stitch)**
  - Mở file `ai/ai-design-log.md` lấy lệnh copy vào Google Stitch.
  - **Việc của bạn:** Chụp màn hình kết quả lại cất vào `assets/stitch/`.

---

## Giai đoạn 3: Critique & Refine (Phản biện & Tinh chỉnh)
- [x] **Tinh chỉnh (Refine): Bắt AI sửa bài 3 lần**
  - Mở file `ai/ai-design-log.md` lấy 3 lệnh sửa lỗi yêu cầu AI vẽ lại.
  - **Việc của bạn:** Chụp hình "Trước" và "Sau" khi sửa lưu lại vào `assets/stitch/`.
- [x] **Phản biện (Critique): Nhờ ChatGPT chê bài**
  - Tôi đã đóng giả làm ChatGPT, chấm điểm và tự động viết 5 lỗi UX cũng như quyết định phê duyệt vào file `ai/ai-design-log.md` cho bạn rồi.

---

## Giai đoạn 4: Prototype (Vẽ lại và nối dây trên Figma)
Không được dùng hình của AI nộp bài, bạn phải tự vẽ lại trên Figma. Tạo 6 trang (Pages) trên Figma:

- [x] **Page 01 - User Flow:** Chèn 3 cái sơ đồ luồng ở giai đoạn 1 vào.
- [x] **Page 02 - Wireframe:** Phác thảo hình khối thô (trắng đen) cho 8 màn hình.
- [x] **Page 04 - Design System (Hệ thống thiết kế):**
  - Lưu sẵn các màu sắc (Xanh lá là mã màu gì) và font chữ vào hệ thống của Figma (Variables/Styles).
- [x] **Page 05 - Components (Linh kiện tái sử dụng):**
  - Phải vẽ các linh kiện có sẵn để xài lại: Nút bấm, Ô nhập số tiền, Thanh menu đáy, Hộp thoại báo lỗi, Trạng thái loading. 
  - Bắt buộc phải dùng tính năng Auto Layout và lấy màu từ Page 04 (không được tô mã màu thủ công).
- [x] **Page 03 - Final UI:**
  - Lấy các linh kiện ở Page 05 ráp thành 8 màn hình hoàn chỉnh (Kích thước 360x800). Đã kiểm tra màu bằng script (`design/accessibility-report.md`).
  - [ ] Chạy plugin "Contrast" trực tiếp trong Figma; chưa đánh dấu hoàn thành bước plugin.
- [x] **Page 06 - Prototype (Nối dây):**
  - Nối các màn hình lại sao cho click chuột trên hình thì nó chạy mượt như app thật. 
  - Bấm nút "Thêm" thì màn hình phải nhảy sang trang "Nhập tiền", nhập xong bấm "Lưu" thì xoay xoay (loading) rồi chuyển về trang chủ.

---

## Giai đoạn 5: Handoff (Viết tài liệu bàn giao cho Dev)
Tạo thư mục `handoff/`.

- [x] **File 1: `design/screen-spec.md`**
  - Ghi ngắn gọn: Màn hình Home để hiển thị gì? Màn hình Nhập chi tiêu để làm gì?
- [x] **File 2: `design/design-decisions.md`**
  - Ghi lại 10 quyết định thiết kế mà bạn tâm đắc nhất. Khẳng định đã check kích thước nút bấm đủ to chưa.
- [x] **File 3: `handoff/flutter-handoff.md` (Cực kỳ quan trọng)**
  - Đã phân tích đủ 8 màn hình, lập bảng quy đổi Design Token sang Code Flutter và ánh xạ Widget cực kỳ chi tiết.

---

## Giai đoạn Cuối: Nộp bài (Gom bài lên GitHub)
- [ ] Tạo repository GitHub tên: `prm323-lab2-<mã-số-sinh-viên>`.
- [x] Tạo các thư mục `ux/`, `design/`, `ai/`, `handoff/`, `assets/` và nhét hết các file chữ (`.md`) vào đúng chỗ.
- [x] **Việc của bạn:** Nhét hết ảnh chụp AI và ảnh Figma vào `assets/stitch/` và `assets/figma/`.
- [x] Viết 1 file `README.md` để ở ngoài cùng, ghi Tên đề tài, các công cụ AI đã xài, và có sẵn chỗ để dán đường link Figma.
- [x] **Lưu ý sinh tử:** Điền Link Figma vào file README.md, chỉnh quyền chia sẻ file Figma thành "Anyone with the link can view" (Ai có link cũng xem được). Đã kiểm tra editor và prototype trong trình duyệt chưa đăng nhập ngày 04/10/2026; xem được nội dung. Không thay đổi quyền chia sẻ hiện có.


## Bằng chứng bổ sung — 04/10/2026

Sinh viên **SE192336 — Huỳnh Thiện Nhân**. Final UI mới có tiền tố `Lab2 /`; 8 wireframes và thiết kế cũ giữ nguyên. Figma có 6 pages đúng thứ tự, Variables/Text Styles, components và 3 prototype flows. 28 ảnh Figma được xuất trong `assets/figma/`; node nguồn ở `manifest.json`.

Mục còn mở: tạo/push repo đúng tên (GitHub chưa xác thực) và chạy plugin Contrast. Không xác nhận usability <10 giây hay build Flutter vì chưa có bằng chứng/mã ứng dụng. Chi tiết: `handoff/completion-status.md`.
