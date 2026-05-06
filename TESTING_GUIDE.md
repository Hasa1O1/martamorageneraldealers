# CMS Testing Guide - Martamora General Dealers

## Pre-Testing Setup

### 1. Run Migration
Apply the SQL migration to Supabase:
```bash
# In Supabase console → SQL Editor → paste and run:
# supabase/migrations/20260211214500_add_cms_admin_functionality.sql
```

**Creates:**
- `site_content` table with seed data
- RLS policies
- Admin write permissions on products/gallery_items

### 2. Create Admin User
In Supabase Auth Dashboard:
- Email: `admin@martamora.test`
- Password: `TestPassword123!`

### 3. Build & Run
```bash
npm install
npm run build
npm run preview  # Local preview server
```

---

## Test Cases

### ✅ TEST 1: Homepage Hero Text
**Location:** Home page, top section

**Steps:**
1. Navigate to home page
2. Look for pencil icon (✏️) next to "Natural Wellness"
3. Click pencil
4. Modal appears with textarea
5. Change text to "Herbal Excellence"
6. Click "Save Changes"
7. Modal closes
8. Text updates instantly

**Expected:** Text changes visible immediately, no page reload needed

**Supabase Verification:**
```sql
SELECT * FROM site_content 
WHERE page='home' AND section='hero_title_1';
-- Should show: content = "Herbal Excellence"
```

---

### ✅ TEST 2: Homepage Feature Cards
**Location:** Home page, feature grid (4 cards: "Natural Products", etc.)

**Steps:**
1. Hover over any feature card
2. Edit icon (✎) and Delete icon (🗑) appear in top-right
3. Click Edit
4. Modal shows title + description
5. Change title to "Premium Herbs"
6. Upload new image (if needed)
7. Click "Save Changes"
8. Modal closes, card updates

**Expected:** 
- Edit/delete only visible to admin
- Changes persist on page reload
- Images upload to Storage bucket

**Supabase Verification:**
```sql
SELECT * FROM site_content 
WHERE page='home' AND section LIKE 'home_feature_%'
ORDER BY created_at DESC LIMIT 1;
```

---

### ✅ TEST 3: Add New Feature Card
**Location:** Home page, floating button (bottom-right)

**Steps:**
1. Look for "+ Add Feature" button (floating, bottom-right)
2. Click button
3. Modal appears with form:
   - Title field
   - Description field
   - Category dropdown
   - Image uploader
4. Fill form:
   - Title: "Immunity Boost"
   - Description: "Natural immune support"
   - Category: "Health"
   - Upload image (JPG/PNG)
5. Click "Save Card"
6. Modal closes
7. New card appears in grid

**Expected:**
- Image uploads to `assets/` bucket
- Card appears immediately in grid
- Public URL visible in feature card

---

### ✅ TEST 4: About Page Editing
**Location:** About page

**Steps:**
1. Navigate to About
2. Find sections:
   - "About Us" heading (hero)
   - "Who We Are" paragraphs (3 sections)
   - "Our Vision" section
   - "Our Mission" section
   - "Our Commitment" (bottom gradient card)
3. Click pencil on any section
4. Edit text
5. Save
6. Verify text updates

**Expected:** All sections independently editable

**Data Structure:**
```
page = 'about'
sections:
  - 'hero_title'
  - 'who_we_are_text_1', 'who_we_are_text_2', 'who_we_are_text_3'
  - 'vision_title', 'vision_text'
  - 'mission_title', 'mission_text'
  - 'commitment_title', 'commitment_text'
```

---

### ✅ TEST 5: Contact Page Information
**Location:** Contact page

**Steps:**
1. Navigate to Contact
2. Edit phone number:
   - Click pencil next to "0772792147"
   - Change to "0771234567"
   - Save
3. Edit email:
   - Click pencil next to email
   - Save
4. Edit location:
   - Change "Zambia" to specific city
   - Save
5. Edit business hours:
   - Modify hours text
   - Save
6. Edit form title:
   - Change "Send Us a Message"
   - Save

**Expected:** All contact info editable, form logic unchanged

**Supabase Sections:**
```
page = 'contact'
sections:
  - 'phone_label', 'phone_value'
  - 'email_label', 'email_value'
  - 'location_label', 'location_value'
  - 'hours_title', 'hours_text'
  - 'form_title'
```

---

### ✅ TEST 6: Permission Checks
**Location:** Any editable page (logged out)

**Steps:**
1. Log out from `/admin`
2. Navigate to home page
3. Try to find pencil icons
4. Try to find "+ Add Feature" button
5. Navigate to products/gallery pages

**Expected:**
- NO pencil icons visible
- NO edit/delete buttons visible
- NO "+ Add" button
- Pages look identical to public users

---

### ✅ TEST 7: Admin Login
**Location:** `/admin` route

**Steps:**
1. Navigate to `https://your-domain.com/admin`
2. See login form:
   - Email input
   - Password input
   - "Sign In" button
3. Enter admin credentials:
   - Email: `admin@martamora.test`
   - Password: `TestPassword123!`
4. Click "Sign In"
5. Form disappears
6. Shows:
   - Welcome message
   - Logged-in email
   - "Sign Out" button

**Expected:**
- Session persists on page reload
- Breadcrumb navigation shows current page
- Sign out clears session

---

### ✅ TEST 8: Image Upload
**Location:** Any card edit modal

**Steps:**
1. Click "+ Add Feature" button
2. Fill form fields
3. Click "Choose Image"
4. Select JPG/PNG from computer
5. Image preview appears
6. Click "Save Card"
7. Wait for upload
8. Card appears with image

**Expected:**
- Preview shows immediately
- Upload to `assets/` bucket
- Public URL generated
- Image displays in card

**Supabase Verification:**
```sql
SELECT COUNT(*) FROM site_content 
WHERE page='home' AND content LIKE '%https://iquwivcscigzxysodobc.supabase.co/storage%';
```

---

### ✅ TEST 9: Responsive Design
**Location:** Any page on mobile/tablet

**Steps:**
1. Open DevTools → Toggle Device Toolbar
2. Test at breakpoints:
   - 375px (iPhone SE)
   - 768px (iPad)
   - 1024px (iPad Pro)
   - 1920px (Desktop)
3. Verify:
   - Text remains readable
   - Pencil icons accessible
   - Modals fit screen
   - "+ Add" button visible
   - Grid layout adjusts

**Expected:** All responsive classes preserved, CMS UI scales properly

---

### ✅ TEST 10: Data Persistence
**Location:** All editable pages

**Steps:**
1. Edit text on home page
2. Reload browser (Ctrl+R)
3. Text should remain changed
4. Close and reopen browser
5. Text should persist
6. Navigate away and back
7. Text should still be there

**Expected:** All data persists in Supabase

---

## Visual Design Verification

### Check These Remain Unchanged:
- [ ] Colors: Brown #754C29, Green #39B54A, Blues
- [ ] Fonts: Times New Roman serif (headers), Calibri sans-serif (body)
- [ ] Spacing: Padding, margins, gaps between sections
- [ ] Grid layouts: 4 columns on desktop, responsive on mobile
- [ ] Gradients: All gradient backgrounds intact
- [ ] Icons: All original icons (Leaf, Award, Users, Heart)
- [ ] Buttons: Green CTA buttons same style
- [ ] Forms: Form styling unchanged

### Admin-Only UI Added:
- [ ] Pencil icons (✏️) on text
- [ ] Edit icons (✎) on cards
- [ ] Delete icons (🗑) on cards
- [ ] "+ Add" floating button (bottom-right)
- [ ] Admin login page (`/admin`)
- [ ] Modal dialogs for editing

---

## Troubleshooting

### Pencil icons not showing
```
1. Check: Are you logged in? (navigate to /admin)
2. Check: Browser console for errors
3. Check: useAuth hook returns isAdmin=true
4. Check: RLS policy allows SELECT on site_content
```

### Can't upload images
```
1. Check: Storage bucket "assets" exists
2. Check: Bucket is public (READ policy)
3. Check: RLS policy allows authenticated upload
4. Check: File size < 10MB
5. Check: File format is JPG/PNG/WebP
```

### Changes not saving
```
1. Check: Supabase connection in Network tab
2. Check: No 401/403 errors in console
3. Check: Site_content table exists with correct schema
4. Check: RLS policy allows authenticated UPDATE
5. Check: No duplicate (page, section) violation
```

### Errors after adding new EditableText
```
1. Ensure page/section values match seed data
2. Ensure tag prop is valid HTML tag (h1, h2, p, div, etc.)
3. Ensure className includes proper Tailwind classes
4. Check console for TypeScript/React errors
```

---

## Final Sign-Off

Before deploying to production:
- [ ] All 10 tests pass
- [ ] Visual design unchanged
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Data persists on reload
- [ ] Public users see no admin UI
- [ ] Bolt references removed
- [ ] Build completes successfully

✅ **Ready for production!**
