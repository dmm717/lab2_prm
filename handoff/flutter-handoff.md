# Flutter Handoff — StudentPay

Đặc tả triển khai tương lai, không phải báo cáo tính năng Flutter đã chạy. Bản final mới dùng `design/DESIGN.md`, node IDs trong `design/figma-build-state.json`. Các tokens cũ Color/Primary… dưới đây ánh xạ lần lượt sang color/primary, color/danger, color/surface; Typography sang StudentPay/Display, StudentPay/Body; Spacing sang spacing/16, spacing/8.

- Tiền VND, số nguyên >0. Từ chối chuỗi, rỗng, số âm và 0; kiểm tra cả paste dù bàn phím số. Lưu dạng integer, chỉ format dấu chấm ở UI.
- Thêm nhanh mặc định Ăn uống và hôm nay; dùng preset 30.000đ nếu muốn luồng 3 lần chạm.
- Ngân sách demo: 2 triệu; số dư trước/sau khoản chi: 1.250.000/1.220.000đ.
- Chia đều 300.000đ cho 3 người tính cả người trả trước: 100.000đ/người; 4 người: 75.000đ/người. Với số không chia hết, phân phối phần dư 1đ theo thứ tự thành viên ổn định để tổng khớp hóa đơn.
- Component mới: Button states Default/Pressed/Disabled/Loading; Amount Default/Filled/Error; Bottom nav Home/Analytics/Split; Feedback Error/Loading/Success/Empty; Error dialog và Spinner.
- Chỉ prototype kịch bản đã dựng; backend, nhập tự do, gửi yêu cầu thật và responsive 412px chưa triển khai.


## 1. Bảng ánh xạ Token sang Flutter (Design Tokens to Code)
| Figma Token | Figma Value | Flutter Code (Dự kiến) |
| :--- | :--- | :--- |
| **Color/Primary** | `#006C49` (Accessible Green) | `Theme.of(context).colorScheme.primary` |
| **Color/Danger** | `#BA1A1A` (Red) | `Theme.of(context).colorScheme.error` |
| **Color/Background**| `#FFFFFF` (White) | `Theme.of(context).colorScheme.surface` |
| **Typography/Header**| Inter, 32sp, Bold | `Theme.of(context).textTheme.displayLarge` |
| **Typography/Body** | Inter, 16sp, Regular | `Theme.of(context).textTheme.bodyLarge` |
| **Spacing/Medium** | 16px | `const SizedBox(height: 16)` hoặc `padding: EdgeInsets.all(16)` |
| **Spacing/Small** | 8px | `const SizedBox(height: 8)` |

## 2. Bảng ánh xạ Component sang Flutter Widget
| Figma Component | Flutter Widget tương ứng | Tên Variant |
| :--- | :--- | :--- |
| Nút bấm chính (Primary Button) | `FilledButton` | `FilledButton` |
| Nút thêm tiền (FAB) | `FloatingActionButton` | `FloatingActionButton.large` |
| Ô nhập dữ liệu (Input) | `TextFormField` | `InputDecoration(border: OutlineInputBorder())` |
| Thanh menu đáy (Bottom Menu) | `NavigationBar` | Mặc định |
| Thẻ thông tin (Card)| `Card` | `Card.elevation(2)` |
| Checkbox chọn bạn bè | `CheckboxListTile` | Mặc định |

## 3. Đặc tả chi tiết 8 Màn hình (Theo chuẩn Handoff)

### Màn hình 1: Home (Tổng quan)
1. **Layout:** `Scaffold` -> `Column` (cuộn được bằng `SingleChildScrollView`). Khoảng cách các thành phần dùng token **Spacing/Medium** (16px). Dưới cùng là `NavigationBar`.
2. **Components:** `Card` (cho phần Balance), `ListTile` (danh sách giao dịch), `FloatingActionButton` (FAB) góc dưới phải.
3. **States:** `populated` (có dữ liệu giao dịch), `empty` (hiển thị hình ví rỗng nếu chưa có giao dịch).
4. **User interactions:** Chạm (tap) vào FAB để mở form thêm chi tiêu. Vuốt (swipe) dọc để xem các giao dịch cũ.
5. **Navigation:** Đến từ: Khởi động app. Nhấn FAB -> Đi đến Màn hình 2 (Thêm chi tiêu). Nút Back trên thiết bị: Thoát app.
6. **Important UI constraints:** Vùng chạm FAB tối thiểu 48x48dp. Nếu số tiền quá lớn, áp dụng quy tắc tràn chữ `TextOverflow.ellipsis`. Trên màn hình rộng (Tablet), `Card` số dư tối đa rộng 400dp, căn giữa.

### Màn hình 2: Thêm chi tiêu
1. **Layout:** `Scaffold` -> `AppBar` -> `Padding` (dùng **Spacing/Medium**) -> `Column` (cuộn được để tránh lỗi bàn phím che).
2. **Components:** `TextFormField` (nhập tiền), `ListTile` (chọn danh mục), `FilledButton` (Lưu).
3. **States:** `default` (khi mới mở), `error` (nếu vi phạm validation), `loading` (hiển thị spinner trên nút Lưu khi đang xử lý).
4. **User interactions:** Chạm ô số tiền bốc lên bàn phím số. Quy tắc validation: Bắt buộc nhập số tiền > 0. Nếu trống, bấm Lưu sẽ báo lỗi đỏ.
5. **Navigation:** Đến từ: Màn hình 1. Nhấn nút Danh mục -> Đi đến Màn hình 3. Nhấn "Lưu" thành công hoặc nút Back -> Trở về Màn hình 1.
6. **Important UI constraints:** Hành vi bàn phím: Dùng `TextInputType.numberWithOptions(decimal: true)`. Độ dài tối đa số tiền: 10 ký tự. Nút "Lưu" giãn rộng toàn màn hình (`width: double.infinity`).

### Màn hình 3: Chọn Danh mục (Full screen)
1. **Layout:** `Scaffold` -> `AppBar` -> `GridView.count` (scrollable). Khoảng cách grid dùng **Spacing/Small** (8px).
2. **Components:** Khối Icon tùy chỉnh bọc trong `InkWell` (variant có hiệu ứng ripple).
3. **States:** `populated` (hiển thị 9 danh mục trong bản final).
4. **User interactions:** Chạm (tap) vào 1 icon danh mục bất kỳ.
5. **Navigation:** Đến từ: Màn hình 2. Chạm icon hoặc nhấn Back (mũi tên) -> Trở về Màn hình 2 (mang theo dữ liệu đã chọn).
6. **Important UI constraints:** Hành vi trên màn rộng (Tablet): `GridView` chuyển từ 3 cột (crossAxisCount: 3) sang 5 hoặc 6 cột. Vùng chạm mỗi icon đảm bảo > 48x48dp.

### Màn hình 4: Thống kê (Analytics)
1. **Layout:** `Scaffold` -> `Column` (cuộn được toàn bộ). Phần trên là `SizedBox` chứa biểu đồ tròn, khoảng cách **Spacing/Medium** tới phần dưới là `ListView` danh sách tỷ trọng. Đáy là `NavigationBar`.
2. **Components:** Biểu đồ Pie chart (fl_chart library), `ListTile` kèm vệt màu legend.
3. **States:** `populated` (hiển thị chart), `empty` (thay chart bằng hình vẽ "chưa có chi tiêu"), `loading` (khi đang tính toán dữ liệu).
4. **User interactions:** Chạm vào phần màu trên biểu đồ làm nổi bật khối đó.
5. **Navigation:** Đến từ: Tab Analytics ở NavigationBar. Nhấn vào 1 dòng danh mục -> Đi tới Màn hình 5.
6. **Important UI constraints:** Biểu đồ giới hạn chiều cao tối đa 300dp để không lấn át danh sách. Tên danh mục dài bị cắt ngang (`ellipsis`).

### Màn hình 5: Danh sách Giao dịch chi tiết
1. **Layout:** `Scaffold` -> `AppBar` -> `ListView.builder` (phần thân cuộn). Token khoảng cách dòng là **Spacing/Small**.
2. **Components:** `ListTile` chứa lịch sử, thanh filter ngày tháng dạng `SegmentedButton`.
3. **States:** `populated` (danh sách), `empty` (nếu lọc không ra kết quả).
4. **User interactions:** Vuốt dọc (scroll) để xem. Chạm vào filter để đổi bộ lọc ngày/tháng.
5. **Navigation:** Đến từ: Màn hình 4. Nút Back (trên AppBar hoặc thiết bị) -> Về Màn hình 4.
6. **Important UI constraints:** Tiêu đề AppBar có độ dài tối đa 20 ký tự, tự động thay thế bằng tên danh mục tương ứng.

### Màn hình 6: Danh sách Chia tiền (Split Bill Dashboard)
1. **Layout:** `Scaffold` -> `CustomScrollView` (chứa các Slivers) để hỗ trợ hiệu ứng ẩn hiện FAB khi cuộn. Đáy là `NavigationBar`.
2. **Components:** `Card` (tóm tắt ai nợ ai), `FloatingActionButton` (Tạo mới).
3. **States:** `populated` (danh sách nợ), `empty` (chưa tạo bill chung nào).
4. **User interactions:** Cuộn dọc. Khi vuốt xuống (scroll down), FAB tự động trượt xuống ẩn đi để mở rộng không gian.
5. **Navigation:** Đến từ: Tab Split ở NavigationBar. Bấm dòng hóa đơn -> Tới Màn hình 8. Bấm FAB -> Tới Màn hình 7.
6. **Important UI constraints:** Số tiền nợ hiển thị dùng màu tương phản (Danger Token cho tiền nợ người khác, Primary Token cho tiền người khác nợ mình).

### Màn hình 7: Tạo hóa đơn chia tiền
1. **Layout:** `Scaffold` -> `AppBar` -> `SingleChildScrollView` -> `Column`. Sử dụng **Spacing/Medium** (16px) cho padding 4 cạnh.
2. **Components:** `TextFormField` (Tổng tiền), `CheckboxListTile` (Chọn bạn), `FilledButton.icon` (Xác nhận).
3. **States:** `default` (khởi tạo), `error` (vi phạm nhập liệu), `loading` (đang lưu).
4. **User interactions:** Nhập số tiền -> Bàn phím số. Chạm ô Checkbox -> Tự động chia lại tiền trên màn hình (validation: Phải chọn ít nhất 1 người).
5. **Navigation:** Đến từ: Màn hình 6. Bấm Xác nhận thành công -> Màn hình 8; Back -> Màn hình 6.
6. **Important UI constraints:** Vùng chạm của checkbox mở rộng ra toàn bộ dòng (tap toàn dòng đều ăn checkbox). Bàn phím số không được che mất nút Xác nhận ở cuối.

### Màn hình 8: Chi tiết hóa đơn
1. **Layout:** `Scaffold` -> `AppBar` -> `ListView`. Danh sách chia thành 2 nhóm: "Đã trả" và "Chưa trả" cách nhau một khoảng **Spacing/Medium**.
2. **Components:** `ListTile` kèm `IconButton` (Nút nhắc nợ).
3. **States:** `populated` (người nợ), `success` (nếu tất cả mọi người đã trả xong, hiển thị Lottie animation chúc mừng).
4. **User interactions:** Bấm vào IconButton hình cái chuông -> Kích hoạt lệnh chia sẻ (Share Intent). Bấm tick -> Chuyển người đó sang danh sách "Đã trả".
5. **Navigation:** Đến từ: Màn hình 6. Nút Back -> Về Màn hình 6.
6. **Important UI constraints:** Tên người dùng quá dài bị giới hạn 1 dòng (maxLines: 1). Nút "Nhắc nợ" có touch target tối thiểu 48x48dp để tránh ấn nhầm sang nút Đánh dấu đã trả.
