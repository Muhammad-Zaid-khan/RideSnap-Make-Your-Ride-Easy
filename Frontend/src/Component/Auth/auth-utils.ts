/* eslint-disable @typescript-eslint/no-explicit-any */
// ============================================================================
// AUTHENTICATION UTILITIES - React Compatible Version
// ============================================================================

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * User interface defining the structure of authenticated user data
 */
export interface User {
  token: string;
  userId: string;
  userRole: string;
  email?: string;
  name?: string;
  permissions?: string[];
  lastLogin?: Date;
}

/**
 * Login credentials interface for authentication requests
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Authentication response interface from API
 */
export interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
  refreshToken?: string;
}

/**
 * Token validation result interface
 */
export interface TokenValidation {
  isValid: boolean;
  isExpired: boolean;
  payload?: any;
}

// ============================================================================
// CONSTANTS AND CONFIGURATION
// ============================================================================

/**
 * Storage keys for different authentication data
 */
const STORAGE_KEYS = {
  USER_DATA: 'auth_user_data',
  ACCESS_TOKEN: 'auth_access_token',
  REFRESH_TOKEN: 'auth_refresh_token',
  REMEMBER_ME: 'auth_remember_me',
  LAST_ACTIVITY: 'auth_last_activity'
} as const;

/**
 * Authentication configuration settings
 */
const AUTH_CONFIG = {
  TOKEN_EXPIRY_BUFFER: 5 * 60 * 1000, // 5 minutes in milliseconds
  SESSION_TIMEOUT: 30 * 60 * 1000,    // 30 minutes in milliseconds
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000    // 15 minutes in milliseconds
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Safely parses JSON string and returns parsed object or null on failure
 */
const safeJsonParse = <T>(jsonString: string | null): T | null => {
  if (!jsonString) return null;
  
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.warn('Failed to parse JSON:', error);
    return null;
  }
};

/**
 * Safely stringifies object to JSON string
 */
const safeJsonStringify = (obj: any): string | null => {
  try {
    return JSON.stringify(obj);
  } catch (error) {
    console.warn('Failed to stringify JSON:', error);
    return null;
  }
};

/**
 * Decodes JWT token payload without verification (client-side only)
 */
const decodeJwtPayload = (token: string): any | null => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.warn('Failed to decode JWT token:', error);
    return null;
  }
};

// ============================================================================
// STORAGE MANAGEMENT FUNCTIONS
// ============================================================================

/**
 * Stores user authentication data in appropriate storage
 */
const storeUserData = (user: User, rememberMe: boolean = false): void => {
  const storage = rememberMe ? localStorage : sessionStorage;
  const userData = safeJsonStringify(user);
  
  if (userData) {
    storage.setItem(STORAGE_KEYS.USER_DATA, userData);
    storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, user.token);
    localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, rememberMe.toString());
    updateLastActivity();
  }
};

/**
 * Retrieves stored user authentication data from storage
 */
const getStoredUserData = (): User | null => {
  const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
  const storage = rememberMe ? localStorage : sessionStorage;
  
  const userData = storage.getItem(STORAGE_KEYS.USER_DATA);
  return safeJsonParse<User>(userData);
};

/**
 * Retrieves stored access token from storage
 */
const getStoredToken = (): string | null => {
  const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
  const storage = rememberMe ? localStorage : sessionStorage;
  
  return storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

/**
 * Retrieves stored refresh token from storage
 */
const getStoredRefreshToken = (): string | null => {
  const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
  const storage = rememberMe ? localStorage : sessionStorage;
  
  return storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

/**
 * Stores refresh token in appropriate storage
 */
const storeRefreshToken = (refreshToken: string): void => {
  const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
  const storage = rememberMe ? localStorage : sessionStorage;
  
  storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

/**
 * Updates the last activity timestamp for session management
 */
const updateLastActivity = (): void => {
  const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
  const storage = rememberMe ? localStorage : sessionStorage;
  
  storage.setItem(STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());
};

/**
 * Clears all authentication data from both storage types
 */
const clearAuthStorage = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
};

// ============================================================================
// TOKEN VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validates JWT token and checks if it's expired
 */
const validateToken = (token: string): TokenValidation => {
  if (!token) {
    return { isValid: false, isExpired: true };
  }

  const payload = decodeJwtPayload(token);
  if (!payload) {
    return { isValid: false, isExpired: true };
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const isExpired = payload.exp ? payload.exp < currentTime : false;
  const isValid = !isExpired && (payload.userId || payload.id);

  return {
    isValid,
    isExpired,
    payload
  };
};

/**
 * Checks if the current session has timed out based on last activity
 */
const isSessionTimedOut = (): boolean => {
  const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
  const storage = rememberMe ? localStorage : sessionStorage;
  
  const lastActivity = storage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
  if (!lastActivity) return true;

  const lastActivityTime = parseInt(lastActivity, 10);
  const currentTime = Date.now();
  const timeDifference = currentTime - lastActivityTime;

  return timeDifference > AUTH_CONFIG.SESSION_TIMEOUT;
};

// ============================================================================
// CORE AUTHENTICATION FUNCTIONS
// ============================================================================

/**
 * Authenticates user with email and password credentials
 */
const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    // Make API call to your backend
    const response = await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || 'Login failed'
      };
    }

    const data = await response.json();
    
    if (data.token) {
      // Decode the token to get user info
      const decodedToken = decodeJwtPayload(data.token);
      
      if (decodedToken) {
        const user: User = {
          token: data.token,
          userId: decodedToken.id || decodedToken.userId,
          userRole: decodedToken.role || decodedToken.userRole,
          email: decodedToken.email || credentials.email,
          name: decodedToken.name,
          permissions: decodedToken.permissions,
          lastLogin: new Date()
        };

        // Store user data
        storeUserData(user, credentials.rememberMe || false);
        
        if (data.refreshToken) {
          storeRefreshToken(data.refreshToken);
        }

        return {
          success: true,
          user,
          message: 'Login successful'
        };
      }
    }

    return {
      success: false,
      message: 'Invalid response from server'
    };

  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.'
    };
  }
};

/**
 * Logs out the current user and clears all authentication data
 */
const logoutUser = async (): Promise<boolean> => {
  try {
    const token = getStoredToken();
    
    // Notify server about logout (optional)
    if (token) {
      try {
        await fetch('http://localhost:8080/users/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.warn('Server logout notification failed:', error);
      }
    }

    // Clear all authentication data
    clearAuthStorage();
    
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    // Even if server notification fails, clear local data
    clearAuthStorage();
    return false;
  }
};

/**
 * Refreshes the access token using the stored refresh token
 */
const refreshAuthToken = async (): Promise<User | null> => {
  try {
    const refreshToken = getStoredRefreshToken();
    
    if (!refreshToken) {
      console.warn('No refresh token available');
      return null;
    }

    const response = await fetch('http://localhost:8080/users/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      console.warn('Token refresh failed');
      clearAuthStorage();
      return null;
    }

    const data = await response.json();
    
    if (data.token) {
      const decodedToken = decodeJwtPayload(data.token);
      
      if (decodedToken) {
        const user: User = {
          token: data.token,
          userId: decodedToken.id || decodedToken.userId,
          userRole: decodedToken.role || decodedToken.userRole,
          email: decodedToken.email,
          name: decodedToken.name,
          permissions: decodedToken.permissions,
          lastLogin: new Date()
        };

        const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
        storeUserData(user, rememberMe);
        
        if (data.refreshToken) {
          storeRefreshToken(data.refreshToken);
        }

        return user;
      }
    }

    return null;
  } catch (error) {
    console.error('Token refresh error:', error);
    clearAuthStorage();
    return null;
  }
};

/**
 * Checks if the current user is authenticated and session is valid
 */
const isAuthenticated = (): boolean => {
  const user = getStoredUserData();
  const token = getStoredToken();
  
  if (!user || !token) {
    return false;
  }

  // Check if session has timed out
  if (isSessionTimedOut()) {
    clearAuthStorage();
    return false;
  }

  // Validate token
  const tokenValidation = validateToken(token);
  if (!tokenValidation.isValid) {
    clearAuthStorage();
    return false;
  }

  // Update last activity on successful validation
  updateLastActivity();
  return true;
};

/**
 * Gets the current authenticated user data
 */
const getCurrentUser = (): User | null => {
  if (!isAuthenticated()) {
    return null;
  }
  
  return getStoredUserData();
};

/**
 * Checks if the current user has a specific role
 */
const hasRole = (requiredRole: string): boolean => {
  const user = getCurrentUser();
  return user ? user.userRole === requiredRole : false;
};

/**
 * Checks if the current user has a specific permission
 */
const hasPermission = (permission: string): boolean => {
  const user = getCurrentUser();
  return user?.permissions ? user.permissions.includes(permission) : false;
};

/**
 * Checks if the current user has any of the specified roles
 */
const hasAnyRole = (roles: string[]): boolean => {
  const user = getCurrentUser();
  return user ? roles.includes(user.userRole) : false;
};

// ============================================================================
// EXPORTED AUTHENTICATION API
// ============================================================================

/**
 * Main authentication API object containing all authentication functions
 */
export const AuthAPI = {
  // Core authentication functions
  login: loginUser,
  logout: logoutUser,
  refreshToken: refreshAuthToken,
  
  // User state functions
  isAuthenticated,
  getCurrentUser,
  
  // Authorization functions
  hasRole,
  hasPermission,
  hasAnyRole,
  
  // Token validation functions
  validateToken,
  isSessionTimedOut,
  
  // Storage management functions
  clearAuthStorage,
  updateLastActivity,
  
  // Utility functions
  getStoredToken,
  getStoredRefreshToken
} as const;