import React from 'react';
import { Link } from 'react-router-dom';
import {
  APP_NAME,
  APP_DESCRIPTION,
  COPYRIGHT_TEXT,
  ROUTES,
} from '../../constants/app';
import { Icons } from '../../constants/icons';

/**
 * Shared footer component used across all pages
 */
export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Icons.ChatDetailed className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold">{APP_NAME}</h3>
            </div>
            <p className="text-gray-400 mb-4">{APP_DESCRIPTION}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Calendar Integration</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to={ROUTES.PRIVACY}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.TERMS}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.CONTACT}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{COPYRIGHT_TEXT}</p>
        </div>
      </div>
    </footer>
  );
};
