# Sprint 1 — Backlog chuẩn

**Sprint Goal:** Vùng trồng khai báo được thửa đất của mình trên môi trường staging chạy thật, và mọi thay đổi mã đều đi qua CI.

**Capacity:** 12 SP  
**Đã xếp:** 12 SP

## Backlog item

| ID | Jira | Loại | Nội dung | SP | Dependency |
| --- | --- | --- | --- | ---: | --- |
| S-01 | N2-53 | Story | Khung ứng dụng chạy được trên máy cá nhân bằng một lệnh | 2 | Không |
| S-02 | N2-54 | Story | Pipeline CI chặn merge khi build, lint hoặc test đỏ | 1 | S-01 |
| S-03 | N2-55 | Story | Merge vào nhánh chính thì staging tự cập nhật | 2 | S-02 |
| K-01 | N2-56 | Spike | Chọn cách chống sửa lén bản ghi sự kiện | 2 | S-01 |
| S-04 | N2-57 | Story | Đăng nhập bằng email và mật khẩu, khoá tạm sau 5 lần sai | 2 | S-01 |
| S-05 | N2-58 | Story | Mỗi tổ chức chỉ thấy dữ liệu của chính mình | 2 | S-04 |
| S-06 | N2-59 | Story | Vùng trồng khai báo thửa đất của mình | 1 | S-05 |

## Task chi tiết

| ID | Jira | Parent | Nội dung |
| --- | --- | --- | --- |
| T-01 | N2-60 | S-01 | Khởi tạo dự án và `docker-compose.yml` có PostgreSQL |
| T-02 | N2-61 | S-01 | Migration đầu tiên và lệnh khởi động ghi trong README |
| T-03 | N2-62 | S-02 | Cấu hình pipeline chạy build, lint, test trên mỗi push |
| T-04 | N2-63 | S-02 | Bật luật bảo vệ nhánh chính: CI xanh và một người duyệt |
| T-05 | N2-64 | S-03 | Dockerfile đóng gói ứng dụng thành image |
| T-06 | N2-65 | S-03 | Bước triển khai trong pipeline đẩy image lên máy chủ và khởi động lại |
| T-07 | N2-66 | S-03 | Kiểm tra sức khoẻ sau triển khai, thất bại thì giữ bản cũ |
| T-08 | N2-67 | S-04 | Bảng `organizations`, `users`, `roles` kèm migration và seed 7 vai trò |
| T-09 | N2-68 | S-04 | Form đăng nhập, kiểm tra mật khẩu argon2id, tạo phiên |
| T-10 | N2-69 | S-04 | Đếm lần sai theo tài khoản và khoá 15 phút |
| T-11 | N2-70 | S-05 | Middleware gắn tổ chức vào ngữ cảnh yêu cầu, mặc định từ chối |
| T-12 | N2-71 | S-05 | Lớp truy vấn nền tự lọc theo `organization_id` cho mọi bảng nghiệp vụ |
| T-13 | N2-72 | S-05 | Test tích hợp: gọi API dữ liệu của tổ chức khác nhận 403 |
| T-14 | N2-73 | S-06 | Bảng `farms` gắn tổ chức kèm migration |
| T-15 | N2-74 | S-06 | Form tạo, sửa thửa và danh sách thửa của tổ chức |

## Yêu cầu quan trọng của Sprint 1

### S-01 / T-01 / T-02

- Máy mới chỉ có Docker và git phải chạy được ứng dụng + PostgreSQL bằng lệnh trong README.
- Migration đầu tiên tự chạy và không lỗi.
- Thiếu biến môi trường bắt buộc thì ứng dụng dừng và nêu rõ biến thiếu.
- `.env` phải nằm trong `.gitignore`; chỉ commit `.env.example`.
- File backlog không chốt Node.js, Java hay stack cụ thể; team phải thống nhất stack trước khi triển khai T-01.

### S-02 / T-03 / T-04

- CI chạy cho mọi push và PR.
- Build, lint hoặc test đỏ thì không được merge.
- PR chưa có ít nhất một người khác duyệt thì không được merge.
- Push trực tiếp vào `main` phải bị từ chối.

### S-03 / T-05 / T-06 / T-07

- Merge vào `main` phải tự cập nhật staging trong vòng 10 phút.
- Migration chạy trước khi bản mới nhận request.
- Health check thất bại thì bản lỗi không được thay bản đang chạy.
- Máy chủ staging chỉ nhận image từ pipeline.

### K-01

Spike timebox 1 ngày công. So sánh:

1. chuỗi hash tự viết trong bảng thường;
2. dùng quyền cơ sở dữ liệu để chặn sửa/xoá;
3. blockchain.

Đầu ra là một trang tài liệu nêu cách chọn, số đo thử nghiệm, thuật toán băm/cách chuẩn hoá nội dung và lý do loại blockchain bằng ngôn ngữ người không chuyên đọc được.

### S-04 / S-05 / S-06

- Mật khẩu dùng argon2id; cookie phiên có HttpOnly và Secure.
- Sai mật khẩu 5 lần liên tiếp thì khoá 15 phút.
- Cách ly dữ liệu theo tổ chức ở tầng truy vấn; route mới mặc định bị chặn nếu quên khai báo quyền.
- Vùng trồng tạo/sửa/xem thửa thuộc đúng tổ chức của mình.

## Không thuộc Sprint 1

`S-08 — Ghi nhận lô thu hoạch với mã lô sinh tự động` thuộc **Sprint 2**.
