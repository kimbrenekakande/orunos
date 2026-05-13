"use client";

export default function PolicyPage() {
  return (
    <div className="flex-1 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-8"
            style={{ fontFamily: 'var(--font-nexa-regular)' }}
          >
            Privacy Policy
          </h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground">
            <p className="text-sm text-muted-foreground">
              Last updated: May 2026
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
              <p className="leading-relaxed">
                Orunos (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered academic copilot platform.
              </p>
              <p className="leading-relaxed mt-3">
                By using Orunos, you consent to the practices described in this policy. If you do not agree, please discontinue use of our services immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
              <p className="leading-relaxed">
                We collect information you provide directly, information gathered automatically, and information from third-party sources:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-foreground">Account Information:</strong> Name, email address, institutional affiliation, and password</li>
                <li><strong className="text-foreground">Payment Information:</strong> Billing details processed securely through our payment providers</li>
                <li><strong className="text-foreground">User Content:</strong> Documents, research materials, citations, and notes you upload or create</li>
                <li><strong className="text-foreground">Usage Data:</strong> Features used, interaction patterns, session duration, and platform analytics</li>
                <li><strong className="text-foreground">Device Information:</strong> Browser type, operating system, IP address, and device identifiers</li>
                <li><strong className="text-foreground">Communication Data:</strong> Support requests, feedback, and correspondence with our team</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
              <p className="leading-relaxed">
                We use your information to provide, maintain, and improve our services:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Deliver AI-powered citation generation, document editing, and research assistance</li>
                <li>Process payments and manage your subscription</li>
                <li>Personalize your experience and recommend relevant features</li>
                <li>Respond to support requests and communicate important updates</li>
                <li>Analyze usage patterns to improve platform performance and accuracy</li>
                <li>Detect and prevent fraud, abuse, and security threats</li>
                <li>Comply with legal obligations and enforce our Terms of Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Security</h2>
              <p className="leading-relaxed">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-foreground">Encryption:</strong> AES-256 for data at rest, TLS 1.3 for data in transit</li>
                <li><strong className="text-foreground">Access Controls:</strong> Role-based access with multi-factor authentication for administrative accounts</li>
                <li><strong className="text-foreground">Regular Audits:</strong> Periodic security assessments and vulnerability testing</li>
                <li><strong className="text-foreground">Data Isolation:</strong> Your documents and research are processed in isolated environments</li>
              </ul>
              <p className="leading-relaxed mt-3">
                While we strive to protect your information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security but continuously work to minimize risks.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. AI Training & Your Data</h2>
              <p className="leading-relaxed">
                Your privacy and intellectual property are paramount. We maintain strict boundaries regarding AI training:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-foreground">No Public Training:</strong> Your documents, research, and unpublished work are <em>never</em> used to train public AI models</li>
                <li><strong className="text-foreground">Anonymized Improvement:</strong> We may use aggregated, anonymized interaction data to improve citation accuracy and platform performance</li>
                <li><strong className="text-foreground">No Data Selling:</strong> We do not sell, rent, or trade your personal information or research to third parties</li>
                <li><strong className="text-foreground">Enterprise Protection:</strong> Institutional and enterprise customers receive enhanced data isolation and custom retention policies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Information Sharing & Disclosure</h2>
              <p className="leading-relaxed">
                We do not sell your personal information. We may share information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-foreground">Service Providers:</strong> With trusted partners who assist in payment processing, hosting, analytics, and customer support</li>
                <li><strong className="text-foreground">Institutional Access:</strong> With your institution&apos;s administrators if you are on an institutional license (usage statistics only, not document content)</li>
                <li><strong className="text-foreground">Legal Requirements:</strong> When required by law, regulation, legal process, or governmental request</li>
                <li><strong className="text-foreground">Protection of Rights:</strong> To protect the rights, property, or safety of Orunos, our users, or the public</li>
                <li><strong className="text-foreground">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (with continued privacy protections)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Data Retention</h2>
              <p className="leading-relaxed">
                We retain your information for as long as your account is active or as needed to provide services:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-foreground">Active Accounts:</strong> Your documents and data are retained until you delete them or close your account</li>
                <li><strong className="text-foreground">Deleted Accounts:</strong> Upon account deletion, your personal data is removed within 30 days, except where retention is required by law</li>
                <li><strong className="text-foreground">Backup Systems:</strong> Data may persist in backup systems for up to 90 days after deletion</li>
                <li><strong className="text-foreground">Anonymized Data:</strong> Aggregated, anonymized usage data may be retained indefinitely for analytics and improvement</li>
              </ul>
              <p className="leading-relaxed mt-3">
                You can export your data at any time before account deletion. We recommend regular backups of your important research and documents.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Your Rights & Choices</h2>
              <p className="leading-relaxed">
                You have control over your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-foreground">Access:</strong> Request a copy of your personal data we hold</li>
                <li><strong className="text-foreground">Correction:</strong> Update or correct inaccurate information in your account settings</li>
                <li><strong className="text-foreground">Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong className="text-foreground">Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong className="text-foreground">Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                <li><strong className="text-foreground">Restriction:</strong> Request limitations on how we process your data</li>
              </ul>
              <p className="leading-relaxed mt-3">
                To exercise these rights, contact us at privacy@orunos.com. We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Cookies & Tracking Technologies</h2>
              <p className="leading-relaxed">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-foreground">Essential Cookies:</strong> Required for platform functionality and security</li>
                <li><strong className="text-foreground">Analytics Cookies:</strong> Help us understand how you use Orunos to improve our services</li>
                <li><strong className="text-foreground">Preference Cookies:</strong> Remember your settings and customization choices</li>
              </ul>
              <p className="leading-relaxed mt-3">
                You can manage cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Children&apos;s Privacy</h2>
              <p className="leading-relaxed">
                Orunos is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn we have collected personal information from a child under 13, we will delete it promptly. If you believe a child has provided us with personal information, please contact us at privacy@orunos.com.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">11. International Data Transfers</h2>
              <p className="leading-relaxed">
                Orunos operates globally. Your information may be transferred to and processed in countries other than your country of residence, including the United States. These countries may have data protection laws different from your jurisdiction.
              </p>
              <p className="leading-relaxed mt-3">
                We ensure appropriate safeguards are in place, including standard contractual clauses and adequacy decisions, to protect your information in accordance with this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">12. Third-Party Links & Services</h2>
              <p className="leading-relaxed">
                Orunos may contain links to third-party websites, services, or integrations (e.g., Zotero, Mendeley, EndNote). This Privacy Policy does not apply to third-party services. We encourage you to review the privacy policies of any third-party services you use through Orunos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">13. Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and updating the &quot;Last Updated&quot; date. For significant changes, we may provide additional notice via email or platform notification.
              </p>
              <p className="leading-relaxed mt-3">
                Your continued use of Orunos after changes constitutes acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">14. California Privacy Rights</h2>
              <p className="leading-relaxed">
                If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Right to know what personal information is collected, used, shared, or sold</li>
                <li>Right to delete personal information held by us and our service providers</li>
                <li>Right to opt-out of the sale of personal information (we do not sell personal information)</li>
                <li>Right to non-discrimination for exercising your CCPA rights</li>
              </ul>
              <p className="leading-relaxed mt-3">
                To exercise these rights, contact us at privacy@orunos.com or call our privacy hotline.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">15. European Economic Area (EEA) Rights</h2>
              <p className="leading-relaxed">
                If you are located in the EEA, you have rights under the General Data Protection Regulation (GDPR):
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Right to access, rectify, or erase your personal data</li>
                <li>Right to restrict or object to processing</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent at any time</li>
                <li>Right to lodge a complaint with a supervisory authority</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Our lawful basis for processing includes contract performance, legitimate interests, and your consent where required.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">16. Data Protection Officer</h2>
              <p className="leading-relaxed">
                We have appointed a Data Protection Officer (DPO) to oversee compliance with this Privacy Policy and applicable data protection laws. For any questions or concerns about data protection, contact our DPO at:
              </p>
              <ul className="list-none pl-0 space-y-2 mt-3">
                <li><strong className="text-foreground">Email:</strong> dpo@orunos.com</li>
                <li><strong className="text-foreground">Mailing Address:</strong> Orunos Inc., Attn: Data Protection Officer, San Francisco, CA 94102</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">17. Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="list-none pl-0 space-y-2 mt-3">
                <li><strong className="text-foreground">Email:</strong> privacy@orunos.com</li>
                <li><strong className="text-foreground">General Support:</strong> support@orunos.com</li>
                <li><strong className="text-foreground">Mailing Address:</strong> Orunos Inc., San Francisco, CA 94102</li>
                <li><strong className="text-foreground">Help Center:</strong> help.orunos.com</li>
              </ul>
            </section>

            <p className="text-sm text-muted-foreground pt-8 border-t">
              By using Orunos, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
