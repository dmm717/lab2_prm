# Phân tích UX - User Flow

## 1. Information Architecture (Kiến trúc thông tin)
- **Cấp 1 (Màn hình chính - Truy cập qua Navigation Bar đáy):**
  1. Màn hình Home (Tổng quan)
  2. Màn hình Thống kê (Analytics)
  3. Màn hình Danh sách Chia tiền (Split Bill Dashboard)
- **Cấp 2 (Màn hình phụ lồng bên trong):**
  4. Màn hình Thêm chi tiêu (truy cập từ Home)
  5. Màn hình Danh sách Giao dịch chi tiết (truy cập từ Thống kê)
  6. Màn hình Tạo hóa đơn chia tiền (truy cập từ Split Bill)
  7. Màn hình Chi tiết hóa đơn (truy cập từ Split Bill hoặc sau khi Tạo xong hóa đơn)
- **Cấp 3 (Màn hình con):**
  8. Màn hình Chọn Danh mục (truy cập từ Thêm chi tiêu)

*(Lưu ý: 8 màn hình ở đây sẽ tương ứng chính xác với 8 bản vẽ thiết kế UI ở các giai đoạn sau)*

## 2. User Flows (Sơ đồ luồng người dùng)

### Flow 1: Thêm khoản chi tiêu mới (Có nhánh lỗi - Error Path)
- **Điểm bắt đầu:** Màn hình Home.
- **Mục tiêu:** Ghi lại một khoản tiền ăn trưa (30,000 VND).
- **Điểm kết thúc:** Màn hình Home (cập nhật số dư mới).

```mermaid
graph TD
    %% Styling Definitions
    classDef startEnd fill:#10B981,stroke:#047857,stroke-width:3px,color:#ffffff,font-weight:bold,rx:25px,ry:25px;
    classDef screen fill:#F0FDF4,stroke:#10B981,stroke-width:2px,color:#065F46,font-weight:600,rx:8px,ry:8px;
    classDef action fill:#FFFFFF,stroke:#CBD5E1,stroke-width:1.5px,color:#1E293B;
    classDef decision fill:#FEF3C7,stroke:#F59E0B,stroke-width:2px,color:#92400E,shape:diamond;
    classDef error fill:#FEE2E2,stroke:#EF4444,stroke-width:2px,color:#991B1B,font-weight:600,rx:8px,ry:8px;
    classDef system fill:#EFF6FF,stroke:#3B82F6,stroke-width:1.5px,color:#1E40AF,stroke-dasharray: 4 4;

    %% Flow Nodes
    Start([● Bắt đầu: Màn hình Home]):::startEnd
    HomeFAB[Màn hình chính Home<br/>Hiện Số dư & Lịch sử giao dịch]:::screen
    AddScreen[Màn hình Thêm chi tiêu<br/>Bàn phím, Ghi chú & Nút Danh mục]:::screen
    CatPicker[Màn hình Chọn Danh mục<br/>Danh sách Lưới 3 cột]:::screen
    
    CheckAmount{Số tiền là số nguyên > 0?}:::decision
    ShowError[Hiển thị cảnh báo lỗi<br/>'Vui lòng nhập số tiền']:::error
    ProcessSave[Xử lý & Lưu giao dịch<br/>Trừ tiền khỏi Ngân sách]:::system
    End([✔ Kết thúc: Màn hình Home<br/>đã cập nhật số dư]):::startEnd

    %% Happy Path & Error Flow Connections
    Start -->|Xem số dư| HomeFAB
    HomeFAB -->|Bấm nút '+'| AddScreen

    %% Path 1: User enters amount
    AddScreen -->|Nhập '30,000' bằng phím số| AddScreen
    AddScreen -->|Bấm chọn danh mục| CatPicker
    CatPicker -->|Chọn icon 'Ăn uống'| AddScreen
    AddScreen -->|Bấm 'Lưu chi tiêu'| CheckAmount

    %% Decision Validation
    CheckAmount -->|Không: Nhập chữ, trống, số âm hoặc = 0| ShowError
    ShowError -->|Yêu cầu nhập lại số tiền| AddScreen

    CheckAmount -->|Có: Số tiền hợp lệ| ProcessSave
    ProcessSave -->|Trở về Home với Thông báo thành công| End
```

### Flow 2: Xem thống kê chi tiêu tháng (Có nhánh thay thế - Alternative Path)
- **Điểm bắt đầu:** Màn hình Home.
- **Mục tiêu:** Kiểm tra chi tiết các giao dịch thuộc danh mục "Ăn uống" trong tháng.
- **Điểm kết thúc:** Màn hình Danh sách Giao dịch chi tiết.

```mermaid
flowchart TD
    Start((Bắt đầu: Home)) --> A[Chuyển sang Tab Thống kê]
    A --> B[Màn hình Analytics]
    
    %% Happy Path
    B -->|Nhánh thành công: Bấm vào phần màu 'Ăn uống'\ntrên biểu đồ tròn| C[Màn hình Danh sách Giao dịch]
    
    %% Alternative Path
    B -->|Nhánh thay thế: Cuộn xuống danh sách bên dưới\nvà bấm vào hàng 'Ăn uống'| C
    
    C --> End((Kết thúc: Xem chi tiết))
```

### Flow 3: Tạo hóa đơn chia tiền (Có nhánh thay thế - Alternative Path)
- **Điểm bắt đầu:** Màn hình Home.
- **Mục tiêu:** Tạo hóa đơn đi siêu thị chung (300k) và chia tiền cho 2 người bạn.
- **Điểm kết thúc:** Màn hình Chi tiết hóa đơn (Bill Detail).

```mermaid
flowchart TD
    Start((Bắt đầu: Home)) --> A[Chuyển sang Tab Split Bills]
    A --> B[Màn hình Split Bills Dashboard]
    B --> C[Bấm nút 'Tạo mới']
    C --> D[Màn hình Tạo hóa đơn chia tiền]
    
    %% Alternative Path
    D -->|Nhánh thay thế: Bạn bè chưa có trong danh bạ| E[Bấm 'Thêm bạn mới' -> Nhập tên]
    E --> F
    
    %% Happy Path
    D -->|Nhánh thành công: Bạn bè đã có sẵn| F[Nhập 300k và tick chọn 2 người bạn]
    F --> G[Bấm 'Xác nhận']
    G --> End((Kết thúc: Màn hình Chi tiết hóa đơn))
```

## 3. Bảng ánh xạ Flow sang Màn hình

Bảng dưới đây đảm bảo cả 8 màn hình trong Information Architecture đều được đi qua ít nhất một lần.

| User Flow | Các màn hình được sử dụng |
| :--- | :--- |
| **Flow 1** | 01. Home, 02. Thêm chi tiêu, 03. Chọn Danh mục |
| **Flow 2** | 01. Home, 04. Thống kê, 05. Danh sách Giao dịch chi tiết |
| **Flow 3** | 01. Home, 06. Split Bill Dashboard, 07. Tạo hóa đơn, 08. Chi tiết hóa đơn |

## Quy ước bản final 04/10/2026

Số 01–08 theo `design/screen-spec.md`. Đường nhanh dùng danh mục/ngày mặc định: Thêm → preset 30.000đ → Lưu, không bắt buộc mở Category Picker. Nhánh lỗi nhập bằng chữ được thể hiện trong Prototype / Add invalid và Amount error dialog. Chia 3 người gồm Quân (người trả trước), Tuấn và Linh.
