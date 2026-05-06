# Step-by-Step Deployment Guide

---

## STEP 1: Delete .bolt Folder Locally

### Option A: Using Terminal (Recommended)
```powershell
# Open PowerShell in your project directory
cd c:\Users\Emmanuel Hasalama\Documents\Programming\martamorageneraldealers

# Delete the .bolt folder
Remove-Item -Path ".bolt" -Recurse -Force

# Verify it's gone
Get-ChildItem -Force | Where-Object { $_.Name -eq ".bolt" }
# If nothing prints, folder is deleted
```

### Option B: Using File Explorer
1. Open File Explorer
2. Navigate to `c:\Users\Emmanuel Hasalama\Documents\Programming\martamorageneraldealers`
3. Press `Ctrl+H` to show hidden files
4. Look for `.bolt` folder (starts with dot = hidden)
5. Right-click → Delete
6. Confirm deletion

### Option C: Using VS Code
1. Open Terminal in VS Code (`Ctrl+` `)
2. Run:
```powershell
Remove-Item -Path ".bolt" -Recurse -Force
```

### Verification
```powershell
# Should see no .bolt folder
ls -Force
```

✅ **Done:** .bolt folder deleted locally

---

## STEP 2: Run SQL Migration on Supabase

### Navigate to Supabase Console
1. Open browser: https://app.supabase.com
2. Sign in with your Supabase account
3. Select your project: `martamora-general-dealers`

### Access SQL Editor
1. In left sidebar, click **SQL Editor**
2. Click **+ New query**
3. Name it: `add-cms-functionality` (or any name)

### Copy Migration SQL
1. In VS Code, open: `supabase/migrations/20260211214500_add_cms_admin_functionality.sql`
2. Select all: `Ctrl+A`
3. Copy: `Ctrl+C`

### Paste & Run
1. In Supabase SQL Editor, paste the entire SQL
2. Click **Run** button (blue play icon, top-right)
3. Wait for completion (should show ✅ green checkmark)

### Verify Tables Created
After SQL runs successfully, verify in Supabase:

**Check site_content table:**
1. Click **Database** in left sidebar
2. Expand **Tables**
3. Click **site_content**
4. Should see columns: id, page, section, content, created_at, updated_at
5. Should see 40+ seed rows with content

**Verify rows:**
```sql
-- Click "New query" and run this to verify:
SELECT COUNT(*) as total_rows FROM site_content;
-- Should return: 40+

SELECT DISTINCT page FROM site_content;
-- Should return: home, about, contact
```

✅ **Done:** Migration applied, tables created, seed data loaded

---

## STEP 3: Create Admin User in Auth

### Navigate to Auth Dashboard
1. In Supabase console, click **Authentication** (left sidebar)
2. Click **Users** tab
3. You'll see a list of existing users (may be empty)

### Create New User
1. Click **Add user** button (top-right)
2. Fill form:
   - **Email:** `admin@martamora.test`
   - **Password:** `SecurePassword123!` (choose your own secure password)
   - **Auto confirm user:** Toggle ON (so they don't need email confirmation)

3. Click **Create user**

### Verify User Created
After creation, you should see in Users list:
- Email: `admin@martamora.test`
- Status: Confirmed ✓
- Created: today's date

### Note Password
⚠️ Write down the password you set. You'll need it to login at `/admin` on your live site.

✅ **Done:** Admin user created and confirmed

---

## STEP 4: Create assets Storage Bucket

### Navigate to Storage
1. In Supabase console, click **Storage** (left sidebar)
2. Click **Buckets** tab
3. Click **Create a new bucket**

### Configure Bucket
1. **Bucket name:** `assets` (exactly this)
2. **Make it public:** Toggle ON (green)
3. Click **Create bucket**

### Set Public Access
After bucket created:
1. Click on **assets** bucket name
2. Click **Settings** tab (if shown)
3. Ensure **Make bucket public** is enabled

### Create Folder Structure (Optional)
Inside the bucket, you can organize by creating a folder:
1. Click **assets** bucket
2. Click **Upload** → **New folder**
3. Name: `images` (or skip this step)

### Verify Bucket
1. Click **Storage** in sidebar
2. Should see `assets` bucket listed
3. Icon should show 🔓 (public)

✅ **Done:** Storage bucket created and set to public

---

## STEP 5: Build & Test Locally

### Step 5A: Install Dependencies
```powershell
# Navigate to project
cd c:\Users\Emmanuel Hasalama\Documents\Programming\martamorageneraldealers

# Install node modules
npm install

# Should complete without errors (may take 1-2 minutes)
```

### Step 5B: Build Production Bundle
```powershell
# Build the project
npm run build

# Should see output:
# ✓ built in 5.23s
# ✓ dist/ folder created with optimized files
```

### Step 5C: Run Preview Server
```powershell
# Start local preview
npm run preview

# Should see output like:
# ➜ Local: http://localhost:4173/
# ➜ Press q to quit
```

### Step 5D: Test in Browser
1. Open browser: http://localhost:4173
2. **Test public site:**
   - Homepage loads ✓
   - About page loads ✓
   - Contact page loads ✓
   - Products page loads ✓
   - Gallery page loads ✓
   - No pencil icons visible ✓

3. **Test admin login:**
   - Navigate to: http://localhost:4173/admin
   - See login form
   - Enter email: `admin@martamora.test`
   - Enter password: (the one you set in Step 3)
   - Click "Sign In"
   - Should show "Logged in as admin@martamora.test"

4. **Test editing (if logged in):**
   - Navigate home: http://localhost:4173
   - Should see pencil icons (✏️) on text
   - Click pencil on "Natural Wellness" hero text
   - Modal should appear
   - Try changing text (don't save yet - this is just testing the modal)

5. **Test image upload:**
   - On home page (logged in as admin)
   - Look for "+ Add Feature" button (bottom-right, floating)
   - Click it
   - Modal with form appears
   - Click "Choose Image"
   - Select any JPG/PNG from your computer
   - Preview should show
   - (You can cancel this test - no need to save)

### Stop Preview Server
```powershell
# Press q or Ctrl+C to stop the preview server
# Should return to normal PowerShell prompt
```

### Troubleshooting Build Issues

**Error: "npm: command not found"**
- Node.js not installed. Download from nodejs.org

**Error: "Cannot find module"**
```powershell
# Delete node_modules and reinstall
Remove-Item -Path "node_modules" -Recurse -Force
npm install
npm run build
```

**Error: "Port 4173 already in use"**
```powershell
# Kill the process using that port and try again
# Or use different port:
npm run preview -- --port 4174
```

✅ **Done:** Build successful, local preview tested

---

## STEP 6: Deploy dist/ to Namecheap

### Step 6A: Navigate to Namecheap cPanel
1. Open browser: https://namecheap.com
2. Sign in to your account
3. Click **Dashboard** → Your Domains
4. Find `martamora.co.zm` (or your domain)
5. Click **Manage** button

### Step 6B: Access File Manager
1. In cPanel, find **File Manager** (or **File Manager** in sidebar)
2. Click to open
3. Navigate to: `public_html` folder
4. This is where your live website files are

### Step 6C: Backup Current Files (Optional but Recommended)
Before uploading new files:
1. Select all files in `public_html`
2. Right-click → **Compress**
3. Download the backup ZIP
4. Save to your computer (just in case)

### Step 6D: Delete Old Files
1. Select all files in `public_html`
2. Right-click → **Delete**
3. Confirm deletion
4. Folder should now be empty

### Step 6E: Upload New dist/ Folder
**Option 1: Upload via File Manager (Easiest)**

1. On your computer, open `dist` folder:
   `c:\Users\Emmanuel Hasalama\Documents\Programming\martamorageneraldealers\dist`

2. Select all files inside dist/ (not the folder itself):
   - `index.html`
   - `assets/` folder
   - Other files

3. In Namecheap File Manager, with `public_html` open:
   - Click **Upload** button
   - Select all files from dist/
   - Upload will begin
   - Wait until 100% complete (may take 2-5 minutes)

**Option 2: Upload as ZIP (Faster)**

1. On your computer:
   - Right-click `dist` folder
   - Select **Send to** → **Compressed (zipped) folder**
   - Creates `dist.zip`

2. In Namecheap File Manager:
   - Click **Upload**
   - Select `dist.zip`
   - After upload completes, right-click on zip
   - Select **Extract**
   - Choose location: `public_html`
   - Extract will place all files correctly

3. Delete the `dist.zip` file from `public_html` (not needed)

### Step 6F: Verify File Structure
After upload, in `public_html` you should see:
```
public_html/
  ├── index.html (root file - most important!)
  ├── assets/
  │   ├── css/
  │   ├── js/
  │   └── [images]
  ├── favicon.ico (optional)
  └── [other files]
```

### Step 6G: Clear Browser Cache
1. Open browser to your live domain: https://martamora.co.zm
2. Clear cache: `Ctrl+Shift+Delete`
3. Refresh page: `Ctrl+R`

### Step 6H: Test Live Site
Navigate to each page and verify:

**Public Pages (no admin UI visible):**
- [ ] https://martamora.co.zm (Home)
- [ ] https://martamora.co.zm/about (About)
- [ ] https://martamora.co.zm/contact (Contact)
- [ ] https://martamora.co.zm/products (Products)
- [ ] https://martamora.co.zm/gallery (Gallery)
- [ ] All pages load without errors
- [ ] No pencil icons visible
- [ ] Images load correctly
- [ ] Styling matches local preview
- [ ] Responsive on mobile (test with DevTools)

**Admin Features:**
- [ ] https://martamora.co.zm/admin (Login page)
- [ ] Login with `admin@martamora.test` + password
- [ ] See pencil icons after login
- [ ] Try editing a text field
- [ ] Click pencil, change text, save
- [ ] Text updates in database

**Design Verification:**
- [ ] Colors correct (brown #754C29, green #39B54A)
- [ ] Fonts correct (Times New Roman, Calibri)
- [ ] Spacing matches mockup
- [ ] No Bolt references anywhere
- [ ] "Natural Wellness" heading visible
- [ ] Feature cards in grid
- [ ] Navigation bar correct
- [ ] Footer correct

### Troubleshooting Deployment

**Blank page / 404 error:**
- Verify `index.html` exists in `public_html` (root level)
- Clear browser cache: `Ctrl+Shift+Delete`
- Wait 5 minutes for DNS propagation

**CSS/JS not loading:**
- Check Network tab in DevTools (F12)
- Look for 404 errors on asset files
- Verify `assets/` folder uploaded correctly
- Check folder permissions (should be readable)

**Admin login not working:**
- Verify admin user exists in Supabase Auth
- Verify email/password are correct
- Check browser console (F12) for errors
- Verify `.env` file has correct Supabase keys

**Images not displaying:**
- Verify Storage bucket `assets` exists
- Check bucket is PUBLIC (🔓 icon)
- Verify image URLs start with: `https://iquwivcscigzxysodobc.supabase.co/storage`

**Changes not persisting:**
- Verify migration ran on Supabase (site_content table exists)
- Check RLS policies in Supabase (authenticated users should have write access)
- Verify admin is actually logged in

✅ **Done:** Site live on Namecheap!

---

## Final Verification Checklist

Before considering deployment complete:

### Backend
- [ ] SQL migration applied to Supabase
- [ ] `site_content` table exists with seed data
- [ ] Admin user created in Auth
- [ ] `assets` bucket created and public

### Local Testing
- [ ] `npm install` completed
- [ ] `npm run build` succeeded
- [ ] Local preview tested at http://localhost:4173
- [ ] All pages load
- [ ] Admin login works
- [ ] Pencil icons visible when logged in
- [ ] Edit modal appears on click

### Deployment
- [ ] `.bolt` folder deleted
- [ ] Old files removed from `public_html`
- [ ] New files uploaded to `public_html`
- [ ] `index.html` in root of `public_html`
- [ ] `assets/` folder uploaded correctly

### Live Testing
- [ ] Home page loads at domain
- [ ] About/Contact/Products/Gallery load
- [ ] No admin UI for logged-out users
- [ ] Admin login works
- [ ] Pencil icons visible when logged in
- [ ] Edit a field and verify it saves
- [ ] Images display correctly
- [ ] Responsive design intact
- [ ] No Bolt references visible

---

## Rollback Plan (If Something Goes Wrong)

If live site breaks after deployment:

1. **Delete all files in `public_html`**
2. **Restore backup ZIP** (if you made one in Step 6C)
3. **Extract to `public_html`**
4. **Test site**

OR

1. **Contact Namecheap support** for file restoration from backups

---

## Support Resources

**Supabase Issues:**
- Dashboard: https://app.supabase.com
- Docs: https://supabase.com/docs
- Email support in dashboard

**Namecheap Issues:**
- Dashboard: https://namecheap.com
- Support: https://namecheap.com/support/
- Live chat available

**Project Files:**
- Local: `c:\Users\Emmanuel Hasalama\Documents\Programming\martamorageneraldealers`
- Migration: `supabase/migrations/20260211214500_add_cms_admin_functionality.sql`
- Build output: `dist/` (created after `npm run build`)

---

## Success! 🎉

Once all steps complete and live site is verified working:
- Site is live with CMS
- Admin can edit all content inline
- Users see updated content in real-time
- Bolt AI references completely removed
- No visual changes from original design
