# ☕ Have A Chai

**Have A Chai** is a developer-focused platform inspired by [BuyMeACoffee.com](https://www.buymeacoffee.com/), built as a portfolio project to showcase my full-stack web development skills. This project is not a commercial product or business, but a technical demonstration deployed using [Vercel](https://vercel.com/).

![Have A Chai Preview](https://res.cloudinary.com/dnhnp8gtw/image/upload/v1745220240/xidy21xxycirmm0gffwa.png)

---

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Database**: [MongoDB + Mongoose](https://mongoosejs.com/)
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Payment Integration**: [Razorpay](https://razorpay.com/)
- **Deployment**: [Vercel Free Hosting](https://vercel.com/)

---

## ✨ Features

- 🎨 Creator profile pages
- 🔍 Search creators with live search modal
- 🖼️ Upload and manage profile pictures with Cloudinary
- 🔐 OAuth login with Google, GitHub, Facebook
- 💸 Donate via Razorpay
- 📎 Add social media links to profiles
- 📱 Responsive design optimized for all devices
- ⏳ Skeleton loaders and smooth animations

---

## 📦 Getting Started (Development)

```bash
# 1. Clone the repository
git clone https://github.com/your-username/have-a-chai.git
cd have-a-chai

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in required env vars (MongoDB URI, NextAuth, Razorpay, etc.)

# 4. Run the development server
npm run dev

# Visit http://localhost:3000
