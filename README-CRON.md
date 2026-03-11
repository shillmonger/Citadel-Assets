# Profit Distribution Cron Job

This setup uses a traditional Node.js server-based cron job to distribute profits to users' investment accounts daily at midnight.

## How to Use

### 1. Start the Cron Scheduler
Run the cron job scheduler that will automatically distribute profits every day at midnight:

```bash
npm run cron:start
```

### 2. Manual Testing
Run profit distribution manually for testing:

```bash
npm run cron:manual
```

## How It Works

1. **24/7 Server**: The Node.js process stays running continuously
2. **Daily Schedule**: Uses `node-cron` to schedule jobs at `0 0 * * *` (midnight every day)
3. **Profit Calculation**: 
   - Finds all active investment plans
   - Calculates daily profit: `(investment_amount * profit_percentage) / 100`
   - Updates user's account balance and total profit
   - Updates investment plan progress
4. **Automatic Completion**: Plans are automatically deactivated when duration is reached

## Features

- ✅ Automatic daily profit distribution at midnight
- ✅ Detailed logging with emojis for easy monitoring
- ✅ Error handling and recovery
- ✅ Manual testing capability
- ✅ Graceful shutdown on Ctrl+C
- ✅ Plan completion detection
- ✅ Profit history tracking

## Monitoring

The cron job provides detailed console output:
- 🚀 Start notifications
- 📊 Active plan counts
- 💰 Individual profit calculations
- ✅ Success confirmations
- 🎉 Completion summaries
- ❌ Error details

## Deployment

For production deployment:
1. Deploy this script to a 24/7 server (VPS, cloud server, etc.)
2. Use process managers like PM2 to keep it running:
   ```bash
   npm install -g pm2
   pm2 start scripts/profit-distributor.js --name "profit-distributor"
   pm2 logs profit-distributor
   ```

## Environment Variables

Ensure your `.env.local` contains:
- `MONGODB_URI`: Your MongoDB connection string
- `CRON_SECRET`: Your cron authentication secret

## File Structure

```
scripts/
├── profit-distributor.js    # Main cron job script
app/api/cron/
├── distribute-profits/      # API endpoint (kept for manual calls)
└── route.ts
```

## Security

- Uses environment variables for sensitive data
- Authentication via CRON_SECRET header
- Database connection error handling
- Graceful error recovery
