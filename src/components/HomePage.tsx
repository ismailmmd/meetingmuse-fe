import React from 'react';

interface HomePageProps {
  onGetStarted: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onGetStarted,
  onPrivacyClick,
  onTermsClick,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="blue-gradient shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  MeetingMuse
                </h1>
                <p className="text-blue-100 text-sm font-medium">
                  Your AI Meeting Assistant
                </p>
              </div>
            </div>
            <button
              onClick={onGetStarted}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white font-semibold transition-all duration-200 border border-white/30"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Schedule meetings with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}
                AI intelligence
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Simply describe your meeting needs in natural language.
              MeetingMuse understands your requirements and handles the
              scheduling automatically.
            </p>
            <button
              onClick={onGetStarted}
              className="px-8 py-4 blue-gradient text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            >
              Start Scheduling
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="glass-effect rounded-xl p-8 text-center fade-in">
              <div className="w-16 h-16 blue-gradient rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Natural Conversation
              </h3>
              <p className="text-gray-600">
                Just tell MeetingMuse what you need. No complex forms or rigid
                interfaces - chat naturally about your meeting requirements.
              </p>
            </div>

            <div className="glass-effect rounded-xl p-8 text-center fade-in">
              <div className="w-16 h-16 blue-gradient rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 7h10l-2-7m-6 0V3"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Google Calendar Integration
              </h3>
              <p className="text-gray-600">
                Seamlessly connects with your Google Calendar to find available
                times and automatically create meetings with all the details.
              </p>
            </div>

            <div className="glass-effect rounded-xl p-8 text-center fade-in">
              <div className="w-16 h-16 blue-gradient rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Smart Contact Management
              </h3>
              <p className="text-gray-600">
                Integrates with your Google Contacts to easily invite
                participants and manage meeting attendees with intelligent
                suggestions.
              </p>
            </div>
          </div>

          {/* How it Works */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-12">
              How MeetingMuse Works
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="slide-up">
                <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Describe Your Meeting
                </h4>
                <p className="text-gray-600">
                  Tell MeetingMuse about your meeting needs in plain English
                </p>
              </div>
              <div className="slide-up">
                <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">2</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  AI Understands & Plans
                </h4>
                <p className="text-gray-600">
                  Our AI analyzes your request and finds optimal meeting times
                </p>
              </div>
              <div className="slide-up">
                <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">3</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Meeting Scheduled
                </h4>
                <p className="text-gray-600">
                  Calendar events are created automatically with invites sent
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">MeetingMuse</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Your intelligent meeting scheduling assistant. Powered by AI to
                make scheduling effortless and efficient.
              </p>
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
                  <button
                    onClick={onPrivacyClick}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={onTermsClick}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MeetingMuse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
