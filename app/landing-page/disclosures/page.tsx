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
              Disclosures
            </h1>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 px-6 md:px-20 max-w-7xl mx-auto text-gray-800">
          <h2 className="text-2xl font-semibold mb-6">
            Disclosures for Counterparties and Clients (Multi-jurisdictional)
          </h2>
          
          <ul className="mb-8 list-disc list-inside text-blue-600 hover:underline">
            <li>
              <Link href="#">Global Sales and Trading Disclosures</Link>
            </li>
          </ul>

          <h3 className="text-xl font-bold mb-6">Disclosures for US Counterparties and Clients</h3>

          {/* 1. General Disclosures */}
          <div className="mb-8">
            <h4 className="text-lg font-bold mb-3">1. General Disclosures</h4>
            <ul className="space-y-2 text-blue-600">
              <li>• <Link href="#" className="hover:underline">Complaints Disclosure</Link></li>
              <li>• <Link href="#" className="hover:underline">FINRA BrokerCheck Disclosure</Link></li>
              <li>• <Link href="#" className="hover:underline">Securities Investor Protection Corporation (SIPC) Disclosure</Link></li>
              <li>• <Link href="#" className="hover:underline">Anti-Money Laundering (AML) Program Disclosure</Link></li>
              <li>• <Link href="#" className="hover:underline">Business Continuity Plan Disclosure</Link></li>
              <li>• <Link href="#" className="hover:underline">Foreign Tax Disclosure</Link></li>
              <li>• <Link href="#" className="hover:underline">Citadel Group Tax Strategy</Link></li>
            </ul>
          </div>

          {/* 2. Equities Disclosures */}
          <div className="mb-8">
            <h4 className="text-lg font-bold mb-3">2. Equities Disclosures</h4>
            <ul className="space-y-2 text-blue-600">
              <li>• <Link href="#" className="hover:underline">Rule 605 & 606 Statements</Link></li>
              <li>• <Link href="#" className="hover:underline">Disclosures Related to Exchange-Traded Products</Link></li>
            </ul>
          </div>

          {/* 3. Options */}
          <div className="mb-8">
            <h4 className="text-lg font-bold mb-3">3. Options</h4>
            <ul className="space-y-2 text-blue-600">
              <li>• <Link href="#" className="hover:underline">US Listed Options Disclosure Document Statement</Link></li>
            </ul>
          </div>

          {/* 4. Fixed Income Disclosures */}
          <div className="mb-8">
            <h4 className="text-lg font-bold mb-3">4. Fixed Income Disclosures</h4>
            <ul className="space-y-2 text-blue-600">
              <li>• <Link href="#" className="hover:underline">Treasury Securities Fails Charge Trading Practice</Link></li>
              <li>• <Link href="#" className="hover:underline">Dodd Frank Material Disclosure Statement</Link></li>
            </ul>
          </div>

          {/* 5. FX Disclosures */}
          <div className="mb-8">
            <h4 className="text-lg font-bold mb-3">5. FX Disclosures</h4>
            <ul className="space-y-2 text-blue-600">
              <li>• <Link href="#" className="hover:underline">FX Global Code of Conduct Liquidity Provider Disclosure Cover Sheet</Link></li>
              <li>• <Link href="#" className="hover:underline">Citadel Securities LLC FX Market Making Client Trading Disclosure</Link></li>
            </ul>
          </div>

          {/* 6. Citadel Securities Swap Dealer LLC Disclosures */}
          <div className="mb-8">
            <h4 className="text-lg font-bold mb-3">6. Citadel Securities Swap Dealer LLC Disclosures</h4>
            <ul className="space-y-2 text-blue-600">
              <li>• <Link href="#" className="hover:underline">December 31, 2025 Audited Financial Report</Link></li>
              <li>• <Link href="#" className="hover:underline">June 30, 2025 Interim Financial Report (Unaudited)</Link></li>
              <li>• <Link href="#" className="hover:underline">December 31, 2024 Audited Financial Report</Link></li>
              <li>• <Link href="#" className="hover:underline">June 30, 2024 Interim Financial Report (Unaudited)</Link></li>
              <li>• <Link href="#" className="hover:underline">December 31, 2023 Audited Financial Report</Link></li>
              <li>• <Link href="#" className="hover:underline">June 30, 2023 Interim Financial Report (Unaudited)</Link></li>
              <li>• <Link href="#" className="hover:underline">June 30, 2022 Interim Financial Report (Unaudited)</Link></li>
              <li>• <Link href="#" className="hover:underline">December 31, 2022 Audited Financial Report</Link></li>
              <li>• <Link href="#" className="hover:underline">December 31, 2021 Audited Financial Report</Link></li>
            </ul>
          </div>

          {/* 7. Citadel Securities Institutional LLC Disclosures */}
          <div className="mb-12">
            <h4 className="text-lg font-bold mb-3">7. Citadel Securities Institutional LLC Disclosures</h4>
            <ul className="space-y-2 text-blue-600">
              <li>• <Link href="#" className="hover:underline">December 31, 2025 Audited Financial Report</Link></li>
              <li>• <Link href="#" className="hover:underline">June 30, 2025 Interim Financial Report (Unaudited)</Link></li>
              <li>• <Link href="#" className="hover:underline">December 31, 2024 Audited Financial Report</Link></li>
            </ul>
          </div>

          {/* European Disclosures and Materials */}
          <div className="border-t pt-10">
            <h2 className="text-2xl font-semibold mb-4">European Disclosures and Materials</h2>
            <p className="mb-8 text-gray-700">
              Regarding Citadel Securities (Europe) Limited and Citadel Securities GCS (Ireland) Limited
            </p>

            {/* 1. Market Abuse Regulation Disclosures */}
            <div className="mb-8">
              <h4 className="text-lg font-bold mb-1">1. Market Abuse Regulation Disclosures</h4>
              <h5 className="text-md font-bold mb-3">Fixed Income Investment Recommendations:</h5>
              
              <div className="mb-6">
                <p className="font-semibold mb-2">Citadel Securities (Europe) Limited</p>
                <ul className="space-y-2 text-blue-600 ml-4">
                  <li>• <Link href="#" className="hover:underline">Investment Recommendation Disclosures</Link></li>
                  <li>• <Link href="#" className="hover:underline">Quarterly Report Disclosures</Link></li>
                  <li>• <Link href="#" className="hover:underline">Investment Recommendations</Link></li>
                  <li>• <Link href="#" className="hover:underline">Quarterly Report</Link></li>
                </ul>
              </div>

              <div className="mb-6">
                <p className="font-semibold mb-2">Citadel Securities GCS (Ireland) Limited</p>
                <ul className="space-y-2 text-blue-600 ml-4">
                  <li>• <Link href="#" className="hover:underline">Investment Recommendation Disclosures</Link></li>
                  <li>• <Link href="#" className="hover:underline">Quarterly Report Disclosures</Link></li>
                  <li>• <Link href="#" className="hover:underline">Investment Recommendations</Link></li>
                  <li>• <Link href="#" className="hover:underline">Quarterly Report</Link></li>
                </ul>
              </div>
            </div>

            {/* 2. MiFID II Disclosures */}
            <div className="mb-8">
              <h4 className="text-lg font-bold mb-3">2. MiFID II Disclosures</h4>
              <ul className="space-y-2 text-blue-600">
                <li>• <Link href="#" className="hover:underline">Costs and Charges Information – Citadel Securities (Europe) Limited and Citadel Securities GCS (Ireland) Limited</Link></li>
              </ul>
            </div>

            {/* 3. Pillar 3 Disclosure Documents */}
            <div className="mb-8">
              <h4 className="text-lg font-bold mb-3">3. Pillar 3 Disclosure Documents</h4>
              <ul className="space-y-2 text-blue-600">
                <li>• <Link href="#" className="hover:underline">Citadel Securities (Europe) Limited</Link></li>
                <li>• <Link href="#" className="hover:underline">Citadel Securities GCS (Ireland) Limited</Link></li>
              </ul>
            </div>

            {/* 4. Regulatory Disclosures and Counterparty Information */}
            <div className="mb-8">
              <h4 className="text-lg font-bold mb-3">4. Regulatory Disclosures and Counterparty Information</h4>
              <ul className="space-y-2 text-blue-600">
                <li>• <Link href="#" className="hover:underline">Citadel Securities (Europe) Limited and Citadel Securities GCS (Ireland) Limited Regulatory Disclosures and Counterparty Information</Link></li>
                <li>• <Link href="#" className="hover:underline">Supplemental Information</Link></li>
              </ul>
            </div>

            {/* 5. EU Sustainable Finance Disclosure Regulation Website Disclosures */}
            <div className="mb-8">
              <h4 className="text-lg font-bold mb-3">5. EU Sustainable Finance Disclosure Regulation Website Disclosures</h4>
              <ul className="space-y-2 text-blue-600">
                <li>• <Link href="#" className="hover:underline">Citadel Securities GCS (Ireland) Limited EU Sustainable Finance Disclosure Regulation Disclosure</Link></li>
              </ul>
            </div>
          </div>

          
{/* UK Disclosures */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">UK Disclosures</h2>
            <ul className="space-y-2 text-blue-600 ml-1">
              <li>• <Link href="#" className="hover:underline">Modern Slavery Statement</Link></li>
              <li>• <Link href="#" className="hover:underline">CSEL Section 172(1) Statement</Link></li>
              <li>• <Link href="#" className="hover:underline">CSFC section 172(1) Statement</Link></li>
              <li>• <Link href="#" className="hover:underline">CSFE Section 172(1) Statement</Link></li>
              <li>• <Link href="#" className="hover:underline">CSES Section 172(1) Statement</Link></li>
              <li>• <Link href="#" className="hover:underline">CSFC Corporate Governance Statement</Link></li>
            </ul>
          </div>

          {/* Australia Disclosures */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Australia Disclosures</h2>
            <ul className="space-y-2 text-blue-600 ml-1">
              <li>• <Link href="#" className="hover:underline">ASFL Class Order Relief Disclosure</Link></li>
            </ul>
          </div>

          {/* Japan Disclosures */}
          <div className="mt-12 mb-20">
            <h2 className="text-2xl font-semibold mb-6">Japan Disclosures</h2>
            <ul className="space-y-2 text-blue-600 ml-1">
              <li>• <Link href="#" className="hover:underline">利益相反管理方針</Link></li>
              <li>• <Link href="#" className="hover:underline">反社会的勢力に対する基本方針</Link></li>
              <li>• <Link href="#" className="hover:underline">苦情等に関する受付窓口</Link></li>
              <li>• <Link href="#" className="hover:underline">個人情報保護宣言</Link></li>
              <li>• <Link href="#" className="hover:underline">無登録格付けに関する説明書</Link></li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}