# Development Workflow

## Branches

- `main`: phiên bản ổn định, dùng để demo/release.
- `develop`: nhánh tích hợp chính của Sprint.
- `feature/...`: mỗi task/feature làm trên một nhánh riêng.
- `fix/...`: sửa lỗi.

## Quy trình làm một task

1. Chuyển sang `develop` và cập nhật code mới nhất.
2. Tạo branch mới từ `develop`.
3. Code và commit theo phạm vi task.
4. Push branch.
5. Tạo Pull Request vào `develop`.
6. Reviewer kiểm tra code và yêu cầu sửa nếu cần.
7. Merge khi đạt yêu cầu.

## Quy tắc Pull Request

PR cần có:
- Task/Jira issue liên quan.
- Mô tả ngắn thay đổi.
- Cách kiểm tra.
- Ảnh chụp nếu có thay đổi giao diện.
- Không merge khi còn conflict hoặc chưa review.

## Sprint 1

Mục tiêu:
- Setup project.
- Quy ước Git/PR.
- Database phạm vi Sprint 1.
- Login và role cơ bản.
- Quản lý thửa đất.
- Ghi nhận lô thu hoạch đầu tiên.
- Chuẩn bị demo.
