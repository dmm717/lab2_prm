# Prompt đầy đủ cho phiên Stitch tiếp theo

Trạng thái: **đã chuẩn bị, chưa gửi/chạy trên Stitch**. Prompt này không thay thế hoặc sửa lại prompt lịch sử. Chỉ đánh dấu phiên đã chạy khi có output thật và lưu prompt/output/critique/decision/before-after.

```text
Design StudentPay, a Vietnamese mobile expense tracker and shared-bill app.

Persona: Minh Quan, a 20-year-old Vietnamese university student living with two roommates. His monthly allowance is VND 3,000,000. He often uses the phone with one hand and needs to record small expenses quickly, understand spending by category, and see each roommate's bill share clearly.

Task: Generate eight distinct mobile screens: (1) Home/budget overview, (2) Add Expense, (3) full-screen Category Picker, (4) Analytics, (5) filtered Transaction History, (6) Shared Bills, (7) Create Shared Bill, and (8) Bill Detail. Include separate Empty, Loading, Error and Result states where appropriate. States/dialogs do not count as additional distinct screens.

Platform and layout: mobile touch interface. Show layouts at 360dp and 412dp width. Use 16dp horizontal content padding, fluid-width cards/fields/buttons, scrolling content and fixed header/footer with safe areas. Do not stretch a 360dp screenshot to make the 412dp version. Use four main navigation destinations: Home, Groups, Activity, You. Form/detail screens have one Back action.

Constraints: Vietnamese labels and integer VND amounts formatted with dot separators. Every meaningful label/body text is at least 14sp. Every interactive target is at least 48 by 48dp. Primary buttons are 52dp high. Normal-text contrast must be at least 4.5:1, large-text/control contrast at least 3:1. Communicate state with text/icons/signs as well as color. Provide accessible category rows as alternatives to tapping donut segments.

Data and flows: Default expense category is An uong and default date is today. The fast demo path is Add, VND30,000 preset, Save. Reject blank, letters, zero and negative amounts with an error dialog and recovery. A successful save goes through Loading to Home, updating VND1,250,000 to VND1,220,000. Analytics sample total VND750,000: Food45%, Rent40%, Transport15%. Shared bill VND300,000 split between Quan, Tuan and Linh is VND100,000 each; adding An changes it to four shares of VND75,000. Reminders are previews and do not send real messages. Exclude bank transfers, Send and Add Funds from scope.

Style: Inter. Primary #006C49, background #FAF8FF, surface #FFFFFF, main text #131B2E, secondary text #52625C, error #BA1A1A on #FFDAD6. White on primary meets 4.5:1; do not use white text on #10B981. Type scale28/36,24/32,18/26,16/24,14/20. Spacing4/8/12/16/24/32. Radius12 for inputs/buttons and20 for cards. Use restrained shadows with a documented elevation scale, and a consistent component family for Button, Text field, Card, Navigation, App bar, Dialog, Loading, Empty and Error.

Explain the layout decisions and identify remaining limitations. Keep all eight screens consistent and retain the error-recovery and alternate paths.
```

Mẫu record sau khi thực sự chạy:

| Trường | Cách ghi |
|---|---|
| Công cụ, ngày, project/session | Tên thực tế và link truy cập được |
| Prompt | Giữ nguyên văn đúng phiên đã gửi |
| Output | Ảnh/file thật, đặt tên và liên kết rõ |
| Critique | Ít nhất năm vấn đề cụ thể, screen + căn cứ |
| Decision | Accept/Modify/Reject + lý do |
| Change | Node Figma và ảnh trước/sau của thay đổi thật |
