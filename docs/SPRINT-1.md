# Sprint 1 — Kế hoạch thực hiện

## Sprint Goal

**Vùng trồng khai báo được thửa đất của mình trên môi trường staging chạy thật, và mọi thay đổi mã đều đi qua CI.**

**Capacity:** 12 SP.

## Branch và phân công

| Story | SP | Branch chính thức | Đầu mối nghiệp vụ | Hỗ trợ triển khai | Review chéo | Task |
|---|---:|---|---|---|---|---|
| S-01 — Khung ứng dụng chạy được trên máy cá nhân bằng một lệnh | 2 | `feature/s1-s01-app-setup` | Nguyễn Viết Cường | Nguyễn Đức Dũng; Bùi Duy Hưng | Nguyễn Thanh Hải | T-01, T-02 |
| S-02 — Pipeline CI chặn merge khi build, lint hoặc test đỏ | 1 | `feature/s1-s02-ci` | Nguyễn Viết Cường | Trần Quang Dự; Nguyễn Văn Dũng | Phan Ngô Huy Hoàng | T-03, T-04 |
| S-03 — Merge vào nhánh chính thì staging tự cập nhật | 2 | `feature/s1-s03-staging` | Nguyễn Viết Cường | Nguyễn Thanh Hải; Trần Quang Dự | Nguyễn Văn Dũng | T-05, T-06, T-07 |
| K-01 — Chọn cách chống sửa lén bản ghi sự kiện | 2 | `docs/s1-k01-integrity` | Trần Quang Dự | Nguyễn Viết Cường; Phan Ngô Huy Hoàng | Nguyễn Thanh Hải | Spike K-01 |
| S-04 — Đăng nhập bằng email và mật khẩu, khoá tạm sau 5 lần sai | 2 | `feature/s1-s04-login` | Nguyễn Văn Dũng | Bùi Duy Hưng; Nguyễn Viết Cường | Trần Quang Dự | T-08, T-09, T-10 |
| S-05 — Mỗi tổ chức chỉ thấy dữ liệu của chính mình | 2 | `feature/s1-s05-org-access` | Nguyễn Văn Dũng | Trần Quang Dự; Nguyễn Đức Dũng | Nguyễn Thanh Hải | T-11, T-12, T-13 |
| S-06 — Vùng trồng khai báo thửa đất của mình | 1 | `feature/s1-s06-farm` | Nguyễn Đức Dũng | Bùi Duy Hưng; Nguyễn Văn Dũng | Phan Ngô Huy Hoàng | T-14, T-15 |

**Scrum Master:** Hoàng Trang Hiên — quan sát toàn Sprint, theo dõi Jira/Daily, branch, PR, CI, dependency và blocker; điều phối review/tích hợp, không thay người thực hiện.

## Task Sprint 1

### S-01 — feature/s1-s01-app-setup

- **T-01:** Khởi tạo dự án và `docker-compose.yml` có PostgreSQL.
- **T-02:** Migration đầu tiên và lệnh khởi động ghi trong README.

Kết quả cần thấy: thành viên mới có Docker + Git có thể làm theo README và chạy app + PostgreSQL; migration chạy được; cấu hình bắt buộc lấy từ biến môi trường.

### S-02 — feature/s1-s02-ci

- **T-03:** Cấu hình pipeline chạy build, lint, test trên mỗi push/PR.
- **T-04:** Bật luật bảo vệ nhánh chính: CI xanh và một người duyệt.

Kết quả cần thấy: commit/PR lỗi làm CI đỏ; PR chưa review không được merge; push thẳng vào nhánh được bảo vệ bị chặn.

### S-03 — feature/s1-s03-staging

- **T-05:** Dockerfile đóng gói ứng dụng thành image.
- **T-06:** Bước triển khai trong pipeline đẩy image lên máy chủ và khởi động lại.
- **T-07:** Health check và rollback khi bản triển khai lỗi.

Kết quả cần thấy: merge hợp lệ tự đưa bản mới lên staging; migration chạy trước khi nhận request; bản lỗi không thay bản đang chạy.

### K-01 — docs/s1-k01-integrity

Spike timebox 1 ngày công. So sánh:
- chuỗi hash trong bảng thường;
- quyền cơ sở dữ liệu để chặn sửa/xoá;
- blockchain.

Đầu ra: một trang tài liệu nêu phương án chọn, số đo thử nghiệm với 1000 sự kiện, thuật toán băm/cách chuẩn hoá nội dung, và lý do loại phương án không phù hợp. Mã thử nghiệm của Spike không phải mã sản phẩm.

### S-04 — feature/s1-s04-login

- **T-08:** Bảng `organizations`, `users`, `roles` kèm migration và seed vai trò.
- **T-09:** Form đăng nhập, kiểm tra mật khẩu Argon2id, tạo phiên.
- **T-10:** Đếm lần sai theo tài khoản và khoá 15 phút.

Kết quả cần thấy: đăng nhập đúng tạo phiên; lỗi đăng nhập không tiết lộ email tồn tại; sai 5 lần thì lần tiếp theo bị khoá; session hết hạn yêu cầu đăng nhập lại.

### S-05 — feature/s1-s05-org-access

- **T-11:** Middleware gắn tổ chức/vai trò vào ngữ cảnh và mặc định từ chối route chưa khai quyền.
- **T-12:** Lớp truy vấn nền tự lọc theo `organization_id`.
- **T-13:** Test tích hợp truy cập dữ liệu tổ chức khác nhận 403.

Kết quả cần thấy: tổ chức chỉ đọc dữ liệu của mình; truy cập chéo qua API bị 403; cán bộ kiểm tra có quyền đọc theo quy định nhưng không được ghi.

### S-06 — feature/s1-s06-farm

- **T-14:** Migration/bảng dữ liệu thửa đất.
- **T-15:** Form tạo/sửa và danh sách thửa đất của tổ chức.

Kết quả cần thấy: vùng trồng tạo được thửa với dữ liệu hợp lệ; diện tích không hợp lệ bị chặn; danh sách chỉ hiện thửa của tổ chức hiện tại.

## Definition of Done Sprint 1

Một Story chỉ chuyển Done khi:
- Acceptance Criteria pass trên staging.
- PR có ít nhất một reviewer khác duyệt.
- Unit/integration test phù hợp.
- CI xanh: build, lint, typecheck, test.
- Không có secret trong repo; dependency scan sạch.
- Không log dữ liệu định danh nông hộ.
- README/tài liệu được cập nhật khi thay đổi cách chạy hoặc biến môi trường.
- Sprint Review demo được luồng tương ứng.

## Quy tắc dành cho team

- Chỉ dùng 7 branch chính thức trong bảng trên cho công việc Sprint 1.
- Task không tạo branch riêng; ghi mã Task trong commit.
- Không code trực tiếp vào `develop` hoặc `main`.
- Mọi Story branch mở PR vào `develop`.
- Cuối Sprint mới mở PR `develop -> main`.
