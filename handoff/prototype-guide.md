# Hướng dẫn chạy và đánh giá prototype

[Chạy prototype](https://www.figma.com/proto/C7FiWYzVXUS8G2cnK5AGos/PRM393-Lab2-SE192382_SE192336?page-id=1%3A6&node-id=65-2&starting-point-node-id=65%3A2). Các starting points nằm trong page `06. Prototype`.

| Kịch bản | Thao tác | Kết quả cần thấy |
|---|---|---|
| Nhập nhanh | Thêm → 30.000đ → Lưu | Spinner → Home 1.220.000đ |
| Thiếu tiền | Thêm → Lưu | Hộp lỗi → Nhập lại |
| Nhập chữ | Thêm → Thử nhập bằng chữ → Lưu | Amount đỏ → hộp lỗi → Retry |
| Chọn danh mục | Form → Danh mục → Nhà trọ | Form hiện Nhà trọ |
| Empty tháng 9 | Analytics tháng 10 → chọn tháng → tháng 9 | Empty cóCTA→Add; chọn tháng quay lại tháng 10 |
| Báo cáo | Thống kê → Ăn uống hoặc mảng xanh | Tổng ăn uống 337.500đ |
| Bộ lọc khác | Nhà trọ/Di chuyển | 300.000đ / 112.500đ đúng danh mục |
| Chia 3 | Chia tiền → Tạo → Xác nhận | 300.000đ, mỗi người 100.000đ |
| Thêm bạn | Tạo → Thêm bạn mới → Thêm An → Xác nhận | 4 người, mỗi người 75.000đ |
| Nhắc trả | Chi tiết → Nhắc thanh toán → Quay lại | Xem trước nội dung, không gửi thật |

Nhập liệu là mô phỏng kịch bản bằng preset, không phải form chạy code. Mục tiêu UX “<10 giây” cần usability test riêng; 3 lần chạm áp dụng cho preset mặc định. Thêm/chọn danh mục khác có thể cần nhiều thao tác hơn.

Trong ứng dụng thật: xử lý numeric validation, lỗi lưu/network, trạng thái empty, thao tác checkbox, truy cập screen reader, giảm chuyển động và bàn phím che nút. Không suy luận các tính năng này đã chạy chỉ vì prototype có hình minh họa.

## Navigation theo mẫu Overview

Tab Home mở Tổng quan; Groups mở Chia tiền; Activity mở Thống kê; You mở thông tin Huỳnh Thiện Nhân / SE192336. Tab bar giữ 4 icon và label gốc của StudentPay Overview. Màn form/chi tiết và feedback chỉ có thanh vuốt iOS.

## Cuộn và chuyển động

Header và status bar đứng yên khi cuộn; tab bar hoặc footer nằm cố định phía dưới. Content có viewport riêng, cuộn dọc khi nội dung dài hơn vùng hiển thị. Thiết lập áp dụng cho 8 Final UI mới, các frame Final UI gốc và các prototype frames; hiện31frames gồm một frame tham chiếu.

| Tương tác | Hiệu ứng | Thời gian |
|---|---|---|
| Nhấn nút | Smart Animate sang Pressed, opacity 85% | 100ms |
| Chuyển tab | Dissolve, Ease out | 180ms |
| Vào trang / Quay lại | Push trái / phải, Ease out | 280ms / 240ms |
| Error overlay | Dissolve, Close giữ form nền | 200ms |
| Thêm bạn / nhắc trả | Move in từ dưới | 260ms |
| Preset số tiền | Smart Animate | 220ms |
| Mở Thống kê | Donut tăng kích thước và độ rõ | 450ms |
| Đang lưu | Spinner Smart Animate, rồi hiện kết quả | 360ms + Dissolve 200ms |

Chạy Present để xem animation. PNG trong assets chỉ là trạng thái tĩnh. Biểu đồ bắt đầu ở frame `119:778`, tự chuyển sang `65:122`. Graph hiện có95NODE navigation và2CLOSE; mọi đích NODE thuộc pagePrototype. Frame lỗi cũ66:229 là tham chiếu, không nằm trên đường Save hiện tại. Khung QA dùng kiểm thử cuộn đã được xóa.


## Cập nhật09/10

Save trống/chữ hiện dùng trueOVERLAY;Retry/scrim CLOSE về form ban đầu, sau đó chọn preset 30k để phục hồi. OverlayDissolve200ms; thêmbạn/reminder vẫn theo transitioncũ. Prototype31frames,3 starting points;frame lỗi cũ66:229 không còn làđíchSave. [Live graph](../design/figma-live-audit-2026-10-09.json) xác nhận cấu trúc;chưa chạyPresent tronglượt này.
