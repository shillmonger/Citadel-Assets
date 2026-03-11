"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const ReferralRegisterPage: React.FC<{ params: { referralId: string } }> = ({ params }) => {
  const router = useRouter();

  useEffect(() => {
    // Store the referral ID in localStorage
    if (params.referralId) {
      localStorage.setItem('referralId', params.referralId);
    }
    
    // Redirect to main registration page after storing the ID
    setTimeout(() => {
      router.push('/auth-page/register');
    }, 100);
  }, [params.referralId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D429A] mx-auto mb-4"></div>
        <p className="text-gray-600">Setting up your referral...</p>
      </div>
    </div>
  );
};

export default ReferralRegisterPage;
