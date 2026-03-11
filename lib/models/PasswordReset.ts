import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPasswordReset extends Document {
  email: string;
  code: string;
  expiresAt: Date;
  isUsed: boolean;
  createdAt: Date;
  isExpired(): boolean;
}

export interface IPasswordResetModel extends Model<IPasswordReset> {
  findValidCode(email: string, code: string): Promise<IPasswordReset | null>;
  invalidateAllCodes(email: string): Promise<mongoose.UpdateResult>;
}

const PasswordResetSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    length: 4,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Index for cleanup of expired codes
PasswordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Method to check if code is expired
PasswordResetSchema.methods.isExpired = function(): boolean {
  return new Date() > this.expiresAt;
};

// Static method to find valid reset code
PasswordResetSchema.statics.findValidCode = async function(email: string, code: string) {
  return this.findOne({
    email: email.toLowerCase(),
    code: code,
    isUsed: false,
    expiresAt: { $gt: new Date() }
  });
};

// Static method to invalidate all codes for an email
PasswordResetSchema.statics.invalidateAllCodes = async function(email: string) {
  return this.updateMany(
    { email: email.toLowerCase() },
    { isUsed: true }
  );
};

const PasswordResetModel: IPasswordResetModel = mongoose.models.PasswordReset as IPasswordResetModel || mongoose.model<IPasswordReset, IPasswordResetModel>('PasswordReset', PasswordResetSchema);

export default PasswordResetModel;
