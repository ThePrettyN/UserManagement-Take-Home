export interface User {
  id: string;
  name: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  timezone: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name: string;
  zipCode: string;
}

export interface UpdateUserRequest {
  name?: string;
  zipCode?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  error?: string;
} 