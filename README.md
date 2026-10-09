# Lab 2 — StudentPay

**Thành viên:** Huỳnh Thiện Nhân — SE192336; Lã Gia Huy — SE192382. StudentPay là thiết kế ứng dụng quản lý chi tiêu và chia hóa đơn cho sinh viên ở trọ. Bài nộp gồm thiết kế Figma, prototype, tài liệu UX, lịch sử AI và đặc tả bàn giao Flutter.

## Thiết kế và trình bày

- [Figma](https://www.figma.com/design/C7FiWYzVXUS8G2cnK5AGos/PRM393-Lab2-SE192382_SE192336)
- [Prototype](https://www.figma.com/proto/C7FiWYzVXUS8G2cnK5AGos/PRM393-Lab2-SE192382_SE192336?page-id=1%3A6&node-id=65-2&starting-point-node-id=65%3A2)
- [Stitch — project tham chiếu](https://stitch.withgoogle.com/projects/15153031226902677174)
- [GitHub — remote hiện tại](https://github.com/dmm717/lab2_prm)
- [Bài trình bày Canva 12 trang — chỉnh sửa trực tiếp](https://www.canva.com/d/Kp4_AiORPJfXWPo)
- [Ghi chú thuyết trình và kịch bản demo](presentation/presenter-guide.md)
- [Các bước còn cần kiểm tra trực tiếp trên Figma](handoff/figma-final-checklist.md)

Tên file Figma hiện có PRM393 và hai MSSV SE192382_SE192336. Tài liệu hướng dẫn dùng PRM323. Cần đối chiếu tên môn và hình thức cá nhân/nhóm với giảng viên trước khi nộp. Người dùng xác nhận thành viên thứ hai là Lã Gia Huy — SE192382; chưa có phân công công việc cá nhân.

## Phạm vi thiết kế

Sáu page: User Flow, Wireframe, Final UI, Design System, Components, Prototype. Bộ final `Lab2 /` có 8 màn hình 360×800, dùng tiếng Việt và tiền VND. Ngày 09/10 đã có thêm 8 QA412, tab 14/20, Empty có CTA, true overlay và elevation styles. Prototype hiện 31 frames gồm frame lỗi cũ giữ tham chiếu;3 starting points. Audit 04/10 là mốc lịch sử. Tab bar cuối dùng Home / Groups / Activity / You.

Prototype sử dụng dữ liệu mẫu và preset. Các kịch bản độc lập, không đồng bộ giao dịch giữa mọi màn hình. Ngày, ghi chú, checkbox và nhắc thanh toán chỉ mô phỏng. Repo chưa có mã Flutter và Lab 2 không yêu cầu build APK.

## Các kịch bản demo

1. Home: Thêm chi tiêu, chọn 30.000đ, Lưu. Sau loading, số dư từ 1.250.000đ thành 1.220.000đ.
2. Lưu khi trống/chữ: mở overlay lỗi; Nhập lại đóng về form gốc, chọn preset 30k rồi lưu.
3. Analytics: đổi tháng 10→9 để xem Empty; CTA tới Add, chọn tháng để trở lại dữ liệu tháng 10.
4. Activity: chọn mảng biểu đồ hoặc dòng danh mục để xem giao dịch đã lọc.
5. Groups: tạo hóa đơn 300.000đ cho 3 người, mỗi người 100.000đ. Thêm An để chia 4 người, mỗi người 75.000đ.
6. Chi tiết: mở bản xem trước nhắc thanh toán rồi quay lại, không gửi tin nhắn thật.

## Bản đồ tài liệu

| Tài liệu | Nội dung |
|---|---|
| [Persona](ux/persona.md) | Người dùng, vấn đề và tiêu chí thành công |
| [User flows](ux/user-flow.md) | Kiến trúc thông tin, 3 flow, nhánh và ánh xạ màn hình |
| [Design system cuối](design/DESIGN.md) | Tokens, text styles, layout và components |
| [Screen spec](design/screen-spec.md) | 8 màn hình và giới hạn prototype |
| [Quyết định thiết kế](design/design-decisions.md) | Quyết định và lý do gắn với persona |
| [AI log](ai/ai-design-log.md) | Prompt, ảnh đầu ra, critique và 3 vòng refine |
| [AI critique mới](ai/critique-2026-10-08.md) | 8 phát hiện thực tế bằng Codex, ảnh/source và trạng thái quyết định |
| [Đặc tả sửa Figma](design/implementation-plan.md) | Responsive, typography, elevation, states và overlay đã triển khai; xem change ledger |
| [Accessibility](design/accessibility-report.md) | Kết quả tính contrast và phần chưa kiểm tra |
| [Flutter handoff](handoff/flutter-handoff.md) | 6 phần/màn hình, token và widget mapping |
| [Trạng thái bài nộp](handoff/completion-status.md) | Kết quả local và công việc còn mở |

`assets/stitch/` chứa 11 ảnh AI có sẵn. `assets/figma/` giữ28ảnh lịch sử; `assets/figma/2026-10-09/` thêm20 PNG thật gồm8 final360,8 QA412,Empty,Overlay,Components vàElevation. `DESIGN.md` tại root là tham chiếu lịch sử, không dùng thay đặc tả cuối trong `design/DESIGN.md`.

## Công cụ và nguồn minh chứng

Log cũ ghi Stitch/v0 và ChatGPT nhưng chưa xác minh lịch sử phiên tạo hoặc model. Các prompt và ảnh được giữ nguyên, không coi đoạn critique mẫu là bản ghi AI đã xác thực. Phần bổ sung ngày 04/10 ghi nhận dùng Codex + Figma Plugin API, có source scripts và ledger node IDs.

## Kiểm tra gói bài

```sh
python -X utf8 scripts/validate_submission.py
```

Validator kiểm tra file, liên kết local, ảnh và audit đã lưu. Không truy cập Figma/GitHub trực tiếp, không kiểm chứng nguồn AI và không chạy plugin Contrast. Đã kiểm tra ảnh8 final360/8 QA412, graphOVERLAY/CLOSE vàcomponent inventory. Còn chạy Present, nội dung dài và quyền xem Figma. Xem checklist Figma trước khi tuyên bố bài hoàn tất.

Nhánh cập nhật đã push và xác minh từremote. Nếu giảng viên yêu cầu tên repo cụ thể, đối chiếu môn học trước đổi tên.


### AI critique mới

Lượt 08/10 có phản biện Codex thực tế kèm hash ảnh. Phần critique lịch sử vẫn giữ nhãn mẫu/chưa xác minh; prompt Stitch mới được chuẩn bị nhưng chưa chạy. Canvas đã sửa09/10, có change ledger, audits và20exports mới; plan riêng không thay thế minh chứng.


## Bản cập nhật phục vụ trình bày

Các bổ sung của lượt này nằm trên nhánh `codex/lab2-evidence-and-handoff`. Xem [bản repository cập nhật](https://github.com/dmm717/lab2_prm/tree/codex/lab2-evidence-and-handoff). Main và audit Figma04/10 giữ làm mốc. Figma đã được sửa trực tiếp09/10; xem [change ledger](design/figma-changes-2026-10-09.md). Đã push nhánh và xác minh commit remote. README nhánh mới trả HTTP 200 không đăng nhập, có link critique mới và hai thành viên; ảnh Home cũng truy cập được. Quyền Figma chưa xác nhận.
