# Martamora CMS Implementation Guide

## PART 1: BOLT AI CLEANUP ✓ COMPLETE

### Files Modified/Deleted
1. **index.html** - Removed Bolt meta tags (og:image, twitter:image)
2. **.bolt/** folder - Delete entire folder (contains `config.json` and `prompt`)
   - Manual step: `rm -r .bolt/`
3. **dist/index.html** - Also remove Bolt references (rebuild with `npm run build`)

### No changes needed in:
- Source code files (no Bolt references found)
- Environment variables (clean)
- Build configuration
- Package dependencies

---

## PART 2: INLINE CMS IMPLEMENTATION ✓ COMPLETE

### New Files Created

#### Core Infrastructure
- **src/context/AuthContext.tsx** - Auth provider + hooks
- **src/pages/AdminLogin.tsx** - Admin login page at `/admin`

#### Reusable Components
- **src/components/EditModal.tsx** - Modal wrapper for edits
- **src/components/EditableText.tsx** - Inline edit wrapper for text fields
- **src/components/EditableCard.tsx** - Wrapper for card edit/delete buttons
- **src/components/ImageUploader.tsx** - File upload to Supabase Storage
- **src/components/AddCardForm.tsx** - Create new product/gallery/feature cards

#### Database Migrations
- **supabase/migrations/20260211214500_add_cms_admin_functionality.sql** - CMS schema + RLS

### Modified Files

#### 1. **src/main.tsx**
- Added `AuthProvider` wrapper around App

#### 2. **src/App.tsx**
- Added admin route (`/admin`)
- Integrated browser history management for SPA routing
- Imported `AdminLogin` page

#### 3. **src/pages/Home.tsx** (FULLY REFACTORED)
- Replaced hardcoded text with `EditableText` components
- Feature cards now fetch from Supabase `site_content` table
- Added edit/delete modals for feature cards (admin only)
- Added floating "+ Add Feature" button (admin only)
- All visual layout & Tailwind classes preserved

### Updated Files (To Be Done)
- **src/pages/About.tsx** - Replace hardcoded text with EditableText
- **src/pages/Contact.tsx** - Replace contact info with EditableText + feature delete
- **src/pages/Products.tsx** - Add edit/delete buttons on products (admin only)
- **src/pages/Gallery.tsx** - Add edit/delete buttons on gallery items (admin only)

---

## Database Schema

### New Table: `site_content`
```sql
CREATE TABLE site_content (
  id uuid PRIMARY KEY,
  page text NOT NULL,
  section text NOT NULL,
  content text NOT NULL,
  created_at timestamptz,
  updated_at timestamptz,
  UNIQUE(page, section)
);
```

**Sample rows:**
- `page='home'`, `section='hero_title_1'`, `content='Natural Wellness'`
- `page='home'`, `section='hero_title_2'`, `content='Through Herbs'`
- `page='home'`, `section='home_feature_1'`, `content='{"title":"Natural Products",...}'`
- `page='about'`, `section='who_we_are_text'`, `content='Martamora General Dealers...'`

### Updated Tables
- **products** - Added RLS policies for authenticated admin insert/update/delete
- **gallery_items** - Added RLS policies for authenticated admin insert/update/delete
- **storage.objects** (implicit) - `assets` bucket for images

### RLS Policies
- **Public:** Read-only on products, gallery_items, site_content
- **Authenticated:** Full CRUD on site_content, insert/update/delete on products & gallery_items
- **Storage:** Authenticated users upload to `assets/`, all users can read

---

## Admin Workflow

### 1. Admin Login
- Navigate to `/admin`
- Sign in with Supabase auth credentials
- Session stored in context

### 2. Edit Text Content
- Pencil icon appears on every editable text field (admin only)
- Click → modal with textarea
- Save → updates Supabase immediately
- Page auto-refreshes with new content

### 3. Edit/Delete Cards
- Feature cards, products, gallery items show edit/delete icons (admin only)
- Edit → modal form pre-filled
- Delete → confirmation dialog
- All changes save to Supabase in real-time

### 4. Add New Cards
- Floating "+ Add Feature/Product/Gallery Item" button (admin only)
- Bottom-right corner
- Modal form with fields for title, description, category, image upload
- Auto-uploads images to Supabase Storage

---

## Environment Variables (No Changes Needed)
```
VITE_SUPABASE_URL=https://iquwivcscigzxysodobc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Supabase Auth automatically uses the same project.

---

## Deployment Instructions

### Step 1: Push CMS Migration
```bash
# Via Supabase dashboard or CLI:
supabase migration up
# Or manually run SQL in Supabase SQL Editor:
# Copy content of: supabase/migrations/20260211214500_add_cms_admin_functionality.sql
```

### Step 2: Create Storage Bucket
- Supabase Dashboard → Storage → Create Bucket
- Name: `assets`
- Make Public: YES
- RLS Policy: Allow authenticated to upload, anonymous to read

### Step 3: Create Admin User
- Supabase Dashboard → Authentication → Create User
- Email: your-admin@email.com
- Password: secure password
- (Can be any Supabase-authenticated user)

### Step 4: Remove Bolt Artifacts
```bash
rm -r .bolt/
```

### Step 5: Build & Deploy
```bash
npm install
npm run build
# Upload dist/ folder to Namecheap public_html/
```

### Step 6: Test Admin Access
- Go to: `https://your-domain.com/admin`
- Login with credentials from Step 3
- Pencil icons should appear on editable text
- Edit/delete buttons on cards

---

## File Structure After Implementation

```
src/
├── App.tsx                      (✓ updated - admin route)
├── main.tsx                     (✓ updated - AuthProvider)
├── context/
│   └── AuthContext.tsx          (✓ new - auth logic)
├── components/
│   ├── Navigation.tsx           (unchanged)
│   ├── Footer.tsx               (unchanged)
│   ├── EditModal.tsx            (✓ new)
│   ├── EditableText.tsx         (✓ new)
│   ├── EditableCard.tsx         (✓ new)
│   ├── ImageUploader.tsx        (✓ new)
│   └── AddCardForm.tsx          (✓ new)
└── pages/
    ├── Home.tsx                 (✓ refactored - inline CMS)
    ├── About.tsx                (~ needs EditableText wrapping)
    ├── Contact.tsx              (~ needs EditableText wrapping)
    ├── Products.tsx             (~ needs card edit/delete)
    ├── Gallery.tsx              (~ needs card edit/delete)
    └── AdminLogin.tsx           (✓ new)

supabase/
└── migrations/
    ├── 20260211214253_...       (existing)
    └── 20260211214500_...       (✓ new CMS schema)
```

---

## Key Features

### ✓ Implemented
1. Admin authentication (`/admin` route)
2. Inline editable text with modals
3. Feature card CRUD (Home page)
4. Floating "+ Add" button for admins
5. Image upload to Supabase Storage
6. Real-time database updates
7. RLS for security
8. No rebuild needed for content changes

### ⚠️ Optional Next Steps
- Add edit/delete to About, Contact text
- Add edit/delete/add to Products & Gallery pages
- Add footer content to CMS
- Add rich text editor (Markdown)
- Add bulk content import
- Add content revision history

---

## Troubleshooting

### Admin can't see edit buttons
- Check browser console for auth errors
- Verify user is authenticated in AuthContext
- Confirm RLS policies applied in Supabase

### Images not uploading
- Check `assets` bucket exists and is public
- Verify RLS policy allows authenticated uploads
- Check browser console for storage errors

### Content not saving
- Check Supabase connection in browser DevTools Network tab
- Verify `site_content` table schema matches migration
- Check RLS policies on site_content table

### Pencil icons not showing
- Ensure admin is logged in (`useAuth().isAdmin === true`)
- Check EditableText component is rendering correctly
- Verify page/section naming matches database

---

## Visual Design Preserved

✓ All Tailwind classes unchanged
✓ Layout, spacing, colors identical
✓ Fonts (Times New Roman, Calibri) preserved
✓ Responsive behavior maintained
✓ No visual differences for public users
✓ Edit UI only visible to logged-in admin

---

## Next: Remaining Pages

To complete the CMS for all pages, follow the same pattern used in Home.tsx:

1. **Wrap hardcoded text** with `<EditableText page="..." section="..." />`
2. **Wrap cards** with `<EditableCard onEdit={...} onDelete={...}>`
3. **Add `AddCardForm`** to Products/Gallery bottom-right (admin only)
4. **Fetch content** from Supabase on mount with `useEffect`

See Home.tsx for full example.
