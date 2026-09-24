# TTCS K18 N2 - Agri Traceability

Hệ thống **truy xuất nguồn gốc và giám sát chuỗi lạnh nông sản** của nhóm **TTCS_T926_K18C4_N2**.

> Nguồn chuẩn cho kế hoạch Sprint/Backlog: file `Truy xuất nguồn gốc và giám sát chuỗi lạnh nông sản.xlsx`. Jira dùng để theo dõi tiến độ thực thi; tài liệu trong repo phải bám theo backlog này.

## Product Goal

Chuỗi cung ứng nông sản truy được nguồn gốc từng lô từ vườn tới tay người mua, phát hiện được vi phạm chuỗi lạnh, và khi có sự cố thì chỉ ra đúng và đủ mọi lô hàng liên quan trong vòng vài phút thay vì vài ngày.

## Sprint 1

**Sprint Goal:** Vùng trồng khai báo được thửa đất của mình trên môi trường staging chạy thật, và mọi thay đổi mã đều đi qua CI.

**Capacity:** 12 SP — **Đã xếp:** 12 SP.

| ID | Nội dung | SP |
| --- | --- | ---: |
| S-01 | Khung ứng dụng chạy được trên máy cá nhân bằng một lệnh | 2 |
| S-02 | Pipeline CI chặn merge khi build, lint hoặc test đỏ | 1 |
| S-03 | Merge vào nhánh chính thì staging tự cập nhật | 2 |
| K-01 | Chọn cách chống sửa lén bản ghi sự kiện | 2 |
| S-04 | Đăng nhập bằng email và mật khẩu, khoá tạm sau 5 lần sai | 2 |
| S-05 | Mỗi tổ chức chỉ thấy dữ liệu của chính mình | 2 |
| S-06 | Vùng trồng khai báo thửa đất của mình | 1 |
| **Tổng** |  | **12** |

Chi tiết 15 task của Sprint 1 nằm tại [docs/SPRINT-1.md](docs/SPRINT-1.md).

### Lưu ý phạm vi

- **CI/CD và staging là bắt buộc ngay trong Sprint 1** theo E-01, S-02 và S-03.
- `S-08 — Ghi nhận lô thu hoạch với mã lô sinh tự động` thuộc **Sprint 2**, không phải Sprint 1.
- `K-01` là Spike: so sánh chuỗi hash trong bảng thường, quyền DB chống sửa/xoá và blockchain; đầu ra là tài liệu lựa chọn kỹ thuật. Không viết mã sản phẩm trong Spike.
- File backlog **không chỉ định stack cụ thể**. T-01 yêu cầu khởi tạo dự án theo stack team chọn, nhưng bắt buộc có ứng dụng + PostgreSQL chạy bằng Docker Compose và có `.env.example`.

## Cấu trúc repository

```text
.
├── backend/      # Source code Backend
├── frontend/     # Source code Frontend
├── docs/         # Tài liệu dự án
└── README.md
```

## Git workflow

Không code trực tiếp lên `main`.

Luồng làm việc của nhóm:

```text
feature/... -> develop -> main
```

Quy ước branch:

- `feature/N2-<issue>-<short-name>`
- `fix/N2-<issue>-<short-name>`
- `docs/<short-name>`

Quy trình:

1. Cập nhật `develop`.
2. Tạo branch riêng cho task Jira.
3. Code và commit trong đúng phạm vi task.
4. Push branch lên GitHub.
5. Mở Pull Request vào `develop`.
6. CI phải chạy build, lint, typecheck và test; PR phải được ít nhất một thành viên khác review.
7. Khi bản tích hợp của Sprint ổn định, mở PR `develop -> main`.
8. `main` phải chặn push trực tiếp; PR vào `main` chỉ merge khi CI xanh và có ít nhất một người duyệt.
9. Merge vào `main` phải kích hoạt triển khai staging theo S-03.

Xem thêm [docs/WORKFLOW.md](docs/WORKFLOW.md).

## Commit convention

Khuyến nghị:

```text
feat: ...
fix: ...
docs: ...
refactor: ...
test: ...
chore: ...
```

Nên gắn Jira key khi có thể, ví dụ:

```text
feat(N2-60): initialize app and PostgreSQL with docker compose
```

## Definition of Done

Theo file backlog:

- Code review đã duyệt bởi ít nhất một thành viên khác.
- Có unit test cho nhánh logic mới; độ phủ trên phần thay đổi không giảm.
- CI xanh: build, lint, typecheck, test.
- Không có secret trong mã nguồn; quét phụ thuộc sạch.
- Acceptance Criteria pass trên môi trường staging, không chỉ trên máy cá nhân.
- Story chạm sự kiện của lô: kiểm tra toàn vẹn chuỗi vẫn hợp lệ sau khi chạy.
- Story chạm đồ thị phả hệ: có ca kiểm thử với bộ dữ liệu mẫu có đáp án đếm tay và ca chu trình.
- Story chạm khối lượng: có test hai giao dịch đồng thời.
- Không log dữ liệu định danh nông hộ.
- README được cập nhật nếu đổi hành vi công khai hoặc thêm biến môi trường.

## Team workflow

- Jira: Sprint, backlog, task, assignee và tiến độ.
- GitHub: source code, branch, commit, Pull Request và CI/CD.
- Daily Scrum: hôm qua làm gì, hôm nay làm gì, đang vướng gì.
- Nếu bị block, báo sớm trên kênh nhóm.
