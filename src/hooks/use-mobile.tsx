
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Function to check if the device is mobile
    const checkMobile = () => {
      // Use user agent as additional check for mobile devices
      const userAgent = 
        typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobileRegex = 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(userAgent);
      
      // Check screen width
      const isSmallScreen = window.innerWidth < MOBILE_BREAKPOINT;
      
      // Set as mobile if either condition is true
      setIsMobile(isSmallScreen || isMobileDevice);
    }
    
    // Initial check
    checkMobile();
    
    // Set up event listener for window resize
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => checkMobile();
    mql.addEventListener("change", onChange)
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
