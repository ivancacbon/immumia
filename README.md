# IMMUMIA - Static Website

A lightweight, production-ready static website showcasing sugarcane-based pharmaceutical products with Telegram consultation integration.

## 🚀 Features

- **Pure Static**: HTML, CSS, and Vanilla JavaScript only - no frameworks or build tools
- **Responsive Design**: Mobile-first, works perfectly on all devices
- **Telegram Integration**: Secure serverless function for consultation requests
- **SEO Friendly**: Semantic HTML5 structure
- **Fast Performance**: Optimized for quick loading
- **Easy Deployment**: Ready for Netlify, GitHub Pages, or Cloudflare Pages

## 📁 File Structure

```
web-slider/
├── index.html                          # Homepage
├── product.html                        # Product detail page
├── styles.css                          # All styles (no preprocessor needed)
├── main.js                            # Client-side JavaScript
├── netlify.toml                       # Netlify configuration
├── netlify/
│   └── functions/
│       └── send-telegram.js           # Serverless function for Telegram
├── README.md                          # This file
├── DEPLOYMENT.md                      # Deployment guide
└── .env.example                       # Environment variables template
```

## 🎨 Pages

### 1. Homepage (`index.html`)
- Hero section with call-to-action
- Bio-active components from sugarcane
- Featured products grid
- Trust indicators
- Footer with medical disclaimer

### 2. Product Detail (`product.html`)
- Dynamic product loading based on URL parameter
- Product image, ingredients, benefits
- Target users and usage instructions
- Medical disclaimer box
- Consultation CTA

## 💬 Consultation Feature

Both pages include:
- **Sticky Button**: Fixed bottom-right "TƯ VẤN MIỄN PHÍ" button
- **Modal Form**: Name, phone, message fields with validation
- **Telegram Notification**: Sends formatted message to Telegram bot
- **Security**: Bot token stored in environment variables, not exposed to client

## 🔐 Environment Variables

Create a `.env` file or configure in your hosting platform:

```bash
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### How to get Telegram credentials:

1. **Create a Bot**:
   - Open Telegram and search for `@BotFather`
   - Send `/newbot` and follow instructions
   - Copy the bot token

2. **Get Chat ID**:
   - Search for `@userinfobot` on Telegram
   - Start chat to get your Chat ID
   - Or send a message to your bot and visit:
     `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`

## 📦 Deployment

### Netlify (Recommended)

1. Push code to GitHub repository
2. Connect to Netlify: https://app.netlify.com/
3. Configure environment variables in Netlify dashboard:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
4. Deploy automatically

**Or use Netlify CLI:**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### GitHub Pages

For GitHub Pages (static only, without Telegram function):

```bash
# Enable GitHub Pages in repository settings
# Choose main branch and root directory
```

Note: Telegram function won't work on GitHub Pages. Consider using:
- Netlify Functions (recommended)
- Cloudflare Workers
- External API service

### Cloudflare Pages

1. Connect GitHub repository to Cloudflare Pages
2. Build settings:
   - Build command: (leave empty)
   - Build output directory: `/`
3. Add environment variables in Cloudflare dashboard

For Telegram integration, convert the Netlify Function to a Cloudflare Worker.

## 🛠️ Local Development

Simply open `index.html` in a browser or use a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npx http-server

# PHP
php -S localhost:8000
```

Visit: `http://localhost:8000`

**Note**: Telegram function requires deployment to test properly.

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: > 768px

## 🎯 Product Data

Products are defined in `main.js` in the `productData` object:

```javascript
const productData = {
    'product-id': {
        title: 'Product Name',
        icon: '🌾',
        description: '...',
        ingredients: [...],
        benefits: [...],
        // ... more fields
    }
}
```

To add a new product:
1. Add entry to `productData` in `main.js`
2. Add product card in `index.html`
3. Link to `product.html?id=product-id`

## 🔍 SEO Optimization

- Semantic HTML5 tags
- Meta descriptions on all pages
- Proper heading hierarchy
- Alt texts for images (add when using real images)
- Fast loading time
- Mobile responsive

## ⚠️ Medical Disclaimer

All pages include the required disclaimer:
> "Sản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh."

## 🐛 Troubleshooting

### Form not sending
- Check browser console for errors
- Verify environment variables are set
- Check Netlify Functions logs
- Test Telegram bot token with curl

### Styling issues
- Clear browser cache
- Check CSS file is loading
- Verify no conflicting styles

### Modal not opening
- Check JavaScript console for errors
- Verify `main.js` is loaded
- Check for JavaScript conflicts

## 📞 Support

For issues or questions:
- Email: contact@CTCPIMMUMIA
- GitHub Issues: [Create an issue]

## 📄 License

All rights reserved © 2026 IMMUMIA

---

**Built with ❤️ using pure HTML, CSS, and JavaScript**
# immumia
