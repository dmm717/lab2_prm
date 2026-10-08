# Ghi chú trình bày Canva StudentPay — bản cuối

## Slide 01 — StudentPay

35 giây. Giới thiệu vấn đề thực tế: sinh viên khó ghi khoản chi nhỏ và theo dõi tiền chung. Người dùng xác nhận cả hai thành viên: Huỳnh Thiện Nhân SE192336 và Lã Gia Huy SE192382. Phạm vi công việc nhóm: UX/UI, prototype và handoff. Chưa có phân công cá nhân, không tự phân vai. Word hướng dẫn dựa trên Lab2, tên môn PRM323 trong Word khác PRM393 ở Figma. Cần đối chiếu tên môn và việc giảng viên cho phép làm nhóm trước nộp.

Nguồn: README.md, ux/persona.md

## Slide 02 — Người dùng, vấn đề và mục tiêu

45 giây. Mục tiêu ba lần chạm áp dụng Home đã tải, preset 30.000đ, danh mục Ăn uống và ngày mặc định. Không coi 10 giây là kết quả usability test. Theo persona, ưu tiên số tiền dễ đọc, nhập nhanh và trạng thái nợ bằng chữ.

Nguồn: ux/persona.md, design/screen-spec.md

## Slide 03 — Kiến trúc thông tin: 8 màn hình

40 giây. Đây là sơ đồ phân cấp ba khu vực nghiệp vụ. App có bốn tab, You mở thông tin cá nhân và không được cộng vào tám màn hình chính. Dialog và biến thể states cũng không tính là màn hình riêng. Figma phải giữ 6 pages đúng thứ tự: 01 User Flow, 02 Wireframe, 03 Final UI, 04 Design System, 05 Components, 06 Prototype.

Nguồn: ux/user-flow.md, design/screen-spec.md, assets/figma/manifest.json

## Slide 04 — Ba flow có nhánh thay thế và phục hồi

55 giây. Sơ đồ có start, goal, end và flow–screen map qua số màn hình. Flow 1: Home → Add → Category tùy chọn → preset 30k → Save → Loading → Home 1.220.000đ. Nếu trống/chữ, Error rồi Retry về Form. Flow 2: từ Home tới Analytics, chọn chart hoặc dòng danh mục, Back từ Transactions về Analytics. Starting point riêng trong prototype ở Analytics. Flow 3 bắt đầu Groups, tạo 300k cho 3 người, hoặc thêm An chia 4 người; quay về Groups qua Back. Đây là mô tả kịch bản được dựng, chưa thay thế chạy live để kiểm tra dead ends/overlay.

Nguồn: ux/user-flow.md, handoff/prototype-guide.md

## Slide 05 — AI generation: prompt và UI ban đầu

50 giây. Giữ nguyên prompt lịch sử, không chèn constraints mới như thể đã dùng từ đầu. Các ảnh và prompts có sẵn trong repo. Log gốc ghi Stitch/v0 nhưng chưa có lịch sử phiên để xác minh công cụ từng ảnh. Bản cuối bổ sung VND, màu primary đậm và layout 360dp bằng Figma; không gọi các bổ sung này là nội dung prompt lịch sử.

PROMPT BAN ĐẦU NGUYÊN VĂN:
Design a modern, premium Expense Tracker mobile app UI for university students. The app name is 'StudentPay'. Use a vibrant modern aesthetic with a clean white background, soft subtle shadows, and a primary color of Emerald Green (#10B981) for trust and finance. Typography should be clean and readable (e.g., Inter font) with large bold numbers.
Generate a comprehensive UI covering these 8 distinct screens:
1. Home Screen: Features a massive total balance (bento-box style card). Below it, a 'Recent Transactions' list. Include a floating action button (FAB) for adding expenses.
2. Add Expense: A clean form with a huge numpad-friendly input field for the amount and a button to pick a category.
3. Category Picker (Full Screen): A beautiful grid of category icons (Food, Rent, Coffee).
4. Analytics: A modern donut chart showing expenses by category.
5. Transaction History: Detailed list of all transactions with a date/category filter bar at the top.
6. Split Bill List: Dashboard showing pending shared bills with roommates.
7. Create Split Bill: A form to enter the total bill amount and a list of friends with checkboxes to split the cost.
8. Bill Detail: Shows who already paid, who still owes money, and a 'Share/Remind' icon button.
Make sure all screens share a consistent design system and component style.

Project tham chiếu: https://stitch.withgoogle.com/projects/15153031226902677174

Nguồn: ai/ai-design-log.md, assets/stitch/6.png, assets/stitch/8.png, DESIGN.md

## Slide 06 — Ba vòng refine và 5 phát hiện UX

65 giây. Ba mục tiêu refine khác nhau: CTA, nhận diện dòng tiền, hướng dẫn Empty. Các ảnh trước/sau và prompts đã tồn tại trong log. Liên kết ảnh đã được sửa theo nội dung quan sát: Home/FAB cam ui_v4, Transaction ui_v2, Empty ui_v3. Chưa xác minh lại thứ tự chạy hay provenance. Bảng minh họa 5 trong 8 phát hiện của lượt Codex AI critique thực tế ngày08/10. Nguồn đầy đủ: ai/critique-2026-10-08.md, có hash ảnh trong evidence record. Không gán phản hồi mới cho GPT-4o/Stitch lịch sử. Ba mục đầu đối chiếu thay đổi đã có; tab14 và EmptyCTA chưa áp dụng lên Figma.

BA PROMPT REFINE NGUYÊN VĂN:
Vòng 1: "On Screen 1 (Home), the 'Add Expense' FAB is not prominent enough for single-handed use. Please change it to a massive, circular Floating Action Button anchored to the bottom-right corner. Use a vibrant contrasting color like Sunset Orange (#F97316) with a heavy drop shadow so it pops completely off the green/white background."

Vòng 2: "On Screen 5 (Transaction History), all amounts look the same. Improve the visual hierarchy and scanning experience: change the text color of income amounts to bold Emerald Green (e.g., +$500), and change expense amounts to bold Rose Red (#E11D48) with a minus sign (e.g., -$15). Add a subtle background pill shape behind the numbers for extra clarity."

Vòng 3: "Screen 4 (Analytics) looks broken when there is no data. Please design a charming 'Empty State' in the center of the screen instead of the chart. It should include a cute, soft-colored illustration of an empty wallet, a friendly grey text saying 'No expenses yet this month!', and a clear Call-To-Action (CTA) button saying 'Add your first expense' to guide the user."

Nguồn: ai/ai-design-log.md, ai/critique-2026-10-08.md, design/design-decisions.md, design/accessibility-report.md

## Slide 07 — Accept, Modify, Reject: quyết định cuối

60 giây. Trình bày 5 quyết định thực tế. Accept đề xuất một Back, Modify FAB cam thành CTA xanh đậm, Accept dấu +/−, Reject Send/Add Funds vì ngoài phạm vi, Modify USD sang VND. Đề xuất AI lịch sử và quyết định cuối có thể khác. Không gọi giả định trong critique mẫu là nguyên văn AI đã xác thực.

Nguồn: design/design-decisions.md, ai/ai-design-log.md, assets/figma/01-home.png, assets/figma/02-add-expense.png

## Slide 08 — Wireframe và 8 màn hình final

55 giây. Tất cả tám ảnh final là export Figma thật 360×800, node IDs trong manifest. Wireframe và Final của Add được giữ nguyên tỷ lệ, không kéo méo. Nhấn mạnh hierarchy số tiền, CTA, sự đồng nhất spacing/typography. States và dialogs không tính thêm vào tám màn hình. Empty component có trong thư viện nhưng chưa chứng minh mọi empty flow đã gắn vào màn hình.

Nguồn: assets/figma/manifest.json, design/screen-spec.md, design/DESIGN.md

## Slide 09 — Design system: tokens và 9 nhóm component

55 giây. Giá trị tokens từ design/DESIGN.md và audit. Radius12 input/button,20 card,24 screen. Variable/styles phải được áp dụng trên UI và component instances, không chỉ nằm trên board. Bảng bên phải là yêu cầu rà soát chín nhóm, không phải chứng nhận đủ tất cả states. Elevation chưa có giá trị final xác nhận. Không tự đặt mức bóng đổ và nói đã tồn tại. Board lịch sử có ba tab, bản final có bốn. Demo chỉ master đúng phiên bản.

Nguồn: design/DESIGN.md, design/figma-build-state.json, handoff/figma-final-checklist.md

## Slide 10 — Accessibility và responsive: kết quả thực tế

55 giây. Báo cáo chứa tám cặp màu tính sRGB, slide chọn bốn cặp tiêu biểu. White trên accent #10B981 chỉ2.54:1, không dùng cho chữ trắng thường. Cỡ chữ và target là giá trị thiết kế, không chứng minh hỗ trợ text scaling/screen reader. Word yêu cầu360/412dp; hiện chỉ có ảnh360. Chưa có kết quả contrast plugin, nhưng Word yêu cầu minh chứng contrast chứ không bắt buộc một plugin cụ thể. Tablabels11 cần sửa/đối chiếu. Không tuyên bố accessibility đạt toàn bộ.

Nguồn: design/accessibility-report.md, design/DESIGN.md, handoff/figma-final-checklist.md

## Slide 11 — Prototype: demo, phục hồi lỗi và giới hạn

40 giây trên slide, sau đó demo5 phút. 0:00–0:35 sáu pages/támfinal. 0:35–1:40 Home, Add, preset30k, Save, loading, số dư1.22m; thử trống/chữ rồi Retry. 1:40–2:20 Analytics, Ăn uống337500, Back. 2:20–3:10 Groups, bill300k chia3=100k hoặc thêmAn chia4=75k; previewreminder, Back. 3:10–4:05 Components master, AutoLayout, variablebinding, instances. 4:05–5:00 một prompt/output/critique/decision/Figmachange, GitHub và mapping. Kiểm tra Back và mọi đường thoát. Scripts hiện dùng NAVIGATE cho error dialog, nên ảnh giống dialog không chứng minh Open overlay. Không nói đã thử live trong lượt này.

Nguồn: handoff/prototype-guide.md, design/figma-prototype-audit.json, design/figma-motion-state.json, presentation/presenter-guide.md

## Slide 12 — Flutter handoff, kết quả và liên kết nộp

45 giây. Hai bảng mapping riêng theo Word. Bảng đầy đủ có trong handoff/flutter-handoff.md, mỗi screen đủ6phần. Đây là đề xuất triển khai tương lai, không phải ứng dụngFlutter chạy được. Bài Lab2 không yêu cầu codeFlutter. Nộp repoGitHub và Figma có quyền xem, README và assetsđủ. Slideskhông có điểm rubricriêng và tài liệu hướng dẫn không yêu cầu nộp slidesriêng. Các links phải được mở kiểm tra quyềntrước nộp. Tài liệu và minh chứng mới được chuẩn bị trên nhánh codex/lab2-evidence-and-handoff. Kiểm tra kết quả push và quyền xem trước khi nộp. Rubric: UX15, AIgeneration10, iteration/critique15, finalUI20, designsystem15, prototype10, handoff10, docs5. Không đồng nhất cóslidesvới đãđạt mọi tiêu chíFigma.

Nguồn: handoff/flutter-handoff.md, handoff/completion-status.md, README.md

## Kịch bản demo 5 phút

1. **0:00–0:35:** mở Figma, chỉ 6 pages và 8 final screens.
2. **0:35–1:40:** Home, Thêm, preset 30.000đ, Lưu, loading, Home 1.220.000đ. Sau đó Lưu trống hoặc thử nhập chữ, Retry. Chỉ gọi Open overlay khi đã kiểm tra đúng interaction.
3. **1:40–2:20:** Activity, chart hoặc dòng Ăn uống, giao dịch 337.500đ, Back.
4. **2:20–3:10:** Groups, tạo 300.000đ, chia 3 người =100.000đ. Nhánh thêm An, chia 4 =75.000đ. Nhắc thanh toán chỉ mở preview.
5. **3:10–4:05:** Components, instance, Auto Layout và variable binding. Chỉ rõ tab bar cuối 4 mục. Mở kết quả Contrast/412 nếu đã bổ sung.
6. **4:05–5:00:** AI log, một cặp before/after và quyết định cuối. GitHub, screen spec và hai mapping trong handoff.

## Câu hỏi thường gặp

- **Vì sao đổi màu primary?** White trên accent #10B981 chỉ 2.54:1, trên #006C49 đạt 6.48:1 theo tính toán.
- **Đề xuất AI nào bị bỏ?** Send/Add Funds khỏi phạm vi app ghi chi tiêu. FAB cam được sửa thành CTA xanh đậm.
- **Ba vòng refine có gì khác nhau?** CTA, nhận biết Thu/Chi, hướng dẫn khi dữ liệu trống. Nguồn phiên tạo cần đối chiếu nếu chưa có lịch sử.
- **Có chạy Flutter chưa?** Chưa. Lab này nộp thiết kế/prototype và handoff triển khai tương lai.
- **Đã đạt dưới 10 giây chưa?** Đây là mục tiêu. Chưa có test người dùng, chỉ minh họa 3 lần chạm preset.
- **412dp, overlay và elevation đã hoàn tất chưa?** Trả lời theo kết quả thực tế trong checklist, không dựa vào việc có slide.

## Trước khi trình bày

- Slide là 12 trang có speaker notes, thời lượng nói gợi ý khoảng 10 phút.
- Hai thành viên đã được người dùng xác nhận. Tên môn và hình thức nhóm cần đối chiếu với giảng viên; không tự phân vai.
- Trạng thái Figma ở slide9–12 được giữ theo minh chứng hiện có. Nếu có kết quả mới, cập nhật cả slide và checklist trước khi nộp.
- Mở các links trong cửa sổ chưa đăng nhập. Repo đổi tên thì cập nhật link trong slide và README.
- Hình minh họa lấy từ assets hiện có. Một số board là bản lịch sử, dùng Figma trực tiếp để chứng minh phiên bản cuối.
