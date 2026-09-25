# TTCS K18 N2 - Agri Traceability

Hệ thống truy xuất nguồn gốc và giám sát chuỗi lạnh nông sản của nhóm **TTCS_T926_K18C4_N2**.

## Sprint 1

**Sprint Goal:** Vùng trồng khai báo được thửa đất của mình trên môi trường staging chạy thật, và mọi thay đổi mã đều đi qua CI.

**Capacity:** 12 SP.

Phạm vi Sprint 1:
- S-01: Khung ứng dụng chạy được trên máy cá nhân bằng một lệnh.
- S-02: Pipeline CI chặn merge khi build, lint hoặc test đỏ.
- S-03: Merge vào nhánh chính thì staging tự cập nhật.
- K-01: Chọn cách chống sửa lén bản ghi sự kiện.
- S-04: Đăng nhập bằng email và mật khẩu, khoá tạm sau 5 lần sai.
- S-05: Mỗi tổ chức chỉ thấy dữ liệu của chính mình.
- S-06: Vùng trồng khai báo thửa đất của mình.

Chi tiết Story, Task, người phụ trách và branch xem tại [docs/SPRINT-1.md](docs/SPRINT-1.md).


## S-01 — Chạy ứng dụng local bằng một lệnh

### Yêu cầu

- Git.
- Docker Desktop hoặc Docker Engine có Docker Compose.

### Khởi động lần đầu

Linux/macOS:

```bash
git clone https://github.com/ttcs-k18-n2/agri-trace-coldchain-t926-k18c4-n2.git
cd agri-trace-coldchain-t926-k18c4-n2
git checkout feature/s1-s01-app-setup
cp .env.example .env
docker compose up --build
```

Windows PowerShell:

```powershell
git clone https://github.com/ttcs-k18-n2/agri-trace-coldchain-t926-k18c4-n2.git
cd agri-trace-coldchain-t926-k18c4-n2
git checkout feature/s1-s01-app-setup
Copy-Item .env.example .env
docker compose up --build
```

Sau khi container sẵn sàng:

- Frontend: http://localhost:8080
- Backend: http://localhost:3000
- Health check: http://localhost:3000/health
- PostgreSQL: localhost:5432

Khi hệ thống hoạt động bình thường, `GET /health` trả `status: ok` và `database: connected`.

### Migration

Migration đầu tiên nằm tại `db/migrations/001_init.sql` và được PostgreSQL chạy khi volume database được tạo lần đầu.

Chạy lại migration từ đầu:

```bash
docker compose down -v
docker compose up --build
```

Dừng ứng dụng:

```bash
docker compose down
```

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
├── docs/
├── .env.example
├── docker-compose.yml
└── README.md
```

## Git workflow

Không code trực tiếp lên `main` hoặc `develop`.

Luồng làm việc:

```text
Story branch -> develop -> main
```

### Quy ước branch

- `feature/s<sprint>-s<story>-<short-name>`: Story phát triển chức năng.
- `fix/s<sprint>-s<story>-<short-name>`: sửa lỗi của Story.
- `docs/s<sprint>-k<spike>-<short-name>`: tài liệu/spike.
- `docs/s<sprint>-<short-name>`: tài liệu quản lý Sprint.

Ví dụ:

```text
feature/s1-s01-app-setup
feature/s1-s02-ci
feature/s1-s04-login
docs/s1-k01-integrity
```

**Branch được đặt theo Sprint + Story, không đặt theo tên thành viên.** Người phụ trách được quản lý trong Jira và tài liệu phân công. Nếu một Story có nhiều Task, các Task cùng làm trên branch của Story và ghi mã Task trong commit.

Ví dụ S-02 có T-03 và T-04:

```text
branch: feature/s1-s02-ci

feat: T-03 configure CI build lint test
chore: T-04 configure branch protection
```

### Quy trình

1. Cập nhật `develop` mới nhất.
2. Chuyển sang branch Story được giao và đồng bộ branch đó với `develop`.
3. Code theo Task; commit ghi rõ mã Task và nội dung thay đổi.
4. Push branch lên GitHub.
5. Tạo Pull Request từ Story branch vào `develop`.
6. Có ít nhất một thành viên khác review trước khi merge.
7. Chỉ merge khi CI xanh và Acceptance Criteria đạt.
8. Cuối Sprint, khi bản tích hợp ổn định, tạo Pull Request từ `develop` vào `main`.

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

Ưu tiên thêm mã Task ở đầu nội dung:

```text
feat: T-09 add login session
test: T-13 reject cross-organization access
docs: K-01 document event-integrity decision
```

## Definition of Done

Một Story/Task chỉ được coi là Done khi các mục áp dụng đều đạt:

- Acceptance Criteria đạt trên **staging**, không chỉ trên máy cá nhân.
- Code review được duyệt bởi ít nhất một thành viên khác.
- Có unit/integration test phù hợp cho logic mới.
- CI xanh: build, lint, typecheck, test.
- Không có secret trong mã nguồn; quét phụ thuộc sạch.
- Không log dữ liệu định danh nông hộ.
- README/tài liệu được cập nhật nếu đổi hành vi công khai hoặc biến môi trường.
- Các kiểm thử đặc thù về integrity/graph/concurrency phải có khi Story liên quan.

## Team workflow

- **Jira:** Sprint, Story/Task, assignee, trạng thái và tiến độ.
- **GitHub:** source code, branch, commit, Pull Request và review.
- **Scrum Master:** theo dõi Jira, branch, PR, CI, blocker và dependency; không thay người thực hiện.
- Daily Scrum: hôm qua làm gì, hôm nay làm gì, đang vướng gì.
- Nếu bị block, báo sớm thay vì chờ đến cuối Sprint.
