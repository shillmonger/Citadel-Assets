"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const ReferralPage: React.FC<{ params: Promise<{ referralId: string }> }> = ({ params }) => {
  const router = useRouter();

  useEffect(() => {
    const handleReferral = async () => {
      try {
        const resolvedParams = await params;
        // Debug: Log the params to see what we're getting
        console.log('Referral page params:', resolvedParams);
        console.log('Referral ID from params:', resolvedParams.referralId);
        
        // Store the referral ID in localStorage
        if (resolvedParams.referralId) {
          console.log('Storing referral ID:', resolvedParams.referralId);
          localStorage.setItem('referralId', resolvedParams.referralId);
          console.log('Referral ID stored in localStorage');
        } else {
          console.log('No referral ID found in params');
        }
        
        // Redirect to main registration page after storing the ID
        setTimeout(() => {
          console.log('Redirecting to registration page');
          router.push('/auth-page/register');
        }, 2000); // Increased timeout to 2 seconds for debugging
      } catch (error) {
        console.error('Error handling referral:', error);
        // Still redirect even if there's an error
        setTimeout(() => {
          router.push('/auth-page/register');
        }, 1000);
      }
    };

    handleReferral();
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D429A] mx-auto mb-4"></div>
        <p className="text-gray-600">Setting up your referral...</p>
      </div>
    </div>
  );
};

export default ReferralPage;
