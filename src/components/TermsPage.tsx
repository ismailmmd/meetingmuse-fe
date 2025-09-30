import React from 'react';
import { Link } from 'react-router-dom';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="blue-gradient shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  MeetingMuse Terms of Service
                </h1>
                <p className="text-blue-100 text-sm font-medium">
                  Clear and simple terms
                </p>
              </div>
            </div>
            <Link
              to="/"
              className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white font-semibold transition-all duration-200 border border-white/30"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-effect rounded-xl p-8 mb-8">
          <p className="text-lg text-gray-600 mb-8">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Service Agreement
            </h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <p className="text-blue-800">
                By using MeetingMuse, you agree to these terms. We've kept them
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
                  <strong>Google Calendar Integration:</strong> Connect with
                  your Google Calendar to find available times
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
                <span>
                  Provide accurate meeting information and requirements
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>
                  Use the service for legitimate meeting scheduling purposes
                  only
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
                <li>
                  • Service availability depends on Google API availability
                </li>
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
                  We access your Google Calendar and Contacts only when
                  scheduling meetings
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
                <span>
                  We may suspend service for violations of these terms
                </span>
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
                liable for missed meetings, calendar conflicts, or data loss.
                Use the service at your own discretion and always verify
                important meeting details.
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
              <li>
                • Continued use of the service means you accept the changes
              </li>
              <li>• Material changes will be highlighted clearly</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 mb-2">
                Questions about these terms? Contact us:
              </p>
              <p className="text-blue-700">
                <Link
                  to="/contact"
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
              MeetingMuse.
              <br />© 2024 MeetingMuse. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
