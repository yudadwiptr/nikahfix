# WhatsApp Share Debug Guide

## Problem
WhatsApp tidak menampilkan gambar saat share link, meski meta Open Graph sudah diset.

## Root Cause 
Berdasarkan check, deployed version masih menggunakan meta tags lama. Perlu deploy ulang perubahan terbaru.

## Solution Steps

### 1. Deploy Perubahan Terbaru
```bash
# Commit dan push perubahan
git add .
git commit -m "Fix WhatsApp meta tags with cache busting"
git push

# Jika menggunakan Vercel
vercel --prod
```

### 2. Test Meta Tags
Setelah deploy, test URL ini di browser:
```
https://dewi-piter.vercel.app/images/meta.jpeg?v=2
```

### 3. Clear WhatsApp Cache
WhatsApp meng-cache preview. Untuk refresh:

**Cara 1: Query Parameter**
Tambahkan `?v=2` saat share:
```
https://dewi-piter.vercel.app/?v=2
```

**Cara 2: Facebook Debugger**
1. Buka: https://developers.facebook.com/tools/debug/
2. Masukkan URL: https://dewi-piter.vercel.app/
3. Klik "Debug" lalu "Scrape Again"

### 4. Verify Meta Tags
Check apakah meta tags sudah benar di live site:
```bash
curl -s "https://dewi-piter.vercel.app/" | grep -A5 -B5 "og:image"
```

## Changes Made

### Meta Tags Improvements:
- ✅ Added `?v=2` cache busting parameter  
- ✅ Added `og:image:alt` for accessibility
- ✅ Added `og:locale` for Indonesian content
- ✅ Added `fb:app_id` (required by Facebook)
- ✅ Added `meta name="thumbnail"` fallback
- ✅ Unified Twitter and OG descriptions

### Current Meta Structure:
```html
<meta property="og:image" content="https://dewi-piter.vercel.app/images/meta.jpeg?v=2" />
<meta property="og:image:secure_url" content="https://dewi-piter.vercel.app/images/meta.jpeg?v=2" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Dewi & Piter Wedding Invitation" />
```

## Testing Checklist

- [ ] Deploy perubahan ke Vercel/hosting
- [ ] Test image URL: `https://dewi-piter.vercel.app/images/meta.jpeg?v=2`
- [ ] Verify meta tags di deployed version
- [ ] Test share dengan query param: `?v=2`
- [ ] Clear cache dengan Facebook Debugger
- [ ] Test final share di WhatsApp

## Backup Solutions

Jika masih tidak work:

1. **Replace image**: Upload image baru dengan nama berbeda (meta2.jpeg)
2. **Check image dimensions**: Pastikan minimal 300x200, ideal 1200x630
3. **Check image size**: Max 5MB untuk optimal loading
4. **Add structured data**: JSON-LD untuk enhanced previews

## Files Modified
- `index.html` - Updated meta tags
- `src/components/section/detail-info/index.jsx` - Added video loop