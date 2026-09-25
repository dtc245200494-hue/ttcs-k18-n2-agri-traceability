# TTCS K18 N2 - Agri Traceability

Hệ thống truy xuất nguồn gốc và giám sát chuỗi lạnh nông sản của nhóm **TTCS_T926_K18C4_N2**.

## Nguồn chuẩn của dự án

Khi có khác nhau giữa các tài liệu, dùng thứ tự sau:

1. **Backlog Excel**: Sprint Goal, Story, Story Point, Acceptance Criteria, dependency, NFR, Task, DoD/DoR.
2. **Team Charter / Lịch 8 Sprint**: vai trò, đầu mối nghiệp vụ, người hỗ trợ, reviewer và Scrum Master.
3. **Jira**: trạng thái thực thi, assignee, tiến độ Sprint.
4. **GitHub**: source code, branch, commit, Pull Request và tài liệu kỹ thuật.

GitHub không tự thay đổi phạm vi Sprint. Nếu README khác Backlog Excel thì phải sửa README theo Backlog Excel.

## Sprint 1

**Sprint Goal:** Vùng trồng khai báo được thửa đất của mình trên môi trường staging chạy thật, và mọi thay đổi mã đều đi qua CI.

**Capacity:** 12 SP.

Phạm vi Sprint 1:

| ID | SP | Nội dung | Branch chính thức |
|---|---:|---|---|
| S-01 | 2 | Khung ứng dụng chạy được trên máy cá nhân bằng một lệnh | `feature/s1-s01-app-setup` |
| S-02 | 1 | Pipeline CI chặn merge khi build, lint hoặc test đỏ | `feature/s1-s02-ci` |
| S-03 | 2 | Merge vào nhánh tích hợp Sprint thì staging tự cập nhật | `feature/s1-s03-staging` |
| K-01 | 2 | Chọn cách chống sửa lén bản ghi sự kiện | `docs/s1-k01-integrity` |
| S-04 | 2 | Đăng nhập email/mật khẩu, khóa tạm sau 5 lần sai | `feature/s1-s04-login` |
| S-05 | 2 | Mỗi tổ chức chỉ thấy dữ liệu của mình | `feature/s1-s05-org-access` |
| S-06 | 1 | Vùng trồng khai báo thửa đất | `feature/s1-s06-farm` |

> Ghi chú về cụm từ **"nhánh chính"** trong Backlog: trong workflow của repo này, `develop` là **nhánh tích hợp chính của Sprint** và là nguồn triển khai staging; `main` là nhánh ổn định dùng cho demo/release. Cuối Sprint mới tạo PR `develop -> main`.

Chi tiết Sprint 1, T-01 → T-15, phân công và tiêu chí hoàn thành: [docs/SPRINT-1.md](docs/SPRINT-1.md).

**Thành viên mới bắt đầu từ đây:** [docs/TEAM-GUIDE.md](docs/TEAM-GUIDE.md) — hướng dẫn clone repo, checkout branch, code, commit, push, tạo PR, review và merge.


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

```text
Story branch -> Pull Request -> develop -> cuối Sprint -> Pull Request -> main
```

### Quy ước branch toàn dự án

- `feature/s<sprint>-s<story>-<short-name>`: phát triển một Story.
- `fix/s<sprint>-s<story>-<short-name>`: sửa lỗi thuộc Story.
- `docs/s<sprint>-k<spike>-<short-name>`: Spike/tài liệu kỹ thuật.
- `docs/s<sprint>-<short-name>`: tài liệu quản lý Sprint.

Ví dụ:

```text
feature/s1-s01-app-setup
feature/s1-s02-ci
feature/s1-s04-login
docs/s1-k01-integrity
```

Tên branch **không chứa tên thành viên**. Người làm được quản lý trong Jira và tài liệu phân công.

Một Story có thể có nhiều Task nhưng **không tạo branch riêng cho từng Task**. Mã Task được ghi trong commit.

Ví dụ S-02:

```text
branch: feature/s1-s02-ci

feat: T-03 configure CI build lint test
chore: T-04 configure branch protection
```

## Quy trình làm việc

1. Cập nhật `develop` mới nhất.
2. Chuyển sang branch Story được giao và đồng bộ với `develop`.
3. Làm Task, commit ghi rõ mã T-xx.
4. Push branch lên GitHub.
5. Mở Pull Request từ Story branch vào `develop`.
6. Có ít nhất một thành viên khác review.
7. Chỉ merge khi CI xanh và Acceptance Criteria đạt.
8. Story phải được kiểm tra trên staging theo DoD.
9. Cuối Sprint, khi bản tích hợp ổn định và demo được, mở PR `develop -> main`.

Chi tiết thao tác Git/PR: [docs/WORKFLOW.md](docs/WORKFLOW.md).

## Commit convention

```text
feat: ...
fix: ...
docs: ...
refactor: ...
test: ...
chore: ...
```

Khuyến nghị ghi mã Task:

```text
feat: T-09 add login session
test: T-13 reject cross-organization access
docs: K-01 document event-integrity decision
```

## Definition of Done

Một Story/Task chỉ được coi là Done khi các mục áp dụng đều đạt:

- Code review đã duyệt bởi ít nhất một thành viên khác.
- Có unit test cho logic mới; độ phủ phần thay đổi không giảm.
- CI xanh: build, lint, typecheck, test.
- Không có secret trong mã nguồn; quét dependency sạch.
- Acceptance Criteria pass trên **staging**, không chỉ local.
- Story chạm sự kiện lô: kiểm tra toàn vẹn chuỗi vẫn hợp lệ sau khi chạy.
- Story chạm phả hệ: có bộ dữ liệu mẫu có đáp án đếm tay và ca chu trình.
- Story chạm khối lượng: có test hai giao dịch đồng thời.
- Không log dữ liệu định danh nông hộ.
- README được cập nhật nếu đổi hành vi công khai hoặc thêm biến môi trường.

## Definition of Ready

Story sẵn sàng kéo vào Sprint khi:

- Đủ nhỏ để Done trong một Sprint.
- Dependency ngoài đã có cam kết.
- Có Acceptance Criteria dạng Giả sử / Khi / Thì khi phù hợp.
- Team đã ước lượng Story Point.
- Team hiểu Story mà không cần hỏi lại người viết.
- Story cho team thực tập được chẻ Task nhỏ, mục tiêu mỗi Task không quá nửa ngày.

## Team workflow

- **Jira:** Sprint, Story/Task, assignee, trạng thái và tiến độ.
- **GitHub:** source code, branch, commit, Pull Request, CI và review.
- **Scrum Master:** theo dõi Jira, branch, PR, CI, dependency và blocker; điều phối nhưng không thay người thực hiện.
- Daily Scrum: hôm qua làm gì, hôm nay làm gì, đang vướng gì.
- Blocker phải báo sớm, không chờ đến cuối Sprint.
