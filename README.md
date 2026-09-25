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

## S-01 - Chạy ứng dụng local bằng một lệnh

### Yêu cầu

- Docker Desktop hoặc Docker Engine có Docker Compose.
- Git.

### Chạy lần đầu

```bash
git clone https://github.com/ttcs-k18-n2/agri-trace-coldchain-t926-k18c4-n2.git
cd agri-trace-coldchain-t926-k18c4-n2
cp .env.example .env
docker compose up --build
```

Trên Windows PowerShell, thay lệnh `cp` bằng:

```powershell
Copy-Item .env.example .env
docker compose up --build
```

Sau khi các container chạy:

- Frontend: http://localhost:8080
- Backend: http://localhost:3000
- Health check: http://localhost:3000/health
- PostgreSQL: localhost:5432

Trang frontend sẽ gọi `/api/health`. Khi backend và PostgreSQL kết nối thành công, màn hình hiển thị:

```text
Backend: ok | PostgreSQL: connected
```

### Dừng ứng dụng

```bash
docker compose down
```

Muốn xóa luôn dữ liệu PostgreSQL để chạy lại migration từ đầu:

```bash
docker compose down -v
docker compose up --build
```

> Các file SQL trong `db/migrations/` được PostgreSQL chạy tự động khi volume database được tạo lần đầu.

## Cấu trúc repository

```text
.
├── backend/
│   ├── src/
│   │   └── index.js
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   └── nginx.conf
├── db/
│   └── migrations/
│       └── 001_init.sql
├── .env.example
├── docker-compose.yml
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
- `feature/N2-S01-project-setup`
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
