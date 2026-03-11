import { Resend } from 'resend';
import User from '@/lib/models/User';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailData {
  to: string | string[];
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: EmailData) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (error) {
      console.error('Email sending error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, error };
  }
};

export const getAllAdminEmails = async () => {
  try {
    const admins = await User.find({ 
      roles: { $in: ['admin'] },
      isActive: true 
    }).select('email fullName');
    
    return admins.map(admin => admin.email);
  } catch (error) {
    console.error('Error fetching admin emails:', error);
    return [];
  }
};

export const sendDepositNotificationToAdmins = async (depositData: {
  userName: string;
  userEmail: string;
  amount: number;
  paymentMethod: string;
  network: string;
  walletAddress: string;
  proofImageUrl: string;
}) => {
  const adminEmails = await getAllAdminEmails();
  
  if (adminEmails.length === 0) {
    console.log('No admin emails found to notify');
    return { success: true, message: 'No admins to notify' };
  }

  const subject = '🔔 New Deposit Submission - Action Required';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Deposit Notification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 2px solid #1D429A;
        }
        .logo {
          color: #1D429A;
          font-size: 24px;
          font-weight: bold;
        }
        .content {
          padding: 20px 0;
        }
        .deposit-info {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          margin: 15px 0;
        }
        .deposit-info h3 {
          color: #1D429A;
          margin-top: 0;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          border-bottom: 1px solid #eee;
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: bold;
          color: #666;
        }
        .value {
          color: #333;
        }
        .amount {
          color: #28a745;
          font-weight: bold;
          font-size: 18px;
        }
        .cta-button {
          display: inline-block;
          background-color: #1D429A;
          color: white;
          padding: 12px 25px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
          text-align: center;
        }
        .cta-button:hover {
          background-color: #16357a;
        }
        .footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #666;
          font-size: 12px;
        }
        .proof-image {
          max-width: 100%;
          height: auto;
          border-radius: 5px;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">CITADEL ASSETS</div>
          <h2>New Deposit Submission</h2>
        </div>
        
        <div class="content">
          <p>A new deposit has been submitted and requires your review. Please review the details below and take appropriate action.</p>
          
          <div class="deposit-info">
            <h3>Deposit Details</h3>
            <div class="info-row">
              <span class="label">User:</span>
              <span class="value">${depositData.userName} (${depositData.userEmail})</span>
            </div>
            <div class="info-row">
              <span class="label">Amount:</span>
              <span class="value amount">$${depositData.amount}</span>
            </div>
            <div class="info-row">
              <span class="label">Payment Method:</span>
              <span class="value">${depositData.paymentMethod}</span>
            </div>
            <div class="info-row">
              <span class="label">Network:</span>
              <span class="value">${depositData.network}</span>
            </div>
            <div class="info-row">
              <span class="label">Wallet Address:</span>
              <span class="value" style="font-family: monospace; font-size: 12px;">${depositData.walletAddress}</span>
            </div>
            <div class="info-row">
              <span class="label">Status:</span>
              <span class="value" style="color: #ffc107; font-weight: bold;">⏳ Pending Review</span>
            </div>
          </div>
          
          <p><strong>Payment Proof:</strong></p>
          <img src="${depositData.proofImageUrl}" alt="Payment Proof" class="proof-image" />
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'}/admin-dashboard/manage-deposite" class="cta-button">
              Review Deposit in Admin Dashboard
            </a>
          </div>
          
          <p><strong>Important:</strong> Please review this deposit promptly and either approve or reject it based on the payment proof provided.</p>
        </div>
        
        <div class="footer">
          <p>This is an automated notification from Citadel Assets. Please do not reply to this email.</p>
          <p>If you believe this is a mistake, please contact your system administrator.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: adminEmails,
    subject,
    html,
  });
};

export const sendDepositStatusEmailToUser = async (userData: {
  userEmail: string;
  userName: string;
  amount: number;
  paymentMethod: string;
  status: 'approved' | 'rejected';
  newBalance?: number;
}) => {
  const isApproved = userData.status === 'approved';
  const subject = isApproved 
    ? '✅ Deposit Approved - Balance Updated' 
    : '❌ Deposit Rejected';

  const html = isApproved ? `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Deposit Approved</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 2px solid #28a745;
        }
        .logo {
          color: #1D429A;
          font-size: 24px;
          font-weight: bold;
        }
        .success-icon {
          color: #28a745;
          font-size: 48px;
          margin: 20px 0;
        }
        .content {
          padding: 20px 0;
        }
        .deposit-info {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          margin: 15px 0;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          border-bottom: 1px solid #eee;
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: bold;
          color: #666;
        }
        .value {
          color: #333;
        }
        .amount {
          color: #28a745;
          font-weight: bold;
          font-size: 18px;
        }
        .new-balance {
          color: #1D429A;
          font-weight: bold;
          font-size: 20px;
          background-color: #e8f5e8;
          padding: 10px;
          border-radius: 5px;
          text-align: center;
          margin: 15px 0;
        }
        .cta-button {
          display: inline-block;
          background-color: #1D429A;
          color: white;
          padding: 12px 25px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
          text-align: center;
        }
        .cta-button:hover {
          background-color: #16357a;
        }
        .footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">CITADEL ASSETS</div>
          <div class="success-icon">✅</div>
          <h2>Deposit Approved!</h2>
        </div>
        
        <div class="content">
          <p>Great news! Your deposit has been successfully approved and your account balance has been updated.</p>
          
          <div class="deposit-info">
            <h3>Deposit Details</h3>
            <div class="info-row">
              <span class="label">Amount:</span>
              <span class="value amount">$${userData.amount}</span>
            </div>
            <div class="info-row">
              <span class="label">Payment Method:</span>
              <span class="value">${userData.paymentMethod}</span>
            </div>
            <div class="info-row">
              <span class="label">Status:</span>
              <span class="value" style="color: #28a745; font-weight: bold;">✅ Approved</span>
            </div>
          </div>
          
          <div class="new-balance">
            <strong>New Account Balance:</strong><br>
            $${userData.newBalance?.toLocaleString() || 'N/A'}
          </div>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'}/user-dashboard" class="cta-button">
              View Your Dashboard
            </a>
          </div>
          
          <p>Thank you for choosing Citadel Assets! Your funds are now available in your account and ready for investment.</p>
        </div>
        
        <div class="footer">
          <p>This is an automated notification from Citadel Assets. Please do not reply to this email.</p>
          <p>If you have any questions, please contact our support team.</p>
        </div>
      </div>
    </body>
    </html>
  ` : `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Deposit Rejected</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 2px solid #dc3545;
        }
        .logo {
          color: #1D429A;
          font-size: 24px;
          font-weight: bold;
        }
        .reject-icon {
          color: #dc3545;
          font-size: 48px;
          margin: 20px 0;
        }
        .content {
          padding: 20px 0;
        }
        .deposit-info {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          margin: 15px 0;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          border-bottom: 1px solid #eee;
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: bold;
          color: #666;
        }
        .value {
          color: #333;
        }
        .amount {
          color: #dc3545;
          font-weight: bold;
          font-size: 18px;
        }
        .cta-button {
          display: inline-block;
          background-color: #1D429A;
          color: white;
          padding: 12px 25px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
          text-align: center;
        }
        .cta-button:hover {
          background-color: #16357a;
        }
        .footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #666;
          font-size: 12px;
        }
        .next-steps {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          padding: 15px;
          border-radius: 5px;
          margin: 15px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">CITADEL ASSETS</div>
          <div class="reject-icon">❌</div>
          <h2>Deposit Rejected</h2>
        </div>
        
        <div class="content">
          <p>We regret to inform you that your recent deposit has been rejected after review.</p>
          
          <div class="deposit-info">
            <h3>Deposit Details</h3>
            <div class="info-row">
              <span class="label">Amount:</span>
              <span class="value amount">$${userData.amount}</span>
            </div>
            <div class="info-row">
              <span class="label">Payment Method:</span>
              <span class="value">${userData.paymentMethod}</span>
            </div>
            <div class="info-row">
              <span class="label">Status:</span>
              <span class="value" style="color: #dc3545; font-weight: bold;">❌ Rejected</span>
            </div>
          </div>
          
          <div class="next-steps">
            <h4>Next Steps:</h4>
            <ul>
              <li>Please double-check your payment proof image</li>
              <li>Ensure the correct amount was sent to the right address</li>
              <li>Contact our support team if you believe this is an error</li>
            </ul>
          </div>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'}/user-dashboard/deposit" class="cta-button">
              Submit New Deposit
            </a>
          </div>
          
          <p>If you have any questions about this decision or need assistance, please don't hesitate to contact our support team.</p>
        </div>
        
        <div class="footer">
          <p>This is an automated notification from Citadel Assets. Please do not reply to this email.</p>
          <p>If you have any questions, please contact our support team.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: userData.userEmail,
    subject,
    html,
  });
};
