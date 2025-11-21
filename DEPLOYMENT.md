# Deployment Guide - Render.com

## Quick Deploy

1. **Push your code to GitHub** (if not already)

2. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up or login

3. **Deploy Static Site**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Render will auto-detect the `render.yaml` config
   - Click "Create Static Site"

4. **Configuration** (if not using render.yaml)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**: Already configured in render.yaml

5. **Backend**
   - Your backend (Lovable Cloud/Supabase) is already hosted
   - The frontend will connect automatically
   - No additional backend deployment needed

## Admin Access

Login at: `https://your-site.onrender.com/admin/login`
- **Username**: Pavan56
- **Password**: Pavanreddy56@

## Features Working

✅ Portfolio display  
✅ Admin panel  
✅ Contact form  
✅ Blog posts  
✅ Projects showcase  
✅ Skills management  
✅ GitHub repos  
✅ Resume upload  
✅ Real-time updates  

## Architecture

- **Frontend**: Static React app on Render.com
- **Backend**: Lovable Cloud (Supabase)
- **Database**: PostgreSQL (via Supabase)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage (if configured)

## Custom Domain

1. Go to your Render dashboard
2. Select your site → Settings
3. Add custom domain
4. Update DNS records as instructed

## Notes

- First deploy takes 2-5 minutes
- Auto-deploys on git push
- Free tier available
- SSL included automatically
