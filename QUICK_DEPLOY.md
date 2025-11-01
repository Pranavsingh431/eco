# ⚡ Quick Deploy Guide

## 🚀 Deploy to Vercel in 5 Minutes

### Step 1: Push to GitHub (1 min)
```bash
git add .
git commit -m "Production-ready deployment"
git push origin main
```

### Step 2: Import to Vercel (2 min)
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import" next to your repository
3. Click "Deploy" (it will fail first - that's OK!)

### Step 3: Add API Key (1 min)
1. Go to your project settings on Vercel
2. Click "Environment Variables"
3. Add:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** `AIzaSyC124pWTf-SOUjMPK9knCByh5R02oc4ghM`
   - **Environments:** ✅ Production ✅ Preview ✅ Development
4. Click "Save"

### Step 4: Redeploy (1 min)
1. Go to "Deployments" tab
2. Click "..." on the failed deployment
3. Click "Redeploy"
4. Wait 2-3 minutes

### ✅ Done!
Your app is now live! 🎉

---

## 🔥 One-Command Local Test

```bash
npm run build && npm start
```

Visit: http://localhost:3000

---

## 📋 Pre-Deploy Checklist

- [x] ✅ `.env.local` created with API key
- [x] ✅ Build successful (`npm run build`)
- [x] ✅ Code pushed to GitHub
- [ ] ⏳ Environment variable set in Vercel
- [ ] ⏳ Deployed to Vercel

---

## 🆘 If Something Goes Wrong

### Build Fails?
```bash
npm run check-env
npm run build
```

### API Not Working?
Check Vercel dashboard → Settings → Environment Variables → Verify `GEMINI_API_KEY` is set

### Need Help?
Read `DEPLOYMENT.md` for detailed instructions

---

## 📞 Important URLs

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Get Gemini API Key:** https://aistudio.google.com/app/apikey
- **Vercel Docs:** https://vercel.com/docs

---

**Your Gemini API Key:** `AIzaSyC124pWTf-SOUjMPK9knCByh5R02oc4ghM`

**Remember to add this in Vercel's Environment Variables!**

