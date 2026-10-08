# Tình trạng hoàn thành Lab 2 — 04/10/2026

## Đã hoàn thành

- Đối chiếu tài liệu và Figma thật, giữ lại 8 wireframes, 3 final screens cũ và thư viện components gốc.
- 6 pages được chuẩn hóa theo checklist; bổ sung 3 user flows chỉnh sửa được, có nhánh lỗi nhập chữ.
- 8 Final UI mới 360×800, có tiền tố `Lab2 /`, dùng tiếng Việt và VND.
- 39 foundation variables trong 2 collections, 2 biến chuỗi prototype, 6 Inter text styles.
- 7 component families bổ sung, Error dialog, Spinner và bảng minh họa states; Auto Layout, màu/radius/gap lấy từ variables.
- Prototype: 3 starting points, 29 frames gồm 8 màn hình chính và states, 89 navigation reactions theo audit lưu. Có loading Smart Animate, lỗi + Retry, chọn danh mục, báo cáo theo danh mục, chia 3/4 người.
- 28 ảnh xuất Figma: 8 final, 8 wireframes, 3 flows, design system, components và 7 prototype states. Manifest chứa node nguồn.
- README có MSSV, tên sinh viên, link Figma, link Stitch, link prototype; đã bổ sung đủ 10 quyết định thiết kế và đồng bộ handoff.
- Tính tương phản bằng script cho các cặp màu nội dung; xem `design/accessibility-report.md`.
- Chạy thử browser ngày 04/10/2026: Home → preset → loading → Home 1.220.000đ; nhập chữ → hộp lỗi → Retry; Thống kê → lịch sử Ăn uống; Chia tiền → Tạo → loading → chi tiết 100.000đ/người.
- Kiểm tra xem công khai: Figma editor và prototype tải được trong trình duyệt chưa đăng nhập (editor hiện Sign up, Share mở hộp đăng nhập). Đây là kiểm tra truy cập anonymous, không phải thay đổi thiết lập Share hay xác nhận tên lựa chọn trong hộp Share.

## Còn cần hoàn tất

1. **Chạy plugin Contrast trong Figma.** Chỉ kiểm tra tính toán đã thực hiện. Trình duyệt hiện chưa đăng nhập Figma nên không chạy được plugin trong editor; không ghi nhận plugin Pass.
2. **Tạo/push repository `prm323-lab2-SE192336`.** `gh auth status` báo token GitHub không hợp lệ; GitHub `/new` trong trình duyệt chuyển sang Sign in. Chưa tạo repo, đổi remote hoặc push.

Sau khi đăng nhập lại GitHub, có thể dùng lệnh dưới đây để nộp bài. Lệnh tạo repo public và push chỉ chạy khi bạn sẵn sàng công bố bài:

```sh
gh auth login -h github.com
# Đứng trong thư mục lab2_prm; kiểm tra git diff trước khi commit.
git add README.md Lab2_Checklist_ChiTiet.md ux design ai handoff assets scripts
git commit -m "Complete Lab 2 StudentPay Figma prototype and handoff"
gh repo create prm323-lab2-SE192336 --public --source=. --remote=submission --push
```

Remote `origin` hiện tại vẫn là `dmm717/lab2_prm`. ZIP trong `submission/` là bản đóng gói local nếu muốn tải lên thủ công; chưa được publish.

## Giới hạn kiểm thử

- Prototype nhập bằng preset/kịch bản, không phải ứng dụng nhập số tự do. Checkbox và ngày/ghi chú chưa có hành vi dữ liệu thật; nhắc trả không gửi tin nhắn.
- Ngưỡng <10 giây là mục tiêu, chưa đo usability thực tế; 3 lần chạm áp dụng cho preset mặc định.
- Chưa kiểm tra Flutter/Android build, responsive 412px, bàn phím thật hay screen reader vì repo chưa có mã ứng dụng.
- Nội dung critique và tên model GPT-4o trong log cũ là dữ liệu được kế thừa, không được xác minh lại.
- Tên môn trong checklist là PRM323, còn tên file Figma là PRM393; giữ nguyên tên file nhóm của người dùng, cần đối chiếu đề chính thức trước khi nộp.

## Cập nhật theo phản hồi UI

- Đã tái sử dụng Components gốc; cân lại width 324px, typography 28/24/20/16/15/14, khoảng cách và safe area.
- Tab bar lấy đúng Final UI StudentPay Overview: Home / Groups / Activity / You; các màn khác chỉ có thanh vuốt iOS. You mở profile SE192336 trong prototype.
- Audit mới: 8 final screens, 29 prototype frames, 89 navigation reactions, 3 starting points; không có nội dung vượt vùng content. Label tab iOS giữ 11px theo mẫu người dùng chọn.

- Header, status bar và footer/tab bar được cố định; chỉ Content cuộn. Đã xác nhận bằng nội dung dài trong Present, bản QA đã xóa.
- Motion: pressed button 100ms, tab fade 180ms, chuyển trang 240–280ms, dialog từ dưới 260ms, biểu đồ xuất hiện 450ms, spinner 360ms. Ledger: `design/figma-motion-state.json`.
