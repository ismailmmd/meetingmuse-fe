import React from 'react';
import { PageLayout, ContentCard } from './layouts';
import { PageTitle } from './ui';
import {
  APP_NAME,
  EXTERNAL_LINKS,
  CONTACT_INFO,
  COPYRIGHT_TEXT,
} from '../constants/app';
import { Icons } from '../constants/icons';

export const PrivacyPage: React.FC = () => {
  return (
    <PageLayout>
      <ContentCard>
        <div className="prose prose-lg max-w-none">
          <PageTitle
            title={`${APP_NAME} Privacy Policy`}
            subtitle="Protecting your privacy and data"
            className="mb-8"
          />
          <p className="text-lg text-gray-600 mb-8">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 mb-4">
              MeetingMuse ("we," "our," or "us") is committed to protecting your
              privacy and ensuring transparency about how we handle your data.
              This Privacy Policy explains how we collect, use, store, and
              protect your information when you use our AI-powered meeting
              scheduling service.
            </p>
            <p className="text-gray-700">
              By using MeetingMuse, you agree to the practices described in this
              Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Google API Services and Limited Use Compliance
            </h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Important: Google User Data Handling
              </h3>
              <p className="text-blue-800">
                {APP_NAME}'s use of information received from Google APIs will
                adhere to the{' '}
                <a
                  href={EXTERNAL_LINKS.GOOGLE_API_POLICY}
                  className="underline hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Google Services We Access
            </h3>
            <p className="text-gray-700 mb-4">
              To provide our meeting scheduling services, we access the
              following Google services on your behalf:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Icons.CalendarAlt className="w-5 h-5 text-blue-600 mr-2" />
                  Google Calendar
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Read your calendar to check availability</li>
                  <li>• Create calendar events for scheduled meetings</li>
                  <li>• Set meeting reminders</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Icons.ContactsAlt className="w-5 h-5 text-green-600 mr-2" />
                  Google Contacts
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Search your contacts for meeting participants</li>
                  <li>• Provide contact suggestions during scheduling</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              How We Use Your Google Data
            </h3>
            <ul className="text-gray-700 space-y-2 mb-4">
              <li>
                <strong>Calendar Access:</strong> We only read your calendar to
                identify available time slots and create new meetings. We do not
                store your calendar data permanently.
              </li>
              <li>
                <strong>Contact Access:</strong> We search your contacts only
                when you're scheduling meetings to help you find and invite
                participants. Contact information is not stored on our servers.
              </li>
              <li>
                <strong>Real-time Processing:</strong> All Google data access
                happens in real-time during your interaction with MeetingMuse
                and is not retained after the session.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Collection and Storage
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              What Data We Collect
            </h3>
            <ul className="text-gray-700 space-y-2 mb-4">
              <li>
                <strong>Authentication Data:</strong> OAuth tokens to access
                your Google services (encrypted and securely stored)
              </li>
              <li>
                <strong>Session Data:</strong> Temporary session information to
                maintain your connection during use
              </li>
              <li>
                <strong>Usage Data:</strong> Basic analytics about app usage to
                improve our service (anonymized)
              </li>
              <li>
                <strong>Communication Data:</strong> Messages you send to our AI
                assistant (processed in real-time, not permanently stored)
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              How We Store Data
            </h3>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <ul className="text-green-800 space-y-2">
                <li>
                  <strong>Encryption:</strong> All OAuth tokens are encrypted
                  using industry-standard encryption (Fernet)
                </li>
                <li>
                  <strong>Temporary Storage:</strong> All data is stored
                  temporarily in memory or Redis and automatically deleted
                </li>
                <li>
                  <strong>No Permanent Data Storage:</strong> We do not
                  permanently store your Google Calendar events, contacts, or
                  personal information
                </li>
                <li>
                  <strong>Secure Infrastructure:</strong> All data is processed
                  on secure servers with appropriate access controls
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Sharing and Third Parties
            </h2>
            <p className="text-gray-700 mb-4">
              We do not sell, rent, or share your personal data with third
              parties except:
            </p>
            <ul className="text-gray-700 space-y-2 mb-4">
              <li>
                <strong>Google Services:</strong> We interact with Google APIs
                only as necessary to provide our service
              </li>
              <li>
                <strong>Service Providers:</strong> We may use trusted service
                providers for hosting and infrastructure (who are bound by
                confidentiality agreements)
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information
                if required by law or to protect our rights
              </li>
            </ul>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-800 font-semibold">
                We never share your Google user data with third parties for
                advertising, marketing, or any other commercial purposes.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Rights and Controls
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Access Control
                </h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Revoke Google account access anytime</li>
                  <li>• Control which Google services we can access</li>
                  <li>• Delete your MeetingMuse account</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Data Rights
                </h3>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Request data deletion</li>
                  <li>• Export your data</li>
                  <li>• Correct inaccurate information</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">
                Revoking Access
              </h4>
              <p className="text-blue-800 text-sm">
                You can revoke {APP_NAME}'s access to your Google account at any
                time by visiting your{' '}
                <a
                  href={EXTERNAL_LINKS.GOOGLE_PERMISSIONS}
                  className="underline hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Account permissions page
                </a>
                .
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Retention and Deletion
            </h2>
            <ul className="text-gray-700 space-y-2">
              <li>
                <strong>Session Data:</strong> Deleted automatically when you
                log out or after 24 hours of inactivity
              </li>
              <li>
                <strong>OAuth Tokens:</strong> Stored only as long as needed to
                maintain your authentication
              </li>
              <li>
                <strong>Google Data:</strong> Never permanently stored -
                accessed only in real-time for operations
              </li>
              <li>
                <strong>Usage Analytics:</strong> Anonymized data may be
                retained for service improvement purposes
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Security Measures
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">
                  Technical Security
                </h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• End-to-end encryption of sensitive data</li>
                  <li>• Secure HTTPS connections</li>
                  <li>• Access logging and monitoring</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">
                  Operational Security
                </h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Limited employee access to user data</li>
                  <li>• Compliance with industry standards</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by:
            </p>
            <ul className="text-gray-700 space-y-1 mb-4">
              <li>• Posting the updated policy on our website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="text-gray-700 space-y-1">
                <li>
                  <strong>Website:</strong> {EXTERNAL_LINKS.WEBSITE}
                </li>
                <li>
                  <strong>Response Time:</strong> We aim to respond within{' '}
                  {CONTACT_INFO.RESPONSE_TIME}
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Legal Basis and Compliance
            </h2>
            <p className="text-gray-700 mb-4">
              Our processing of your personal data is based on:
            </p>
            <ul className="text-gray-700 space-y-2 mb-4">
              <li>
                <strong>Consent:</strong> You provide explicit consent to access
                your Google services
              </li>
              <li>
                <strong>Contract Performance:</strong> Processing necessary to
                provide our meeting scheduling service
              </li>
              <li>
                <strong>Legitimate Interest:</strong> Improving our service
                quality and security
              </li>
            </ul>
            <p className="text-gray-700">
              We comply with applicable data protection laws including GDPR,
              CCPA, and other relevant privacy regulations.
            </p>
          </section>

          <div className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-500 text-center">
              This Privacy Policy is effective as of{' '}
              {new Date().toLocaleDateString()} and governs your use of
              {APP_NAME}.
              <br />
              {COPYRIGHT_TEXT}
            </p>
          </div>
        </div>
      </ContentCard>
    </PageLayout>
  );
};
