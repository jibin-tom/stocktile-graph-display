
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'login' ? 'Log in to your account' : 'Create an account'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'login' 
              ? 'Enter your email below to log in to your account.' 
              : 'Enter your details below to create your account.'}
          </DialogDescription>
        </DialogHeader>
        
        <AuthForm 
          mode={mode}
          onSubmit={handleSubmit}
          isLoading={loading}
          submitting={submitting}
        />
        
        <SocialAuthButtons onGoogleSignup={handleGoogleSignup} />
        
        <DialogFooter className="justify-center mt-6">
          <div className="text-sm text-center">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <Button variant="link" className="p-0 h-auto" onClick={switchMode}>
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
