
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const NavigationGuard: React.FC = () => {
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Only add the listener if user is logged in and on a protected page
    if (!user) return;
    
    const handleBackButton = (event: PopStateEvent) => {
      // Prevent the default navigation behavior
      event.preventDefault();
      
      // Show confirmation dialog
      setIsConfirmOpen(true);
      
      // Push the current location back to the history to prevent navigation
      window.history.pushState(null, '', location.pathname);
    };
    
    // Push an entry to the history stack so we can detect back button clicks
    window.history.pushState(null, '', location.pathname);
    
    // Listen for popstate events (back button clicks)
    window.addEventListener('popstate', handleBackButton);
    
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [user, navigate, location]);
  
  const handleSignOut = async () => {
    setIsConfirmOpen(false);
    try {
      await signOut();
      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const handleCancel = () => {
    setIsConfirmOpen(false);
  };
  
  return (
    <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            You pressed the back button. If you want to sign out, click "Yes".
            Otherwise, click "No" to stay on this page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>No</AlertDialogCancel>
          <AlertDialogAction onClick={handleSignOut}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NavigationGuard;
