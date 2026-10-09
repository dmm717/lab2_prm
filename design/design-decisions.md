# 10 quyết định thiết kế và bằng chứng

1. **Thêm nhanh 3 lần chạm:** nút Thêm → preset 30.000đ → Lưu; mặc định Ăn uống và hôm nay. Mục tiêu <10 giây chưa được đo với người dùng thật.
2. **Tiền VND và tiếng Việt:** khớp bối cảnh sinh viên Việt Nam; loại bỏ USD khỏi bộ màn hình mới.
3. **CTA xanh đậm #006C49:** chữ trắng đủ tương phản, thay nền xanh #4CAF50/#10B981 của các bản đầu.
4. **Số tiền 28px theo bản final:** ưu tiên đọc ngân sách và khoản chi, giữ biểu đồ và lịch sử trong viewport.
5. **Chỉ một nút Back:** tránh trùng Back và Close ở form, có đường quay lại ở mọi flow.
6. **Danh mục dạng lưới:** tile tối thiểu 100×100; chọn danh mục cập nhật biến prototype và trở về form.
7. **Dòng danh mục thay thế biểu đồ:** có vùng chạm lớn cho người khó bấm mảng donut; cả hai đường dẫn đến cùng bộ lọc.
8. **Chia đều và có người trả trước:** 300.000đ/3=100.000đ, thêm người thứ tư=75.000đ; phần Quân đã trả được ghi bằng chữ.
9. **Lỗi và loading có phản hồi:** không nhận chuỗi/trống/≤0; prototype có error dialog + Retry, spinner Smart Animate trước màn hình kết quả.
10. **Tokens và instances:** Auto Layout, semantic variables, text styles và components tái sử dụng giúp thay đổi nhất quán, handoff dễ đối chiếu.

## Kiểm tra thực hiện

- [x] Audit cấu trúc 8 màn hình mới 360×800 và prototype, không có text mới dưới 14px.
- [x] Button 52px, Back 48px, tab ≥48px, category tile ≥100px.
- [x] Text/background được đo bằng công thức relative luminance, xem `accessibility-report.md`.
- [x] Có dấu −/+, biểu tượng và nhãn trạng thái; không truyền đạt chỉ bằng màu.
- [x] Đã xem ảnh render và sửa lỗi text/Auto Layout trước khi xuất bằng chứng.
- [ ] Chạy plugin Contrast trực tiếp trong Figma theo checklist gốc.
- [ ] Usability test đo thời gian <10 giây với persona thật.
- [ ] Kiểm tra responsive 412px ngay trong Figma và lưu ảnh; không cần chờ Flutter. Bàn phím thật là kiểm thử triển khai tương lai.

Các lời khẳng định “đã test 412px / plugin Pass” trong tài liệu cũ chưa có bằng chứng nên không được giữ như kết quả kiểm thử.

## Đối chiếu cuối

Quyết định accept/modify/reject hiện tại được ánh xạ trong ai/ai-design-log.md. Tab labels 11px là ngoại lệ còn cần đối chiếu, overlay thật và elevation chưa được xác nhận. Xem handoff/figma-final-checklist.md.


## Follow-up thực tế09/10/2026

Đã thực hiện chuỗi critique UX04–UX08 → quyết định → thay đổi trên Figma. [Change ledger](../design/figma-changes-2026-10-09.md) ghi IDs, states, overlay và responsive. Ảnh cũ của critique giữ nguyên hash; ảnh mới nằm trong assets/figma/2026-10-09. Sửa hình học content: lề16 tương ứng328 tại360,380 tại412. Phần trạng thái chưa áp dụng trong bảng ngày08/10 là lịch sử ở thời điểm critique, được thay thế bằng follow-up này. Đây không phải phiên Stitch mới và không xác nhận provenance của ba refine cũ.
