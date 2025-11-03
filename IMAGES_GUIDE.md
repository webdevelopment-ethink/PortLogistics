# Images Guide for PortGate Logistics Website

## 📸 Required Images

Place your images in the `assets/img/` folder with these names:

### 1. Hero Background Image
- **Filename:** `hero-port.jpg`
- **Recommended size:** 1920x1080px or larger
- **Subject:** Port of Brisbane containers, terminals, or aerial port view
- **Usage:** Main hero section background on home page
- **Optimization:** Keep under 500KB for fast loading

### 2. Depot/Facility Image
- **Filename:** `depot.jpg`
- **Recommended size:** 1200x800px
- **Subject:** PortGate depot facility, hardstand, or operations
- **Usage:** Services page "Why Port Location Matters" section
- **Optimization:** Keep under 300KB

### 3. Container Operations (Optional)
- **Filename:** `containers.jpg`
- **Recommended size:** 1200x800px
- **Subject:** Container handling, packing/unpacking operations
- **Usage:** Additional sections, can replace hero-port.jpg
- **Optimization:** Keep under 300KB

## 🎨 Image Specifications

### Format Recommendations
- **Primary format:** JPG/JPEG (for photos)
- **Alternative:** WebP (best compression, modern browsers)
- **Fallback:** PNG (larger file size)

### Sizing Guidelines
- **Hero images:** 1920x1080px (16:9 ratio)
- **Section images:** 1200x800px (3:2 ratio)
- **Optimize all images** before uploading using:
  - [TinyJPG](https://tinyjpg.com/)
  - [ImageOptim](https://imageoptim.com/)
  - [Squoosh](https://squoosh.app/)

### Quality Settings
- **Hero:** 80-85% quality (JPG)
- **Section images:** 75-80% quality (JPG)
- **Balance:** Visual quality vs. file size

## 🚀 How Images Are Integrated

### Hero Background (index.html)
```css
.hero-background {
    background-image: 
        linear-gradient(...),  /* Dark overlay for text readability */
        url('../img/hero-port.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;  /* Parallax effect */
}
```

**Already configured** - Just add `hero-port.jpg` to `assets/img/` folder!

### Services Page Image
```css
.image-placeholder {
    background-image: 
        linear-gradient(...),  /* Subtle overlay */
        url('../img/depot.jpg');
}
```

**Already configured** - Just add `depot.jpg` to `assets/img/` folder!

## 📝 Adding Your Images - Step by Step

### Method 1: Simple Copy (Recommended)
1. Rename your images to match the required filenames:
   - `hero-port.jpg`
   - `depot.jpg`
   - `containers.jpg` (optional)

2. Copy/drag them into:
   ```
   /Users/eliasmanolis/Desktop/Web Development Clientx/Port Logistics/assets/img/
   ```

3. Refresh your browser - images will appear automatically!

### Method 2: Use Custom Names
If you want to use different filenames:

1. Add your images to `assets/img/` with any name

2. Update CSS in `assets/css/style.css`:
   ```css
   /* Find line ~225 and change: */
   url('../img/hero-port.jpg');
   
   /* To your filename: */
   url('../img/YOUR_FILENAME.jpg');
   ```

## 🎯 Image Placement Locations

### Current Usage
- ✅ **Hero section** (index.html) - Uses `hero-port.jpg`
- ✅ **Services page** - Uses `depot.jpg` in "Why Port Location Matters"
- ✅ **Background ready** - All sections can have background images

### Optional: Add More Images

#### Add image to a specific section:
```html
<!-- In any HTML file, find a section and add: -->
<section class="section" style="background-image: url('assets/img/your-image.jpg'); background-size: cover;">
```

#### Add inline images:
```html
<img src="assets/img/your-image.jpg" alt="Description" style="width: 100%; border-radius: 1rem;">
```

## 🔧 Troubleshooting

### Image Not Showing?
1. **Check filename** - Exact match required (case-sensitive)
2. **Check path** - Must be in `assets/img/` folder
3. **Check format** - JPG, PNG, or WebP
4. **Clear cache** - Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
5. **Check file size** - Very large files may not load quickly

### Image Quality Issues?
1. **Too blurry?** - Use higher resolution source image
2. **Too dark?** - Adjust overlay gradient opacity in CSS
3. **Wrong crop?** - Use `background-position: top/center/bottom`

### Performance Issues?
1. **Compress images** - Use TinyJPG or ImageOptim
2. **Resize images** - Don't use 4K images for web
3. **Convert to WebP** - Better compression than JPG
4. **Lazy loading** - Add later for below-fold images

## 💡 Pro Tips

### 1. Image Optimization Workflow
```bash
# Recommended sizes:
- Original: Your high-quality photo
- Hero: 1920x1080px, 85% quality, ~400KB
- Section: 1200x800px, 80% quality, ~200KB
```

### 2. Test Different Images
```css
/* In style.css, temporarily change: */
url('../img/hero-port.jpg');

/* To test containers image: */
url('../img/containers.jpg');
```

### 3. Adjust Image Brightness
```css
/* If image is too bright or dark: */
.hero-background {
    background-image: 
        linear-gradient(rgba(10, 11, 13, 0.60), rgba(15, 16, 18, 0.60)),  /* Adjust these numbers */
        url('../img/hero-port.jpg');
}

/* Lower number = brighter */
/* Higher number = darker */
```

### 4. Change Image Position
```css
background-position: center;       /* Current default */
background-position: top;          /* Show top of image */
background-position: bottom;       /* Show bottom */
background-position: center top;   /* Center horizontally, top vertically */
```

## 📐 Image Dimensions Reference

| Image Type | Width | Height | Ratio | Max Size |
|------------|-------|--------|-------|----------|
| Hero | 1920px | 1080px | 16:9 | 500KB |
| Section | 1200px | 800px | 3:2 | 300KB |
| Thumbnail | 600px | 400px | 3:2 | 100KB |
| Icon | 512px | 512px | 1:1 | 50KB |

## 🎨 Recommended Photo Styles

### For Hero Background (`hero-port.jpg`)
- **Style:** Wide-angle, panoramic shot
- **Subject:** Port terminals, container yards, cranes
- **Time:** Golden hour (sunset/sunrise) or daytime
- **Mood:** Professional, busy, industrial
- **Examples:**
  - Aerial view of Port of Brisbane
  - Container stacks with cranes
  - Ships at terminal
  - Wide depot view

### For Depot Image (`depot.jpg`)
- **Style:** Ground-level, detail shot
- **Subject:** PortGate depot, operations, trucks
- **Time:** Bright daylight for clarity
- **Mood:** Clean, organized, professional
- **Examples:**
  - Depot hardstand with containers
  - Forklift operations
  - Truck loading/unloading
  - Facility exterior

## 🚦 Quick Start Checklist

- [ ] Rename your best port image to `hero-port.jpg`
- [ ] Rename your depot image to `depot.jpg`
- [ ] Copy both files to `assets/img/` folder
- [ ] Refresh website in browser
- [ ] Check hero section has image
- [ ] Check services page has depot image
- [ ] Optimize images if page loads slowly
- [ ] Test on mobile device

## 📞 Need Help?

If images aren't showing correctly:
1. Check browser console (F12) for errors
2. Verify file paths are correct
3. Ensure image files aren't corrupted
4. Test with a different image format
5. Contact web developer for assistance

---

**Note:** The CSS is already configured to display your images. Simply add the files with the correct names and they'll appear automatically!

