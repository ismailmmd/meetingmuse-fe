import React from 'react';
import { Footer } from './ui/Footer';
import { LinkButton } from './ui/Button';
import { APP_NAME, ROUTES } from '../constants/app';
import { Icons } from '../constants/icons';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="blue-gradient shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Icons.ChatDetailed className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  {APP_NAME}
                </h1>
                <p className="text-blue-100 text-sm font-medium">
                  Your AI Meeting Assistant
                </p>
              </div>
            </div>
            <LinkButton to={ROUTES.LOGIN} variant="secondary" size="md">
              Get Started
            </LinkButton>
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
              {APP_NAME} understands your requirements and handles the
              scheduling automatically.
            </p>
            <LinkButton to={ROUTES.LOGIN} variant="primary" size="lg">
              Start Scheduling
            </LinkButton>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="glass-effect rounded-xl p-8 text-center fade-in">
              <div className="w-16 h-16 blue-gradient rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Icons.Conversation className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Natural Conversation
              </h3>
              <p className="text-gray-600">
                Just tell {APP_NAME} what you need. No complex forms or rigid
                interfaces - chat naturally about your meeting requirements.
              </p>
            </div>

            <div className="glass-effect rounded-xl p-8 text-center fade-in">
              <div className="w-16 h-16 blue-gradient rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Icons.Calendar className="w-8 h-8 text-white" />
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
                <Icons.People className="w-8 h-8 text-white" />
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
              How {APP_NAME} Works
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
                  Tell {APP_NAME} about your meeting needs in plain English
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

      <Footer />
    </div>
  );
};
