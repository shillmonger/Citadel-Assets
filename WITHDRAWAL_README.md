# Withdrawal System Implementation

## Overview
This withdrawal system allows users to request withdrawals using various cryptocurrency methods with proper validation, OTP verification, and address checking.

## Features Implemented

### 1. Withdrawal Methods
- **Bitcoin**: Min $10, Max $1,000,000, Charge: 2%
- **Ethereum**: Min $10, Max $1,000,000, Charge: 2%
- **USDT TRC20**: Min $10, Max $1,000,000, Charge: $2 (fixed)
- **Litecoin**: Min $10, Max $10,000, Charge: $2 (fixed)
- **DOGE**: Min $10, Max $1,000,000, Charge: 2%
- **BNB Smart Chain**: Min $10, Max $1,000,000, Charge: 2%
- **TRON**: Min $10, Max $500,000, Charge: 2%

### 2. Amount Validation
- Real-time validation with visual feedback (green/red borders)
- Shows checkmark for valid amounts, X for invalid
- Displays charge calculation and net amount
- Shows error messages for invalid ranges

### 3. Address Verification
- Automatically fetches user's saved withdrawal addresses
- Displays address if available in user profile
- Shows error message if address not found in profile
- Requires users to add addresses in settings first

### 4. OTP System
- 4-digit OTP sent to user's email
- Uses nodemailer for email delivery
- OTP validation before withdrawal completion
- Development OTP shown in console (remove in production)

### 5. Database Models

#### Withdrawal Model
```typescript
interface IWithdrawal {
  userId: ObjectId;
  amount: number;
  address: string;
  paymentMethod: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  otp: string;
  otpExpires: Date;
  charge: number;
  netAmount: number;
}
```

#### User Model (Updated)
- Includes `withdrawalAddresses` object with all supported methods
- Each address can be null or contain the wallet address

## API Endpoints

### POST /api/withdrawal
**Actions:**
- `request-otp`: Validates amount, checks balance, sends OTP email
- `complete-withdrawal`: Validates OTP, checks address, creates withdrawal record

### GET /api/user
- Fetches user data including withdrawal addresses

## Environment Variables
Create `.env` file with:
```env
MONGODB_URI=mongodb://localhost:27017/citadel-assets
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Flow
1. User selects withdrawal method on main page
2. User enters amount → real-time validation
3. System checks if user has address saved
4. User requests OTP → email sent
5. User enters OTP
6. System validates OTP and address
7. Withdrawal record created with "pending" status
8. User balance updated

## Security Features
- OTP verification required
- Address must match saved profile address
- Balance validation before withdrawal
- Amount limits enforced
- Status tracking for withdrawals

## UI/UX Features
- Real-time validation feedback
- Loading states during API calls
- Toast notifications for success/error
- Responsive design
- Disabled states for invalid inputs
- Clear error messages

## Notes
- In production, remove OTP logging to console
- Consider using Redis for OTP storage instead of in-memory
- Add proper authentication context instead of localStorage
- Implement proper error handling for email service failures
