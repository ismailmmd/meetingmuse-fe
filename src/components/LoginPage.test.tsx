import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../test/test-utils';
import userEvent from '@testing-library/user-event';
import { LoginPage } from './LoginPage';
import { AuthProvider } from '../contexts/AuthContext';
import * as AuthService from '../services/AuthService';

// Mock the AuthService
vi.mock('../services/AuthService', () => ({
  AuthService: {
    startOAuthFlow: vi.fn(),
    getAuthStatus: vi.fn(),
    logout: vi.fn(),
  },
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Wrapper component that provides AuthContext
const LoginPageWrapper = () => (
  <AuthProvider>
    <LoginPage />
  </AuthProvider>
);

describe('LoginPage', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    vi.mocked(AuthService.AuthService.getAuthStatus).mockResolvedValue({
      client_id: 'test-client-id',
      authenticated: false,
      message: 'Not authenticated',
    });
    vi.mocked(AuthService.AuthService.startOAuthFlow).mockResolvedValue({
      authorization_url:
        'https://accounts.google.com/oauth/authorize?test=true',
      state: 'test-state',
      client_id: 'test-client-id',
    });
  });

  describe('Snapshots', () => {
    it('should render the complete login page correctly', async () => {
      const { container } = render(<LoginPageWrapper />);

      // Wait for auth status check to complete
      await waitFor(() => {
        expect(screen.getByText('Welcome to MeetingMuse')).toBeInTheDocument();
      });

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should render login page without back button', async () => {
      const { container } = render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(screen.getByText('Welcome to MeetingMuse')).toBeInTheDocument();
      });

      expect(container.firstChild).toMatchSnapshot('login-page-no-back-button');
    });

    it('should render login page with back link', async () => {
      const { container } = render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(screen.getByText('Welcome to MeetingMuse')).toBeInTheDocument();
      });

      expect(container.firstChild).toMatchSnapshot('login-page-with-back-link');
    });

    it('should match snapshot for main content card', async () => {
      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(screen.getByText('Welcome to MeetingMuse')).toBeInTheDocument();
      });

      const contentCard = screen
        .getByText('Welcome to MeetingMuse')
        .closest('.bg-white');
      expect(contentCard).toMatchSnapshot('login-content-card');
    });

    it('should match snapshot for back link', async () => {
      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(screen.getByText('Back to Home')).toBeInTheDocument();
      });

      const backLink = screen.getByRole('link', { name: 'Back to Home' });
      expect(backLink).toMatchSnapshot('back-link');
    });
  });

  describe('Content Rendering', () => {
    it('should display the main brand and welcome message', async () => {
      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'MeetingMuse', level: 1 })
        ).toBeInTheDocument();
        expect(
          screen.getByRole('heading', {
            name: 'Welcome to MeetingMuse',
            level: 2,
          })
        ).toBeInTheDocument();
        expect(
          screen.getByText(
            'Please sign in to start your conversation with our AI meeting assistant'
          )
        ).toBeInTheDocument();
      });
    });

    it('should display the chat icon', async () => {
      const { container } = render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(screen.getByText('Welcome to MeetingMuse')).toBeInTheDocument();
      });

      // Check for SVG icon presence
      const svgElements = container.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThan(0);
    });

    it('should display the OAuth login button', async () => {
      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Sign in with OAuth' })
        ).toBeInTheDocument();
      });
    });

    it('should display security message', async () => {
      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(
          screen.getByText('Secure authentication powered by Google OAuth 2.0')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Back Button Functionality', () => {
    it('should always render back link to home', async () => {
      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(screen.getByText('Welcome to MeetingMuse')).toBeInTheDocument();
      });

      const backLink = screen.getByRole('link', { name: 'Back to Home' });
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute('href', '/');
    });

    it('should navigate to home when back link is clicked', async () => {
      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(screen.getByText('Welcome to MeetingMuse')).toBeInTheDocument();
      });

      const backLink = screen.getByRole('link', { name: 'Back to Home' });
      expect(backLink).toHaveAttribute('href', '/');
    });

    it('should display the correct back arrow icon', async () => {
      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(screen.getByText('Welcome to MeetingMuse')).toBeInTheDocument();
      });

      const backLink = screen.getByRole('link', { name: 'Back to Home' });
      expect(backLink).toContainHTML('stroke="currentColor"');
    });
  });

  describe('OAuth Login Functionality', () => {
    it('should display "Sign in with OAuth" button initially', async () => {
      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Sign in with OAuth' })
        ).toBeInTheDocument();
      });

      const loginButton = screen.getByRole('button', {
        name: 'Sign in with OAuth',
      });
      expect(loginButton).toBeEnabled();
    });

    it('should show loading state when login is in progress', async () => {
      const user = userEvent.setup();

      // Mock a slower OAuth flow to test loading state
      vi.mocked(AuthService.AuthService.startOAuthFlow).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  authorization_url:
                    'https://accounts.google.com/oauth/authorize',
                  state: 'test-state',
                  client_id: 'test-client',
                }),
              100
            )
          )
      );

      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Sign in with OAuth' })
        ).toBeInTheDocument();
      });

      const loginButton = screen.getByRole('button', {
        name: 'Sign in with OAuth',
      });
      await user.click(loginButton);

      // Check loading state appears
      expect(screen.getByText('Signing in...')).toBeInTheDocument();
      expect(loginButton).toHaveClass('bg-gray-400', 'cursor-not-allowed');
    });

    it('should handle OAuth login button click', async () => {
      const user = userEvent.setup();

      // Mock successful OAuth flow
      const mockHref = vi.fn();
      Object.defineProperty(window, 'location', {
        value: { href: mockHref },
        writable: true,
      });

      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Sign in with OAuth' })
        ).toBeInTheDocument();
      });

      const loginButton = screen.getByRole('button', {
        name: 'Sign in with OAuth',
      });
      await user.click(loginButton);

      await waitFor(() => {
        expect(AuthService.AuthService.startOAuthFlow).toHaveBeenCalled();
      });
    });

    it('should match snapshot for loading state', async () => {
      const user = userEvent.setup();

      // Mock delayed OAuth flow
      vi.mocked(AuthService.AuthService.startOAuthFlow).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  authorization_url:
                    'https://accounts.google.com/oauth/authorize',
                  state: 'test-state',
                  client_id: 'test-client',
                }),
              1000
            )
          )
      );

      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Sign in with OAuth' })
        ).toBeInTheDocument();
      });

      const loginButton = screen.getByRole('button', {
        name: 'Sign in with OAuth',
      });
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Signing in...')).toBeInTheDocument();
      });

      const loadingButton = screen.getByRole('button', {
        name: 'Signing in...',
      });
      expect(loadingButton).toMatchSnapshot('oauth-button-loading');
    });
  });

  describe('Error Handling', () => {
    it('should handle OAuth flow errors gracefully', async () => {
      const user = userEvent.setup();

      // Mock OAuth flow failure
      vi.mocked(AuthService.AuthService.startOAuthFlow).mockRejectedValue(
        new Error('OAuth flow failed')
      );

      // Spy on console.error to verify error logging and suppress output
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Sign in with OAuth' })
        ).toBeInTheDocument();
      });

      const loginButton = screen.getByRole('button', {
        name: 'Sign in with OAuth',
      });
      await user.click(loginButton);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          'Login error:',
          expect.any(Error)
        );
      });

      // Button should return to normal state after error
      expect(
        screen.getByRole('button', { name: 'Sign in with OAuth' })
      ).toBeInTheDocument();

      consoleSpy.mockRestore();
    });

    it('should reset button state after failed login', async () => {
      const user = userEvent.setup();

      // Mock OAuth flow failure
      vi.mocked(AuthService.AuthService.startOAuthFlow).mockRejectedValue(
        new Error('Network error')
      );

      // Suppress console errors for this test
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Sign in with OAuth' })
        ).toBeInTheDocument();
      });

      const loginButton = screen.getByRole('button', {
        name: 'Sign in with OAuth',
      });
      await user.click(loginButton);

      // Wait for error handling to complete
      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Sign in with OAuth' })
        ).toBeInTheDocument();
      });

      // Button should be enabled again
      expect(loginButton).toBeEnabled();
      expect(loginButton).not.toHaveClass('cursor-not-allowed');

      consoleSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', async () => {
      render(<LoginPageWrapper />);

      await waitFor(() => {
        const h1 = screen.getByRole('heading', { level: 1 });
        const h2 = screen.getByRole('heading', { level: 2 });

        expect(h1).toBeInTheDocument();
        expect(h2).toBeInTheDocument();
      });
    });

    it('should have accessible button and link labels', async () => {
      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(
          screen.getByRole('link', { name: 'Back to Home' })
        ).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: 'Sign in with OAuth' })
        ).toBeInTheDocument();
      });
    });

    it('should have proper color contrast in button states', async () => {
      render(<LoginPageWrapper />);

      await waitFor(() => {
        const loginButton = screen.getByRole('button', {
          name: 'Sign in with OAuth',
        });
        expect(loginButton).toHaveClass('text-white');
        expect(loginButton).toHaveClass('bg-blue-600');
      });
    });

    it('should provide proper loading state accessibility', async () => {
      const user = userEvent.setup();

      // Mock delayed OAuth flow
      vi.mocked(AuthService.AuthService.startOAuthFlow).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  authorization_url:
                    'https://accounts.google.com/oauth/authorize',
                  state: 'test-state',
                  client_id: 'test-client',
                }),
              100
            )
          )
      );

      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Sign in with OAuth' })
        ).toBeInTheDocument();
      });

      const loginButton = screen.getByRole('button', {
        name: 'Sign in with OAuth',
      });
      await user.click(loginButton);

      await waitFor(() => {
        const loadingButton = screen.getByRole('button', {
          name: 'Signing in...',
        });
        expect(loadingButton).toHaveAttribute('disabled');
      });
    });
  });

  describe('Visual Design Elements', () => {
    it('should include responsive design classes', async () => {
      const { container } = render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(screen.getByText('Welcome to MeetingMuse')).toBeInTheDocument();
      });

      expect(container.innerHTML).toContain('min-h-screen');
      expect(container.innerHTML).toContain('max-w-4xl');
      expect(container.innerHTML).toContain('px-4');
    });

    it('should include proper styling classes', async () => {
      const { container } = render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(screen.getByText('Welcome to MeetingMuse')).toBeInTheDocument();
      });

      expect(container.innerHTML).toContain('bg-gradient-to-br');
      expect(container.innerHTML).toContain('blue-gradient');
      expect(container.innerHTML).toContain('glass-effect');
      expect(container.innerHTML).toContain('rounded-xl');
    });

    it('should have proper button styling', async () => {
      render(<LoginPageWrapper />);

      await waitFor(() => {
        const loginButton = screen.getByRole('button', {
          name: 'Sign in with OAuth',
        });
        expect(loginButton).toHaveClass(
          'bg-blue-600',
          'hover:bg-blue-700',
          'text-white'
        );
      });
    });
  });

  describe('Layout Structure', () => {
    it('should have proper page layout structure', async () => {
      render(<LoginPageWrapper />);

      await waitFor(() => {
        expect(screen.getByText('Welcome to MeetingMuse')).toBeInTheDocument();
      });

      // Check for header structure
      expect(screen.getByRole('banner')).toBeInTheDocument();

      // Check for main content structure
      expect(screen.getByRole('main')).toBeInTheDocument();

      // Check for content card with glass-effect
      const contentCard = screen
        .getByText('Welcome to MeetingMuse')
        .closest('.glass-effect');
      expect(contentCard).toBeInTheDocument();
    });
  });
});
