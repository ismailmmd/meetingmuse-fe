const BACKEND_URL = __VITE_API_URL__;

export interface AuthUrlResponse {
  authorization_url: string;
  state: string;
  client_id: string;
}

export interface StatusResponse {
  client_id: string;
  authenticated: boolean;
  session_id?: string;
  message: string;
}

export interface LogoutResponse {
  message: string;
}

export class AuthService {
  static async startOAuthFlow(clientId: string): Promise<AuthUrlResponse> {
    const response = await fetch(`${BACKEND_URL}/auth/login/${clientId}`);

    if (!response.ok) {
      throw new Error(`Failed to start OAuth flow: ${response.statusText}`);
    }

    return response.json();
  }

  static async getAuthStatus(clientId: string): Promise<StatusResponse> {
    const response = await fetch(`${BACKEND_URL}/auth/status/${clientId}`);

    if (!response.ok) {
      throw new Error(`Failed to get auth status: ${response.statusText}`);
    }

    return response.json();
  }

  static async logout(clientId: string): Promise<LogoutResponse> {
    const response = await fetch(`${BACKEND_URL}/auth/logout/${clientId}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Failed to logout: ${response.statusText}`);
    }

    return response.json();
  }
}
