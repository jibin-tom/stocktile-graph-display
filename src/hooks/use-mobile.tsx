
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Function to check if the device is mobile
    const checkMobile = () => {
      // Use user agent as primary check for mobile devices - this is more reliable
      // even when "Request Desktop Site" is enabled
      const userAgent = 
        typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobileRegex = 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(userAgent);
      
      // Check screen width as a secondary factor
      const isSmallScreen = window.innerWidth < MOBILE_BREAKPOINT;
      
      // For mobile devices, ALWAYS return true even if they request desktop site
      // For desktop devices with small screens, check screen width
      setIsMobile(isMobileDevice || isSmallScreen);
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
