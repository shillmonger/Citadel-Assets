import mongoose, { Document, Schema } from 'mongoose';

export interface IKYC extends Document {
  userId: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber: string;
  countryOfResidence: string;
  documentType: 'passport' | 'driver_license' | 'national_id';
  frontIdUrl: string;
  backIdUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: mongoose.Types.ObjectId;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const KYCSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    unique: true
  },
  fullName: {
    type: String,
    required: [true, 'Full legal name is required'],
    trim: true,
    minlength: [2, 'Full name must be at least 2 characters long'],
    maxlength: [100, 'Full name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  countryOfResidence: {
    type: String,
    required: [true, 'Country of residence is required'],
    trim: true
  },
  documentType: {
    type: String,
    required: [true, 'Document type is required'],
    enum: {
      values: ['passport', 'driver_license', 'national_id'],
      message: 'Document type must be passport, driver_license, or national_id'
    }
  },
  frontIdUrl: {
    type: String,
    required: [true, 'Front ID image URL is required'],
    trim: true
  },
  backIdUrl: {
    type: String,
    trim: true,
    default: null
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ['pending', 'approved', 'rejected'],
      message: 'Status must be pending, approved, or rejected'
    },
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date,
    default: null
  },
  reviewedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  rejectionReason: {
    type: String,
    trim: true,
    maxlength: [500, 'Rejection reason cannot exceed 500 characters'],
    default: null
  }
}, {
  timestamps: true
});

// Index for efficient queries
KYCSchema.index({ userId: 1 });
KYCSchema.index({ status: 1 });
KYCSchema.index({ submittedAt: -1 });

export default mongoose.models.KYC || mongoose.model<IKYC>('KYC', KYCSchema);
