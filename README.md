# Lab 2 — StudentPay

**Thành viên đã xác nhận:** Huỳnh Thiện Nhân — SE192336; Lã Gia Huy — SE192382.

StudentPay giúp sinh viên ở trọ ghi chi tiêu và chia hóa đơn. Repo giữ tài liệu và minh chứng cho chuỗi Analyze → Generate → Critique → Refine → Prototype → Handoff theo hướng dẫn Word PRM323. Lab2 không yêu cầu Flutter code/APK.

- [Figma design](https://www.figma.com/design/C7FiWYzVXUS8G2cnK5AGos/PRM393-Lab2-SE192382_SE192336)
- [Figma prototype](https://www.figma.com/proto/C7FiWYzVXUS8G2cnK5AGos/PRM393-Lab2-SE192382_SE192336?page-id=1%3A6&node-id=65-2&starting-point-node-id=65%3A2)
- [GitHub — bản cập nhật dùng để đối chiếu](https://github.com/dmm717/lab2_prm/tree/codex/lab2-evidence-and-handoff)
- [Canva cuối — 12 trang](https://www.canva.com/d/Kp4_AiORPJfXWPo)
- [Stitch — project tham chiếu trong bản ghi](https://stitch.withgoogle.com/projects/15153031226902677174)

## Yêu cầu Word và file giữ lại

| Yêu cầu | Artifact trong repo |
|---|---|
| Persona, pain points, problem statement, chỉ số thành công | [ux/persona.md](ux/persona.md) |
| IA, ít nhất tám màn hình, ba sơ đồ flow có alternate/error/recovery và screen map | [ux/user-flow.md](ux/user-flow.md), ảnh flow trong assets/figma |
| Prompt nguyên văn, UI AI ban đầu, ít nhất ba refine có before/after | [ai/ai-design-log.md](ai/ai-design-log.md), 11 ảnh assets/stitch; [DESIGN.md](DESIGN.md) là nguồn thiết kế lịch sử |
| Ít nhất năm vấn đề UX cụ thể và quyết định | [AI critique thật](ai/critique-2026-10-08.md), [record ảnh nguồn](ai/critique-evidence-2026-10-08.json), [design decisions](design/design-decisions.md) |
| Wireframe/final, hierarchy, consistency, Empty/Loading/Error | [screen spec](design/screen-spec.md), tám wireframes, tám final360 mới và ảnh states |
| Color/type/spacing/radius/elevation, variables/styles, chín nhóm component và instances | [design/DESIGN.md](design/DESIGN.md), ảnh Components/Elevation và [change ledger](design/figma-changes-2026-10-09.md) |
| Contrast, target48, text14, 360/412, không chỉ màu | [accessibility report](design/accessibility-report.md), [responsive audit](design/figma-responsive-audit-2026-10-09.json), tám ảnh mỗi width |
| Ba flow, Back, dialog overlay, loading→result, không dead ends | [prototype guide](handoff/prototype-guide.md), [graph](design/figma-live-audit-2026-10-09.json), ảnh states |
| Sáu phần mỗi screen, hai bảng token→Flutter/component→widget | [handoff/flutter-handoff.md](handoff/flutter-handoff.md) |
| Trình bày và demo | [link Canva](presentation/canva-link.md), [speaker notes/demo](presentation/presenter-guide.md) |

## Minh chứng và phiên bản

- Figma giữ sáu pages: 01 User Flow, 02 Wireframe, 03 Final UI, 04 Design System, 05 Components, 06 Prototype.
- Tám final360×800 và tám QA412×800. Lề16, content328/380; min text14 trong phạm vi audit. CTA cao52, Back48×48, tab target cao49.
- Prototype có ba starting points, 31 frames gồm một frame lỗi cũ giữ tham chiếu; graph ghi 95 NODE navigation và hai CLOSE. Save empty/invalid dùng OVERLAY; Retry/scrim CLOSE. Analytics Empty có CTA→Add.
- 39 foundation + hai prototype variables, sáu text styles, ba elevation styles và chín nhóm component.
- [20 PNG mới ngày09/10](assets/figma/2026-10-09/manifest.json): tám final360, tám QA412, Empty, Overlay, Components và Elevation. Manifest giữ node IDs, kích thước và hash.
- [20 PNG tham chiếu còn cần thiết](assets/figma/manifest.json): tám wireframes, ba sơ đồ flow, bốn trạng thái prototype và năm ảnh phục vụ đối chiếu thiết kế/critique. Các ảnh lịch sử không thay thế ảnh final mới.
- 11 ảnh AI gốc/refine trong assets/stitch. Giữ nguyên năm ảnh được hash trong critique record; không tạo lại minh chứng lịch sử.

## Demo và giới hạn

Home → Add empty → preset30.000đ → Save → Loading → Home1.220.000đ. Lưu trống/chữ mở overlay; Retry đóng về form ban đầu, sau đó chọn preset để phục hồi. Analytics dùng chart hoặc dòng danh mục để mở History; tháng9 có Empty và CTA. Groups tạo bill300.000đ chia3=100.000đ/người hoặc thêm An chia4=75.000đ/người. Reminder chỉ mở preview.

Prototype dùng preset và dữ liệu mẫu độc lập; không có nhập liệu bằng bàn phím thật, backend hoặc gửi nhắc thanh toán. Các tương tác ứng dụng thật được ghi là yêu cầu triển khai trong handoff.

Đã kiểm tra cấu trúc, ảnh native của tám UI ở mỗi width, graph và contrast tính sRGB. Tám cặp màu chữ đạt4.5:1; viền input3.87:1 với trắng và3.68:1 với nền đạt ngưỡng control3:1. Đây không phải chứng nhận toàn bộ UI hay kết quả plugin Contrast. Word không bắt buộc một plugin cụ thể.

## Những việc còn cần xác nhận trước khi nộp

- Chạy Present ba flow, Back, Close/Retry, Empty, loading/result và mọi đường thoát; test tên/số dài, cuộn và bàn phím. Graph/ảnh không thay thế nghiệm thu tương tác.
- Mở Figma/prototype bằng tài khoản khác hoặc không đăng nhập để xác nhận giảng viên xem được. GitHub README và ảnh412 đã từng truy cập HTTP200 không đăng nhập; cần thử lại các link trước buổi chấm.
- Đối chiếu phiên Stitch/ba refine nếu còn lịch sử gốc. Prompt và ảnh được giữ nguyên; nguồn từng phiên chưa xác thực. Critique Codex08/10 và thay đổi Figma09/10 là minh chứng mới, không gán cho phiên ChatGPT/Stitch cũ.
- Xác nhận vai trò cá nhân, tên môn PRM323 trong Word so với PRM393 ở Figma, và giảng viên cho phép làm nhóm. Không tự phân vai.

Word đề xuất 10–12 slide/10 phút trình bày, 5 phút demo, 5 phút hỏi đáp; đây là đề xuất tổ chức. Đề gốc nộp một GitHub repository và một Figma link có quyền xem. Canva được giữ theo yêu cầu của người dùng; không có PowerPoint trong gói này.
