# PortGate Logistics - Deployment Guide

Complete deployment instructions for the PortGate Logistics website.

## 📦 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Added your images to `assets/img/` directory
- [ ] Updated contact information (if changed)
- [ ] Tested all pages locally
- [ ] Tested contact form submission
- [ ] Verified all internal links work
- [ ] Checked responsive design on mobile devices
- [ ] Optimized images for web

## 🚀 Netlify Deployment (Recommended)

### Method 1: Drag & Drop (Easiest)

1. **Prepare Files:**
   - Ensure all files are in the project folder
   - No zipping required

2. **Deploy:**
   - Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag your project folder onto the page
   - Wait for deployment to complete
   - Your site is live!

3. **Custom Domain (Optional):**
   - Click "Domain settings" in Netlify dashboard
   - Add your custom domain (e.g., portgate.com.au)
   - Update DNS records as instructed

### Method 2: Git Integration (Recommended for Updates)

1. **Initialize Git Repository:**
   ```bash
   cd "Port Logistics"
   git init
   git add .
   git commit -m "Initial commit: PortGate Logistics website"
   ```

2. **Push to GitHub/GitLab:**
   ```bash
   # Create a new repository on GitHub, then:
   git remote add origin https://github.com/yourusername/portgate-logistics.git
   git branch -M main
   git push -u origin main
   ```

3. **Connect to Netlify:**
   - Log in to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Build settings:
     - Build command: (leave empty)
     - Publish directory: `.` or `/`
   - Click "Deploy site"

4. **Automatic Updates:**
   - Any push to your main branch will automatically redeploy

### Netlify Form Configuration

The contact form is already configured for Netlify Forms. After deployment:

1. Go to your site's Netlify dashboard
2. Click "Forms" in the sidebar
3. You'll see "contact" form listed
4. Submissions will appear here
5. Set up email notifications:
   - Go to Forms > Form notifications
   - Add "Email notification"
   - Enter: enquiries@portgate.com.au

### Netlify Environment Variables (If Using API)

If you connect a backend API:

1. Go to Site settings > Environment variables
2. Add variables:
   - `API_BASE_URL`: Your API endpoint
   - `API_KEY`: Your API key (if needed)

3. Update `assets/js/api.js` to use environment variables (requires build step)

## 🔷 AWS S3 + CloudFront Deployment

### Step 1: Create S3 Bucket

1. Log in to AWS Console
2. Navigate to S3
3. Create new bucket:
   - Name: `portgate-logistics` (or your domain)
   - Region: `ap-southeast-2` (Sydney)
   - Uncheck "Block all public access"
   - Click "Create bucket"

### Step 2: Upload Files

1. Open your bucket
2. Click "Upload"
3. Drag all files and folders
4. Click "Upload"

### Step 3: Enable Static Website Hosting

1. Go to bucket properties
2. Scroll to "Static website hosting"
3. Click "Edit"
4. Enable static website hosting
5. Index document: `index.html`
6. Error document: `404.html` (create one if needed)
7. Save changes

### Step 4: Set Bucket Policy

1. Go to bucket permissions
2. Click "Bucket Policy"
3. Add this policy (replace `YOUR-BUCKET-NAME`):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
```

### Step 5: Create CloudFront Distribution

1. Navigate to CloudFront
2. Create distribution
3. Settings:
   - Origin domain: Your S3 bucket website endpoint
   - Origin path: (leave empty)
   - Viewer protocol policy: Redirect HTTP to HTTPS
   - Default root object: `index.html`
   - Alternate domain names: Your domain (e.g., www.portgate.com.au)
   - SSL certificate: Request or import certificate
4. Create distribution
5. Wait for deployment (15-20 minutes)

### Step 6: Configure DNS

1. Go to Route 53 (or your DNS provider)
2. Add A record:
   - Name: www (or @)
   - Type: A - IPv4 address
   - Alias: Yes
   - Alias target: Your CloudFront distribution

## 🔹 Vercel Deployment

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd "Port Logistics"
   vercel
   ```

3. **Follow Prompts:**
   - Link to existing project or create new
   - Accept defaults
   - Site will deploy automatically

4. **Production Deployment:**
   ```bash
   vercel --prod
   ```

## 🔸 Cloudflare Pages

1. **Login to Cloudflare:**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)

2. **Create Project:**
   - Click "Create a project"
   - Connect your Git repository (or upload files)

3. **Build Settings:**
   - Framework preset: None
   - Build command: (leave empty)
   - Build output directory: `/`

4. **Deploy:**
   - Click "Save and Deploy"
   - Your site will be live in minutes

## 🌐 Custom Domain Setup

### For Netlify:
1. Domain settings > Add custom domain
2. Add: `www.portgate.com.au`
3. Update DNS:
   - Type: CNAME
   - Name: www
   - Value: [your-site].netlify.app

### For CloudFront:
1. Request SSL certificate in ACM (AWS Certificate Manager)
2. Add alternate domain name in CloudFront
3. Update Route 53 or DNS provider with CloudFront URL

## 📧 Email Configuration

### Contact Form Emails (Netlify):
1. Netlify dashboard > Forms > Notifications
2. Add email notification: enquiries@portgate.com.au

### Email Forwarding:
Consider setting up professional email hosting:
- Google Workspace
- Microsoft 365
- Zoho Mail
- ProtonMail

## 🔐 SSL/HTTPS

### Netlify:
- Automatic SSL with Let's Encrypt
- Enabled by default
- Auto-renewal

### CloudFront:
- Use AWS Certificate Manager
- Request certificate for your domain
- Attach to CloudFront distribution

### S3 Only (Not Recommended):
- S3 website hosting doesn't support HTTPS
- Must use CloudFront for HTTPS

## 📊 Analytics Setup

### Google Analytics 4:

Add before closing `</head>` tag in all HTML files:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Netlify Analytics:
- Built-in analytics available
- No code changes required
- Paid feature

## 🔄 Continuous Deployment

Once connected to Git:

1. **Make Changes Locally:**
   ```bash
   # Edit files
   git add .
   git commit -m "Update services page"
   git push
   ```

2. **Automatic Deployment:**
   - Netlify/Vercel will automatically detect changes
   - New version deploys in 1-2 minutes

## 🧪 Testing After Deployment

- [ ] Visit all pages (Home, Services, Facilities, Compliance, Contact)
- [ ] Test navigation links
- [ ] Test mobile responsiveness
- [ ] Test contact form submission
- [ ] Verify cargo tracker link works
- [ ] Check phone and email links
- [ ] Test on multiple browsers
- [ ] Verify SSL certificate is active
- [ ] Check page load speed

## 🐛 Troubleshooting

### Contact Form Not Working:
- Verify form has `data-netlify="true"` attribute
- Check Netlify Forms dashboard
- Ensure form name matches

### Images Not Loading:
- Check file paths are correct
- Verify images are in `assets/img/` directory
- Check file names match references (case-sensitive)

### Links Not Working:
- Verify all internal links use relative paths
- Check for typos in file names

### SSL Certificate Issues:
- Wait for propagation (up to 24 hours)
- Clear browser cache
- Verify DNS settings

## 📞 Support

For deployment help:
- **Email:** enquiries@portgate.com.au
- **Phone:** (07) 3895 5700

---

✅ **Your site is ready to deploy!**

Choose your preferred method above and follow the steps. The entire process should take 10-30 minutes depending on the platform.

