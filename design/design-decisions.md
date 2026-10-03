# Quyết định thiết kế & Accessibility (Design Decisions)

## 1. Top Quyết định Thiết kế quan trọng nhất
1. **Dùng Floating Action Button (FAB):** Đặt FAB to ở góc dưới phải màn hình Home để thêm chi tiêu thay vì đặt nút bé ở trên header, vì sinh viên thường dùng điện thoại bằng 1 tay (ngón cái dễ với tới góc dưới).
2. **Hệ màu Xanh lá và Đỏ:** Dùng màu xanh lá cho Thu và màu Đỏ cho Chi. Đây là Mental Model (mô hình nhận thức) quen thuộc nhất trong các app tài chính.
3. **Giấu Form chi tiết:** Màn hình thêm chi tiêu chỉ bắt buộc nhập Số tiền và Danh mục. Mục "Ghi chú" và "Ngày" được ẩn gọn lại thành các lựa chọn không bắt buộc (optional) để tăng tốc độ nhập liệu (giúp đạt tiêu chí thành công < 10 giây).
4. **Icon hóa Danh mục:** Thay vì để danh sách xổ xuống toàn chữ (Dropdown Menu), danh mục được thiết kế dạng lưới (Grid) với các Icon to, dễ nhận biết (Tô phở, Bình xăng, Trà sữa) để chạm chọn nhanh hơn.
5. **Auto-Split Bill (Tự động chia đều):** Mặc định chức năng chia tiền sẽ tự động chia đều (chia trung bình cộng) vì 90% các bữa ăn sinh viên thường "Campuchia" đều nhau. Việc này tiết kiệm thao tác bấm máy tính. 

## 2. Checklist Accessibility (Khả năng truy cập)
- [x] **Độ tương phản (Contrast):** Chữ màu đen/xám đậm (`#212121`, `#757575`) trên nền trắng (`#FFFFFF`) và nền xanh lá (`#4CAF50`). Test trên Figma cho kết quả Pass (Contrast Ratio > 4.5:1 với văn bản thường, > 3:1 với chữ bự).
- [x] **Vùng chạm (Touch Target):** Các nút bấm (Button), icon menu điều hướng ở đáy đều được set Auto Layout với kích thước Min Width/Min Height = 48x48 dp. Đảm bảo bấm không trượt.
- [x] **Kích thước chữ (Font Size):** Không có nội dung text nào nhỏ hơn 14sp. Header hiển thị số tiền là 32sp.
- [x] **Không dựa vào mỗi màu sắc:** Các khoản chi không chỉ có màu đỏ, mà còn có thêm dấu trừ (-) ở phía trước để những người mù màu vẫn nhận biết được đâu là khoản bị trừ, đâu là khoản được cộng.
- [x] **Responsive Layout:** Đã test Auto Layout bằng cách kéo co giãn component trên Figma. Ở cả chiều rộng 360dp và 412dp, layout đều co giãn tự động, chữ tự đẩy xuống hàng, không bị tràn màn hình.
