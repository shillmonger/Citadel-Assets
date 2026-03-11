"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const ReferralRedirectPage: React.FC<{ params: { referralId: string } }> = ({ params }) => {
  const router = useRouter();

  useEffect(() => {
    // Store the referral ID in localStorage
    if (params.referralId) {
      localStorage.setItem('referralId', params.referralId);
    }
    
    // Redirect to registration page
    router.push('/auth-page/register');
  }, [params.referralId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D429A] mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to registration...</p>
      </div>
    </div>
  );
};

export default ReferralRedirectPage;
