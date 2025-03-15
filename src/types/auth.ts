
// Redux slice
interface SignupState {
    signupLoading: boolean;
    signupSuccess: boolean;
    signupError: string | null;
    signinLoading: boolean;
    signinSuccess: boolean;
    signinError: string | null;
    isAuthenticated: boolean;
    otpLoading: boolean;
    otpSuccess: boolean;
    otpError: string | null;
  }
  export type SignUpFormData = {
    fullName: string;
    email: string;
    password: string;
  };
  export type SignUpSubmitFormData = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    saveDetails?:boolean;
  };

  export type LoginFormData= {
    fullName: string;
    email: string;
    password: string;
    rememberMe?: boolean;
  };
  

export type { SignupState }