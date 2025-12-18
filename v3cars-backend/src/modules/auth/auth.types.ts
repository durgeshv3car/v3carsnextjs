// src/modules/auth/auth.types.ts
export interface RegisterRequest {
  username: string;
  displayName: string;
  mobilenumber: string;
  emailAddress: string;
  // Add other fields as needed
}

export interface LoginRequest {
  emailAddress: string;
}

export interface VerifyLoginRequest {
  emailAddress: string;
  otpvalue: string;
}

export interface UserResponse {
  userId: number;
  username: string | null;
  displayName: string | null;
  mobilenumber: string | null;
  emailAddress: string | null;
  status: number;
  // Add other fields
}







