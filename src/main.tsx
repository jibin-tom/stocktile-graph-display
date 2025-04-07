
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { supabase } from './integrations/supabase/client'

// Clear any existing session on app startup
const clearExistingSession = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error clearing session:', error);
  }
};

// Ensure the DOM is fully loaded before rendering
const renderApp = async () => {
  // Clear any existing session before rendering the app
  await clearExistingSession();
  
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
