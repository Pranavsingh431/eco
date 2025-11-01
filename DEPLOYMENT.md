# Deployment Guide for Vercel

This guide will help you deploy EcoAssess AI to Vercel successfully.

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. Make sure all your code is committed to a Git repository (GitHub, GitLab, or Bitbucket)
2. Ensure `.env.local` is in your `.gitignore` (it already is!)

### Step 2: Import Project to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Vercel will auto-detect Next.js settings

### Step 3: Configure Environment Variables

**CRITICAL**: You must set up the environment variable before deployment works!

1. In the Vercel project configuration, scroll to "Environment Variables"
2. Add the following:
   ```
   Name: GEMINI_API_KEY
   Value: AIzaSyC124pWTf-SOUjMPK9knCByh5R02oc4ghM
   ```
3. Select all environments: ✅ Production ✅ Preview ✅ Development

### Step 4: Build Settings (Usually Auto-detected)

- **Framework Preset**: Next.js
- **Build Command**: `npm run build` or `next build`
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install`

### Step 5: Deploy

Click "Deploy" and wait for the build to complete (usually 1-3 minutes).

## ✅ Post-Deployment Checklist

After successful deployment:

1. ✅ Visit your deployment URL
2. ✅ Fill out the project form and submit
3. ✅ Verify AI analysis works correctly
4. ✅ Check that the sustainability report displays
5. ✅ Test project history functionality

## 🔧 Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| `GEMINI_API_KEY` | `AIzaSyC124pWTf-SOUjMPK9knCByh5R02oc4ghM` | Google Gemini API key for AI analysis |

## 🐛 Common Deployment Issues

### Issue: "AI features not working"

**Solution**: 
- Verify environment variable is set in Vercel dashboard
- Redeploy after setting environment variables
- Check deployment logs for API key errors

### Issue: "Build fails"

**Solution**:
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npm run typecheck

# Check for linting errors
npm run lint
```

### Issue: "Function timeout"

**Solution**:
- Gemini API calls should complete quickly
- If timeouts occur, check your Vercel plan limits
- Free tier: 10s timeout
- Pro tier: 60s timeout

### Issue: "Module not found"

**Solution**:
```bash
# Ensure all dependencies are in package.json
npm install

# Commit package-lock.json
git add package-lock.json
git commit -m "Update dependencies"
```

## 🎯 Vercel-Specific Optimizations

### Enable Edge Runtime (Optional)

For faster cold starts, you can use Edge Runtime. Add to `src/app/page.tsx`:

```typescript
export const runtime = 'edge';
```

### Image Optimization

Vercel automatically optimizes images. The current configuration supports:
- placehold.co
- images.unsplash.com
- picsum.photos

### Caching

Vercel automatically caches static assets. To customize:

```typescript
// next.config.ts
export default {
  // ... other config
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

## 🔒 Security Best Practices

1. **Never commit API keys**: Always use environment variables
2. **Rotate keys regularly**: Update your Gemini API key periodically
3. **Monitor usage**: Check Google Cloud Console for API usage
4. **Set up billing alerts**: Avoid unexpected charges

## 📊 Monitoring

### Vercel Analytics

Enable Vercel Analytics for insights:
1. Go to your project settings
2. Navigate to "Analytics"
3. Enable analytics
4. Add tracking to your app

### Error Tracking

Consider adding error tracking:
- Sentry
- LogRocket
- Bugsnag

## 🚀 Continuous Deployment

Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

### Custom Domains

1. Go to project Settings → Domains
2. Add your custom domain
3. Configure DNS according to Vercel's instructions

## 📈 Performance Tips

1. **Enable compression**: Already enabled in `next.config.ts`
2. **Use Image component**: For all images
3. **Code splitting**: Automatic with Next.js
4. **Font optimization**: Already configured with Google Fonts

## 🎉 Success!

Your EcoAssess AI app should now be live and fully functional on Vercel!

Visit your deployment URL and test the sustainability analysis features.

---

Need help? Check the [main README](./README.md) or open an issue on GitHub.

