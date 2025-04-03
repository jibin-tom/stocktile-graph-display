
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, UserPlus } from 'lucide-react';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { authFormSchema, AuthFormValues } from './AuthFormSchema';

export type AuthMode = 'login' | 'register';

interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (values: AuthFormValues) => Promise<void>;
  isLoading: boolean;
  submitting: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  mode, 
  onSubmit, 
  isLoading, 
  submitting 
}) => {
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    },
  });

  const handleSubmit = async (values: AuthFormValues) => {
    if (submitting) return;
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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

        <Button type="submit" className="w-full" disabled={isLoading || submitting}>
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
  );
};

export default AuthForm;
