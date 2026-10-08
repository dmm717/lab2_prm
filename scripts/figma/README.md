# Scripts dựng Figma Lab 2

Đây là JavaScript cho `use_figma` Plugin API, không chạy bằng Node.js hay trình duyệt thông thường.

- File đích: `C7FiWYzVXUS8G2cnK5AGos`.
- Đọc skill `figma-use` trước khi chạy; `figma-generate-library` cho variables/components và `figma-generate-design` cho screens.
- Các scripts 02–09 được ghép sau `shared.js`; script 02 còn dùng helper `createComponentWithVariants.js` từ skill, đã bỏ việc chọn lại page trong helper để chỉ chuyển page một lần/call.
- `04-layout-fixes.js` cần khai báo `PAGE_ID` là page Components hoặc Final UI trước khi chạy. Các ID component/frame là ID thật từ lượt dựng này, không dùng script trên file khác mà chưa kiểm tra lại.
- `05-prototype.js` là bước tạo ban đầu; 06 và 09 bổ sung/điều chỉnh các nhánh. Không chạy riêng 05 sau 06/09 vì có thể đặt lại reactions về trạng thái cũ.
- `10-reuse-components.js` chạy độc lập sau 09, khai báo `targetPageId` là `1:3` rồi `1:6` trong hai call tuần tự. Script tái sử dụng bộ StudentPay gốc: status bar, navigation bar, tab bar, button, form input và transaction row. Ledger ở `design/figma-component-reuse.json`. Primary button gốc được bind lại vào token `color/primary` để chữ trắng đủ tương phản.
- 11 chỉnh proportions ở component master; 12 áp dụng typography/width cho từng page; 13 thêm thanh vuốt riêng cho màn không có tabs; 14 dùng đúng tab bar Overview (Home / Groups / Activity / You); 15 là audit read-only. 12–15 chạy độc lập, khai báo `targetPageId` là `1:3` hoặc `1:6`. Ledger cập nhật: `design/figma-ui-refinement.json`.
- Các component đã bổ sung vào thư viện gốc: Groups/You selection (`95:62`, `95:82`), iOS Home indicator (`90:885`, tái sử dụng safe area của tab bar), FoodTile (`98:62`, tái sử dụng icon Food gốc). Đây là prerequisites đã tồn tại trong file cho scripts 13–14, không phải ID có thể dùng trên file khác.
- Chạy từng bước tuần tự qua Figma MCP, kiểm tra canvas trước khi tiếp tục; không chạy đồng thời các mutation.
- `design/figma-build-state.json` chứa ledger ID và `design/figma-prototype-audit.json` chứa audit cuối. Đây là source script lưu để review, không phải một installer có thể chạy tùy ý.

Có thể kiểm tra các file local bằng `python3 scripts/validate_submission.py` từ thư mục repo.

- Motion/header: chạy 16 để thêm pressed interaction vào component; 18 với `targetPageId` lần lượt `1:3`, `1:6` để tách Content cuộn và cố định chrome; sau đó 17 để thêm chuyển trang, loading và Analytics entrance. Đọc cả `figma-use-motion` khi chạy 16/17. 15 audit cả visibility, chrome và navigation, tách CHANGE_TO khỏi navigation. Ledger: `design/figma-motion-state.json`.
