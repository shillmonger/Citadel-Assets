const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Full name must be at least 2 characters long'],
    maxlength: [50, 'Full name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  referralId: {
    type: String,
    trim: true,
    default: null
  },
  myReferralId: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  totalReferrals: {
    type: Number,
    default: 0,
    min: [0, 'Total referrals cannot be negative']
  },
  activeReferrals: {
    type: Number,
    default: 0,
    min: [0, 'Active referrals cannot be negative']
  },
  accountBalance: {
    type: Number,
    default: 0,
    min: [0, 'Account balance cannot be negative']
  },
  welcomeBonus: {
    type: Number,
    default: 10,
    min: [0, 'Welcome bonus cannot be negative']
  },
  totalProfit: {
    type: Number,
    default: 0,
    min: [0, 'Total profit cannot be negative']
  },
  referralBonus: {
    type: Number,
    default: 0,
    min: [0, 'Referral bonus cannot be negative']
  },
  totalWithdrawal: {
    type: Number,
    default: 0,
    min: [0, 'Total withdrawal cannot be negative']
  },
  totalDeposit: {
    type: Number,
    default: 0,
    min: [0, 'Total deposit cannot be negative']
  },
  roles: {
    type: [String],
    default: ['user'],
    enum: ['user', 'admin']
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true
  },
  withdrawalAddresses: {
    tron: { type: String, default: null },
    doge: { type: String, default: null },
    swiftCode: { type: String, default: null },
    bitcoin: { type: String, default: null },
    ethereum: { type: String, default: null },
    litecoin: { type: String, default: null },
    bnb: { type: String, default: null },
    usdt: { type: String, default: null }
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
