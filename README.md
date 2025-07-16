# Ứng dụng Tạo Icon bằng AI

## Giới thiệu
Đây là ứng dụng web cho phép bạn tạo các icon theo ý tưởng của mình bằng trí tuệ nhân tạo (AI). Bạn chỉ cần nhập mô tả (prompt) và chọn màu sắc, hệ thống sẽ tự động sinh ra icon phù hợp. Ngoài ra, bạn có thể lưu trữ, quản lý bộ sưu tập icon cá nhân và mua thêm lượt tạo icon qua Stripe.

## Tính năng chính
- Đăng nhập bằng Google (NextAuth)
- Tạo icon bằng AI với prompt và màu sắc tuỳ chọn
- Xem, quản lý bộ sưu tập icon cá nhân
- Mua thêm lượt tạo icon qua Stripe
- Lưu trữ icon trên AWS S3

## Công nghệ sử dụng
- Next.js 13
- React 18
- TypeScript
- Prisma ORM & PostgreSQL
- NextAuth (Google OAuth)
- Stripe (thanh toán)
- OpenAI (tạo icon)
- TailwindCSS (giao diện)
- Docker (chạy PostgreSQL)

## Cài đặt & chạy dự án

### 1. Clone mã nguồn
```bash
git clone <repo-url>
cd icon-generation-app
```

### 2. Cài đặt package
```bash
npm install
```

### 3. Cấu hình biến môi trường
Tạo file `.env` dựa trên các biến sau (tham khảo ở `src/env.mjs`):
```
DATABASE_URL=postgresql://root:root@localhost:5432/icon_generator
NODE_ENV=development
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DALLE_API_KEY=your_openai_api_key
MOCK_DALLE=false
SECRET_ACCESS_KEY=your_aws_secret_access_key
ACCESS_KEY_ID=your_aws_access_key_id
NEXT_PUBLIC_STRIPE_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
HOST_NAME=localhost
PRICE_ID=your_stripe_price_id
STRIPE_WEB_HOOK_SECRET=your_stripe_webhook_secret
```

### 4. Khởi tạo database (PostgreSQL)
Bạn có thể dùng Docker:
```bash
docker-compose up -d
```

Sau đó migrate database:
```bash
npx prisma migrate dev --name init
```

### 5. Chạy ứng dụng
```bash
npm run dev
```
Truy cập [http://localhost:3000](http://localhost:3000)

## Các lệnh npm hữu ích
- `npm run dev`: Chạy server phát triển
- `npm run build`: Build production
- `npm start`: Chạy production
- `npm run lint`: Kiểm tra code với ESLint

## Cấu trúc thư mục chính
- `src/pages/`: Các trang chính (index, generate, collection, api)
- `src/components/`: Các component UI
- `src/server/`: Xử lý backend, API, xác thực, database
- `prisma/schema.prisma`: Định nghĩa database
- `public/`: Ảnh, favicon, banner

## Ghi chú
- Ứng dụng yêu cầu tài khoản Google để đăng nhập.
- Stripe dùng để mua thêm lượt tạo icon (credits).
- Icon được lưu trên AWS S3, cần cấu hình đúng Access Key và Secret Key.
- Để phát triển hoặc deploy production, cần cấu hình đầy đủ biến môi trường.

---
Nếu có thắc mắc hoặc lỗi, vui lòng tạo issue trên repository hoặc liên hệ tác giả.
