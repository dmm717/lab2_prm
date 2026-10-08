# Đối chiếu bản Canva cuối với Word

Đã đọc toàn bộ `C:\Users\Admin\Downloads\PRM323_Lab2_HuongDan_Slide_Presentation_Demo.docx` và tài liệu source ngày 08/10/2026. Word là hướng dẫn dựa trên đề Lab2; đề gốc không có trong workspace. Nội dung Word được dùng làm tiêu chí đối chiếu.

| Slide | Yêu cầu trong Word | Bản cuối và giới hạn minh chứng |
|---|---|---|
| 01 | Product, đối tượng, thành viên/vai trò, vấn đề, links | StudentPay, sinh viên ở trọ, Nhân SE192336 và Huy SE192382, phạm vi nhóm, Figma/GitHub. Chưa có phân công cá nhân để tự ghi vai trò từng người. |
| 02 | Persona, pain points, problem statement, success criteria | Quân 20 tuổi, ba vấn đề, statement, mục tiêu 3 chạm/dưới 10 giây. Chưa có usability test. |
| 03 | IA/sitemap, navigation, ít nhất 8 màn hình | Sơ đồ phân cấp Home/Activity/Groups, đủ 8 screen. Tab You là trang phụ. |
| 04 | 3 sơ đồ flow, start/goal/end, alternate, error recovery, screen map | Ba chuỗi node/arrow có số màn hình, nhánh Error/Retry, chọn chart/dòng và chia 3/4 người. |
| 05 | Prompt nguyên văn có persona/task/mobile/constraints/style, UI đầu ra | Trích prompt trên slide, toàn bộ trong notes và ảnh AI thật. Prompt lịch sử thiếu VND/360–412/accessibility, được ghi rõ. |
| 06 | Ít nhất 3 refine khác mục tiêu, trước/sau, ít nhất 5 UX issues cụ thể | Ba cặp ảnh CTA/Thu Chi/Empty, 5 issues gắn màn hình, 3 prompt trong notes. Đã có lượt Codex AI critique mới8 phát hiện, 5 hiển thị trên slide. Lịch sử3refine vẫn chưa xác thực, critique mẫu cũ không giả làm phản hồi nguyên văn. |
| 07 | 3–5 quyết định Accept/Modify/Reject có căn cứ | Năm quyết định với lý do gắn persona, heuristic và phạm vi. |
| 08 | Wireframe/final, hierarchy/consistency/states, đủ 8 UI | Tám export Figma thật và cặp Add wireframe/final. Loading/Error/Result có ảnh. Empty chưa chứng minh được áp dụng đầy đủ. |
| 09 | Color/type/spacing/radius/elevation, variables/styles, instances | Giá trị token thật, số variable/style từ audit, bảng 9 nhóm/states. Elevation và đầy đủ masters/states/instances cần kiểm tra trực tiếp. |
| 10 | Contrast, target 48, text 14, 360/412, không chỉ màu | Contrast sRGB, 360×800, button 52/Back 48, body 16/caption 14. 412 chưa kiểm tra, tab label 11 dưới ngưỡng. |
| 11 | Prototype 3 flow, Back, overlay, loading/result, không dead ends | Ảnh Error/Loading/Result, link prototype, demo 5 phút trong notes. Scripts dùng NAVIGATE, chưa xác nhận Open overlay hoặc chạy lại live. |
| 12 | 6 phần/screen, 2 bảng mapping, kết quả/giới hạn/links | Hai bảng Token→Flutter và Component→Widget, ví dụ screen 02 đủ 6 phần, links và giới hạn. Full handoff đủ 8 screen trong repo. |

## Những điều kiện Lab2 cần xác nhận ngoài slide

- Đúng 6 pages: 01 User Flow, 02 Wireframe, 03 Final UI, 04 Design System, 05 Components, 06 Prototype. Dialog/state không cộng thành screen thứ 9.
- Kiểm tra thật 360/412dp, text ≥14sp, contrast từng control, elevation, 9 nhóm component/states và instances/variables/Auto Layout.
- Chạy 3 flow, Back, error/recovery, Open overlay, loading/result và mọi đường thoát.
- Xác thực prompt/output/critique/decision/Figma change từ lịch sử AI nếu còn.
- Đề gốc cá nhân, làm nhóm chỉ khi giảng viên cho phép. Tên môn Word PRM323 khác Figma PRM393.
- Nộp GitHub + Figma có quyền xem, README và assets. Không cần Flutter code. Slides không có điểm rubric riêng và hướng dẫn không yêu cầu nộp slide riêng.

## Phạm vi kiểm tra đã làm

Đã đọc Word/source, rà soát 12 bố cục nguồn tĩnh và không phát hiện text vượt vùng dự kiến. Đã đọc lại nội dung, 12 notes và page count trên Canva. Bản cuối có 12 trang 1280×720, text tách thành các đối tượng để giữ ngắt dòng. Metadata của bản HTML nhập là `unknown`; không khẳng định preset Presentation.

Chưa kiểm tra hình hiển thị cuối trong editor Canva hoặc Figma trực tiếp: trình duyệt không xác minh được quyền truy cập đã lưu, nên dừng và không vượt qua kiểm tra này. Kết nối Canva vẫn cho phép tạo và đọc nội dung. Preview local là render bố cục nguồn, không phải Canva export. Không nâng các mục thiếu minh chứng thành Pass.


## Bổ sung sau lượt hoàn thiện

Có AI critique thực tế mới và record hash ảnh. Có prompt Stitch đầy đủ đã chuẩn bị nhưng chưa chạy. Đã sửa sơ đồ UX để mô tả preset/Back/alternate/error đúng source; đã kiểm tra handoff 8 screen đủ 6 phần. Implementation plan là đặc tả sửa, không phải minh chứng Figma đã đổi. Link Canva mới xem canva-link.md.
