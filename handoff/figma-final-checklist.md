# Các bước chốt Figma trước khi nộp

Checklist này hướng dẫn kiểm tra trên file StudentPay hiện có. Chưa có thao tác nào trong danh sách được coi là hoàn thành nếu thiếu minh chứng thực tế. Không cần viết Flutter để kiểm tra responsive thiết kế.

## 1. Kiểm tra 412dp

1. Ở Final UI, giữ nguyên bộ 360×800. Duplicate 8 frame `Lab2 /` thành bộ `QA 412 /` cạnh bộ gốc, vẫn trong page hiện tại để giữ 6 page.
2. Resize width 412; dùng Auto Layout/constraints để content mở rộng, giữ padding 16px. Độ rộng content dự kiến là 380px. Đây là giá trị dự kiến, chưa phải kết quả kiểm tra.
3. Kiểm tra header, tab bar, input, button, card, grid và chart. Các script cũ dùng nhiều width 324px nên không chỉ kéo frame ngoài và coi như đã responsive.
4. Kiểm tra tên dài/số tiền lớn, text wrap, scroll và footer cố định trong Present. Giữ vùng chạm ≥48×48.
5. Export 8 frame vào `assets/figma-responsive/`; ghi frame IDs và kết quả vào bảng dưới.

| Màn hình | 360dp | 412dp | Lỗi phát hiện và cách sửa | Node/ảnh |
|---|---|---|---|---|
| Home | Chưa chạy lại | Chưa kiểm tra | Chưa ghi nhận | Chưa có |
| Add expense | Chưa chạy lại | Chưa kiểm tra | Chưa ghi nhận | Chưa có |
| Category | Chưa chạy lại | Chưa kiểm tra | Chưa ghi nhận | Chưa có |
| Analytics | Chưa chạy lại | Chưa kiểm tra | Chưa ghi nhận | Chưa có |
| Transactions | Chưa chạy lại | Chưa kiểm tra | Chưa ghi nhận | Chưa có |
| Split bills | Chưa chạy lại | Chưa kiểm tra | Chưa ghi nhận | Chưa có |
| Create bill | Chưa chạy lại | Chưa kiểm tra | Chưa ghi nhận | Chưa có |
| Bill detail | Chưa chạy lại | Chưa kiểm tra | Chưa ghi nhận | Chưa có |

## 2. Contrast và cỡ chữ

- Chạy plugin Contrast cho primary button, text phụ, input error và các labels. Lưu screenshot kết quả thật; so sánh với 8 cặp màu trong accessibility-report.
- Chữ thường ≥4.5:1, chữ lớn/điều khiển ≥3:1. Không dùng #10B981 làm nền có chữ trắng thông thường.
- Nội dung ≥14sp. Tab labels hiện 11px: nếu giảng viên yêu cầu mọi label ≥14, sửa component master và kiểm tra lại cả 360/412. Nếu giữ ngoại lệ theo mẫu, trình bày rõ và xin đánh giá theo quy định môn.
- Text input thiếu màu border tương phản cần kiểm tra như điều khiển, không suy ra đạt chỉ vì chữ đạt.

## 3. Dialog dùng Open overlay

Scripts lưu dùng NAVIGATE cho hộp lỗi. Kiểm tra interaction thật vì Figma có thể đã được sửa thủ công sau audit.

1. Tạo/kiểm tra frame dialog vừa nội dung, không coi một frame 360×800 chứa thông báo là bằng chứng overlay.
2. Từ nút Lưu của Add empty/Add invalid chọn On click, Open overlay, centered hoặc bottom tùy thiết kế, có scrim và giữ màn hình gốc phía sau.
3. Nút Retry đóng overlay và trở lại form sửa được. Nếu cần chuyển invalid về blank, kiểm tra cả reset dữ liệu và đóng lớp overlay.
4. Chạy Present: nền còn phía sau, đóng/Retry hoạt động, không ngõ cụt. Chụp ảnh và interaction settings.

## 4. Design system và component states

Đối chiếu master trên Components, không chỉ hình minh họa trên canvas.

| Nhóm | States cần thể hiện theo chức năng | Minh chứng |
|---|---|---|
| Button | Default, Pressed, Disabled, Loading | Component set + instance |
| Text field | Default, Focus, Filled, Error, Disabled phù hợp | Component set + instance |
| Card | Các loại budget/bill và trạng thái phù hợp | Master + instance |
| Navigation | 4 lựa chọn Home/Groups/Activity/You | Selected variants |
| App bar | Trang chính, trang có Back | Master + instance |
| Dialog | Hiển thị, đóng, Retry | Master + overlay |
| Loading | Spinner/loading feedback | Component + timed transition |
| Empty | Thông điệp và CTA | Component + màn hình áp dụng |
| Error | Icon, text và phục hồi | Component + màn hình áp dụng |

States nêu trên là danh sách rà soát; đề gốc chưa có trong workspace để đối chiếu toàn bộ states bắt buộc.

Elevation: xác nhận kiểu phẳng hoặc các mức bóng đổ thực tế, đặt tên style/token và áp dụng trên instance. Ví dụ đề xuất `elevation/0` cho bề mặt phẳng, `elevation/1` cho card, `elevation/2` cho dialog. Không ghi chúng đã tồn tại trong audit khi chưa tạo/kiểm tra.

## 5. Chốt quyền xem và demo

- Giữ đúng 6 pages theo hướng dẫn. Bộ QA đặt trong page hiện có.
- Chạy 3 flow, Back, lỗi/Retry, loading/result, overlay và các nhánh chia 3/4 người.
- Mở link design/prototype/GitHub trong cửa sổ chưa đăng nhập, bảo đảm giảng viên xem được assets.
- Xác nhận tên môn, hình thức cá nhân/nhóm, tên repo và cách gửi slide. Nếu đổi link repo, sửa cả README và slide.
- Cập nhật completion-status và nội dung slide về kiểm thử sau khi có kết quả. Không đổi các ô Chưa kiểm tra thành Pass chỉ để hoàn thành checklist.
