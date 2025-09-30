import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout, ContentCard } from './layouts';
import { PageTitle } from './ui';
import { APP_NAME, ROUTES, COPYRIGHT_TEXT } from '../constants/app';

export const TermsPage: React.FC = () => {
  return (
    <PageLayout>
      <ContentCard>
        <PageTitle
          title={`${APP_NAME} Terms of Service`}
          subtitle="Not usual 100 page legalese. We keep it simple."
          className="mb-8"
        />
        <p className="text-lg text-gray-600 mb-8">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Service Agreement
          </h2>
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <p className="text-blue-800">
              By using {APP_NAME}, you agree to these terms. We've kept them
              simple and clear.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What We Provide
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>
                <strong>AI Meeting Scheduling:</strong> Natural language
                processing to schedule meetings automatically
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>
                <strong>Google Calendar Integration:</strong> Connect with your
                Google Calendar to find available times
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>
                <strong>Smart Contact Management:</strong> Access your Google
                Contacts for easy participant invitations
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your Responsibilities
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Provide accurate meeting information and requirements</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>
                Use the service for legitimate meeting scheduling purposes only
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>
                Maintain the security of your Google account credentials
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Respect other users and meeting participants</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Service Availability
          </h2>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <ul className="space-y-2 text-yellow-800">
              <li>• Service availability depends on Google API availability</li>
              <li>
                • As we are beta, we may perform maintenance without advance
                notice
              </li>
              <li>
                • No guarantee of 100% uptime, but we strive for reliable
                service
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Data and Privacy
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>
                We access your Google Calendar and Contacts only when scheduling
                meetings
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>
                Your data is processed in real-time and not permanently stored
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>OAuth tokens are encrypted and securely managed</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>
                See our Privacy Policy for complete data handling details
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Prohibited Uses
          </h2>
          <div className="bg-red-50 p-4 rounded-lg">
            <ul className="space-y-2 text-red-800">
              <li>• Sending spam or unsolicited meeting invitations</li>
              <li>• Using the service for illegal or harmful activities</li>
              <li>
                • Attempting to reverse engineer or compromise the service
              </li>
              <li>• Violating Google's terms of service or API policies</li>
              <li>• Sharing your account access with unauthorized users</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Account Termination
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>
                You can revoke access anytime through your Google Account
                settings
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>We may suspend service for violations of these terms</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>
                Upon termination, all temporary data is immediately deleted
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Limitation of Liability
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              MeetingMuse is provided "as is" without warranties. We are not
              liable for missed meetings, calendar conflicts, or data loss. Use
              the service at your own discretion and always verify important
              meeting details.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Changes to Terms
          </h2>
          <p className="text-gray-700 mb-4">
            We may update these terms occasionally. When we do:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>• Updated terms will be posted on our website</li>
            <li>• Continued use of the service means you accept the changes</li>
            <li>• Material changes will be highlighted clearly</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 mb-2">
              Questions about these terms? Contact us:
            </p>
            <p className="text-blue-700">
              <Link
                to={ROUTES.CONTACT}
                className="text-blue-600 hover:text-blue-800 underline font-semibold"
              >
                Visit our Contact Page
              </Link>
            </p>
          </div>
        </section>

        <div className="border-t pt-6 mt-8">
          <p className="text-sm text-gray-500 text-center">
            These Terms of Service are effective as of{' '}
            {new Date().toLocaleDateString()} and govern your use of
            {APP_NAME}.
            <br />
            {COPYRIGHT_TEXT}
          </p>
        </div>
      </ContentCard>
    </PageLayout>
  );
};
