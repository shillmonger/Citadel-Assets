"use client";
import Link from "next/link";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <Header />

      <main className="flex-grow">
        {/* Blue Hero Banner */}
        <section className="bg-[#1e40af] py-16 px-6 md:px-20">
          <div className="max-w-7xl mx-auto border-l-2 border-cyan-400 pl-6">
            <h1 className="text-4xl md:text-5xl font-medium text-white">
              Notices
            </h1>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 px-6 md:px-20 max-w-7xl mx-auto text-gray-800">
          {/* Misuse of Citadel Securities’ Name and Brand Section */}
          <h2 className="text-3xl font-semibold mb-8">
            Misuse of Citadel Securities’ Name and Brand
          </h2>

          <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              Citadel Securities occasionally becomes aware of fraudulent websites, third-party applications (Apps), and instant messaging chat groups (e.g. WhatsApp, Telegram, WeChat) that are purported to be run by Citadel Securities or are impersonating our firm. These illegal schemes usually use the name and/or trademarks of our company without our authorization to induce people to join a chat group or download an App that is then used to defraud them.
            </p>

            <p>
              The purpose of this notice is to alert the public to the nature of these fraudulent schemes and to warn the public that these third-party schemes are illegal and not authorized by Citadel Securities. Citadel Securities is not in any way associated with these fraudulent and illegal schemes.
            </p>

            <p>
              Citadel Securities and its affiliates are primarily a market making business and do not provide investment advice or other investment services to the public.
            </p>

            <p>
              You should not provide any personal details, complete any subscription forms, make any payments, or transfer any funds to any entity that purports to be run by Citadel Securities or appears to be impersonating Citadel Securities. Communications with Citadel Securities should only be through the official channels or platforms.
            </p>

            <p>
              When we learn about fraudulent schemes, while we may consider taking appropriate action including, but not limited to, alerting regulatory authorities and working with law enforcement to shut down the fraudulent schemes, we do not (i) undertake any responsibility to you to take such action or to inform or update you on any such steps taken, or (ii) accept any liability for any direct, indirect, incidental, or consequential loss or damage arising out of or in connection with any reliance on us to address a misuse of our name(s) and brand(s).
            </p>

            <p>
              Certain relevant regulatory authorities (e.g. the <Link href="#" className="text-blue-600 hover:underline">United Kingdom Financial Conduct Authority</Link>, the <Link href="#" className="text-blue-600 hover:underline">Hong Kong Securities and Futures Commission</Link>) also have a suspicious/ alert list that the public can check against.
            </p>

            <p className="font-semibold">
              Please note that our only official channels or platforms are listed below:
            </p>

            {/* Websites and Social Media */}
            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div>
                <p className="font-bold underline mb-3">Websites:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-600">
                  <li><Link href="https://www.citadelsecurities.com" className="hover:underline">https://www.citadelsecurities.com</Link></li>
                  <li><Link href="https://www.citadel.com" className="hover:underline">https://www.citadel.com</Link></li>
                </ul>
              </div>

              <div>
                <p className="font-bold underline mb-3">Social media:</p>
                <ul className="space-y-1">
                  <li><span className="font-semibold">LinkedIn:</span> <Link href="#" className="text-blue-600 hover:underline">https://www.linkedin.com/company/citadel-securities</Link></li>
                  <li><span className="font-semibold">YouTube:</span> <Link href="#" className="text-blue-600 hover:underline">https://www.youtube.com/@citadelsecurities</Link></li>
                  <li><span className="font-semibold">Instagram:</span> <Link href="#" className="text-blue-600 hover:underline">https://www.instagram.com/citadelsecurities/</Link></li>
                  <li><span className="font-semibold">Facebook:</span> <Link href="#" className="text-blue-600 hover:underline">https://www.facebook.com/CitadelSecurities/</Link></li>
                  <li><span className="font-semibold">X:</span> <Link href="#" className="text-blue-600 hover:underline">https://x.com/citsecurities</Link></li>
                  <li><span className="font-semibold">WeChat:</span> <Link href="#" className="text-blue-600 hover:underline text-xs break-all">https://mp.weixin.qq.com/s/W9FFgRD32-1rhkPSjYGMkg</Link></li>
                </ul>
              </div>
            </div>

            <p className="mt-8">
              Our employees do not offer investment advice or make investment recommendations to the general public and do not participate in social media or messaging groups that do so. Citadel Securities does not have any mobile applications or official channels on Apps including Telegram or WhatsApp.
            </p>

            <p>
              If you encounter or suspect any activity involving fraudulent websites or Apps claiming to be related to Citadel Securities and would like to share such information with us, please contact us via this email address: <a href="mailto:brandprotection@citadel.com" className="text-blue-600 hover:underline">brandprotection@citadel.com</a>.
            </p>

            <p className="pt-4 italic">Date: 14 May 2025</p>

            {/* Other Markets */}
            <div className="mt-10">
              <p className="font-bold mb-4">Notice relevant to other markets:</p>
              <ul className="space-y-2 text-blue-600">
                <li>• <Link href="#" className="hover:underline">Chinese Traditional | 中文 （繁體）</Link></li>
                <li>• <Link href="#" className="hover:underline">Chinese Simplified | 中文 （简体）</Link></li>
                <li>• <Link href="#" className="hover:underline">French</Link></li>
                <li>• <Link href="#" className="hover:underline">Japanese | 日本語</Link></li>
                <li>• <Link href="#" className="hover:underline">India</Link></li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}