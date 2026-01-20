# 🚀 Deployment Guide

Complete guide for deploying the IMMUMIA website to various platforms.

---

## 📋 Table of Contents

1. [Netlify (Recommended)](#netlify-recommended)
2. [Cloudflare Pages](#cloudflare-pages)
3. [GitHub Pages](#github-pages)
4. [Vercel](#vercel)
5. [Environment Variables Setup](#environment-variables-setup)

---

## 1️⃣ Netlify (Recommended)

Netlify is the **recommended platform** because it natively supports serverless functions.

### Method A: Connect GitHub Repository (Easiest)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repo-name.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Visit: https://app.netlify.com/
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Configure build settings:
     - **Build command**: Leave empty
     - **Publish directory**: `/` or `.`
   - Click "Deploy site"

3. **Add Environment Variables**
   - Go to: Site Settings → Environment Variables
   - Add variables:
     ```
     TELEGRAM_BOT_TOKEN = your_bot_token_here
     TELEGRAM_CHAT_ID = your_chat_id_here
     ```
   - Redeploy the site

4. **Custom Domain (Optional)**
   - Go to: Domain settings
   - Add your custom domain
   - Configure DNS as instructed

### Method B: Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize (first time only)
netlify init

# Set environment variables
netlify env:set TELEGRAM_BOT_TOKEN "your_bot_token"
netlify env:set TELEGRAM_CHAT_ID "your_chat_id"

# Deploy to production
netlify deploy --prod
```

### Method C: Drag & Drop

1. Zip your project folder
2. Visit: https://app.netlify.com/drop
3. Drag and drop the ZIP file
4. Add environment variables in Site Settings

**✅ Netlify Deployment Complete!**

---

## 2️⃣ Cloudflare Pages

Cloudflare Pages also supports serverless functions (Workers).

### Step 1: Connect Repository

1. Visit: https://dash.cloudflare.com/
2. Go to: Pages → Create a project
3. Connect your GitHub/GitLab account
4. Select repository
5. Configure build:
   - **Build command**: Leave empty
   - **Build output directory**: `/`
6. Click "Save and Deploy"

### Step 2: Configure Environment Variables

1. Go to: Settings → Environment variables
2. Add for Production:
   ```
   TELEGRAM_BOT_TOKEN = your_bot_token
   TELEGRAM_CHAT_ID = your_chat_id
   ```
3. Redeploy

### Step 3: Adapt Netlify Function to Cloudflare Worker

Create `functions/send-telegram.js` in your project root:

```javascript
export async function onRequestPost(context) {
    try {
        const data = await context.request.json();
        
        const BOT_TOKEN = context.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = context.env.TELEGRAM_CHAT_ID;
        
        const now = new Date();
        const localDateTime = now.toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const message = `🌱 YÊU CẦU TƯ VẤN MỚI\n\n👤 Tên: ${data.fullName}\n📞 SĐT: ${data.phone}\n📋 Nội dung:\n${data.message}\n\n⏰ Thời gian: ${localDateTime}\n🌐 Trang: ${data.page}`;
        
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });
        
        const result = await response.json();
        
        return new Response(JSON.stringify({
            success: result.ok,
            message: result.ok ? 'Success' : 'Failed'
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
```

Update `main.js` to use Cloudflare endpoint:
```javascript
// Change this line:
const response = await fetch('/send-telegram', { ... });
```

**✅ Cloudflare Pages Deployment Complete!**

---

## 3️⃣ GitHub Pages

GitHub Pages is free but **doesn't support serverless functions**.

### ⚠️ Limitations
- Telegram integration **won't work**
- Static content only

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repo-name.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to: Repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `main` / `root`
   - Click Save

3. **Access your site**
   - URL: `https://username.github.io/repo-name/`

### Alternative: Use External API

For Telegram on GitHub Pages, use:
- **Formspree**: https://formspree.io/
- **Getform**: https://getform.io/
- **EmailJS**: https://www.emailjs.com/

**✅ GitHub Pages Deployment Complete (Static Only)**

---

## 4️⃣ Vercel

Vercel supports serverless functions similar to Netlify.

### Deployment Steps

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add TELEGRAM_BOT_TOKEN production
   vercel env add TELEGRAM_CHAT_ID production
   ```

4. **Create `api/send-telegram.js`**
   ```javascript
   export default async function handler(req, res) {
       if (req.method !== 'POST') {
           return res.status(405).json({ success: false });
       }
       
       const { fullName, phone, message, page } = req.body;
       
       // ... (similar logic to Netlify function)
       
       res.status(200).json({ success: true });
   }
   ```

5. **Update `main.js`**
   ```javascript
   const response = await fetch('/api/send-telegram', { ... });
   ```

**✅ Vercel Deployment Complete!**

---

## 🔐 Environment Variables Setup

### Getting Telegram Credentials

#### 1. Create Telegram Bot

1. Open Telegram
2. Search for `@BotFather`
3. Send: `/newbot`
4. Follow instructions to name your bot
5. Copy the **Bot Token** (looks like: `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

#### 2. Get Chat ID

**Method 1: Using @userinfobot**
1. Search `@userinfobot` on Telegram
2. Start chat
3. Copy your Chat ID

**Method 2: Using Bot**
1. Send any message to your new bot
2. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Find `"chat":{"id":123456789}` in JSON response
4. That number is your Chat ID

#### 3. Test Telegram Integration

```bash
curl -X POST https://api.telegram.org/bot<BOT_TOKEN>/sendMessage \
  -H "Content-Type: application/json" \
  -d '{"chat_id": "<CHAT_ID>", "text": "Test message"}'
```

If successful, you'll receive the message on Telegram.

---

## ✅ Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All pages accessible (index.html, product.html)
- [ ] Responsive design works on mobile
- [ ] Consultation button visible and clickable
- [ ] Modal opens and closes properly
- [ ] Form validation works
- [ ] Telegram notification received when form submitted
- [ ] Product detail page loads with URL parameters
- [ ] Smooth scrolling works
- [ ] Footer disclaimer visible
- [ ] Custom domain configured (if applicable)

---

## 🐛 Common Issues

### Issue: Form submits but no Telegram message

**Solution:**
- Verify environment variables are set correctly
- Check function logs in hosting platform
- Test bot token manually with curl
- Ensure Chat ID is a number, not string

### Issue: Function returns 500 error

**Solution:**
- Check serverless function logs
- Verify `fetch` API is available in environment
- Check for syntax errors in function code

### Issue: CORS error in console

**Solution:**
- Ensure function returns proper CORS headers
- Check `Access-Control-Allow-Origin` is set to `*`

---

## 📞 Need Help?

- Check hosting platform documentation
- Review function logs for errors
- Test locally first before deploying
- Contact: contact@CTCPIMMUMIA

---

**Happy Deploying! 🎉**
