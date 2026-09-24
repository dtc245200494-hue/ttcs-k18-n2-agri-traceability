# TTCS K18 N2 - Agri Traceability

Hệ thống truy xuất nguồn gốc và giám sát chuỗi lạnh nông sản của nhóm **TTCS_T926_K18C4_N2**.

## Sprint 1

**Sprint Goal:** Vùng trồng khai báo được thửa đất của mình và ghi nhận được lô thu hoạch đầu tiên.

Phạm vi Sprint 1:
- Chạy được trên máy cá nhân.
- Setup khung Backend và Frontend.
- Thiết kế cơ sở dữ liệu trong phạm vi Sprint 1.
- Đăng nhập và phân quyền cơ bản.
- Thêm, sửa, xem danh sách thửa đất.
- Ghi nhận và xem lại lô thu hoạch đầu tiên.
- Chuẩn bị kịch bản demo cuối sprint.



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

Luồng làm việc:

```text
feature/... -> develop -> main
```

Quy ước branch:
- `feature/N2-<issue>-<short-name>`
- `fix/N2-<issue>-<short-name>`
- `docs/<short-name>`

Ví dụ:
- `feature/N2-1-project-setup`
- `feature/N2-2-database-schema`
- `feature/N2-3-login`
- `feature/N2-4-land-management`

Quy trình:
1. Pull branch `develop` mới nhất.
2. Tạo branch riêng cho task.
3. Commit rõ nội dung thay đổi.
4. Push branch lên GitHub.
5. Tạo Pull Request vào `develop`.
6. Có người review trước khi merge.
7. Cuối Sprint, khi bản tích hợp ổn định, tạo Pull Request từ `develop` vào `main`.

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

Ví dụ:

```text
feat: add land plot creation API
fix: validate harvest lot date
docs: update local setup guide
```

## Definition of Done cơ bản

Một task được coi là xong khi:
- Đáp ứng đúng yêu cầu/Acceptance Criteria.
- Chạy được trên máy local.
- Không làm hỏng chức năng đã có.
- Đã push code và tạo Pull Request.
- Pull Request đã được review.
- Có thể demo được nếu task thuộc luồng nghiệp vụ Sprint.

## Team workflow

- Jira là nơi quản lý Sprint, task, assignee và tiến độ.
- GitHub là nơi quản lý source code, branch, commit và Pull Request.
- Daily: hôm qua làm gì, hôm nay làm gì, đang vướng gì.
- Nếu bị block, báo sớm trên kênh nhóm thay vì chờ đến cuối Sprint.
