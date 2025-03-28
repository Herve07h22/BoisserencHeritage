import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import LanguageToggle from "@/components/ui/language-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, MapPin, Phone, Facebook, Instagram, Linkedin } from "lucide-react";

const Header = () => {
  const [location] = useLocation();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Handle scroll event to change header style when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.workshop"), path: "/about" },
    { name: t("nav.creations"), path: "/creations" },
    { name: t("nav.process"), path: "/process" },
    { name: t("nav.services"), path: "/services" },
    { name: t("nav.blog"), path: "/blog" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  // Is the current path active?
  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className={`w-full transition-all duration-300 bg-[#F8F5F1] ${isScrolled ? 'shadow-md' : ''}`}>
      {/* Top Bar */}
      <div className="bg-[#333333] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm hidden md:block">
            <span className="mr-6 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Saint-Étienne, France
            </span>
            <span className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              +33 4 77 XX XX XX
            </span>
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            <LanguageToggle />
            <div className="flex space-x-2">
              <a href="#" className="text-white hover:text-[#B87333] transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="text-white hover:text-[#B87333] transition">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="text-white hover:text-[#B87333] transition">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl md:text-3xl font-bold tracking-wide font-serif text-[#7D2027]">
            BOISSERENC
          </a>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8 font-sans font-light">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a
                className={`relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-[#B87333] after:transition-all after:duration-300 ${
                  isActive(item.path) ? 'after:w-full' : 'hover:after:w-full'
                }`}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="lg:hidden text-[#333333]">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#333333] bg-opacity-95 p-0">
            <div className="flex justify-end p-6">
              <button className="text-white" onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center h-[85%]">
              <div className="flex flex-col space-y-6 text-center">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <a
                      className="text-white text-xl font-light hover:text-[#B87333] transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Header;
