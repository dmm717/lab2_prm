# PRM323 Lab 2 — StudentPay

**Sinh viên:** SE192336 — Huỳnh Thiện Nhân. File Figma nhóm được giữ nguyên tên `PRM393-Lab2-SE192382_SE192336`; tài liệu lab hiện dùng PRM323 theo checklist gốc.

StudentPay là bản thiết kế ứng dụng quản lý chi tiêu và chia hóa đơn cho sinh viên ở trọ. Repo này chứa bài UI/UX và handoff Flutter; chưa có mã ứng dụng Flutter/Android để compile APK.

## Thiết kế và prototype

- [Figma — file thiết kế](https://www.figma.com/design/C7FiWYzVXUS8G2cnK5AGos/PRM393-Lab2-SE192382_SE192336)
- [Prototype — bắt đầu tại Home](https://www.figma.com/proto/C7FiWYzVXUS8G2cnK5AGos/PRM393-Lab2-SE192382_SE192336?page-id=1%3A6&node-id=65-2&starting-point-node-id=65%3A2)
- [Google Stitch — project tham chiếu](https://stitch.withgoogle.com/projects/15153031226902677174)

File Figma có 6 pages: User Flow, Wireframe, Final UI, Design System, Components và Prototype. Bộ final mới có tiền tố `Lab2 /`, gồm 8 màn hình **360 × 800**, chữ tiếng Việt, tiền VND và component instances. Các thiết kế cũ được giữ lại. Prototype có 3 flow starting points, error dialog, loading spinner và các trạng thái bổ sung. Các flow dùng dữ liệu mẫu độc lập; thay đổi trong một kịch bản không đồng bộ toàn bộ báo cáo. Dữ liệu nhập được mô phỏng bằng nút chọn nhanh; đây là prototype kịch bản, chưa phải ứng dụng nhập liệu tự do.

## Cách chạy thử

1. Thêm chi tiêu: **Thêm chi tiêu → 30.000 đ → Lưu chi tiêu**. Sau loading, số dư đổi từ 1.250.000 đ thành 1.220.000 đ.
2. Nhánh lỗi: **Thử nhập bằng chữ → Lưu → Nhập lại số tiền**. Lưu khi số tiền trống cũng mở hộp lỗi.
3. Thống kê: chuyển tab **Activity** (Thống kê), chạm mảng biểu đồ hoặc dòng danh mục để xem lịch sử tương ứng.
4. Chia hóa đơn: **Chia tiền → Tạo hóa đơn → Tạo hóa đơn chia tiền**, xem mỗi người trả 100.000 đ. Nhánh **Thêm bạn mới** minh họa An tham gia, chia 4 người với 75.000 đ/người.

Nếu trình xem Figma hiển thị ở kích thước thực và che phần đáy, chọn chế độ fit để thấy đủ màn hình 360 × 800.

## Công cụ và bằng chứng

- Google Stitch/v0: log và ảnh tham chiếu có sẵn trong `ai/ai-design-log.md`, `assets/stitch/`; nguồn từng ảnh theo log cũ, chưa xác thực lại từng lần generate.
- ChatGPT: phần phản biện trong log ban đầu. Thông tin model GPT-4o là ghi nhận từ tài liệu cũ, không được xác minh lại trong lượt bổ sung.
- Codex + Figma Plugin API: bổ sung Variables, Text Styles, components, Final UI và prototype ngày 04/10/2026. Script dựng nằm trong `scripts/figma/`; node IDs và kiểm tra cấu trúc nằm trong `design/figma-build-state.json` và `design/figma-prototype-audit.json`.
- Ảnh xuất trực tiếp từ Figma: `assets/figma/`, đối chiếu node nguồn bằng `manifest.json`.

## Bản đồ bài nộp

| Thư mục | Nội dung |
|---|---|
| `ux/` | Persona, 3 user flows và ánh xạ màn hình |
| `design/` | Quy tắc thiết kế cuối, screen spec, 10 quyết định, audit |
| `ai/` | Prompt, critique, refinement và log bổ sung thực tế |
| `handoff/` | Handoff Flutter, hướng dẫn prototype, tình trạng nộp bài |
| `assets/stitch/` | 8 ảnh ban đầu, 3 ảnh phiên bản refine có sẵn |
| `assets/figma/` | 8 final screens, tokens, components, flows, error/loading/success |
| `scripts/` | Script Figma và kiểm tra gói bài nộp |

## Kiểm tra gói bài nộp

```sh
python3 scripts/validate_submission.py
```

Xem kết quả trong `design/accessibility-report.md` và `handoff/completion-status.md`. Đã mở editor/prototype trong trình duyệt chưa đăng nhập và chạy thử 3 luồng chính; chưa ghi nhận chạy plugin Contrast hoặc usability test <10 giây.

Repository hiện có remote [dmm717/lab2_prm](https://github.com/dmm717/lab2_prm). Tên repo đích theo checklist: `prm323-lab2-SE192336`. GitHub CLI hiện có token không hợp lệ, nên chưa tạo repo đích hoặc push thay đổi.
