# Quyết định thiết kế — StudentPay

| Ví dụ | Accept / Modify / Reject | Căn cứ persona/UX | Minh chứng |
|---|---|---|---|
| Add có Back và Close | Accept: giữ một Back | Nielsen consistency/user control; một đường quay lại dễ hiểu | AI6.png, Final Add |
| FAB cam/CTA xanh nhạt | Modify: CTA #006C49 | Chữ trắng6.48:1, đồng nhất tokens, dễ nhận ra thao tác chính | accessibility-report.md; Final Home/Add |
| Thu/Chi chỉ khác màu | Accept: dùng thêm dấu +/− | Không chỉ dựa màu; quét nhanh số tiền | Final Home/Transactions |
| Send/Add Funds trên Home | Reject khỏi phạm vi; Modify USD sang VND | Quân cần ghi chi tiêu/chia tiền tại Việt Nam | AI7.png; Final Home |
| Empty chỉ có thông điệp | Accept: thêm CTA→Add | System status và recognition; có hành động tiếp theo | Component143:74; Analytics Empty144:1855 |

Theo critique UX04–UX08, đã sửa tab14/20, EmptyCTA, OVERLAY/CLOSE, elevation và layout360/412. [Change ledger](figma-changes-2026-10-09.md) nối từng phát hiện với node/ảnh. Bốn navigation masters cập nhật instances; chín nhóm component có showcase. Ba elevation styles áp dụng card/dialog.

Min text14 trong audit; CTA cao52, Back48×48, tab target cao49. Category ba cột Fill101.33px ở360 và118.67px ở412. Lề16 →content328/380, font không scale. [Responsive audit](figma-responsive-audit-2026-10-09.json). [Contrast](accessibility-report.md) tính sRGB, không chứng nhận toàn UI.

Mục tiêu dưới10giây/3chạm áp dụng preset30k, chưa test người dùng thật. Prototype không nhập tự do; Back từ Category trả về preset, không chứng minh giữ mọi dữ liệu nhập. Còn chạy Present, test tên/số dài/bàn phím và quyền xem Figma. Word không bắt buộc plugin Contrast cụ thể.
