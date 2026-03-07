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
              Privacy
            </h1>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 px-6 md:px-20 max-w-7xl mx-auto text-gray-800">

          <p className="text-sm font-semibold mb-2">Effective Date: October 14, 2024</p>

          <p className="text-sm mb-3 leading-relaxed">
            If you are a visitor to the website or a data subject in receipt of our Services from the EEA, Switzerland and/or the UK, the following privacy policy applies to you:{" "}
            <a href="#" className="text-blue-600 underline">English</a>,{" "}
            <a href="#" className="text-blue-600 underline">En Français</a>.
          </p>
          <p className="text-sm mb-3 leading-relaxed">
            If you are a Japanese resident visiting our website or in receipt of our Services, the following additional privacy policy contains further important information that also applies to you:{" "}
            <a href="#" className="text-blue-600 underline">個人情報保護通告示</a>.
          </p>
          <p className="text-sm mb-6 leading-relaxed">
            If you are a California resident visiting our website or in receipt of our Services the following supplemental privacy provisions apply to you:{" "}
            <a href="#" className="text-blue-600 underline">Privacy Notice for California Residents</a>.
          </p>
          <p className="text-sm mb-8 leading-relaxed">
            A PDF copy of this Privacy Policy is available for printing{" "}
            <a href="#" className="text-blue-600 underline">here</a>.
          </p>

          {/* PRIVACY POLICY */}
          <h2 className="text-xl font-bold mb-4">PRIVACY POLICY</h2>
          <p className="text-sm mb-4 leading-relaxed">
            This Privacy Policy describes the types of information Citadel Enterprise Americas LLC, Citadel Securities Americas LLC, Citadel Americas LLC, and their affiliates
            ("Citadel") collect from you when you visit or access{" "}
            <a href="https://www.citadel.com" className="text-blue-600 underline">www.citadel.com</a> or{" "}
            <a href="https://www.citadelsecurities.com" className="text-blue-600 underline">www.citadelsecurities.com</a>, any other of our websites where this policy is posted, or our iOS
            and Android apps (collectively, the "Platforms") or otherwise interact with us online. It applies to every person who visits, accesses, or registers with the Platforms,
            applies for a job with us, receives newsletters or other marketing communications issued by or on behalf of Citadel, or engages with us to use the services that
            Citadel provides (collectively the "Services") except as otherwise contractually agreed.
          </p>
          <p className="text-sm mb-4 leading-relaxed">
            This Privacy Policy also explains how Citadel may use and disclose your information and how you may control certain uses of your personal data. This Privacy Policy
            is in addition to any separate annual privacy policy or notice that Citadel may send individuals who participate in certain Services that Citadel offers.
          </p>
          <p className="text-sm mb-8 leading-relaxed">
            Please note that the data controller (or similar term under local law) is generally the Citadel entity you contract with in relation to our Services or the Citadel entity to
            which you apply for a job. However, Citadel is an international business, and your personal data may be processed by other Citadel group companies or companies
            managed by Citadel on a joint data controller basis, where permitted by applicable law. "Personal data" and "information" are used interchangeably throughout this
            Privacy Policy and each refer to information about identifiable natural people.
          </p>

          {/* INFORMATION COLLECTION */}
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Information Collection</h2>

          <h3 className="font-bold text-sm mt-6 mb-2">Information Collected About Clients and Visitors to Our Platforms</h3>
          <p className="text-sm mb-3 leading-relaxed">
            We collect information from you when you choose to share it with us, when you visit or access our Platforms, request information from us, or contact us.
          </p>
          <p className="text-sm mb-2">The information we collect from you may include:</p>
          <ul className="list-disc pl-6 mb-4 text-sm leading-relaxed space-y-1">
            <li>Contact information, including your name, address, email address, or phone number;</li>
            <li>Employer-related information, such as your title and the company's name, address, and phone number;</li>
            <li>Citadel account number;</li>
            <li>Profile data, such as your account username and password for our Platforms;</li>
            <li>Location information (IP address, IP address locations, information about your location);</li>
            <li>Platforms activity (how you use our Platforms, pages viewed, time of service, date of service, duration of service, time since last visit, links clicked, information about pages viewed on our Platforms);</li>
            <li>Off-Platforms activity (referring website addresses, information about the site or app you came from);</li>
            <li>Information about your device (device type, Internet connection type, linking multiple devices to the same user) and browser (file type and language); and</li>
            <li>Marketing and communications data, such as marketing or communication preferences.</li>
          </ul>

          <h3 className="font-bold text-sm mt-6 mb-2">Information Collected about Participants in One of Our Programs</h3>
          <p className="text-sm mb-4 leading-relaxed">
            We may collect information that you provide to us directly, that we receive from third parties, or that we collect automatically as you access any of our Platforms in
            connection with your participation in one of our programs. In addition to the types of information that may be collected about visitors to our Platforms, we may
            collect information you provide during the on-boarding process, including information provided on your tax forms, authorization agreement for direct deposits,
            personal data collection forms and supplemental disclosures.
          </p>

          <h3 className="font-bold text-sm mt-6 mb-2">Information Collected about Prospective Employees and Job Applicants</h3>
          <p className="text-sm mb-2 leading-relaxed">
            We may collect the following information about you that you either provide to us directly, that we receive from third parties, or that we collect automatically as you
            access any of our Platforms. In addition to the types of information that may be collected about visitors to our Platforms, we may collect:
          </p>
          <ul className="list-disc pl-6 mb-4 text-sm leading-relaxed space-y-1">
            <li>Career demographics (job title, role, profession, education, industry, years of experience, skills);</li>
            <li>Career interests (career topics and areas of interest, expected date of graduation for current students, majors, locations interested in working, interests in upcoming events);</li>
            <li>Information you provided in-person (e.g., at events attended);</li>
            <li>Topics you have expressed interest in;</li>
            <li>Email activity (emails opened, email program used, clicks in email);</li>
            <li>Profile information from social media sites;</li>
            <li>Information you submit to us (e.g., submitted images, photos, videos; other items you submit; details about your requests made to us); and</li>
            <li>Data applied for or referenced in (including the job opening's education and experience description).</li>
          </ul>

          <h3 className="font-bold text-sm mt-6 mb-2">Information Collected from Third Parties or Other Sources</h3>
          <p className="text-sm mb-4 leading-relaxed">
            We might use personal or other information that you from third parties or other sources and combine this information with the information we collect from you.
            This might include any other information obtained through companies that have business relationships with us, such as our licensees, affiliates, and business
            partners.
          </p>
          <p className="text-sm mb-4 leading-relaxed">
            We may also obtain information about you from other online sources, including when you connect with Citadel through its official corporate pages on third-party
            social networks (such as LinkedIn) or through their other sites. This information may include your name, user name and account information, current address or
            contact information, interests, and publicly-observed data. We may combine this information with the information we collect from you through the Platforms.
          </p>
          <p className="text-sm mb-4 leading-relaxed">
            For prospective employees and job applicants, in addition, we may obtain information about you from third parties, including without limitation, recruitment agencies,
            background check providers, credit reference agencies, and your references, where required or permitted to conduct such checks under applicable law.
          </p>

          <h3 className="font-bold text-sm mt-6 mb-2">Information Automatically Collected through Cookies</h3>
          <p className="text-sm mb-4 leading-relaxed">
            We may use cookies, web beacons, pixel tags, JavaScript, or other similar technologies (which we generically refer to as "Cookies") to collect certain information
            about visitors to our Platforms and interactions with our emails and online or mobile advertisements, and to allow Citadel to keep track of analytics and statistical
            information that enables the building of our Platforms and provide you with more relevant content on our Platforms and marketing channels.
          </p>
          <p className="text-sm mb-4 leading-relaxed">
            For example, we may collect information about your use of the Platforms, including the Platforms activity and off-Platforms activity described in the Information
            Collected About Clients and Visitors to Our Platforms section; emails that you open, forward, or click-through to our Platforms; comments and ratings you submit;
            and website and/or app preferences and settings.
          </p>
          <p className="text-sm mb-4 leading-relaxed">
            We may also use third-party Cookies to support our Platforms, provide services on our behalf, complete business transactions, or provide relevant advertising to
            you. Some of these third parties may set Cookies on our Platforms, which may result over time of the accumulation of your information. The use of this information
            by those third parties will be governed by their own privacy policies including, for example, Google's Analytics Privacy Policy or the Salesforce Privacy Policy.
          </p>
          <p className="text-sm mb-4 leading-relaxed">
            We also may use Cookies to collect information about your online activities over time and across third-party websites, apps, or other online services (behavioral
            tracking). If you click on or otherwise interact with an advertisement, we may assume that you meet the target criteria.
          </p>

          <h3 className="font-bold text-sm mt-6 mb-2">Management of Cookies, Tracking Options, and Do Not Track Disclosures</h3>
          <p className="text-sm mb-4 leading-relaxed">
            There are various ways that you can manage your Cookie preferences, but please be aware that in order to use some parts of our Platform you will need to allow
            certain essential or functional Cookies. If you block or subsequently delete those Cookies, some aspects of our Platform may not work properly, and you may not be
            able to access all or part of our Platform.
          </p>
          <p className="text-sm mb-4 leading-relaxed">
            For further information about types of Cookies used and to customize your cookie preferences please visit{" "}
            <a href="#" className="text-blue-600 underline">Manage My Preferences</a>.
          </p>
          <p className="text-sm mb-4 leading-relaxed">
            Additionally, you are free to set your browser or operating system settings to limit certain tracking or to decline Cookies, but by doing so, you may not be able to use
            certain features on the Platforms. Refer to your Web browser's or operating system's website or "Help" section for more information on how to delete and/or disable
            your browser or operating system Cookies and please visit{" "}
            <a href="#" className="text-blue-600 underline">Managing Cookies</a> for general information on managing your tracking preferences.
          </p>
          <p className="text-sm mb-4 leading-relaxed">
            Our system responds to most Do Not Track requests or headers from some or all browsers. To learn more about the use of Cookies to deliver more relevant
            advertising and to know your choices about not having this information used by certain service providers, click{" "}
            <a href="http://www.aboutads.info/choices/" className="text-blue-600 underline">http://www.aboutads.info/choices/</a> and{" "}
            <a href="https://policies.google.com/technologies" className="text-blue-600 underline">https://policies.google.com/technologies</a>. For more general information on cookie management and blocking or
            deleting cookies for a wide variety of browsers, visit{" "}
            <a href="#" className="text-blue-600 underline">All About Cookies</a>.
          </p>
          <p className="text-sm mb-8 leading-relaxed">
            On your mobile device, you may also adjust your privacy and advertising settings to control whether you want to receive more relevant advertising.
          </p>

          {/* PURPOSE FOR PERSONAL DATA */}
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Purpose for Personal Data Collection, Use, and Disclosure</h2>
          <p className="text-sm mb-2">Citadel may collect, use, and disclose your personal data for any of the following purposes:</p>
          <ul className="list-disc pl-6 mb-4 text-sm leading-relaxed space-y-1">
            <li>To deliver Citadel's Services to you;</li>
            <li>To your participation in certain of our programs;</li>
            <li>To enhance your online experience, including as a way to recognize you and welcome you to the Platforms;</li>
            <li>To identify trends and conduct analytics to enhance efforts to enhance our Services and marketing activities;</li>
            <li>To review the usage and operations of our Platforms and improve our content, products, and Services;</li>
            <li>To recognize your online activities over time and across different websites, apps, and devices;</li>
            <li>With your express opt-in consent where required, to provide you with customized content on our Platforms or via email, telephone, text message, mail, or other marketing channels;</li>
            <li>With your express opt-in consent where required, to contact you with information, newsletters, and promotional materials from Citadel or on behalf of our business partners and affiliates;</li>
            <li>With your express opt-in consent where required, to serve ads through third-party services (including social media platforms) that are targeted to reach people on those services who are identified in our databases. (This may be done by matching common factors between our databases and the databases of third-party operators. For example, we may use LinkedIn Custom Audiences to provide such information on LinkedIn to people whose information and email addresses we already have and who expressed an interest in hearing from us);</li>
            <li>For talent acquisition activities relating to your title and the company's name, address, and phone number; fulfillment of recruitment processes, assessment, or conclusion of an employment offer, inclusion in our recruitment database for possible future employment opportunities (with your consent where required), and to comply with our legal and regulatory obligations in relation to recruitment;</li>
            <li>To contact you when necessary by email, phone, text message, mail, or in-app direct message;</li>
            <li>To use your data in an aggregated, anonymous, non-specific format for analytical purposes;</li>
            <li>To address problems with the Services or our business;</li>
            <li>To protect the security or integrity of the Platforms and our business, such as by protecting against and preventing fraud, unauthorized transactions, claims, and other liabilities and by managing risk exposure, including by identifying potential malicious or unauthorized users or uses; and</li>
            <li>As otherwise described to you at the point of data collection.</li>
          </ul>
          <p className="text-sm mb-4 leading-relaxed">
            Personal data will only be collected for the purpose outlined above and not further processed in a manner incompatible with those purposes.
          </p>
          <p className="text-sm mb-4 leading-relaxed">
            Additionally, if you use the Platforms to connect with third-party services you authorize us to use information from you, on your behalf, to interact with these third-party services based on your requests.
          </p>
          <p className="text-sm mb-4 leading-relaxed">
            For further information about Citadel's use, retention, and destruction of personal data under EEA, Swiss, and UK data protection laws, see the following privacy
            policy:{" "}
            <a href="#" className="text-blue-600 underline">English</a>,{" "}
            <a href="#" className="text-blue-600 underline">En Français</a>.
          </p>
          <p className="text-sm mb-4 leading-relaxed">
            For similar details about Citadel's use of personal data under the California Consumer Privacy Act, see the following:{" "}
            <a href="#" className="text-blue-600 underline">Privacy Notice for California Residents</a>.
          </p>
          <p className="text-sm mb-8 leading-relaxed">
            For similar additional details for Japanese residents, see the following:{" "}
            <a href="#" className="text-blue-600 underline">個人情報保護通告示</a>.
          </p>
          <p className="text-sm mb-8 leading-relaxed">
            In all other jurisdictions, personal data will be stored no longer than necessary for the purposes for processing and for which retention is necessary for legal or
            business purposes.
          </p>

          {/* PERSONAL DATA SHARING */}
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Personal Data Sharing</h2>
          <p className="text-sm mb-2 leading-relaxed">Citadel may disclose the personal data we collect from you with the following categories of third parties and in the following ways:</p>
          <ul className="list-disc pl-6 mb-4 text-sm leading-relaxed space-y-1">
            <li>With our affiliated companies;</li>
            <li>With our third-party service providers that provide business, professional or technical support functions for us;</li>
            <li>As necessary to defend or enforce our rights or fulfillment of our Terms of Use or of our rights or the rights of any third party;</li>
            <li>To respond to judicial process or provide information to law enforcement or regulatory agencies or in connection with an investigation on matters related to public safety, as permitted by law, or otherwise as required by law; and</li>
            <li>As otherwise described to you at the point of collection.</li>
          </ul>
          <p className="text-sm mb-8 leading-relaxed">
            Citadel may also share aggregate or anonymous non-personal data with third parties for marketing or analytics uses on behalf of Citadel.
          </p>
          <p className="text-sm mb-8 leading-relaxed">
            We may share your personal data in connection with a merger, financing, acquisition, dissolution, transaction, bankruptcy, or proceeding involving sale, transfer, or
            divestiture of all or a portion of our business or assets. If another entity acquires our business or assets, that entity will have your personal data collected by us and
            will assume the rights and obligations regarding your information as allowed by this Privacy Policy.
          </p>

          {/* TRANSFERS */}
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Transfers of Personal Data and Additional Information on Data Processing</h2>
          <p className="text-sm mb-4 leading-relaxed">
            Due to Citadel's international operations, personal data may be transferred to other countries when necessary for one of the reasons set forth above or to deliver
            Services. Citadel engages third-party service providers that Citadel works with are based in the US and have marketing and operations in multiple countries, and
            personal data may be shared with or transferred to other Citadel group companies or third-party service providers in the US or other jurisdictions, including but not
            limited to those listed in the "Our Companies, Offices, Locations, and Regulations" section below.
          </p>
          <p className="text-sm mb-8 leading-relaxed">
            When Citadel transfers your personal data, such transfers will be carried out in accordance with local data protection law, including as described below. You can
            obtain further details about this by contacting us by using the contact details in the "Contact Us" section.
          </p>

          <h3 className="font-bold text-sm mt-4 mb-2">EEA, Switzerland and UK</h3>
          <p className="text-sm mb-4 leading-relaxed">
            Personal data for EEA, Swiss, or UK natural persons may be transferred to other countries that may not have equivalent data protection laws, including to the US, for
            the purposes described in this policy to Citadel or to Citadel affiliates and third-party service providers. In such circumstances, Citadel may use servers outside the EEA, Switzerland, or the UK. Citadel will only transfer this information outside the EEA, Switzerland, or the UK if it has a lawful basis for such a transfer, and only after implementing appropriate contractual and any supplementary organizational, contractual, and/or technical measures to seek to ensure an essentially equivalent level of protection of the information to the protection offered by the EU GDPR, the UK GDPR, and the Swiss Federal Act on Data Protection. For further details see the following privacy policy:{" "}
            <a href="#" className="text-blue-600 underline">English</a>,{" "}
            <a href="#" className="text-blue-600 underline">En Français</a>.
          </p>

          <h3 className="font-bold text-sm mt-4 mb-2">Australia</h3>
          <p className="text-sm mb-4 leading-relaxed">
            If Australian law applies to Citadel's processing of your information, it is being processed in accordance with this Privacy Policy. In addition, our use of such
            information may be subject to various privacy laws of Australia, including the Australian Privacy Act 1988 (Cth).
          </p>

          <h3 className="font-bold text-sm mt-4 mb-2">Canada</h3>
          <p className="text-sm mb-4 leading-relaxed">
            If Canadian law applies to Citadel's processing of your information, it is being processed in accordance with this Privacy Policy. In addition, our use of such
            information may be subject to various privacy laws of Canada, including the Personal Information Protection and Electronic Documents Act 2000.
          </p>

          <h3 className="font-bold text-sm mt-4 mb-2">China</h3>
          <p className="text-sm mb-4 leading-relaxed">
            If Chinese law applies to Citadel's processing of your information, it is being processed in accordance with this Privacy Policy. In addition, our use of such
            information may be subject to various privacy laws of China including the Personal Information Protection Law 2021.
          </p>

          <h3 className="font-bold text-sm mt-4 mb-2">Hong Kong</h3>
          <p className="text-sm mb-8 leading-relaxed">
            If Hong Kong law applies to Citadel's processing of your information, it is being processed in accordance with this Privacy Policy. In addition, our use of such
            information may be subject to various privacy laws of Hong Kong, including the Hong Kong Personal Data (Privacy) Ordinance.
          </p>

          {/* LINKS TO OTHER WEBSITES */}
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Links to Other Websites</h2>
          <p className="text-sm mb-8 leading-relaxed">
            The Platforms and email messages from us may contain links to third-party websites, which may have privacy policies that differ from our own. You should be aware
            that the collection, retention, and use of any data you provide on these websites will be governed by the privacy policy of the company providing the website and not
            by this Privacy Policy. We are not responsible for the practices of such websites.
          </p>

          {/* CHILDREN'S PRIVACY */}
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Children's Privacy</h2>
          <p className="text-sm mb-8 leading-relaxed">
            Protecting children's privacy is important to us. We do not direct the Platforms to, nor do we knowingly collect, any personal data from children under the age of
            eighteen. If we learn that a child under the age of eighteen has provided personal data to the Platforms, we will use reasonable efforts to remove such information
            from our files.
          </p>

          {/* DATA SECURITY */}
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Data Security</h2>
          <p className="text-sm mb-8 leading-relaxed">
            We have taken reasonable physical, administrative, and technical steps to safeguard the information we collect from and about our customers and Platforms visitors
            to prevent unauthorized access, collection, use, disclosure, copying, modification, leakage, loss, damage, and/or alteration of your personal data.
          </p>

          {/* DATA STORAGE */}
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Data Storage</h2>
          <p className="text-sm mb-8 leading-relaxed">
            Your personal data may be stored on servers in the United States and be subject to the laws of the United States, where the data protection and other laws may
            differ from those of other countries, or on servers in other countries when necessary for one of the reasons set forth above or to deliver the Services. Your personal
            data may be disclosed in response to inquiries or requests from government authorities or to respond to judicial process in the countries in which we operate.
          </p>

          {/* YOUR OPTIONS */}
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Your Options and Access to Your Personal Data</h2>
          <p className="text-sm mb-8 leading-relaxed">
            You may have other rights in your jurisdiction to know whether we process your personal data; to obtain a copy of your personal data; to correct any inaccuracies in
            the personal data we hold about you; to be informed about the nature of the personal data we hold about you and how we obtained it; to request that we correct or
            delete your personal data; and to opt-out of certain personal data processing by Citadel. You may contact your account representative to update your information
            in our system. If you have any additional questions concerning access to or updating your personal data, as well as to exercise any other rights you may have in your
            jurisdiction, please contact us at the information provided in the "Contact Us" section below. You will not face any retaliation or discrimination for exercising your
            rights. We take reasonable steps to ensure that any personal data we collect, disclose, and use is accurate and complete, especially if your personal data is likely to
            be used by us to make a decision that affects you or disclosed to a third party. However, it is important that you advise us of any changes to your personal data or if
            there are any errors in the personal data we hold about you. We will not be responsible for relying on inaccurate or incomplete personal data arising from your not
            updating us regarding changes in your personal data that you had initially provided us with.
          </p>

          {/* COMPLAINTS */}
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Complaints</h2>
          <p className="text-sm mb-8 leading-relaxed">
            If you believe that we have not complied with this Privacy Policy or you have any grievances in relation to our collection, use, and disclosure of your personal data,
            you may submit a complaint to us using the information provided in the "Contact Us" section below. Where you consider that our response to your complaint is
            inadequate, you may escalate your complaint to the Regulator in your respective jurisdiction, whose contact details are provided in the "Our Companies, Offices,
            Locations, and Regulators" section above.
          </p>

          {/* CONTACT US */}
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Contact Us</h2>
          <p className="text-sm mb-4 leading-relaxed">
            We hope this Privacy Policy answers your questions about our collection, use, and disclosure of your personal data. If you have additional questions about this
            Privacy Policy or the practices described here, you may contact us at{" "}
            <a href="mailto:privacyinquiries@citadel.com" className="text-blue-600 underline">privacyinquiries@citadel.com</a> or write to us at the following address:
          </p>
          <div className="mb-8 text-sm leading-relaxed pl-4 border-l-2 border-gray-300">
            <p>Privacy Officer</p>
            <p>Citadel Enterprise Americas LLC</p>
            <p>Southeast Financial Center</p>
            <p>200 S. Biscayne Blvd</p>
            <p>Suite 3300</p>
            <p>Miami, FL 33131</p>
          </div>

          {/* NON-EEA ACCEPTANCE */}
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Non-EEA, Swiss, and US Users' Acceptance of This Privacy Policy</h2>
          <p className="text-sm mb-8 leading-relaxed">
            By using the Services, you confirm that you have read, understood, and (if required) agree to this Privacy Policy. If you do not agree with the terms of this Privacy
            Policy, please do not use our Services. Even if you had previously provided your express opt-in consent to receiving marketing communications, you may opt out of
            marketing communications at any time by contacting Citadel using the information above.
          </p>

          {/* REVISIONS */}
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Revisions to This Privacy Policy</h2>
          <p className="text-sm mb-4 leading-relaxed">
            Citadel reserves the right, at its sole discretion, to change, modify, add, remove, or otherwise revise portions of this Privacy Policy at any time to reflect any changes
            or proposed changes to our use of your personal data, or to comply with changes in applicable law or regulatory requirements. If we do, we will update the effective
            date at the top of the page. Your continued use of the Platforms following the posting of changes to these terms means you accept these changes.
          </p>
          <p className="text-sm mb-12 leading-relaxed">
            Non-affiliated third parties are independent from Citadel. If you wish to receive information about your disclosure choices or stop communications from such third
            parties, you will need to contact those non-affiliated third parties directly.
          </p>

        </section>
      </main>

      <Footer />
    </div>
  );
}