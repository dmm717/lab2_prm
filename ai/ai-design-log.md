# AI Design Log — StudentPay

Bản ghi cũ ghi Google Stitch/v0 và GPT-4o nhưng chưa có phiên gốc để xác minh công cụ/model. Prompt và ảnh lịch sử được giữ nguyên. Phần trả lời critique mẫu chưa xác thực đã được bỏ khỏi bản nộp; dùng phản hồi Codex thực tế dưới đây.

## 1. UI Ban đầu (Initial UI)
- **Ngôn ngữ prompt:** tiếng Anh như bản ghi có sẵn. Ngôn ngữ prompt không chứng minh chất lượng đầu ra; thiết kế cuối dùng tiếng Việt và VND theo persona.
- **Prompt lưu trong tài liệu gốc:**
  > "Design a modern, premium Expense Tracker mobile app UI for university students. The app name is 'StudentPay'. Use a vibrant modern aesthetic with a clean white background, soft subtle shadows, and a primary color of Emerald Green (#10B981) for trust and finance. Typography should be clean and readable (e.g., Inter font) with large bold numbers.
  > Generate a comprehensive UI covering these 8 distinct screens:
  > 1. **Home Screen:** Features a massive total balance (bento-box style card). Below it, a 'Recent Transactions' list. Include a floating action button (FAB) for adding expenses.
  > 2. **Add Expense:** A clean form with a huge numpad-friendly input field for the amount and a button to pick a category.
  > 3. **Category Picker (Full Screen):** A beautiful grid of category icons (Food, Rent, Coffee).
  > 4. **Analytics:** A modern donut chart showing expenses by category.
  > 5. **Transaction History:** Detailed list of all transactions with a date/category filter bar at the top.
  > 6. **Split Bill List:** Dashboard showing pending shared bills with roommates.
  > 7. **Create Split Bill:** A form to enter the total bill amount and a list of friends with checkboxes to split the cost.
  > 8. **Bill Detail:** Shows who already paid, who still owes money, and a 'Share/Remind' icon button.
  > Make sure all screens share a consistent design system and component style."
- **8 ảnh đầu ra có sẵn, nguồn từng phiên chưa xác minh lại:**
  Bản ghi cũ gắn tám ảnh dưới đây với prompt trên. Chưa đối chiếu phiên tạo để xác nhận quan hệ prompt/output; mô tả chỉ giải thích nội dung ảnh.

  1. **Category Picker** (![Category Picker](../assets/stitch/1.png))
     - *Chức năng:* Bảng chọn danh mục chi tiêu toàn màn hình. Hiển thị dạng lưới (grid) các icon danh mục thân thiện với sinh viên (Food, Coffee, Housing...) để phân loại nhanh hóa đơn.

  2. **Transaction History** (![Transaction History](../assets/stitch/2.png))
     - *Chức năng:* Xem lại toàn bộ lịch sử thu/chi. Các giao dịch được nhóm theo ngày (Hôm nay, Hôm qua) để dễ đối soát.

  3. **Create Shared Bill** (![Create Shared Bill](../assets/stitch/3.png))
     - *Chức năng:* Màn hình khởi tạo hóa đơn chia tiền (VD: Tiền đi siêu thị chung). Cho phép chọn những người bạn cùng phòng tham gia chia sẻ khoản tiền này qua danh sách checkbox.

  4. **Split Bills Dashboard** (![Split Bills Dashboard](../assets/stitch/4.png))
     - *Chức năng:* Bảng điều khiển quản lý nợ chung. Hiển thị tổng quan số tiền mình đang nợ người khác và số tiền người khác đang nợ mình, cùng danh sách các nhóm đã lập.

  5. **Expense Details** (![Expense Details](../assets/stitch/5.png))
     - *Chức năng:* Xem chi tiết một khoản nợ chung. Cho thấy tiến độ thanh toán (ai đã trả, ai chưa trả) và cung cấp nút bấm để gửi thông báo nhắc nợ (Remind).

  6. **Add Expense** (![Add Expense](../assets/stitch/6.png))
     - *Chức năng:* Màn hình nhập số tiền chi tiêu. Tích hợp bàn phím số (Numpad) siêu to ở nửa dưới màn hình để nhập liệu bằng một tay nhanh chóng.

  7. **Home Screen** (![Home Screen](../assets/stitch/7.png))
     - *Chức năng:* Trang chủ tổng quan. Hiện rõ tổng ngân sách còn lại siêu to, giúp sinh viên nhận thức ngay tình hình tài chính, kèm theo 3 giao dịch gần nhất và nút thêm nhanh.

  8. **Analytics** (![Analytics](../assets/stitch/8.png))
     - *Chức năng:* Thống kê trực quan. Dùng biểu đồ hình tròn (Donut chart) để phân bổ phần trăm chi tiêu theo từng hạng mục, giúp đánh giá thói quen tiêu dùng trong tháng.

## 2. Critique thực tế

Prompt phản biện được lưu trong tài liệu cũ; việc lưu prompt không chứng minh đã chạy:

> "Act as an expert UX Designer. I am designing an Expense Tracker app named 'StudentPay' for Minh Quân (a 20-year-old college student who needs to split bills and track expenses quickly). Please review my 8 generated UI screens against Nielsen's 10 Usability Heuristics and basic accessibility rules. Provide exactly 5 specific heuristic violations or UX issues tied to specific screens."

Ngày08/10, Codex xem ảnh thật và source, đưa ra tám vấn đề cụ thể theo Nielsen/accessibility/persona: [output critique](critique-2026-10-08.md). [Record](critique-evidence-2026-10-08.json) lưu hash ảnh, yêu cầu và IDs. Không gán phản hồi này cho GPT-4o hoặc Stitch lịch sử.

## 3. Ba vòng lặp tinh chỉnh (Refine)

Log cũ có 3 prompt refine cho 3 mục tiêu khác nhau và các cặp ảnh dưới đây. Chưa xác minh lại lịch sử generate; cần bổ sung bản ghi nếu còn trước khi trình bày đây là 3 lần chạy AI đã kiểm chứng.

### Vòng lặp 1: Vấn đề "Nút Thêm Chi Tiêu chưa nổi bật"
- **Vấn đề:** Nút thêm chi tiêu ở Màn hình 1 (Home) đang bị chìm, người dùng (đặc biệt là sinh viên đang cầm đồ ăn) khó bấm bằng 1 tay.
- **Prompt refine lưu trong tài liệu gốc:**
  > "On Screen 1 (Home), the 'Add Expense' FAB is not prominent enough for single-handed use. Please change it to a massive, circular Floating Action Button anchored to the bottom-right corner. Use a vibrant contrasting color like Sunset Orange (#F97316) with a heavy drop shadow so it pops completely off the green/white background."
- **Ảnh Trước & Sau:**
  - Trước: (![Trước](../assets/stitch/7.png))
  - Sau: (![Refine 1](../assets/stitch/ui_v4.png))
  - *Quan sát ảnh:* Quan sát thay đổi qua cặp ảnh, không suy ra kết quả kiểm thử người dùng.

### Vòng lặp 2: Vấn đề "Không phân biệt được Thu và Chi"
- **Vấn đề:** Trong danh sách giao dịch ở Màn hình 5 (History), các con số có màu đen/xám giống nhau, gây nhầm lẫn về mặt nhận thức (Cognitive load) khi đọc lướt.
- **Prompt refine lưu trong tài liệu gốc:**
  > "On Screen 5 (Transaction History), all amounts look the same. Improve the visual hierarchy and scanning experience: change the text color of income amounts to bold Emerald Green (e.g., +$500), and change expense amounts to bold Rose Red (#E11D48) with a minus sign (e.g., -$15). Add a subtle background pill shape behind the numbers for extra clarity."
- **Ảnh Trước & Sau:**
  - Trước: (![Trước](../assets/stitch/2.png))
  - Sau: (![Refine 2](../assets/stitch/ui_v2.png))
  - *Quan sát ảnh:* Ảnh sau phân biệt Thu/Chi bằng màu và dấu +/−; chưa có usability test đo hiệu quả.

### Vòng lặp 3: Vấn đề "Thiếu trạng thái trống (Empty State)"
- **Vấn đề:** Màn hình 4 (Thống kê) nếu chưa có dữ liệu sẽ chỉ là một trang giấy trắng, vi phạm quy tắc "Visibility of system status", khiến user tưởng app bị đơ.
- **Prompt refine lưu trong tài liệu gốc:**
  > "Screen 4 (Analytics) looks broken when there is no data. Please design a charming 'Empty State' in the center of the screen instead of the chart. It should include a cute, soft-colored illustration of an empty wallet, a friendly grey text saying 'No expenses yet this month!', and a clear Call-To-Action (CTA) button saying 'Add your first expense' to guide the user."
- **Ảnh Trước & Sau:**
  - Trước: (![Trước](../assets/stitch/8.png))
  - Sau: (![Refine 3](../assets/stitch/ui_v3.png))
  - *Quan sát ảnh:* Ảnh sau có Empty và CTA; final dùng component Empty với CTA tới Add.


## 4. Quyết định và thay đổi trong Figma

| Đề xuất / vấn đề | Quyết định cuối | Lý do và minh chứng |
|---|---|---|
| Add có Back và Close | Accept: một Back | Điều hướng rõ ràng; AI6.png và Final Add. |
| Refine1 dùng FAB cam | Modify: CTA xanh đậm | Nhất quán với tokens và trắng/primary6.48:1. |
| Refine2 phân biệt Thu/Chi | Accept: màu và dấu +/− | Không chỉ dựa vào màu; Final Home/History. |
| Home có Send/Add Funds, USD | Reject chuyển tiền; Modify thành VND | Phù hợp persona sinh viên Việt Nam, phạm vi ghi chi tiêu/chia hóa đơn. |
| Refine3/UX05 cần Empty có CTA | Accept và triển khai | Component143:74 trên Analytics144:1855; CTA→Add65:321. |

Ngày09/10, đã thực hiện UX04–UX08 → quyết định → thay đổi: tab14/20, EmptyCTA, true overlay, elevation/library và tám QA412. [Change ledger](../design/figma-changes-2026-10-09.md) ghi IDs/ảnh; [manifest mới](../assets/figma/2026-10-09/manifest.json) giữ20exports. Tám final dùng text/vector/components chỉnh sửa được, không dùng ảnh AI làm Final UI.

Khi minh họa một vòng cải tiến: mở prompt/ảnh đã lưu → output critique08/10 → quyết định UX05 → component Empty và CTA trong Figma09/10. Phân biệt ảnh refine lịch sử chưa xác thực với lượt critique/change mới đã có minh chứng; không nói tất cả cùng một phiên Stitch.

## Giới hạn nguồn

Chưa xác thực phiên Stitch/ba lần refine. Prompt ban đầu có đối tượng university students, mobile task, yêu cầu tám screens/consistent design system và style; chưa nêu đầy đủ VND/360–412/accessibility. Không sửa prompt cũ như thể đã dùng constraints mới từ đầu. Liên kết before/after đã đối chiếu nội dung ảnh: ui_v4 là FAB, ui_v2 là History, ui_v3 là Empty; việc này không xác nhận thời gian hoặc thứ tự generate.
