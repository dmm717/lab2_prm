# Đối chiếu Canva cuối với Word — 09/10/2026

Đã đọc toàn bộ PRM323_Lab2_HuongDan_Slide_Presentation_Demo.docx. Word là hướng dẫn dựa trên đề Lab2; đề gốc không có trong workspace. Nội dung tài liệu được dùng làm tiêu chí đối chiếu yêu cầu của người dùng.

| Slide | Yêu cầu trong Word | Nội dung và giới hạn minh chứng |
|---|---|---|
| 01 | Product, đối tượng, thành viên/vai trò, links | StudentPay, sinh viên ở trọ, Nhân SE192336/Huy SE192382 và phạm vi nhóm. Chưa có vai trò cá nhân. |
| 02 | Persona, pains, problem, success criteria | Quân 20 tuổi, ba pain points, problem statement, mục tiêu 3 chạm/dưới 10 giây. Chưa có usability test. |
| 03 | IA/navigation, ít nhất 8 screens | Sitemap ba khu vực, đủ 8 screen; You là trang phụ. |
| 04 | Ba flow, start/goal/end, alternate/error/recovery, screen map | Ba sơ đồ node/arrow có nhánh error overlay, chọn chart/dòng và chia 3/4 người. |
| 05 | Prompt nguyên văn, persona/task/mobile/constraints/style, Stitch output | Prompt lịch sử và ảnh có sẵn; full prompt trong notes. Prompt cũ thiếu VND/360–412/accessibility. Prompt mới đầy đủ đã chuẩn bị, chưa chạy; nguồn phiên Stitch chưa xác thực. |
| 06 | Ít nhất 3 refine khác mục tiêu, before/after, ít nhất 5 issues | Ba cặp ảnh CTA/Thu Chi/Empty và ba prompt trong notes. Critique Codex mới có 8 issues, 5 trên slide. Chưa xác thực lịch sử ba phiên refine. |
| 07 | 3–5 quyết định Accept/Modify/Reject có lý do | Năm quyết định gắn với persona, heuristic và scope. |
| 08 | Wireframe/final, hierarchy/consistency/states, ít nhất 8 UI | Tám PNG final mới, cặp Add wireframe/final; Empty CTA/Error overlay/Loading result có node và ảnh thật. |
| 09 | Tokens/type/spacing/radius/elevation, styles/variables, instances | 39 foundation + 2 prototype variables, 6 text styles, 3 effect styles; chín nhóm master/showcase. Budget card dùng instance trên Home. |
| 10 | Contrast, target 48, text 14, 360/412, không chỉ màu | Tám UI mỗi width, lề 16/content 328–380, min text 14, CTA 52/Back 48. Tám cặp màu chữ và viền input 3.87:1. Chưa test nội dung dài/toàn bộ UI. |
| 11 | Ba live flow, Back, overlay, loading/result, không dead ends | Graph có 3 starting points, 95 NODE navigation và 2 CLOSE; Save OVERLAY/Retry CLOSE, Empty CTA. Chưa nghiệm thu tương tác trong Present. |
| 12 | Sáu phần/screen, hai mapping tables, kết quả/giới hạn/links | Tám handoff, mỗi screen đủ sáu phần; hai bảng Token→Flutter và Component→Widget trên slide và repo. |

Đã sửa Figma trực tiếp và xem ảnh native của tám UI360/tám QA412. Có 20 PNG mới kèm node/hash. Graph kiểm tra đích, starting points và recovery; không thay thế chạy Present. Đã rà 12 bố cục nguồn slide, không phát hiện overflow, và đọc lại nội dung/12 notes trên Canva. Metadata import là `unknown`; chưa visual QA editor vì browser permissions. [Canva](canva-link.md). [Thay đổi Figma](../design/figma-changes-2026-10-09.md).

Còn cần chạy Present và test nội dung dài/bàn phím; kiểm tra quyền xem Figma của người ngoài; xác thực lịch sử Stitch/ba refine nếu còn phiên gốc. Hai tên đúng, nhưng vai trò cá nhân, PRM323/PRM393 và giảng viên cho phép nhóm chưa được xác nhận. Bài nộp GitHub + Figma có quyền xem. Word không yêu cầu Flutter code/APK; slides không có điểm rubric riêng.
