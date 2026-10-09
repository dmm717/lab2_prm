# User flows — StudentPay

## Kiến trúc thông tin

Có 8 màn hình nghiệp vụ. Home, Activity và Groups là ba khu vực chính; tab You là trang thông tin phụ. Dialog/state variants không tính thêm thành màn hình.

```mermaid
flowchart TD
  Root[StudentPay] --> Home[01 Home]
  Root --> Analytics[04 Analytics]
  Root --> Groups[06 Shared bills]
  Root --> You[You - trang phụ]
  Home --> Add[02 Add expense]
  Add --> Category[03 Category picker]
  Analytics --> History[05 Transactions]
  Groups --> Create[07 Create bill]
  Groups --> Detail[08 Bill detail]
  Create --> Detail
```

## Flow 1 — Ghi khoản chi và phục hồi lỗi

Start: Home. Goal: ghi khoản chi 30.000đ. End: Home có kết quả lưu và số dư 1.220.000đ. Prototype dùng preset, không có bàn phím nhập tự do.

```mermaid
flowchart TD
  H[01 Home] -->|Thêm chi tiêu| A[02 Add empty]
  A -->|Preset30.000đ| F[02 Add filled]
  F -->|Đổi danh mục tùy chọn| C[03 Category picker]
  C -->|Chọn/Xong| F
  F -->|Back| H
  F -->|Lưu hợp lệ| L[Loading]
  L --> S[01 Home saved - 1.220.000đ]
  A -->|Lưu khi trống| E[Error overlay]
  A -->|Thử nhập bằng chữ| I[02 Add invalid]
  I -->|Lưu| E
  E -->|Close/Retry - từ form trống| A
  E -->|Close/Retry - từ form invalid| I
```

Ngày 09/10 đã đổi Saveerror sang OVERLAY; Retry/scrim CLOSE vềform gốc. Source scripts04/10 là lịch sử trước thay đổi. GraphAPI xác nhận liên kết, còn chạyPresent. Category hiện trả về form preset; không coi là chứng minh giữ dữ liệu nhập tự do.

## Flow 2 — Xem chi tiêu theo danh mục

Start nghiệp vụ: Home. Starting point prototype riêng: Analytics. Goal: xem giao dịch Ăn uống. End: Transactions có tổng 337.500đ; Back về Analytics.

```mermaid
flowchart TD
  H[01 Home] -->|Activity| A[04 Analytics - 750.000đ]
  A -->|Chạm mảng Ăn uống trên chart| T[05 History Food - 337.500đ]
  A -->|Nhánh thay thế: dòng Ăn uống| T
  A -->|Dòng Nhà trọ| R[05 History Rent - 300.000đ]
  A -->|Dòng Di chuyển| D[05 History Transit - 112.500đ]
  T -->|Back| A
  R -->|Back| A
  D -->|Back| A
  A -->|Tháng9 - nhánh không có dữ liệu| E[Analytics Empty]
  E -->|Tháng10| A
  E -->|Thêm chi tiêu| F[02 Add empty]
```

Chart có dòng danh mục bằng chữ/số tiền để người dùng không chỉ dựa vào màu hoặc vùng chạm nhỏ.

## Flow 3 — Tạo hóa đơn, chia 3 hoặc 4 người

Start nghiệp vụ: Home. Starting point prototype riêng: Groups. Goal: tạo hóa đơn 300.000đ. End: Bill detail với phần chia đúng số thành viên.

```mermaid
flowchart TD
  H[01 Home] -->|Groups| G[06 Shared bills]
  G -->|Tạo hóa đơn| C[07 Create - Quân, Tuấn, Linh]
  C -->|Xác nhận300.000đ| L[Loading - 3 người]
  L --> D[08 Detail - 100.000đ/người]
  C -->|Nhánh thay thế: thêm An| F[Add friend preset]
  F --> C4[07 Create - 4 người]
  C4 -->|Xác nhận| L4[Loading - 4 người]
  L4 --> D4[08 Detail - 75.000đ/người]
  C -->|Back| G
  C4 -->|Back| G
  D -->|Back| G
  D4 -->|Back| G
  D -->|Nhắc thanh toán| P[Reminder preview]
  P -->|Quay lại| D
```

Ba người gồm người trả trước Quân và hai bạn Tuấn/Linh. Reminder chỉ xem trước, không gửi tin nhắn thật. Flow dữ liệu độc lập với luồng expense/analytics.

## Ánh xạ flow–screen

| Flow | Màn hình chính | Nhánh/phản hồi |
|---|---|---|
| 1 | 01 Home, 02 Add, 03 Category | Empty/filled/invalid, Error/Retry, Loading, Home saved |
| 2 | 01 Home, 04 Analytics, 05 Transactions | Chart hoặc dòng danh mục, bộ lọcFood/Rent/Transit, Back |
| 3 | 01 Home, 06 Shared bills, 07 Create, 08 Detail | Thêm An, chia 3/4, Loading, Reminder preview, Back |

Đây là đối chiếu source/audit lưu, chưa chạy lại Present trong lượt này. Các yêu cầu nhập tự do, validate mọi giá trị và dữ liệu đồng bộ thuộc triển khai tương lai trong handoff.
