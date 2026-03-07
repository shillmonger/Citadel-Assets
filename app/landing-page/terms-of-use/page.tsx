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
              Terms of Use
            </h1>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 px-6 md:px-20 max-w-7xl mx-auto text-gray-800">
          <p className="text-sm text-gray-500 mb-6">LAST UPDATED: October 15, 2024</p>

          <p className="mb-6 text-sm leading-relaxed">
            By accessing and/or using this web site and any materials presented herein (the "Site"), you accept in their entirety the following terms and conditions of use of the
            Site (the "Terms of Use"). Citadel Enterprise Americas LLC and its affiliates (collectively "Citadel") reserve the right to change the terms, conditions and notices under
            which this Site is offered without notice at any time. Each access or use of the Site constitutes your agreement to be bound by the then-current terms and
            conditions set forth in these Terms of Use.
          </p>

          {/* Section 1 */}
          <h2 className="text-lg font-bold mt-8 mb-3">1. Limited License to Use the Site</h2>
          <p className="mb-4 text-sm leading-relaxed">
            Except as specifically permitted below, nothing contained in these Terms of Use or the Site either grants or will be construed to grant to you or any third party any
            title or interest in, or any license or right to use or reproduce, any image, text, software, code, trademark, logo, or service mark contained in the Site, including without
            limitation the name or logo of Citadel Enterprise Americas LLC or any of its affiliates. Citadel reserves, and will enforce to the fullest extent possible, all rights that it
            may have with respect to copyright and trademark ownership of all material in the Site.
          </p>
          <p className="mb-4 text-sm leading-relaxed">
            Citadel grants you a limited, nonexclusive license to display and otherwise access and/or use the Site solely for your own private, non-commercial informational
            purposes only, and to print pages from the Site only in connection with that access and/or use. You may not modify, distribute, transmit, perform, reproduce, publish,
            license, create derivative works from, transfer, sell, post, or frame this Site, including any text, graphics, video, audio, logos and other source-identifying symbols,
            designs, icons, images, or other information, software, code, or user interface design contained on or in the Site without Citadel's express written permission.{" "}
            <strong>You are prohibited from using the Site:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 text-sm leading-relaxed space-y-1">
            <li>for any unlawful purpose;</li>
            <li>to promote, advocate, or assist in any unlawful acts or to solicit others to perform or participate in any unlawful acts;</li>
            <li>to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances;</li>
            <li>to infringe upon or violate our intellectual property rights or the intellectual property rights of others;</li>
            <li>to train artificial intelligence models or systems (e.g., Large Language Models (LLMs));</li>
            <li>to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability;</li>
            <li>to upload or transmit any material or content that attempts to falsely state or otherwise misrepresent your identity or affiliation with a person or entity;</li>
            <li>to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Site or of any related website, other websites, or the Internet;</li>
            <li>to upload or transmit any material or content that is pornographic, threatening, harassing, libelous, hate-oriented, harmful, defamatory, racist, xenophobic, or illegal;</li>
            <li>to upload or transmit material or content that promotes, provides, or relates to instructional information about illegal activities or promotes physical harm or injury against any individual or group;</li>
            <li>to upload or transmit or otherwise make available any unsolicited or unauthorized advertising, promotional materials, "junk mail," "spam," "chain letters," "pyramid schemes," or any other form of solicitation;</li>
            <li>to collect or track the personal information of others;</li>
            <li>to spam, phish, pharm, pretext, spider, crawl, or scrape;</li>
            <li>for any obscene or immoral purpose; or</li>
            <li>to interfere with or circumvent the security features of the Site or any related web site, other web sites, or the Internet.</li>
          </ul>

          {/* Section 2 */}
          <h2 className="text-lg font-bold mt-8 mb-3">2. No Offer of Employment</h2>
          <p className="mb-4 text-sm leading-relaxed">
            The Site does not constitute an offer or promise of employment with Citadel with respect to any employment position described on the Site. Without notice, Citadel
            may eliminate, modify, or change any aspects of any employment described on the Site. The Site does not provide binding offers of employment or any terms or
            conditions of employment. Any offer of employment that may ensue as a result of your submission of information to Citadel shall be solely in accordance with the
            specific terms of such offer of employment, not the terms of the Site.
          </p>

          {/* Section 3 */}
          <h2 className="text-lg font-bold mt-8 mb-3">3. No Offer of Securities</h2>
          <p className="mb-4 text-sm leading-relaxed">
            Under no circumstances should any material on the Site be used or considered as an offer to sell or a solicitation of an offer to buy any interest in any investment
            fund sponsored or managed by Citadel Enterprise Americas LLC's affiliates. Any such offer or solicitation can and will be made only by means of the confidential
            information memorandum of each such investment fund, only in jurisdictions in which such an offer would be lawful and only to individuals who meet the investor
            suitability and sophistication requirements of each such investment fund, including qualifying as accredited investors within the meaning of the Securities Act of
            1933, as amended. Access to information about the investment funds is similarly limited to individuals who meet the applicable investor suitability and sophistication
            requirements.
          </p>

          {/* Section 4 */}
          <h2 className="text-lg font-bold mt-8 mb-3">4. Links to Third Party Web Sites</h2>
          <p className="mb-4 text-sm leading-relaxed">
            Citadel does not necessarily review any of the web sites that may be linked to the Site and is not responsible for their content. Citadel is not responsible for the
            privacy practices of such other web sites. Your linking to or use of any off-site pages or other web sites is at your own risk. Citadel's inclusion of links to other web
            sites does not imply any endorsement of the material located on or linked to by such web sites.
          </p>

          {/* Section 5 */}
          <h2 className="text-lg font-bold mt-8 mb-3">5. No Warranty</h2>
          <p className="mb-4 text-sm leading-relaxed uppercase">
            CITADEL, AND ITS RESPECTIVE OFFICERS, DIRECTORS, PRINCIPALS, AGENTS, AND EMPLOYEES MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR
            IMPLIED, REGARDING THE ACCURACY, RELIABILITY, COMPLETENESS, SUITABILITY, OR OTHER CHARACTERISTICS OF THE INFORMATION AND MATERIALS
            CONTAINED ON OR PRESENTED THROUGH THE SITE. ANY CONTENT OF THE SITE IS SUBJECT TO CHANGE WITHOUT NOTICE. ALL SUCH INFORMATION AND
            MATERIALS ARE PROVIDED "AS IS," WITHOUT ANY WARRANTY OF ANY KIND. CITADEL HEREBY FURTHER DISCLAIMS ALL WARRANTIES AND CONDITIONS WITH
            REGARD TO SUCH INFORMATION AND MATERIALS, INCLUDING ALL IMPLIED WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND AVAILABILITY.
          </p>

          {/* Section 6 */}
          <h2 className="text-lg font-bold mt-8 mb-3">6. Limitation of Liability</h2>
          <p className="mb-4 text-sm leading-relaxed uppercase">
            TO THE FULL EXTENT PERMITTED BY APPLICABLE LAW, CITADEL AND ITS RESPECTIVE OFFICERS, DIRECTORS, PRINCIPALS, AGENTS, AND EMPLOYEES SHALL
            NOT BE LIABLE FOR ANY CLAIMS, LIABILITIES, LOSSES, COSTS, OR DAMAGES, INCLUDING DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, OR
            CONSEQUENTIAL DAMAGES, ARISING OUT OF OR IN ANY WAY CONNECTED WITH (I) THE USE OF OR INABILITY TO USE THE SITE OR WITH ANY DELAY IN USING
            THE SITE, OR (II) ANY INFORMATION AND MATERIALS OBTAINED THROUGH THE SITE, OR (III) OTHERWISE ARISING OUT OF THE ACCESS AND/OR USE OF THE SITE
            IN ANY CASE, WHETHER BASED ON THEORIES ARISING IN CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE. SUCH LIMITATIONS APPLY EVEN IF CITADEL OR
            ANY OF ITS RESPECTIVE OFFICERS, DIRECTORS, PRINCIPALS, AGENTS, OR EMPLOYEES HAVE BEEN ADVISED OF THE POSSIBILITY OF DAMAGES.
          </p>

          {/* Section 7 */}
          <h2 className="text-lg font-bold mt-8 mb-3">7. Citadel DMCA Copyright Policy</h2>
          <p className="mb-4 text-sm leading-relaxed">
            In conjunction with the provision and use of this Site, Citadel has adopted the following policy toward copyright infringement in accordance with the Online
            Copyright Infringement Liability Limitation Act of the Digital Millennium Copyright Act (17 U.S.C. § 512 ("DMCA")).
          </p>
          <p className="mb-4 text-sm leading-relaxed">
            It is Citadel's policy to (i) block access to or remove material from the Site that it believes in good faith to be protected by copyright and that has been illegally copied
            and distributed by users or downloaded through Citadel's networks and (ii) terminate access to the Site for offenders.
          </p>

          <h3 className="font-bold mt-6 mb-2 text-sm">A. Procedure for Reporting Copyright Infringement:</h3>
          <p className="mb-3 text-sm leading-relaxed">
            If you believe that material or content residing on or accessible through the Site infringes your copyright, you may request removal of (or access to) those materials
            from the Site by sending a written notice of copyright infringement (the "DMCA Notice") containing the following information to Citadel's copyright agent listed below:
          </p>
          <ul className="list-disc pl-6 mb-4 text-sm leading-relaxed space-y-1">
            <li>Your physical or electronic signature, or the signature of a person authorized to act on your behalf;</li>
            <li>Identification of the material you believe is being infringed;</li>
            <li>Identification of the material that is claimed to be infringing, including information regarding the location of the infringing materials that you seek to have removed, or the date and time that the allegedly infringing material was downloaded using Citadel's networks, with sufficient detail so that Citadel is capable of finding and verifying its existence;</li>
            <li>Your contact information, including your name, address, telephone number, and, if available, e-mail address. If you are not the owner of the copyright that has been allegedly infringed, please describe your relationship to the copyright owner;</li>
            <li>A statement that you have a good faith belief that the allegedly infringing material is not authorized by the copyright owner, its agent, or the law; and</li>
            <li>A statement made under penalty of perjury that the information provided is accurate and that you are authorized to make the complaint on behalf of the copyright owner.</li>
          </ul>
          <p className="mb-2 text-sm">Citadel's copyright agent to receive DMCA Notices (the "DMCA Agent") is:</p>
          <div className="mb-4 text-sm leading-relaxed pl-4 border-l-2 border-gray-300">
            <p>DMCA Agent</p>
            <p>Citadel Enterprise Americas LLC</p>
            <p>Attn: Legal Department</p>
            <p>Southeast Financial Center</p>
            <p>200 S. Biscayne Blvd</p>
            <p>Suite 3300</p>
            <p>Miami, FL 33131</p>
            <p>Phone: 305-329-8851</p>
            <p>
              Email:{" "}
              <a href="mailto:DMCAAgentNotice@citadel.com" className="text-blue-600 underline">
                DMCAAgentNotice@citadel.com
              </a>
            </p>
          </div>
          <p className="mb-4 text-sm leading-relaxed">
            Upon receipt of a written DMCA Notice containing the above information, Citadel will remove or disable access to the allegedly infringing materials and will promptly
            notify the individual who posted the materials that the content has been removed or access disabled. If any of the information set forth above is missing from your
            DMCA Notice, Citadel may not be able to respond to your request.
          </p>
          <p className="mb-4 text-sm leading-relaxed">
            Please be aware that if you knowingly materially misrepresent that material or activity on the Site is infringing your copyright, you may be held liable for damages
            (including attorneys' fees and costs) under Section 512(f) of the DMCA.
          </p>

          <h3 className="font-bold mt-6 mb-2 text-sm">B. Procedure for Supplying a Counter-Notice to the Designated Agent:</h3>
          <p className="mb-3 text-sm leading-relaxed">
            If you believe that your content that was removed or to which access was disabled is either not infringing or that you have the right to post and use such material, you
            may send a counter-notice containing the following information to the Designated Agent listed above:
          </p>
          <ul className="list-disc pl-6 mb-4 text-sm leading-relaxed space-y-1">
            <li>Your physical or electronic signature, or the signature of a person authorized to act on your behalf;</li>
            <li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access disabled;</li>
            <li>Your contact information, including your name, address, telephone number, and, if available, e-mail address;</li>
            <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of a mistake or a misidentification of the material; and</li>
            <li>A statement that you consent to the jurisdiction of the United States District Court for the judicial district in which your address is located (or if you reside outside the United States, for any judicial district in which the Site may be found), and that you will accept service of process from the person or agent of the person who provided Citadel with the DMCA Notice at issue.</li>
          </ul>
          <p className="mb-4 text-sm leading-relaxed">
            The DMCA allows Citadel to send a copy of the counter-notice to the original complaining party and to replace the removed material or cease disabling access to
            the material if the original complaining party does not provide Citadel with notice that it has filed an action seeking a court order restraining the infringing activity
            within 10 business days of receipt of the counter-notification. If Citadel replaces or restores access to the material, it will do so in 10 to 14 business days after
            receipt of the counter-notice.
          </p>

          {/* Section 8 */}
          <h2 className="text-lg font-bold mt-8 mb-3">8. Privacy Policy</h2>
          <p className="mb-4 text-sm leading-relaxed">
            We value your privacy. Our{" "}
            <Link href="/privacy-policy" className="text-blue-600 underline">
              Privacy Policy
            </Link>{" "}
            is expressly incorporated into these Terms of Service by this reference.
          </p>

          {/* Section 9 */}
          <h2 className="text-lg font-bold mt-8 mb-3">9. General</h2>
          <p className="mb-4 text-sm leading-relaxed">
            These Terms of Use are governed by the laws of the State of Florida, without reference to their conflicts of laws provisions. Under these Terms of Use, and to the
            extent permitted by applicable law, you agree that all disputes arising out of or relating to the use of the Site (each, a "Dispute") will be governed by the procedure
            outlined below.
          </p>
          <p className="mb-4 text-sm leading-relaxed">
            Informal Resolution Process: Before either you or Citadel may file a claim against the other party, both you and Citadel agree to try to participate in good faith
            informal efforts to resolve disputes before commencing arbitration ("Informal Dispute Resolution"). You and Citadel agree that as part of these efforts, either party
            has the option to ask for an informal telephonic conference (each an "Informal Resolution Conference"). If you are represented by counsel, your attorney may
            participate in the conference, but you must also personally participate. To initiate the Informal Dispute Resolution process, a party must give notice in writing to the
            other party ("Notice of Dispute") that includes (1) the claimant's name, mailing address, email address, and email address associated with the account (if you have one);
            (2) the name, telephone number, mailing address and email address of your counsel, if any; and (3) a description of the Dispute. We will send Notice and a
            description of the Dispute to your mailing address or email address on file.
          </p>
          <p className="mb-4 text-sm leading-relaxed">
            The Informal Dispute Resolution process lasts 45 days and is a mandatory precondition to commencing arbitration. The Informal Dispute Resolution Conference
            shall be scheduled within 30 days, and the conference must be held each time either party initiates a Dispute, even if the same law firm or group of law firms
            represents multiple users in similar cases, unless all parties agree; multiple individuals initiating a Dispute cannot participate in the same Informal Dispute Resolution
            Conference unless all parties agree. The statute of limitations shall be tolled while the parties engage in Informal Dispute Resolution.
          </p>
          <p className="mb-4 text-sm leading-relaxed">
            Binding Arbitration: If the Dispute has not been resolved after the 45-day Informal Dispute Resolution process, we each agree to resolve any Dispute, including the
            determination of the scope or applicability of this agreement to arbitrate, or the alleged breach thereof, by binding arbitration in the State of Florida before an
            arbitrator. The arbitration shall be administered by JAMS pursuant to its Comprehensive Arbitration Rules and Procedures, and in accordance with the Expedited
            Procedures in those Rules. Those rules are available at{" "}
            <a href="https://www.jamsadr.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              https://www.jamsadr.com
            </a>
            . Judgment on the award may be entered in any court having jurisdiction.
          </p>
          <p className="mb-4 text-sm leading-relaxed">
            Enforceability: If the above arbitration provisions are unenforceable, or inapplicable to a given dispute, then the proceeding must be brought exclusively in a
            Court of competent jurisdiction in Miami-Dade County, Florida, U.S.A. You hereby accept the exclusive jurisdiction of such court for this purpose.
          </p>
          <p className="mb-4 text-sm leading-relaxed">
            Except with regard to requests pertaining to personal information (which address is provided in the Privacy Policy) and requests to Citadel's Designated Agent under
            the DMCA (as set out above), any notice to Citadel, including any request to initiate the Informal Dispute Resolution process, shall be given in writing and sent by
            registered mail to Citadel Enterprise Americas LLC, Southeast Financial Center, 200 S. Biscayne Blvd Suite 3300, Miami, FL 33131, Attention: Legal Department, with
            a copy to{" "}
            <a href="mailto:CitadelAgreementNotice@citadel.com" className="text-blue-600 underline">
              CitadelAgreementNotice@citadel.com
            </a>
            .
          </p>
          <p className="mb-4 text-sm leading-relaxed">
            If any provision of these Terms of Use is held to be invalid or unenforceable in any jurisdiction, such provision shall be deemed modified to the minimum extent
            necessary so that such provision shall no longer be held to be invalid or unenforceable, and these Terms of Use shall be interpreted so as to achieve the intent
            expressed herein to the greatest extent possible in the jurisdiction in question. Any such modification, inability or unenforceability shall be strictly limited both to
            such provision and to such jurisdiction.
          </p>
          <p className="mb-4 text-sm leading-relaxed">
            "Citadel" and related marks, images and symbols are the exclusive properties of an affiliate of Citadel Enterprise Americas LLC. "Citadel," "Citadel Securities," and the
            Citadel logo are trademarks of an affiliate of Citadel Enterprise Americas LLC and are registered or are pending registration in the United States and several other
            jurisdictions.
          </p>

          {/* Section 10 */}
          <h2 className="text-lg font-bold mt-8 mb-3">10. Contact Us</h2>
          <p className="mb-8 text-sm leading-relaxed">
            If you have any questions regarding these Terms of Use, our Privacy Policy, or our privacy practices, please contact us at{" "}
            <a href="mailto:privacyinquiries@citadel.com" className="text-blue-600 underline">
              privacyinquiries@citadel.com
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}