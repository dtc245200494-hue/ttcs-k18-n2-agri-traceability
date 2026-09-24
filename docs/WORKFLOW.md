# Development Workflow

## 1. Cấu trúc branch toàn dự án

- `main`: phiên bản ổn định dùng để demo/release.
- `develop`: nhánh tích hợp chung của Sprint.
- `feature/s<sprint>-s<story>-<short-name>`: phát triển một Story.
- `fix/s<sprint>-s<story>-<short-name>`: sửa lỗi liên quan một Story.
- `docs/s<sprint>-k<spike>-<short-name>`: spike/tài liệu kỹ thuật.
- `docs/s<sprint>-<short-name>`: tài liệu vận hành Sprint.

Ví dụ Sprint 1:

```text
feature/s1-s01-app-setup
feature/s1-s02-ci
feature/s1-s03-staging
docs/s1-k01-integrity
feature/s1-s04-login
feature/s1-s05-org-access
feature/s1-s06-farm
```

Khi sang Sprint 2 giữ nguyên mẫu, ví dụ:

```text
feature/s2-s07-products
feature/s2-s08-harvest-lot
feature/s2-s10-event-hash
```

Tên branch không chứa tên người. Người thực hiện/đầu mối được quản lý trong Jira và tài liệu phân công để khi đổi người không phải đổi branch.

## 2. Story và Task

Một Story có thể chứa nhiều Task nhưng **không cần tạo branch riêng cho từng Task**.

Ví dụ:

```text
S-01
├── T-01 Docker Compose + PostgreSQL
└── T-02 Migration đầu tiên + README

=> cùng làm trên feature/s1-s01-app-setup
```

Mỗi Task được nhận diện bằng commit:

```text
feat: T-01 add docker compose with PostgreSQL
feat: T-02 add initial migration and setup guide
```

## 3. Quy trình làm việc

Trước khi bắt đầu:

```bash
git fetch origin
git checkout develop
git pull origin develop
git checkout <story-branch>
git merge origin/develop
```

Sau khi làm xong một phần:

```bash
git add .
git commit -m "feat: T-xx mô tả ngắn"
git push origin <story-branch>
```

Sau đó mở Pull Request:

```text
<story-branch> -> develop
```

Reviewer:
1. Đọc Files changed.
2. Kiểm tra Acceptance Criteria.
3. Kiểm tra test và CI.
4. Yêu cầu sửa nếu cần.
5. Approve khi đạt.

Không merge khi:
- CI đỏ.
- Còn conflict.
- Chưa có review.
- Acceptance Criteria chưa đạt.

Cuối Sprint:

```text
develop -> Pull Request -> main
```

Chỉ merge `develop` vào `main` khi bản tích hợp của Sprint có thể demo và đạt Definition of Done.

## 4. Pull Request

PR cần có:
- Story và Task/Jira liên quan.
- Mô tả ngắn thay đổi.
- Cách kiểm tra.
- Kết quả test.
- Ảnh chụp nếu có thay đổi giao diện.
- Ghi rõ dependency/blocker nếu còn.

Mẫu tiêu đề:

```text
[S-02] Configure CI pipeline
[S-04] Add login and lockout
```

## 5. Commit convention

```text
feat: ...
fix: ...
docs: ...
refactor: ...
test: ...
chore: ...
```

Khuyến nghị có mã Task:

```text
feat: T-01 add docker compose
test: T-13 verify cross-org access returns 403
```

## 6. Branch cũ

Các branch thử nghiệm/branch theo Jira Task hoặc theo tên thành viên được tạo trong giai đoạn setup **không còn là quy ước chính thức**. Thành viên không bắt đầu công việc mới trên các branch đó. Quy ước chính thức từ Sprint 1 là branch theo **Sprint + Story** như mục 1.
