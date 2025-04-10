
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { supabase } from './integrations/supabase/client'
import MobileDetection from './components/MobileDetection.tsx'
import { useIsMobile } from './hooks/use-mobile.tsx'

// Clear any existing session on app startup
const clearExistingSession = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error clearing session:', error);
  }
};

// Render app with mobile detection
const AppWithMobileDetection = () => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return <MobileDetection />;
  }
  
  return <App />;
};

// Ensure the DOM is fully loaded before rendering
const renderApp = async () => {
  // Clear any existing session before rendering the app
  await clearExistingSession();
  
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<AppWithMobileDetection />);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
