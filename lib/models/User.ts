import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  fullName: string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  referralId?: string;
  accountBalance: number;
  welcomeBonus: number;
  totalProfit: number;
  referralBonus: number;
  totalWithdrawal: number;
  totalDeposit: number;
  roles: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
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
  }
}, {
  timestamps: true
});

// unique: true on email and username fields already creates indexes

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
