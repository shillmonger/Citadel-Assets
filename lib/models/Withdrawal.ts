import mongoose, { Document, Schema } from 'mongoose';

export interface IWithdrawal extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  address: string;
  paymentMethod: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  otp?: string;
  otpExpires?: Date;
  charge: number;
  netAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const WithdrawalSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [1, 'Amount must be at least 1']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['bitcoin', 'ethereum', 'usdt-trc20', 'litecoin', 'doge', 'bnb', 'tron']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  otp: {
    type: String,
    required: false
  },
  otpExpires: {
    type: Date,
    required: false
  },
  charge: {
    type: Number,
    required: [true, 'Charge is required'],
    min: [0, 'Charge cannot be negative']
  },
  netAmount: {
    type: Number,
    required: [true, 'Net amount is required'],
    min: [0, 'Net amount cannot be negative']
  }
}, {
  timestamps: true
});

export default mongoose.models.Withdrawal || mongoose.model<IWithdrawal>('Withdrawal', WithdrawalSchema);
