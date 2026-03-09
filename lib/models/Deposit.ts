import mongoose from 'mongoose';

const depositSchema = new mongoose.Schema({
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Bitcoin', 'Ethereum', 'USDT TRC20', 'XRP', 'DOGE', 'Litecoin', 'Solana']
  },
  amount: {
    type: Number,
    required: true
  },
  proofImageUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  walletAddress: {
    type: String,
    required: true
  },
  network: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

depositSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Deposit || mongoose.model('Deposit', depositSchema);
