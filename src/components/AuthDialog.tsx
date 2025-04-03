
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, User, UserPlus, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthProvider';

type AuthMode = 'login' | 'register';

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: AuthMode;
}

// Form schema for validation
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().optional(),
  fullName: z.string().optional(),
}).refine((data) => {
  if (data.confirmPassword !== undefined) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const AuthDialog: React.FC<AuthDialogProps> = ({ 
  isOpen, 
  onOpenChange,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const { toast } = useToast();
  const { signIn, signUp, loading, user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    },
  });

  // Update mode when initialMode prop changes
  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    }
  }, [initialMode]);

  // Reset form when dialog opens or mode changes
  useEffect(() => {
    if (isOpen) {
      form.reset({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
      });
      setSubmitting(false);
    }
  }, [isOpen, mode, form]);

  // Close dialog when user becomes available
  useEffect(() => {
    if (user && isOpen) {
      console.log('User detected, closing dialog');
      onOpenChange(false);
    }
  }, [user, isOpen, onOpenChange]);

  const handleGoogleSignup = () => {
    toast({
      title: "Google Sign-Up",
      description: "Google authentication would be initiated here.",
    });
    // In a real implementation, this would redirect to Google OAuth
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (submitting) return;
    
    try {
      setSubmitting(true);
      console.log(`Attempting to ${mode === 'login' ? 'sign in' : 'sign up'} with email: ${values.email}`);
      
      if (mode === 'login') {
        console.log("Signing in with:", values.email);
        const result = await signIn(values.email, values.password);
        console.log('Sign in result:', result);
        
        if (result.error) {
          throw new Error(result.error.message);
        }
        
        toast({
          title: "Login Successful",
          description: "You have been logged in successfully!",
        });
        
        // Explicitly close the dialog after successful login
        onOpenChange(false);
      } else {
        console.log("Signing up with:", values.email);
        const result = await signUp(values.email, values.password, { 
          full_name: values.fullName || undefined 
        });
        
        console.log('Sign up result:', result);
        
        if (result.error) {
          throw new Error(result.error.message);
        }
        
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
    form.reset();
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
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {mode === 'register' && (
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {mode === 'register' && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full" disabled={loading || submitting}>
              {mode === 'login' ? (
                <>
                  <User className="mr-2 h-4 w-4" />
                  {submitting ? 'Logging in...' : 'Log in'}
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  {submitting ? 'Signing up...' : 'Sign up'}
                </>
              )}
            </Button>
          </form>
        </Form>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        
        <Button variant="outline" onClick={handleGoogleSignup} className="w-full">
          <Mail className="mr-2 h-4 w-4" />
          Google
        </Button>
        
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
