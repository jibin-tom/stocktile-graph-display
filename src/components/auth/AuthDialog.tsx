
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthProvider';
import AuthForm, { AuthMode } from './AuthForm';
import SocialAuthButtons from './SocialAuthButtons';
import { AuthFormValues } from './AuthFormSchema';

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: AuthMode;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ 
  isOpen, 
  onOpenChange,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const { toast } = useToast();
  const { signIn, signUp, loading, user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // Update mode when initialMode prop changes
  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    }
  }, [initialMode]);

  // Close dialog when user becomes available and redirect to welcome page
  useEffect(() => {
    if (user && isOpen) {
      console.log('User detected, closing dialog and redirecting');
      onOpenChange(false);
      navigate('/welcome');
    }
  }, [user, isOpen, onOpenChange, navigate]);

  const handleGoogleSignup = () => {
    toast({
      title: "Google Sign-Up",
      description: "Google authentication would be initiated here.",
    });
    // In a real implementation, this would redirect to Google OAuth
  };

  const handleSubmit = async (values: AuthFormValues) => {
    if (submitting) return;
    
    try {
      setSubmitting(true);
      console.log(`Attempting to ${mode === 'login' ? 'sign in' : 'sign up'} with email: ${values.email}`);
      
      if (mode === 'login') {
        console.log("Signing in with:", values.email);
        await signIn(values.email, values.password);
        
        toast({
          title: "Login Successful",
          description: "You have been logged in successfully!",
        });
        
        // Dialog will close and redirect automatically when the user state updates (via the useEffect above)
      } else {
        console.log("Signing up with:", values.email);
        await signUp(values.email, values.password, { 
          full_name: values.fullName || undefined 
        });
        
        toast({
          title: "Account Created",
          description: "Your account has been created successfully. Please check your email for verification (if enabled).",
          variant: "default",
        });
        
        // Switch to login mode after successful signup
        setMode('login');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication Error",
        description: error.message || "An error occurred during authentication.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-0 overflow-hidden animate-dialog-appear">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 opacity-90 -z-10" />
        <div className="absolute inset-0 overflow-hidden -z-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20"
              style={{
                width: `${Math.random() * 80 + 20}px`,
                height: `${Math.random() * 80 + 20}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(8px)',
                opacity: 0.3,
                transform: `scale(${Math.random() * 0.5 + 0.5})`,
                animation: `float-bubble ${10 + i * 2}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent pb-1">
            {mode === 'login' ? 'Welcome Back!' : 'Join Stockerr Today'}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {mode === 'login' 
              ? 'Enter your details below to access your account.' 
              : 'Create your account to start tracking your investments.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative">
          <AuthForm 
            mode={mode}
            onSubmit={handleSubmit}
            isLoading={loading}
            submitting={submitting}
          />
        </div>
        
        <SocialAuthButtons onGoogleSignup={handleGoogleSignup} />
        
        <DialogFooter className="justify-center mt-6">
          <div className="text-sm text-center">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <Button 
              variant="link" 
              className="p-0 h-auto bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium" 
              onClick={switchMode}
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>

      <style>
        {`
          @keyframes dialog-appear {
            0% { opacity: 0; transform: scale(0.95) translateY(10px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          
          .animate-dialog-appear {
            animation: dialog-appear 0.3s ease-out forwards;
            box-shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.3),
                        0 8px 15px -6px rgba(219, 39, 119, 0.2);
          }
          
          @keyframes float-bubble {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(-20px) scale(1.2); }
          }
        `}
      </style>
    </Dialog>
  );
};

export default AuthDialog;
