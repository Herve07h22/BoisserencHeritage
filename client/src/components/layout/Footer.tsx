import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

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

  // Services links
  const serviceLinks = [
    { name: t("services.restoration.title"), path: "/services#restoration" },
    { name: t("services.custom.title"), path: "/services#custom" },
    { name: t("services.expertise.title"), path: "/services#expertise" },
    { name: t("services.expertise.features.authentication"), path: "/services#expertise" },
    { name: t("services.expertise.features.maintenance"), path: "/services#expertise" },
  ];

  return (
    <footer className="bg-[#333333] text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/">
              <a className="text-2xl font-bold tracking-wide font-serif text-white mb-6 inline-block">
                BOISSERENC
              </a>
            </Link>
            <p className="text-[#E5E5E5] mb-6">
              Atelier spécialisé dans la restauration et fabrication sur-mesure de fourneaux stéphanois anciens. Un savoir-faire d'exception depuis 1987.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#E5E5E5] hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#E5E5E5] hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#E5E5E5] hover:text-white transition">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-6">{t("nav.home")}</h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link href={item.path}>
                    <a className="text-[#E5E5E5] hover:text-white transition">{item.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">{t("nav.services")}</h3>
            <ul className="space-y-3">
              {serviceLinks.map((item, index) => (
                <li key={index}>
                  <Link href={item.path}>
                    <a className="text-[#E5E5E5] hover:text-white transition">{item.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6">{t("nav.contact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-3 text-[#B87333]" />
                <span className="text-[#E5E5E5]">
                  42 Rue des Artisans<br />42000 Saint-Étienne, France
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-[#B87333]" />
                <span className="text-[#E5E5E5]">+33 4 77 XX XX XX</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-[#B87333]" />
                <span className="text-[#E5E5E5]">contact@boisserenc.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-[#B87333]" />
                <span className="text-[#E5E5E5]">Lun-Ven: 9h-18h</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright & Legal */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#E5E5E5] text-sm mb-4 md:mb-0">
            &copy; {currentYear} Boisserenc. {t("footer.rights")}
          </p>
          <div className="flex space-x-4">
            <Link href="/legal">
              <a className="text-[#E5E5E5] hover:text-white text-sm transition">
                {t("footer.legal")}
              </a>
            </Link>
            <Link href="/privacy">
              <a className="text-[#E5E5E5] hover:text-white text-sm transition">
                {t("footer.privacy")}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
