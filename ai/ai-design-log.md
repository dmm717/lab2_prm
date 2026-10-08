# AI Design Log

## Công cụ sử dụng
- **Nguồn UI ban đầu:** log cũ ghi Google Stitch/v0.dev; cần đối chiếu lịch sử project để xác định công cụ cho từng ảnh.
- **ChatGPT:** log cũ ghi GPT-4o; chưa có bản xuất chat để xác minh model và phản hồi nguyên văn.

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
  Dưới đây là 8 màn hình được AI tạo ra từ Prompt trên, kèm theo giải thích chức năng chi tiết cho từng màn hình để tiện đối chiếu với yêu cầu đồ án:

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

## 2. Phản biện bằng AI (Critique) & Quyết định

Tài liệu cũ lưu prompt yêu cầu ChatGPT phản biện. Phần trả lời bên dưới được ghi là mẫu; không dùng làm bằng chứng phản hồi AI nguyên văn khi chưa đối chiếu lịch sử chat.

- **Prompt gửi ChatGPT:**
  > "Act as an expert UX Designer. I am designing an Expense Tracker app named 'StudentPay' for Minh Quân (a 20-year-old college student who needs to split bills and track expenses quickly). Please review my 8 generated UI screens against Nielsen's 10 Usability Heuristics and basic accessibility rules. Provide exactly 5 specific heuristic violations or UX issues tied to specific screens."

- **Nội dung phản biện mẫu được ghi trong tài liệu ban đầu (chưa xác minh bản ghi ChatGPT):**
  > "Here are 5 UX issues based on Nielsen's heuristics for the StudentPay app:
  > 1. (Consistency and standards): Screen 6 has both a Back arrow and a Close 'x' button, causing redundancy.
  > 2. (Visibility of system status): Screen 3 lacks a success state or toast after sending a split request.
  > 3. (Error prevention): Screen 7 places 'Add Funds' dangerously close to 'Send', risking accidental bank transfers.
  > 4. (Match between system and real world): Screen 4 uses 'Net +$50.50 in your favor', which might be too formal for college students.
  > 5. (Aesthetic and minimalist design): Screen 8's donut chart is too massive, pushing primary category data below the fold."

Các quyết định bên dưới là ghi nhận lịch sử. Một số đã thay đổi ở bản final; bảng đối chiếu cuối file là quyết định áp dụng hiện tại.

1. **Phát hiện 1 (Consistency and standards):** Ở màn hình số 6 (Add Expense - `6.png`), giao diện có chứa cả nút mũi tên Back `<-` (ở trên cùng bên trái) và nút Tắt `x` (ở thẻ Quick Add bên phải). Điều này gây dư thừa và bối rối cho người dùng (không rõ bấm nút nào để hủy).
   - **Quyết định:** **CHẤP NHẬN**. Khi vẽ trên Figma, tôi sẽ xóa bỏ nút `x` dư thừa và chỉ giữ lại mũi tên Back tiêu chuẩn để điều hướng đồng nhất.

2. **Phát hiện 2 (Visibility of system status):** Ở màn hình số 3 (Create Shared Bill - `3.png`), sau khi chọn bạn bè và bấm "Send Split Request", giao diện không gợi ý trạng thái tiếp theo (ví dụ: thông báo gửi thành công).
   - **Quyết định:** **CHẤP NHẬN**. Trên bản Figma Prototype, tôi sẽ thiết kế thêm một thông báo nổi (Toast Notification) báo "Đã gửi yêu cầu thành công!" hiện ra sau khi bấm nút.

3. **Phát hiện 3 (Error prevention):** Ở màn hình số 7 (Home - `7.png`), nút "Add Funds" được đặt ngay cạnh nút "Send" ở thẻ số dư. Các nhãn Send/Add Funds có thể làm người dùng hiểu đây là ứng dụng chuyển tiền. Ảnh tĩnh không chứng minh có liên kết ngân hàng hoặc tự động rút tiền.
   - **Quyết định:** **CHẤP NHẬN**. Sẽ bổ sung ghi chú vào bản vẽ Figma yêu cầu một Pop-up xác nhận "Bạn có chắc muốn nạp thêm tiền không?" để chống chạm nhầm.

4. **Phát hiện 4 (Match between system and the real world):** Ở màn hình số 4 (Split Bills Dashboard - `4.png`), AI cho rằng cụm từ "Net +$50.50 in your favor" hơi mang tính học thuật tài chính, có thể khiến sinh viên khó hiểu so với việc ghi "Mọi người đang nợ bạn $50.50".
   - **Quyết định:** **TỪ CHỐI**. Giao diện đã có 2 khối "You are owed" và "You owe" giải thích rất rõ ràng ở trên. Cụm từ "in your favor" giúp giữ được tone giọng chuyên nghiệp (premium) của app tài chính, nên tôi vẫn sẽ giữ nguyên.

5. **Phát hiện 5 (Aesthetic and minimalist design):** Ở màn hình số 8 (Analytics - `8.png`), vòng tròn Donut chart được vẽ quá dày và to, chiếm hết hơn 50% chiều cao màn hình, đẩy danh sách chi tiết (Food, Housing) xuống tít bên dưới khiến người dùng phải cuộn nhiều.
   - **Quyết định:** **CHẤP NHẬN**. Khi vẽ lại biểu đồ này trên Figma, tôi sẽ thu nhỏ bán kính vòng tròn và làm nét vẽ (stroke) mỏng lại cho thanh thoát hơn, nhường không gian hiển thị danh sách bên dưới.

## 3. Ba vòng lặp tinh chỉnh (Refine)

Log cũ có 3 prompt refine cho 3 mục tiêu khác nhau và các cặp ảnh dưới đây. Chưa xác minh lại lịch sử generate; cần bổ sung bản ghi nếu còn trước khi trình bày đây là 3 lần chạy AI đã kiểm chứng.

### Vòng lặp 1: Vấn đề "Nút Thêm Chi Tiêu chưa nổi bật"
- **Vấn đề:** Nút thêm chi tiêu ở Màn hình 1 (Home) đang bị chìm, người dùng (đặc biệt là sinh viên đang cầm đồ ăn) khó bấm bằng 1 tay.
- **Prompt refine lưu trong tài liệu gốc:**
  > "On Screen 1 (Home), the 'Add Expense' FAB is not prominent enough for single-handed use. Please change it to a massive, circular Floating Action Button anchored to the bottom-right corner. Use a vibrant contrasting color like Sunset Orange (#F97316) with a heavy drop shadow so it pops completely off the green/white background."
- **Ảnh Trước & Sau:**
  - Trước: (![Trước](../assets/stitch/7.png))
  - Sau: (![Refine 1](../assets/stitch/ui_v4.png))
  - *Ghi chú:* Giao diện đã được cải thiện rõ rệt. Nút bấm được đổi sang màu Cam (Sunset Orange) và to hơn hẳn, tách biệt hoàn toàn khỏi nền xanh của app, giải quyết dứt điểm vấn đề khó thao tác bằng một tay.

### Vòng lặp 2: Vấn đề "Không phân biệt được Thu và Chi"
- **Vấn đề:** Trong danh sách giao dịch ở Màn hình 5 (History), các con số có màu đen/xám giống nhau, gây nhầm lẫn về mặt nhận thức (Cognitive load) khi đọc lướt.
- **Prompt refine lưu trong tài liệu gốc:**
  > "On Screen 5 (Transaction History), all amounts look the same. Improve the visual hierarchy and scanning experience: change the text color of income amounts to bold Emerald Green (e.g., +$500), and change expense amounts to bold Rose Red (#E11D48) with a minus sign (e.g., -$15). Add a subtle background pill shape behind the numbers for extra clarity."
- **Ảnh Trước & Sau:**
  - Trước: (![Trước](../assets/stitch/2.png))
  - Sau: (![Refine 2](../assets/stitch/ui_v2.png))
  - *Ghi chú:* Nhờ việc tô màu Xanh lá cho số tiền Thu và màu Đỏ (kèm dấu trừ) cho số tiền Chi, người dùng có thể quét mắt (scan) qua danh sách và nhận biết ngay dòng tiền mà không cần phải đọc chữ. Giảm thiểu đáng kể gánh nặng nhận thức (cognitive load).

### Vòng lặp 3: Vấn đề "Thiếu trạng thái trống (Empty State)"
- **Vấn đề:** Màn hình 4 (Thống kê) nếu chưa có dữ liệu sẽ chỉ là một trang giấy trắng, vi phạm quy tắc "Visibility of system status", khiến user tưởng app bị đơ.
- **Prompt refine lưu trong tài liệu gốc:**
  > "Screen 4 (Analytics) looks broken when there is no data. Please design a charming 'Empty State' in the center of the screen instead of the chart. It should include a cute, soft-colored illustration of an empty wallet, a friendly grey text saying 'No expenses yet this month!', and a clear Call-To-Action (CTA) button saying 'Add your first expense' to guide the user."
- **Ảnh Trước & Sau:**
  - Trước: (![Trước](../assets/stitch/8.png))
  - Sau: (![Refine 3](../assets/stitch/ui_v3.png))
  - *Ghi chú:* Trạng thái trống (Empty State) đã được thêm vào với hình ảnh minh họa đáng yêu và nút kêu gọi hành động (CTA) rõ ràng. Giờ đây khi người dùng mới chưa có dữ liệu, app trông vẫn rất sinh động và biết cách "dẫn đường" thay vì như bị lỗi văng màn hình trắng.


## 4. Bổ sung thực tế bằng Codex — 04/10/2026

- Người dùng cung cấp MSSV SE192336, Huỳnh Thiện Nhân, [file Figma](https://www.figma.com/design/C7FiWYzVXUS8G2cnK5AGos/PRM393-Lab2-SE192382_SE192336) và [project Stitch](https://stitch.withgoogle.com/projects/15153031226902677174).
- Audit Figma ban đầu: 8 wireframes; components có sẵn; 3 final screens 390×844; prototype trống; không có local collections/styles được liệt kê.
- Codex dựng 8 final screens 360×800 bằng text/vector/components chỉnh sửa được, không import ảnh AI làm Final UI.
- Bổ sung 2 collections foundations, 39 design variables và 6 Inter text styles; thêm biến chọn danh mục và metadata giao dịch mới cho prototype.
- Bổ sung component states, error dialog, spinner và 3 prototype starting points. Sửa lỗi Auto Layout chiều cao hàng ngang, chữ số/nhãn nút tràn và bộ lọc sai dữ liệu.
- Ảnh export, node IDs và audit lưu trong `assets/figma/`, `design/figma-build-state.json`, `design/figma-prototype-audit.json`.
- Độ tương phản được tính bằng script, chưa chạy plugin Contrast. Các prompt, đoạn “nguyên văn GPT-4o” và nguồn v0 trong log trước là tài liệu có sẵn; lượt này không xác minh lại lịch sử chat hoặc phiên generate.
- `ui_v2.png`, `ui_v3.png`, `ui_v4.png` được giữ nguyên làm bằng chứng refine đã có, không tạo ảnh giả cho các lượt trước.

## Refinement theo phản hồi người dùng — 04/10/2026

Tái sử dụng thư viện StudentPay trên 05. Components; status iOS và tab bar lấy mẫu Final UI Overview. Cân lại width 324px, display 28px, header 24/20px, body/button 16px, member 15px và caption 14px. Màn form/chi tiết chỉ có thanh vuốt iOS. Tab bar giữ đúng Home/Groups/Activity/You (label 11px như mẫu), You mở thông tin sinh viên. Audit cuối: 28 prototype frames, 79 navigation reactions, 3 starting points, không ghi nhận content overflow. Ledger: design/figma-ui-refinement.json.

### Motion và fixed header — 04/10/2026

Dùng figma-use và figma-use-motion để thêm pressed state 100ms từ Components gốc, chuyển tab/trang, hộp thoại từ dưới, donut entrance và spinner. Status/header/footer cố định; Content cuộn riêng. Kiểm thử Present với bản Home dài tạm: danh sách cuộn, header và tab bar giữ vị trí; bản tạm đã xóa. Phát hiện frame Tạo hóa đơn bị ẩn và khôi phục visibility, thử lại Groups → Tạo → loading → Chi tiết thành công. Audit mới: 29 prototype frames, 89 navigation reactions, 27 press interactions, 3 starting points, không có issues. Ledger: design/figma-motion-state.json.


## Đối chiếu quyết định với bản final — 08/10/2026

Đây là rà soát tài liệu và ảnh hiện có, không phải phiên ChatGPT critique mới. Prompt/ảnh lịch sử được giữ nguyên. Các quyết định hiện tại dựa trên ảnh final và đặc tả cuối.

| Phát hiện cụ thể | Căn cứ UX/persona | Quyết định cuối | Minh chứng |
|---|---|---|---|
| Add Expense gốc có Back và Close | Consistency, tránh hai cách hủy không rõ khác nhau | Accept: giữ một Back | 6.png và 02-add-expense.png |
| Home gốc dùng USD, tiếng Anh và chức năng Send/Add Funds | Match with real world, persona sinh viên Việt Nam cần ghi chi tiêu | Modify: VND, tiếng Việt, bỏ chuyển tiền khỏi phạm vi | 7.png và 01-home.png |
| Chữ trắng trên accent #10B981 có contrast 2.54:1 | Accessibility cho người dùng ngoài trời | Modify: CTA #006C49 đạt 6.48:1 | accessibility-report.md |
| Flow lưu cần chỉ rõ đang lưu, lỗi và cách phục hồi | Visibility of system status và error recovery | Accept: thêm loading, kết quả và Retry | prototype-loading/invalid/error-dialog/saved.png |
| Analytics cần lựa chọn dễ chạm ngoài biểu đồ màu | Accessibility và thao tác một tay | Modify: giữ dòng danh mục có nhãn/số tiền cùng chart | 04-analytics.png và prototype-guide.md |

| Đề xuất/lựa chọn AI lịch sử | Quyết định áp dụng cuối | Lý do |
|---|---|---|
| Refine 1 dùng FAB màu cam | Modify | Giữ CTA nổi bật nhưng dùng button xanh đậm thống nhất và tương phản |
| Refine 2 phân biệt Thu/Chi | Accept | Bản final có dấu +/− và màu, không chỉ dùng màu |
| Refine 3 bổ sung empty state | Accept về nguyên tắc | Feedback Empty có trong thư viện; cần xác nhận trạng thái empty gắn vào màn hình trước khi chốt prototype |
| Giữ câu “in your favor” | Thay đổi quyết định lịch sử | Bản final ưu tiên nhãn tiếng Việt dễ hiểu |
| Home có Send/Add Funds | Reject khỏi phạm vi | Lab tập trung ghi chi tiêu/chia hóa đơn, không có bằng chứng tính năng chuyển tiền |

## Kiểm chứng lịch sử AI còn cần bổ sung

- Đối chiếu project Stitch/v0 để xác nhận công cụ, prompt và output của từng vòng.
- Lưu ảnh/bản xuất chat phản biện thực tế nếu còn. Nếu không còn, tiếp tục ghi phần mẫu là tham khảo, không gọi là nguyên văn AI.
- Prompt ban đầu có university students, mobile, 8 screens và style nhưng chưa thể hiện đầy đủ constraints 360/412dp, VND và accessibility. Nếu tạo thêm vòng AI, lưu nguyên văn prompt thật với các constraints này; không sửa lại prompt cũ như thể đã dùng từ đầu.

## Sửa liên kết ảnh theo nội dung quan sát

Rà soát ảnh ngày 08/10 cho thấy liên kết before/after trong log cũ bị lệch: ui_v4.png có FAB cam, ui_v2.png có danh sách giao dịch, ui_v3.png có empty state. Đã sửa liên kết minh họa cho đúng nội dung ảnh, giữ nguyên tệp và prompt. Việc này không xác nhận thời gian hay thứ tự generate thực tế.


## AI critique thực tế mới — 08/10/2026

Đã thực hiện một lượt Codex critique mới dựa trên ảnh thật và source trong cuộc trò chuyện hiện tại. Output có tám phát hiện gắn màn hình, căn cứ UX và quyết định: [critique-2026-10-08.md](critique-2026-10-08.md). [Evidence record](critique-evidence-2026-10-08.json) lưu hash ảnh và phạm vi đã kiểm tra. Đây là phản hồi AI mới, không phải lời xác nhận về GPT-4o/Stitch lịch sử. Chưa có thao tác Figma mới trong lượt này.

[Prompt Stitch đủ persona/task/platform/constraints/style](stitch-prompt-next.md) đã chuẩn bị nhưng **chưa chạy**. Giữ nguyên prompt cũ và trạng thái lịch sử ba refine chưa xác minh.
