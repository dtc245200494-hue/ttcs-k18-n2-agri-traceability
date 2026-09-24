# Development Workflow

Tài liệu này bám theo backlog trong file `Truy xuất nguồn gốc và giám sát chuỗi lạnh nông sản.xlsx`.

## Branches

- `main`: nhánh ổn định, dùng để staging/demo/release.
- `develop`: nhánh tích hợp của Sprint.
- `feature/...`: branch riêng cho từng task/feature.
- `fix/...`: branch sửa lỗi.
- `docs/...`: branch thay đổi tài liệu.

## Quy trình làm một task Jira

1. Chuyển sang `develop` và cập nhật code mới nhất.
2. Tạo branch mới từ `develop`.
3. Chỉ thay đổi trong phạm vi task Jira.
4. Commit rõ nội dung, ưu tiên kèm Jira key.
5. Push branch.
6. Mở Pull Request vào `develop`.
7. CI chạy cho mọi push và pull request.
8. Chỉ merge khi CI xanh và đã được review.
9. Cuối Sprint hoặc khi đủ điều kiện tích hợp, mở Pull Request từ `develop` vào `main`.
10. Merge vào `main` kích hoạt triển khai staging.

Ví dụ:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/N2-60-t01-project-bootstrap
```

Commit:

```text
feat(N2-60): initialize app and PostgreSQL with docker compose
```

## CI bắt buộc — T-03 / S-02

Pipeline phải chạy trên **mọi push và pull request** với các bước:

- build
- lint
- typecheck
- test

Theo backlog, pipeline cần hoàn tất dưới 5 phút nếu điều kiện hạ tầng cho phép và nên dùng cache phụ thuộc.

## Bảo vệ nhánh chính — T-04 / S-02

`main` phải:

- cấm push trực tiếp;
- yêu cầu CI xanh;
- yêu cầu ít nhất một người khác duyệt;
- người tạo Pull Request không tự duyệt PR của chính mình.

Không merge khi còn conflict, CI đỏ hoặc chưa đủ review.

## Triển khai staging — S-03

Sau khi merge vào `main`:

1. Pipeline build image.
2. Đẩy image lên máy chủ staging.
3. Chạy migration trước khi bản mới nhận request.
4. Khởi động bản mới.
5. Gọi `/health`.
6. Nếu health check không đạt trong thời gian quy định, giữ/khôi phục bản cũ và báo pipeline đỏ.

Bí mật triển khai/SSH phải nằm trong CI secrets, không commit vào repo.

## Pull Request checklist

PR cần có:

- Jira issue/task liên quan;
- mô tả ngắn thay đổi;
- cách kiểm tra;
- ảnh chụp nếu thay đổi giao diện;
- CI xanh;
- ít nhất một reviewer khác;
- không có secret hoặc `.env` trong commit.

## Sprint 1

Sprint Goal:

> Vùng trồng khai báo được thửa đất của mình trên môi trường staging chạy thật, và mọi thay đổi mã đều đi qua CI.

Sprint 1 gồm đúng các backlog item:

`S-01, S-02, S-03, K-01, S-04, S-05, S-06` — tổng **12 SP**.

`S-08 — Ghi nhận lô thu hoạch với mã lô sinh tự động` thuộc Sprint 2.

Chi tiết: [SPRINT-1.md](SPRINT-1.md).
