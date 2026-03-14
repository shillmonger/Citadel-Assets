# Vercel Cron Job Troubleshooting Guide

## Issues Identified

1. **500 Internal Server Error**: The cron endpoint is failing when called
2. **Missing Environment Variables**: Vercel needs `CRON_SECRET` configured
3. **No Logs**: Empty logs indicate the cron job isn't executing properly

## Solutions

### 1. Add Environment Variables to Vercel

You need to add these environment variables in your Vercel dashboard:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
CRON_SECRET = run_every_12_am
MONGODB_URI = mongodb+srv://codelab042:codelab042@chidera.2ffbe.mongodb.net/cetadel_assets
```

### 2. Deploy the Updated Code

The cron endpoint has been updated with better error handling and logging. Deploy these changes:

```bash
git add .
git commit -m "Fix cron job with better error handling"
git push origin main
```

### 3. Test the Cron Job Manually

After deployment, test the cron endpoint:

```bash
curl -X POST "https://citadel-assets.vercel.app/api/cron/distribute-profits" \
  -H "Authorization: Bearer run_every_12_am" \
  -H "Content-Type: application/json"
```

### 4. Check Vercel Function Logs

1. Go to Vercel dashboard → **Functions** tab
2. Look for `/api/cron/distribute-profits` in the logs
3. The updated code provides detailed logging

### 5. Verify Cron Schedule

Your `vercel.json` is correctly configured:

```json
{
  "crons": [
    {
      "path": "/api/cron/distribute-profits",
      "schedule": "0 0 * * *"
    }
  ]
}
```

This runs daily at midnight UTC.

## Common Issues & Fixes

### Issue: Authentication Failed
**Solution**: Ensure `CRON_SECRET` environment variable is set correctly in Vercel.

### Issue: Database Connection Failed
**Solution**: Verify `MONGODB_URI` is correctly set and accessible from Vercel.

### Issue: No Active Plans Found
**Solution**: Check if there are active investment plans in your database.

### Issue: Cron Job Not Triggering
**Solution**: 
- Verify the cron schedule in `vercel.json`
- Check Vercel cron job settings in dashboard
- Ensure the deployed version includes the cron endpoint

## Debugging Steps

1. **Check Environment Variables**:
   ```bash
   # Test endpoint to verify environment
   curl "https://citadel-assets.vercel.app/api/cron/test"
   ```

2. **Check Function Logs**:
   - Go to Vercel dashboard → Functions
   - Look for recent invocations of `/api/cron/distribute-profits`

3. **Manual Testing**:
   ```bash
   # Test with authentication
   curl -X POST "https://citadel-assets.vercel.app/api/cron/distribute-profits" \
     -H "Authorization: Bearer run_every_12_am"
   ```

4. **Check Active Plans**:
   ```bash
   # View active investment plans
   curl -X GET "https://citadel-assets.vercel.app/api/cron/distribute-profits" \
     -H "Authorization: Bearer run_every_12_am"
   ```

## Updated Cron Endpoint Features

The updated cron endpoint now includes:
- ✅ Detailed logging for debugging
- ✅ Better error messages
- ✅ Environment variable verification
- ✅ Step-by-step execution tracking
- ✅ Database connection status
- ✅ Plan processing details

## Next Steps

1. Add environment variables to Vercel dashboard
2. Deploy the updated code
3. Test manually using curl commands
4. Monitor Vercel function logs
5. Verify cron execution in Vercel cron settings

## Support

If issues persist:
1. Check Vercel function logs for specific error messages
2. Verify all environment variables are set
3. Ensure MongoDB is accessible from Vercel
4. Test the API endpoints manually first
