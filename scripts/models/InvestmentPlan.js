const mongoose = require('mongoose');

const InvestmentPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  selectedPlan: {
    type: String,
    required: [true, 'Selected plan is required'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Investment amount is required'],
    min: [0, 'Investment amount cannot be negative']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 day']
  },
  profit: {
    type: Number,
    required: [true, 'Profit percentage is required'],
    min: [0, 'Profit cannot be negative']
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  totalProfitEarned: {
    type: Number,
    default: 0,
    min: [0, 'Total profit earned cannot be negative']
  },
  daysCompleted: {
    type: Number,
    default: 0,
    min: [0, 'Days completed cannot be negative']
  },
  profitHistory: [{
    date: {
      type: Date,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: [0, 'Profit amount cannot be negative']
    },
    percentage: {
      type: Number,
      required: true,
      min: [0, 'Profit percentage cannot be negative']
    }
  }]
}, {
  timestamps: true
});

// Index for efficient queries
InvestmentPlanSchema.index({ userId: 1, isActive: 1 });
InvestmentPlanSchema.index({ endDate: 1, isActive: 1 });

module.exports = mongoose.models.InvestmentPlan || mongoose.model('InvestmentPlan', InvestmentPlanSchema);
