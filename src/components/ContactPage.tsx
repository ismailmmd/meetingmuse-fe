import React from 'react';
import { PageHeader } from './PageHeader';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <PageHeader />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-effect rounded-xl p-8 mb-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We'd Love to Hear from You
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about MeetingMuse? Need help with scheduling? We're
              here to help make your meeting management effortless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Get in Touch
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Website
                    </h4>
                    <p className="text-gray-600">
                      <a
                        href="https://www.meetingmuse.online"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        www.meetingmuse.online
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Response Time
                    </h4>
                    <p className="text-gray-600">
                      We aim to respond within 48 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Support Status
                    </h4>
                    <p className="text-gray-600">
                      Currently in Beta - Active development and support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Quick Help
              </h3>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Getting Started
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Click "Get Started" to sign in with your Google account and
                    begin scheduling meetings with AI assistance.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">
                    Calendar Access
                  </h4>
                  <p className="text-green-700 text-sm">
                    We only access your Google Calendar when scheduling
                    meetings. No permanent data storage.
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    Privacy & Security
                  </h4>
                  <p className="text-purple-700 text-sm">
                    Your data is encrypted and processed in real-time. Check our
                    Privacy Policy for full details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="border-t pt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  How do I schedule a meeting?
                </h4>
                <p className="text-gray-600 text-sm">
                  Simply describe your meeting needs in natural language. Our AI
                  will understand and handle the scheduling automatically.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Is my Google data safe?
                </h4>
                <p className="text-gray-600 text-sm">
                  Yes! We follow Google's Limited Use requirements and only
                  access your data when scheduling. No permanent storage.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Can I revoke access?
                </h4>
                <p className="text-gray-600 text-sm">
                  Absolutely. You can revoke MeetingMuse's access anytime
                  through your Google Account permissions page.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Is MeetingMuse free?
                </h4>
                <p className="text-gray-600 text-sm">
                  MeetingMuse is currently in beta and free to use.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-500 text-center">
              For technical issues or feature requests, please visit our website
              at{' '}
              <a
                href="https://www.meetingmuse.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                www.meetingmuse.online
              </a>
              <br />© 2024 MeetingMuse. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
