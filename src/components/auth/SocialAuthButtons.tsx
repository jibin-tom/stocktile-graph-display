
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

interface SocialAuthButtonsProps {
  onGoogleSignup: () => void;
}

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ onGoogleSignup }) => {
  return (
    <>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      
      <Button variant="outline" onClick={onGoogleSignup} className="w-full">
        <Mail className="mr-2 h-4 w-4" />
        Google
      </Button>
    </>
  );
};

export default SocialAuthButtons;
