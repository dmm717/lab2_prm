# Kiểm tra accessibility — 04/10/2026

Đo các cặp màu nội dung dùng trong bộ final mới bằng relative luminance sRGB. Đây là kiểm tra tính toán theo tokens, **không phải kết quả chạy plugin Contrast**, không chứng minh toàn bộ ứng dụng đạt WCAG.

| Vai trò | Chữ | Nền | Tỷ lệ | AA chữ thường ≥4,5:1 |
|---|---|---|---|---|
| CTA/menu selected | #FFFFFF | #006C49 | 6.48:1 | Pass |
| Chữ chính trên thẻ | #131B2E | #FFFFFF | 17.16:1 | Pass |
| Chữ trên nền | #131B2E | #FAF8FF | 16.29:1 | Pass |
| Chữ phụ trên thẻ | #52625C | #FFFFFF | 6.44:1 | Pass |
| Chữ phụ trên nền xanh | #52625C | #E8F7EF | 5.82:1 | Pass |
| Khoản chi | #BA1A1A | #FFFFFF | 6.46:1 | Pass |
| Thông báo lỗi | #BA1A1A | #FFDAD6 | 5.00:1 | Pass |
| Feedback thành công | #006C49 | #E8F7EF | 5.86:1 | Pass |

- Audit Figma: 8 final screens 360×800, 29 prototype frames 360×800, 89 navigation reactions, 3 starting points.
- 39 foundation variables + 2 prototype variables; 6 Inter text styles, nhỏ nhất 14px.
- Prototype audit: chữ nội dung ≥14px và không vượt vùng content. Label tab bar iOS giữ 11px như Final UI Overview theo yêu cầu người dùng; ngoại lệ được ghi trong audit. Các frame cũ không nằm trong audit này.
- Button 324×52, font 16px; input 324×80, amount 324×116; Back 48×48; tab bar 4 tabs, height 49px + bottom safe area 34px; category tile 100×100. Status bar iOS 59px và navigation bar 56px dùng component gốc.
- Mục tiêu <10 giây chưa được usability test. Responsive 412px, assistive technology và bàn phím thật chưa được kiểm tra.
- Màu accent #10B981 dùng làm tham chiếu/trang trí, không dùng nền nút chữ trắng. Contrast trắng/accent chỉ 2.54:1 nên không đạt chữ thường.
