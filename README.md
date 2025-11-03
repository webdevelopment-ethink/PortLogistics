# PortGate Logistics Website

A modern, multi-page static website for PortGate Logistics, located at the Port of Brisbane.

## 🚢 About

PortGate Logistics provides container freight station services, depot operations, and port cartage from within the Port of Brisbane estate at 70 Lucinda Drive, Port of Brisbane QLD 4178.

**Operating Hours:** Weekdays 7am – 3pm (Extended hours available by arrangement)

## 📁 Project Structure

```
/
├── index.html              # Home page
├── services.html           # Services overview
├── facilities.html         # Facility information
├── compliance.html         # Documents and compliance
├── contact.html            # Contact form and details
├── assets/
│   ├── css/
│   │   ├── utilities.css   # Utility classes
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   ├── main.js         # Core functionality
│   │   ├── api.js          # API integration layer
│   │   └── scrollreveal.js # Scroll animations
│   └── img/
│       ├── hero-port.jpg   # Hero background (add your image)
│       ├── depot.jpg       # Depot facility (add your image)
│       └── containers.jpg  # Container operations (add your image)
└── README.md
```

## 🎨 Design Features

- **Monochrome Theme:** Black, charcoal, white, and grey with gold accent (#d0a04f)
- **Responsive Design:** Fully responsive across desktop, tablet, and mobile
- **Modern Animations:** Smooth scroll reveals and transitions
- **Glass Morphism:** Blur effects on hero cards
- **Sticky Navigation:** Header with blur effect on scroll
- **Mobile Menu:** Hamburger menu for mobile devices

## 🚀 Deployment

### Netlify (Recommended)

1. **Drag & Drop:**
   - Simply drag the entire project folder to Netlify
   - The site will be live immediately

2. **Git Integration:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
   - Connect your repository to Netlify
   - Netlify will automatically deploy

3. **Contact Form:**
   - The contact form is already configured for Netlify Forms
   - No additional setup required
   - Submissions will appear in your Netlify dashboard

### AWS S3 + CloudFront

1. Upload all files to an S3 bucket
2. Enable static website hosting
3. Set `index.html` as the index document
4. Configure CloudFront distribution for HTTPS

### Other Static Hosts

Works with any static hosting service:
- Vercel
- GitHub Pages
- Cloudflare Pages
- Firebase Hosting

## 🔧 API Integration

The site is ready for backend API integration. See `assets/js/api.js` for details.

### Current Setup

- API calls are **disabled by default** (uses mock data)
- Placeholder endpoints configured in `api.js`
- Ready to connect to production API

### Enabling API

In `assets/js/api.js`, update:

```javascript
const API_CONFIG = {
    BASE_URL: 'https://your-api-domain.com',  // Your API URL
    ENABLED: true  // Change to true
};
```

### Available API Functions

- `fetchNotices()` - Depot notices and announcements
- `fetchCargoStatus(containerNumber)` - Cargo status lookup
- `trackContainer(containerNumber)` - Container tracking
- `checkDepotAvailability(startDate, endDate)` - Depot capacity
- `submitServiceRequest(requestData)` - Service request submission

## 📝 Customization

### Update Business Information

Edit the following in all HTML files:

- **Address:** 70 Lucinda Drive, Port of Brisbane QLD 4178
- **Phone:** (07) 3895 5700
- **Email:** enquiries@portgate.com.au
- **Hours:** Weekdays 7am – 3pm

### Update Colors

Edit CSS variables in `assets/css/utilities.css`:

```css
:root {
    --bg: #0f1012;           /* Background */
    --bg-alt: #131417;       /* Alternate background */
    --accent: #d0a04f;       /* Accent color (gold) */
    --text: #ffffff;         /* Text color */
    --muted: rgba(255,255,255,0.65); /* Muted text */
}
```

### Add Images

Place your images in `assets/img/` and they will be automatically referenced:

- `hero-port.jpg` - Hero section background
- `depot.jpg` - Facility images
- `containers.jpg` - Service/operations images

## 🌐 Pages

1. **Home (index.html)**
   - Hero with depot information
   - Feature highlights
   - Services preview
   - Customer portals
   - Depot notices (API-driven)

2. **Services (services.html)**
   - Import container unpacking
   - Export container packing
   - Quarantine/AQIS coordination
   - Port cartage & wharf runs
   - Storage & laydown
   - Documentation & customs handling

3. **Facilities (facilities.html)**
   - Facility features and capabilities
   - Location and operating hours
   - Driver information and site access

4. **Compliance (compliance.html)**
   - Trading conditions
   - Driver induction
   - Depot requirements
   - Credit application
   - Accreditations

5. **Contact (contact.html)**
   - Contact form (Netlify-ready)
   - Contact details
   - Operating hours
   - Multiple contact methods

## 🔗 Important Links

- **Cargo Tracking:** https://webtracker.portgate.com.au
- **Main Site:** (Your deployed URL)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Development

No build tools required! This is pure HTML, CSS, and JavaScript.

### Local Development

Simply open `index.html` in a web browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📄 License

© 2025 PortGate Logistics LP. All rights reserved.

## 📞 Support

For technical support or questions:
- **Email:** enquiries@portgate.com.au
- **Phone:** (07) 3895 5700
- **Location:** 70 Lucinda Drive, Port of Brisbane QLD 4178

---

**Inside the Port of Brisbane** | Made for Port of Brisbane operators

