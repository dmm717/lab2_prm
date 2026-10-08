# Tình trạng bài nộp — cập nhật08/10/2026

## Đã hoàn thành hoặc đối chiếu trong lượt này

- Có tài liệu persona, IA và3 flow. Đã sửa sơ đồ/từ ngữ để mô tả đúng prototype dùng preset, Back, alternate/error/recovery và flow–screen map.
- Đã thực hiện **AI critique mới bằng Codex**, xem ảnh thật và lập8 phát hiện cụ thể kèm căn cứ, quyết định, trạng thái. Có output và recordhash ảnh ở `ai/critique-2026-10-08.md`, `ai/critique-evidence-2026-10-08.json`.
- Đã chuẩn bị prompt Stitch đủ persona/task/mobile/constraints/style. Prompt này **chưa chạy** và không thay thế prompt lịch sử.
- Đã rà soát handoff8 screen, mỗi screen6 phần và2 bảngmapping. Bổ sung implementation plan cho 360/412, elevation,9nhóm/states và overlay, ghi rõ chưa áp dụng lên Figma.
- Có8 ảnh final360×800,28 exportFigma và11 ảnhAI lịch sử. Audit cũ ghi29 prototype frames,89 navigation reactions,3 starting points.
- Có báo cáo8 cặp contrast tính sRGB; không đánh đồng với kiểm tra mọi control hoặc kết quả plugin.
- Có Canva 12 trang, speaker notes và kịch bản demo. Link bản giao xem `presentation/canva-link.md`.

## Công việc chưa hoàn tất

| Công việc | Trạng thái thực tế |
|---|---|
| UI 412dp và kiểm tra360/412 | Có đặc tả, chưa sửa canvas hoặc có export412 thật |
| Tab labels 14sp | Audit cũ11px, chưa sửa master/instances |
| Overlay dialog thật | Scripts dùngNAVIGATE, chưa sửa Openoverlay hoặc chạyPresent |
| Elevation và9 nhóm master/states | Có plan/inventory yêu cầu, chưa xác nhận áp dụng đủ |
| Empty có CTA và route thật | Board có feedback, chưa chứng minh state trên màn hình |
| Lịch sửUI generation/3refine | Có prompt/ảnh, chưa đối chiếu phiênStitch/chat gốc |
| GitHub/quyền xem | Đã push nhánh codex/lab2-evidence-and-handoff, xác minh commit remote; README truy cập HTTP 200 không cần đăng nhập. Quyền Figma chưa xác minh |
| Vai trò cá nhân/tên môn/làmnhóm | Hai tên đã xác nhận; vai trò chưa cung cấp; cần đối chiếuPRM323/PRM393 và giảng viên cho phép nhóm |

## Giới hạn kiểm chứng

Trình duyệt hiện không xác minh được quyền truy cập đã lưu nên không mở/điều khiển Figma hoặc editorCanva trong lượt này. Figma chưa có kết nối được xác nhận. Không vượt qua kiểm tra quyền truy cập; không đánh dấu thay đổi canvas đã thực hiện. Kết nốiCanva cho phép tạo/đọc nội dung, nhưng không thay thế visual/liveQA.

Validator kiểm tra gói local, hash minh chứng và audit đã lưu. Kết quảPass của validator không chứng nhận responsive, overlay, đầy đủcomponents hoặc lịch sửAI. Mục tiêu dưới 10 giây chưa có usabilitytest. Word không yêu cầu Flutter code/APK, không bắt buộc plugin Contrast cụ thể. NộpGitHub+Figma có quyền xem; slides không có điểm riêng.

[ChecklistFigma](figma-final-checklist.md). [Implementationplan](../design/implementation-plan.md). [Đối chiếuWord](../presentation/requirements-review.md).


## Xác nhận publication của lượt này

Commit minh chứng 2ba5f2e đã push lên [nhánh cập nhật](https://github.com/dmm717/lab2_prm/tree/codex/lab2-evidence-and-handoff). Đã đọc README không đăng nhập: HTTP 200, có link AI critique mới và cả hai MSSV. Ảnh Home trên nhánh cũng truy cập được. Chi tiết ở publication-status.json. Đây là cập nhật nhánh riêng, chưa merge main và không xác nhận quyền Figma.
