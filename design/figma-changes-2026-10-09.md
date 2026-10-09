# Thay đổi Figma thực tế — 09/10/2026

Đã sửa file StudentPay qua Figma Plugin API. Giữ đúng sáu pages. Đã xem ảnh Figma thật của tám UI ở cả 360×800 và 412×800; không kéo rộng ảnh 360 làm minh chứng 412. 20 PNG mới và node/hash nằm trong [manifest](../assets/figma/2026-10-09/manifest.json). Ảnh ngày04/10 được giữ nguyên để bảo toàn record critique ngày08/10.

| Critique | Quyết định đã thực hiện | Node / minh chứng |
|---|---|---|
| UX04: tab11px | Bốn navigation masters dùng Inter14/20; instances Final/Prototype cập nhật. Audit final/412 và prototype không còn text hiển thị dưới14px. | Masters44:2014,44:2034,95:62,95:82; [responsive audit](figma-responsive-audit-2026-10-09.json) |
| UX05: Empty thiếu CTA/route | Tạo Empty action component, instance trên Analytics tháng9; CTA đến Add empty. Month quay lại Analytics tháng10. | Master143:74; frame144:1855; CTA I144:1921;143:78 →65:321 |
| UX06: lỗi dùng NAVIGATE | Save của Add empty/invalid dùng OVERLAY; scrim và Retry dùng CLOSE, giữ form phía sau. | Overlay144:1841; dialog144:1843; Save65:337 và65:369; [live graph](figma-live-audit-2026-10-09.json) |
| UX07: elevation/library | Tạo ba effect styles, áp dụng level1 trên summary cards, level2 trên dialog. Có showcase chín nhóm bằng instances; thêm Field Focused/Filled/Error/Disabled và Budget card master. | Board144:1934; Field set57:86; Card144:1933; Home instances148:664/148:668; elevation board144:1998 |
| UX08: chưa có412 | Tạo tám frame QA412. Content lề16 →328px ở360 /380px ở412. Category Fill ba cột bằng nhau, gap12; chart giữ đường kính, căn giữa. | Frames144:333,411,456,508,573,643,701,756; [ảnh412](../assets/figma/2026-10-09/01-home-412.png) |

Sửa thêm viền input: `palette/border`55:16 và `color/border`55:17 từ #BBCABF sang #73867A; bind lên Input surface master44:1812 và Field. Tỷ lệ sRGB với trắng3.87:1, với #FAF8FF3.68:1. Focus/Error stroke bind primary/danger. Đây là thay đổi mới sau khi đọc yêu cầu contrast điều khiển, không sửa lại lịch sử prompt.

## Elevation thực tế

| Style | ID | Giá trị |
|---|---|---|
| StudentPay/Elevation/0 | S:5edbc8c549d4ef09293ed9e6f8525c01b0a355ba, | Không shadow |
| StudentPay/Elevation/1 | S:f1248bd8b7bcfe8fdd7d6ffc7042b338d7a507a1, | y2,blur8,spread0,#131B2E alpha0.08 |
| StudentPay/Elevation/2 | S:1081954273a329868f91834ae5d5cac52bc47989, | y8,blur24,spread0,#131B2E alpha0.18 |

## Giới hạn kiểm chứng

Plugin API xác nhận OVERLAY/CLOSE và đường đi; ảnh native xác nhận bố cục. Chưa chạy tương tác trong Present, chưa kiểm tra tên/số dài, bàn phím, text scaling hoặc screen reader. Prototype vẫn dùng preset, không nhập số tự do. Retry đóng overlay về form ban đầu; chọn preset30k để phục hồi. Overlay là frame trong suốt360×800 chứa scrim và dialog324×168; action thực sự là OVERLAY, không chuyển tới trang trắng. Frame lỗi cũ66:229 được giữ làm tham chiếu và không còn là đích của Save.

Không xác nhận lịch sử Stitch/ba phiên refine hoặc quyền xem Figma của người ngoài chỉ từ kết nối tài khoản chủ sở hữu. Hai thành viên đã xác nhận; vai trò cá nhân và môn PRM323/PRM393 vẫn cần đối chiếu.
