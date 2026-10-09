# Đặc tả sửa Figma theo Word — đã áp dụng09/10/2026

Chuẩn bị 08/10 và triển khai trên canvas 09/10. Minh chứng thực tế ở [change ledger](figma-changes-2026-10-09.md). Các bước Present, nội dung dài và quyền xem chưa được xác nhận.

## Responsive

Giữ tám frame 360×800 và thêm bộ kiểm tra 412×800 cùng page03 để giữ đúng 6 pages. Chiều cao 800 được chọn để so sánh riêng thay đổi chiều rộng; Word chỉ yêu cầu kiểm tra rộng360/412.

| Thành phần | 360dp | 412dp | Quy tắc |
|---|---:|---:|---|
| Padding trái/phải | 16 | 16 | Token spacing16 |
| Content/card/field/button | 328 | 380 | Fill container, không scale font |
| Tab bar | 360 | 412 | Fill width, bốn tab chia đều |
| Vùng tab mỗi mục | 86 | 99 | Target≥48, label 14/20 |
| Category grid ba cột, gap12 | 101.33 | 118.67 | Cột bằng nhau, nhãn wrap |
| Button height | 52 | 52 | Giữ chiều cao và vùng chạm |
| Back target | 48×48 | 48×48 | Icon nằm giữa target |

Kiểm tra số tiền dài, tên hóa đơn/thành viên dài, CTA, grid/chart, scroll, content không nằm dưới footer. Export đúng frame thật, lưu node IDs và kết quả từng screen.

## Typography và trạng thái

Đổi master tab labels từ 11 thành 14/20, kiểm tra active/inactive của cả bốn tab và instances trên Final/Prototype. Sửa actual overrides nếu có, không chỉ tạo text style.

Empty phải có thông điệp và CTA đi được tới Add/Create. Loading phải có phản hồi và đi được tới kết quả hoặc recovery. Error có icon/chữ + Retry. Không dùng màu là tín hiệu duy nhất.

## Elevation đề xuất

Các mức sau đã tạo thành effect styles và áp dụng lên card/dialog. IDs và ảnh ở change ledger:

| Style | Giá trị đề xuất | Nơi áp dụng | Flutter mapping dự kiến |
|---|---|---|---|
| StudentPay/Elevation/0 | Không shadow | Nền, input, nội dung phẳng | Không BoxShadow |
| StudentPay/Elevation/1 | X0,Y2,blur8,spread0,#131B2E alpha0.08 | Card cần tách lớp | BoxShadow(offset0/2,blur8,color alpha0.08) |
| StudentPay/Elevation/2 | X0,Y8,blur24,spread0,#131B2E alpha0.18 | Dialog overlay | BoxShadow(offset0/8,blur24,color alpha0.18) |

Tạo effect styles có tên và áp dụng lên masters/instances phù hợp. Mức0 là style có effects rỗng, thể hiện quy tắc không bóng đổ. Ghi ảnh và node/style IDs sau khi áp dụng.

## Inventory chín nhóm

| Nhóm | Trạng thái/biến thể cần đối chiếu | Điều kiện nghiệm thu |
|---|---|---|
| Button | Default, Pressed, Disabled, Loading | Master set + instance và vùng chạm52 |
| Text field | Default, Focus, Filled, Error, Disabled phù hợp | Amount/Field có labels, error text, validation spec |
| Card | Budget/Bill, dữ liệu/state phù hợp | Auto Layout, width fill, radius/elevation dùng thật |
| Navigation | Home/Groups/Activity/You active/inactive | Đúng bốn tab, label 14, instance |
| App bar | Trang chính / Back | Master và Back target 48 |
| Dialog | Error, Retry/Close | Master, overlay và đường thoát |
| Loading | Spinner/feedback | Component, transition thực tế |
| Empty | Message + CTA | Component và màn hình áp dụng có route |
| Error | Icon + message + recovery | Component và màn hình áp dụng |

Word không liệt kê chi tiết toàn bộ “states bắt buộc”; các states trên là lựa chọn phù hợp sản phẩm cần đối chiếu đề gốc nếu có. Ảnh showcase cũ không thay thế kiểm tra master/instances thực tế.

## Overlay

Giữ Add empty/invalid phía sau. Save lỗi mở dialog324px có scrim. Retry đóng dialog để người dùng sửa được số tiền, không đưa sang một trang trắng. Kiểm tra dismissal, Back, dữ liệu và mọi đường thoát trong Present. Lưu ảnh interactionOpenoverlay và ảnhPresent. Không coi NAVIGATE tới frame lỗi360×800 làoverlay.
