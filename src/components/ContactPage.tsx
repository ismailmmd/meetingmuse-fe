import React from 'react';
import { PageLayout, ContentCard } from './layouts';
import {
  EXTERNAL_LINKS,
  CONTACT_INFO,
  APP_NAME,
  COPYRIGHT_TEXT,
} from '../constants/app';
import { Icons } from '../constants/icons';

export const ContactPage: React.FC = () => {
  return (
    <PageLayout>
      <ContentCard>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            We'd Love to Hear from You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about {APP_NAME}? Need help with scheduling? We're
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
                  <Icons.Globe className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    Website
                  </h4>
                  <p className="text-gray-600">
                    <a
                      href={EXTERNAL_LINKS.WEBSITE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {EXTERNAL_LINKS.WEBSITE}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icons.Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    Response Time
                  </h4>
                  <p className="text-gray-600">
                    We aim to respond within {CONTACT_INFO.RESPONSE_TIME}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icons.Info className="w-6 h-6 text-purple-600" />
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
                  We only access your Google Calendar when scheduling meetings.
                  No permanent data storage.
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
                Yes! We follow Google's Limited Use requirements and only access
                your data when scheduling. No permanent storage.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                Can I revoke access?
              </h4>
              <p className="text-gray-600 text-sm">
                Absolutely. You can revoke MeetingMuse's access anytime through
                your Google Account permissions page.
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
              href={EXTERNAL_LINKS.WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {EXTERNAL_LINKS.WEBSITE}
            </a>
            <br />
            {COPYRIGHT_TEXT}
          </p>
        </div>
      </ContentCard>
    </PageLayout>
  );
};
