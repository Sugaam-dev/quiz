

/**export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide header when scrolling down (after 10px threshold)
      else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`w-full bg-white border-b border-slate-200 sticky top-0 z-40 transition-transform duration-300 ease-in-out shadow-sm ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center">
          <img
            src="/logo.jpeg"
            alt="Logo"
            className="h-20 w-auto object-contain transition-transform hover:scale-125 duration-200"
            style={{ imageRendering: "crisp-edges" }}
          />
        </div>
      </div>
    </header>
  );
}*/
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full  sticky top-0 z-40  transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md border-slate-200"
          : "border-transparent shadow-none"
      }`}
      style={{
        background: scrolled ? "rgba(255, 255, 255, 0.1)" : "#ffffff",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-14 w-auto object-contain"
            style={{ imageRendering: "crisp-edges",
              mixBlendMode: "multiply", 
             }}
          />
        </div>
      </div>
    </header>
  );
}
 