# Design Specifications (Bản mô tả thiết kế)

## 1. Màu sắc (Color Palette)
- **Primary Color:** Xanh lá cây (`#4CAF50`) - Tạo cảm giác liên quan đến tiền bạc, tài chính, an toàn và phát triển.
- **Background Color:** Trắng (`#FFFFFF`) và Xám nhạt (`#F5F5F5`) - Giúp giao diện sạch sẽ (clean), làm nổi bật các con số.
- **Danger/Error Color:** Đỏ (`#F44336`) - Dành cho các khoản chi tiêu (trừ tiền) và các thông báo lỗi.
- **Text Color:** Đen (`#212121`) cho tiêu đề chính, Xám đậm (`#757575`) cho các text phụ, ngày tháng.

## 2. Typography (Kiểu chữ)
- **Font Family:** Roboto (hoặc Inter) - Font chữ không chân (sans-serif) dễ đọc, hiện đại.
- **Kích thước:**
  - Header/Số dư tổng: 24sp - 32sp (Bold) - Để người dùng thấy rõ nhất số tiền họ có.
  - Body text (Tên giao dịch): 16sp (Regular).
  - Caption (Thời gian, danh mục): 14sp (Regular) - Tuân thủ WCAG không dùng chữ nhỏ hơn 14sp.

## 3. Khoảng cách & Bố cục (Spacing & Layout)
- **Hệ thống Grid/Spacing:** Dùng bội số của 8 (8px, 16px, 24px, 32px).
- **Padding/Margin cơ bản:** 16px cho lề trái/phải của toàn bộ màn hình.
- **Bo góc (Border Radius):** 12px cho các Card và Nút bấm, tạo cảm giác thân thiện, mềm mại, không quá cứng nhắc.

## 4. Tone & Vibe (Phong cách)
- Minimalist, sạch sẽ, không rườm rà.
- Trực quan: Ưu tiên dùng Icon thay cho chữ (Ví dụ: Icon tô phở cho danh mục Ăn uống).

## 5. Quy tắc Component
- **Nút bấm (Buttons):** Nút hành động chính (Thêm chi tiêu, Lưu) phải phủ nền màu Primary. Kích thước tối thiểu 48x48dp để dễ bấm (Touch target).
- **Trạng thái (States):** Mọi component tương tác phải có đủ trạng thái (Ví dụ: Nút có trạng thái Default, Pressed, Disabled).
