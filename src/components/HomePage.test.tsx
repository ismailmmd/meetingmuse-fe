import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HomePage } from './HomePage';

// Mock the callback functions
const mockOnGetStarted = vi.fn();
const mockOnPrivacyClick = vi.fn();

describe('HomePage', () => {
  beforeEach(() => {
    mockOnGetStarted.mockClear();
    mockOnPrivacyClick.mockClear();
  });

  describe('Snapshots', () => {
    it('should render the complete homepage correctly', () => {
      const { container } = render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot for header section', () => {
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );
      const header = screen.getByRole('banner');
      expect(header).toMatchSnapshot();
    });

    it('should match snapshot for main content section', () => {
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );
      const main = screen.getByRole('main');
      expect(main).toMatchSnapshot();
    });

    it('should match snapshot for footer section', () => {
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );
      const footer = screen.getByRole('contentinfo');
      expect(footer).toMatchSnapshot();
    });
  });

  describe('Header Content', () => {
    it('should display the MeetingMuse brand correctly', () => {
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );

      // Check main heading
      expect(
        screen.getByRole('heading', { name: 'MeetingMuse', level: 1 })
      ).toBeInTheDocument();
      expect(screen.getByText('Your AI Meeting Assistant')).toBeInTheDocument();

      // Check CTA button
      expect(
        screen.getByRole('button', { name: 'Get Started' })
      ).toBeInTheDocument();
    });

    it('should render the logo icon', () => {
      const { container } = render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );
      const svgElements = container.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThan(0);
    });
  });

  describe('Hero Section Content', () => {
    it('should display the main value proposition', () => {
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );

      expect(
        screen.getByRole('heading', {
          name: /Schedule meetings with.*AI intelligence/i,
        })
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          /Simply describe your meeting needs in natural language/i
        )
      ).toBeInTheDocument();

      expect(
        screen.getByRole('button', { name: 'Start Scheduling' })
      ).toBeInTheDocument();
    });
  });

  describe('Features Section', () => {
    it('should display all three feature cards', () => {
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );

      // Feature card titles
      expect(
        screen.getByRole('heading', { name: 'Natural Conversation', level: 3 })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          name: 'Google Calendar Integration',
          level: 3,
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          name: 'Smart Contact Management',
          level: 3,
        })
      ).toBeInTheDocument();

      // Feature descriptions
      expect(
        screen.getByText(/Just tell MeetingMuse what you need/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Seamlessly connects with your Google Calendar/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Integrates with your Google Contacts/i)
      ).toBeInTheDocument();
    });

    it('should match snapshot for individual feature cards', () => {
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );

      const naturalConvCard = screen
        .getByRole('heading', { name: 'Natural Conversation' })
        .closest('.glass-effect');
      const calendarCard = screen
        .getByRole('heading', { name: 'Google Calendar Integration' })
        .closest('.glass-effect');
      const contactCard = screen
        .getByRole('heading', { name: 'Smart Contact Management' })
        .closest('.glass-effect');

      expect(naturalConvCard).toMatchSnapshot('natural-conversation-card');
      expect(calendarCard).toMatchSnapshot('calendar-integration-card');
      expect(contactCard).toMatchSnapshot('contact-management-card');
    });
  });

  describe('How It Works Section', () => {
    it('should display the three-step process', () => {
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );

      expect(
        screen.getByRole('heading', { name: 'How MeetingMuse Works', level: 3 })
      ).toBeInTheDocument();

      // Step titles
      expect(
        screen.getByRole('heading', { name: 'Describe Your Meeting', level: 4 })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          name: 'AI Understands & Plans',
          level: 4,
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Meeting Scheduled', level: 4 })
      ).toBeInTheDocument();

      // Step numbers
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();

      // Step descriptions
      expect(
        screen.getByText(/Tell MeetingMuse about your meeting needs/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Our AI analyzes your request/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Calendar events are created automatically/i)
      ).toBeInTheDocument();
    });

    it('should match snapshot for how it works section', () => {
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );
      const howItWorksSection = screen
        .getByRole('heading', { name: 'How MeetingMuse Works' })
        .closest('div');
      expect(howItWorksSection).toMatchSnapshot('how-it-works-section');
    });
  });

  describe('Footer Content', () => {
    it('should display footer information correctly', () => {
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );

      // Company description
      expect(
        screen.getByText(/Your intelligent meeting scheduling assistant/i)
      ).toBeInTheDocument();

      // Feature links
      expect(screen.getByText('Calendar Integration')).toBeInTheDocument();

      // Support links
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
      expect(screen.getByText('Terms of Service')).toBeInTheDocument();
      expect(screen.getByText('Contact Us')).toBeInTheDocument();

      // Copyright
      expect(
        screen.getByText(/© 2024 MeetingMuse. All rights reserved./)
      ).toBeInTheDocument();
    });

    it('should display the footer brand correctly', () => {
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );

      const footerHeadings = screen.getAllByRole('heading', {
        name: 'MeetingMuse',
      });
      expect(footerHeadings.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('User Interactions', () => {
    it('should call onGetStarted when header "Get Started" button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );

      const buttons = screen.getAllByRole('button', { name: 'Get Started' });
      await user.click(buttons[0]); // Header button

      expect(mockOnGetStarted).toHaveBeenCalledTimes(1);
    });

    it('should call onGetStarted when hero "Start Scheduling" button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );

      const startButton = screen.getByRole('button', {
        name: 'Start Scheduling',
      });
      await user.click(startButton);

      expect(mockOnGetStarted).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple button clicks correctly', async () => {
      const user = userEvent.setup();
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );

      const getStartedButton = screen.getAllByRole('button', {
        name: 'Get Started',
      })[0];
      const startButton = screen.getByRole('button', {
        name: 'Start Scheduling',
      });

      await user.click(getStartedButton);
      await user.click(startButton);

      expect(mockOnGetStarted).toHaveBeenCalledTimes(2);
    });

    it('should call onPrivacyClick when Privacy Policy link is clicked', async () => {
      const user = userEvent.setup();
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );

      const privacyButton = screen.getByRole('button', {
        name: 'Privacy Policy',
      });
      await user.click(privacyButton);

      expect(mockOnPrivacyClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );

      // Should have h1, h2, h3, h4 in proper order
      const h1 = screen.getAllByRole('heading', { level: 1 });
      const h2 = screen.getAllByRole('heading', { level: 2 });
      const h3 = screen.getAllByRole('heading', { level: 3 });
      const h4 = screen.getAllByRole('heading', { level: 4 });

      expect(h1.length).toBeGreaterThan(0);
      expect(h2.length).toBeGreaterThan(0);
      expect(h3.length).toBeGreaterThan(0);
      expect(h4.length).toBeGreaterThan(0);
    });

    it('should have clickable buttons with proper accessibility', () => {
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toBeEnabled();
        expect(button).toHaveTextContent(/.+/); // Should have text content
      });
    });

    it('should have proper semantic structure', () => {
      render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );

      expect(screen.getByRole('banner')).toBeInTheDocument(); // header
      expect(screen.getByRole('main')).toBeInTheDocument(); // main content
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
    });
  });

  describe('Responsive Design Elements', () => {
    it('should include responsive CSS classes', () => {
      const { container } = render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );

      // Check for responsive classes (these would be in the snapshot)
      expect(container.innerHTML).toContain('md:grid-cols-3');
      expect(container.innerHTML).toContain('sm:px-6');
      expect(container.innerHTML).toContain('lg:px-8');
    });
  });

  describe('Visual Design Elements', () => {
    it('should include design system classes', () => {
      const { container } = render(
        <HomePage
          onGetStarted={mockOnGetStarted}
          onPrivacyClick={mockOnPrivacyClick}
        />
      );

      // Check for design system classes
      expect(container.innerHTML).toContain('blue-gradient');
      expect(container.innerHTML).toContain('glass-effect');
      expect(container.innerHTML).toContain('fade-in');
      expect(container.innerHTML).toContain('slide-up');
    });
  });
});
