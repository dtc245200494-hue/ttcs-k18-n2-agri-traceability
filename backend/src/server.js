const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "s04-demo-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60 * 1000
    }
  })
);

const users = new Map();

async function seedDemoUser() {
  const passwordHash = await bcrypt.hash("Password@123", 10);

  users.set("user@example.com", {
    id: "u-001",
    email: "user@example.com",
    passwordHash,
    failedCount: 0,
    lockedUntil: null,
    organizationId: "org-001"
  });
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function safeReturnTo(value) {
  const returnTo = String(value || "/lots");

  if (returnTo.startsWith("/") && !returnTo.startsWith("//")) {
    return returnTo;
  }

  return "/lots";
}

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    organizationId: user.organizationId
  };
}

function loginError(res) {
  return res.status(401).json({
    message: "Email hoặc mật khẩu không đúng."
  });
}

function requireAuth(req, res, next) {
  if (!req.session.userId) {
    const returnTo = encodeURIComponent(req.originalUrl);
    return res.redirect(302, `/login?returnTo=${returnTo}`);
  }

  next();
}

app.post("/api/login", async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password || "");
  const returnTo = safeReturnTo(req.body.returnTo);

  const user = users.get(email);

  if (!user) {
    return loginError(res);
  }

  // Kiểm tra khóa trước khi kiểm tra mật khẩu
  if (user.lockedUntil && user.lockedUntil > Date.now()) {
    const retryAfterSeconds = Math.ceil(
      (user.lockedUntil - Date.now()) / 1000
    );

    return res.status(423).json({
      message: "Tài khoản đang bị khóa tạm thời.",
      retryAfterSeconds
    });
  }

  // Hết thời gian khóa
  if (user.lockedUntil && user.lockedUntil <= Date.now()) {
    user.lockedUntil = null;
    user.failedCount = 0;
  }

  const validPassword = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!validPassword) {
    user.failedCount += 1;

    if (user.failedCount >= MAX_FAILED_ATTEMPTS) {
      user.lockedUntil =
        Date.now() + LOCK_MINUTES * 60 * 1000;

      return res.status(423).json({
        message: "Tài khoản đang bị khóa tạm thời.",
        retryAfterSeconds: LOCK_MINUTES * 60
      });
    }

    return loginError(res);
  }

  // Đăng nhập thành công
  user.failedCount = 0;
  user.lockedUntil = null;

  req.session.userId = user.id;
  req.session.email = user.email;

  return res.status(200).json({
    message: "Đăng nhập thành công.",
    user: publicUser(user),
    redirectTo: returnTo
  });
});

app.get("/api/me", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Chưa đăng nhập."
    });
  }

  const user = [...users.values()].find(
    item => item.id === req.session.userId
  );

  if (!user) {
    req.session.destroy(() => {});
    return res.status(401).json({
      message: "Phiên không hợp lệ."
    });
  }

  return res.status(200).json({
    user: publicUser(user)
  });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(error => {
    if (error) {
      return res.status(500).json({
        message: "Không thể đăng xuất."
      });
    }

    res.clearCookie("connect.sid");

    return res.status(200).json({
      message: "Đăng xuất thành công."
    });
  });
});

app.get("/api/organization/lots", requireAuth, (req, res) => {
  return res.status(200).json({
    organizationId: "org-001",
    lots: [
      {
        id: "LOT-001",
        name: "Lô cà chua Thái Nguyên",
        status: "Đang vận chuyển"
      },
      {
        id: "LOT-002",
        name: "Lô rau cải Bắc Giang",
        status: "Đã nhập kho"
      }
    ]
  });
});

app.get("/login", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../frontend/index.html")
  );
});

app.get("/lots", requireAuth, (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../frontend/lots.html")
  );
});

app.use(
  express.static(
    path.join(__dirname, "../../frontend")
  )
);

async function start() {
  await seedDemoUser();

  app.listen(PORT, () => {
    console.log(
      `S-04 server running at http://localhost:${PORT}`
    );
  });
}

if (require.main === module) {
  start();
}

module.exports = {
  app,
  users,
  seedDemoUser,
  MAX_FAILED_ATTEMPTS,
  LOCK_MINUTES
};