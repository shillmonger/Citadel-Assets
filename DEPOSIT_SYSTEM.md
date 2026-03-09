# Deposit System Documentation

## Overview
The deposit system allows users to submit cryptocurrency deposits with payment proof images. The system stores deposit records in MongoDB and uploads proof images to Cloudinary.

## Components

### 1. Database Model (`lib/models/Deposit.ts`)
- **Payment Method**: Bitcoin, Ethereum, USDT TRC20, XRP, DOGE, Litecoin, Solana
- **Amount**: Deposit amount in USD
- **Proof Image URL**: Cloudinary URL of uploaded payment proof
- **Status**: pending, approved, rejected (default: pending)
- **User ID**: Reference to the user who made the deposit
- **Wallet Address**: The cryptocurrency wallet address
- **Network**: Blockchain network (BTC, ETH, TRC20, etc.)

### 2. Cloudinary Integration (`lib/cloudinary.ts`)
- Uses environment variables for configuration:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY` 
  - `CLOUDINARY_API_SECRET`
- Uploads images to `deposit-proofs` folder

### 3. API Endpoint (`app/api/user/deposits/route.ts`)
- **POST /api/user/deposits**: Handles deposit submission
- Validates required fields
- Uploads image to Cloudinary
- Creates deposit record in MongoDB
- Returns success/error responses

### 4. Frontend (`app/user-dashboard/deposit/[id]/page.tsx`)
- Dynamic payment method selection based on URL parameter
- QR code generation for wallet addresses
- File upload with drag-and-drop UI
- Form validation and submission
- Toast notifications for user feedback
- Editable amount field

### 5. Authentication Hook (`hooks/useAuth.ts`)
- Placeholder authentication system
- Returns user ID for deposit association
- **Note**: Replace with your actual authentication implementation

## Environment Variables Required
```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Cloudinary
CLOUDINARY_CLOUD_NAME=djlwt5tyx
CLOUDINARY_API_KEY=877359525932694
CLOUDINARY_API_SECRET=qFEMrgzQ22Y9oBgq_VkNRs7rY_E
```

## Usage Flow
1. User selects payment method from deposit page
2. User enters deposit amount
3. User scans QR code or copies wallet address
4. User makes cryptocurrency payment
5. User uploads payment proof image
6. System uploads image to Cloudinary
7. System creates deposit record with "pending" status
8. Admin can review and update deposit status

## Payment Methods Supported
- Bitcoin (BTC)
- Ethereum (ETH)
- USDT TRC20
- XRP
- Dogecoin (DOGE)
- Litecoin (LTC)
- Solana (SOL)

## Security Considerations
- File type validation (images only)
- Cloudinary secure uploads
- MongoDB connection with proper error handling
- Form validation on both client and server side

## Next Steps
1. Implement proper authentication system
2. Add admin panel for deposit approval/rejection
3. Add deposit history page for users
4. Implement email notifications for deposit status changes
5. Add deposit limits and verification requirements
