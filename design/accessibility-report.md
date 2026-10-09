# Kiểm tra accessibility — cập nhật 09/10/2026

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

| Viền input / trắng (ngưỡng control3:1) | #73867A | #FFFFFF | 3.87:1 | Pass control |
| Viền input / nền (ngưỡng control3:1) | #73867A | #FAF8FF | 3.68:1 | Pass control |

Đã sửa tablabels14/20 vàviềninput semantic;masterpropagate vàoFinal/Prototype. Audit09/10:8UI360 +8 QA412,content328/380,mintext14;Back48×48,CTA cao52,tabtargetcao49. Category ba cộtFill101.33/118.67, gap12. Statusclock vàchrome không phảiactioncontrols.

Ảnh native8màn ởmỗi widthđãxem. Chưa test nội dungdài,keyboard,assistivetechnology,textscaling hoặcusability10giây. Contrast theo công thức,không phải plugin/toànUIcertification. Accent#10B981trắng2.54:1không dùngCTA. [Change ledger](figma-changes-2026-10-09.md).
