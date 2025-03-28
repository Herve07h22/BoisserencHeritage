import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import { ArrowRight, Check } from "lucide-react";

const Services = () => {
  const { t, i18n } = useTranslation();
  const [location, setLocation] = useLocation();
  
  // References for scroll
  const restorationRef = useRef<HTMLDivElement>(null);
  const customRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);

  // Scroll to section based on hash
  useEffect(() => {
    const hash = location.split("#")[1];
    if (hash) {
      const targetRef = 
        hash === "restoration" ? restorationRef :
        hash === "custom" ? customRef :
        hash === "expertise" ? expertiseRef : null;
      
      if (targetRef && targetRef.current) {
        setTimeout(() => {
          window.scrollTo({
            top: targetRef.current!.offsetTop - 100,
            behavior: "smooth"
          });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1556910633-5099dc3971e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
            alt="Services de restauration Boisserenc" 
            className="object-cover h-full w-full object-center opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <span className="inline-block mb-4 text-[#B87333] border-b border-[#B87333] pb-1 font-serif text-lg md:text-xl">
              {t("home.services.subtitle")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight shadow-sm">
              {t("home.services.title")}
            </h1>
            <p className="text-lg md:text-xl text-[#E5E5E5] mb-8 max-w-xl font-light">
              {t("home.services.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-[#F8F5F1]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mb-6">
              {i18n.language === 'fr' 
                ? "Nos prestations d'excellence" 
                : "Our excellence services"}
            </h2>
            <p className="text-[#333333]">
              {i18n.language === 'fr'
                ? "Découvrez notre gamme complète de services, de la restauration à l'expertise, en passant par la création sur-mesure. Chaque prestation est pensée pour répondre aux besoins spécifiques de votre projet."
                : "Discover our full range of services, from restoration to expertise, including custom creation. Each service is designed to meet the specific needs of your project."}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.id} className="bg-white rounded shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="h-48 bg-[#7D2027]/5 flex items-center justify-center">
                  <i className={`fas fa-${service.icon} text-[#7D2027] text-5xl`}></i>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif font-bold text-[#333333] mb-4">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-[#333333] mb-6">{t(service.descriptionKey)}</p>
                  <Button 
                    variant="outline"
                    className="w-full border border-[#7D2027] text-[#7D2027] hover:bg-[#7D2027] hover:text-white transition-colors duration-300"
                    onClick={() => setLocation(`/services#${service.id}`)}
                  >
                    {t(service.linkKey)}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restoration Service */}
      <section ref={restorationRef} id="restoration" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#B87333] font-serif text-xl">
                {i18n.language === 'fr' ? "Service de restauration" : "Restoration service"}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mt-2 mb-6">
                {t("services.restoration.title")}
              </h2>
              
              <div className="space-y-4 text-[#333333]">
                <p>{t("services.restoration.description")}</p>
                <p>
                  {i18n.language === 'fr'
                    ? "Notre approche de restauration est basée sur un respect profond de l'histoire et de l'intégrité de chaque fourneau. Nous combinons techniques traditionnelles et connaissances modernes pour préserver l'âme de ces pièces exceptionnelles."
                    : "Our restoration approach is based on a deep respect for the history and integrity of each stove. We combine traditional techniques and modern knowledge to preserve the soul of these exceptional pieces."}
                </p>
                
                <h3 className="text-xl font-serif font-bold text-[#333333] mt-4">
                  {i18n.language === 'fr' ? "Notre prestation inclut" : "Our service includes"}:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="text-[#B87333] h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                    <span>{t("services.restoration.features.diagnostic")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-[#B87333] h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                    <span>{t("services.restoration.features.dismantling")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-[#B87333] h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                    <span>{t("services.restoration.features.adaptation")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-[#B87333] h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                    <span>{t("services.restoration.features.installation")}</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8">
                <Link href="/process">
                  <Button className="px-8 py-3 bg-[#7D2027] hover:bg-[#9D3F43] text-white transition-colors duration-300 inline-flex items-center justify-center">
                    {i18n.language === 'fr' 
                      ? "Découvrir notre processus" 
                      : "Discover our process"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1572097150304-5c73f7b279a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                alt={t("services.restoration.title")} 
                className="w-full h-auto rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Custom Creation Service */}
      <section ref={customRef} id="custom" className="py-20 bg-[#E5E5E5]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                alt={t("services.custom.title")} 
                className="w-full h-auto rounded shadow-lg"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="text-[#B87333] font-serif text-xl">
                {i18n.language === 'fr' ? "Service de création" : "Creation service"}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mt-2 mb-6">
                {t("services.custom.title")}
              </h2>
              
              <div className="space-y-4 text-[#333333]">
                <p>{t("services.custom.description")}</p>
                <p>
                  {i18n.language === 'fr'
                    ? "Notre service de création sur-mesure vous permet de posséder un fourneau unique, qui allie l'esthétique et le charme des modèles historiques avec les fonctionnalités modernes. Chaque création est pensée pour s'intégrer parfaitement dans votre espace."
                    : "Our custom creation service allows you to own a unique stove that combines the aesthetics and charm of historical models with modern functionalities. Each creation is designed to integrate perfectly into your space."}
                </p>
                
                <h3 className="text-xl font-serif font-bold text-[#333333] mt-4">
                  {i18n.language === 'fr' ? "Notre prestation inclut" : "Our service includes"}:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="text-[#B87333] h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                    <span>{t("services.custom.features.design")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-[#B87333] h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                    <span>{t("services.custom.features.materials")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-[#B87333] h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                    <span>{t("services.custom.features.techniques")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-[#B87333] h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                    <span>{t("services.custom.features.integration")}</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8">
                <Link href="/creations">
                  <Button className="px-8 py-3 bg-[#7D2027] hover:bg-[#9D3F43] text-white transition-colors duration-300 inline-flex items-center justify-center">
                    {i18n.language === 'fr' 
                      ? "Voir nos créations sur-mesure" 
                      : "See our custom creations"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Service */}
      <section ref={expertiseRef} id="expertise" className="py-20 bg-[#F8F5F1]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#B87333] font-serif text-xl">
                {i18n.language === 'fr' ? "Service de conseil" : "Advisory service"}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mt-2 mb-6">
                {t("services.expertise.title")}
              </h2>
              
              <div className="space-y-4 text-[#333333]">
                <p>{t("services.expertise.description")}</p>
                <p>
                  {i18n.language === 'fr'
                    ? "Notre expertise unique dans le domaine des fourneaux anciens nous permet de vous offrir des conseils précieux, que vous souhaitiez acquérir une pièce, évaluer celle que vous possédez déjà, ou simplement en apprendre davantage sur ces trésors du patrimoine culinaire."
                    : "Our unique expertise in the field of antique stoves allows us to offer you valuable advice, whether you want to acquire a piece, evaluate the one you already own, or simply learn more about these treasures of culinary heritage."}
                </p>
                
                <h3 className="text-xl font-serif font-bold text-[#333333] mt-4">
                  {i18n.language === 'fr' ? "Notre prestation inclut" : "Our service includes"}:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="text-[#B87333] h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                    <span>{t("services.expertise.features.authentication")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-[#B87333] h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                    <span>{t("services.expertise.features.valuation")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-[#B87333] h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                    <span>{t("services.expertise.features.maintenance")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-[#B87333] h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                    <span>{t("services.expertise.features.sourcing")}</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="px-8 py-3 bg-[#7D2027] hover:bg-[#9D3F43] text-white transition-colors duration-300 inline-flex items-center justify-center">
                    {i18n.language === 'fr' 
                      ? "Demander une consultation" 
                      : "Request a consultation"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1607462407966-d4992e9a7c83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                alt={t("services.expertise.title")} 
                className="w-full h-auto rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#B87333] font-serif text-xl">
              {i18n.language === 'fr' ? "Tarification" : "Pricing"}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mt-2 mb-4">
              {i18n.language === 'fr' ? "Une approche personnalisée" : "A personalized approach"}
            </h2>
            <p className="text-[#333333]">
              {i18n.language === 'fr'
                ? "Chaque projet étant unique, nous établissons des devis sur mesure après une évaluation détaillée de vos besoins."
                : "As each project is unique, we establish custom quotes after a detailed assessment of your needs."}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F8F5F1] p-8 rounded shadow-md">
              <div className="text-center mb-6">
                <div className="inline-block w-20 h-20 bg-[#7D2027]/10 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-tools text-[#7D2027] text-3xl"></i>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#333333]">
                  {i18n.language === 'fr' ? "Restauration" : "Restoration"}
                </h3>
              </div>
              <p className="text-[#333333] text-center mb-6">
                {i18n.language === 'fr'
                  ? "Le prix dépend de l'état initial du fourneau, de sa complexité et des matériaux nécessaires."
                  : "The price depends on the initial condition of the stove, its complexity, and the materials needed."}
              </p>
              <div className="text-center">
                <span className="text-[#7D2027] font-serif">
                  {i18n.language === 'fr' ? "À partir de" : "Starting from"} 3500€
                </span>
              </div>
            </div>
            
            <div className="bg-[#F8F5F1] p-8 rounded shadow-md">
              <div className="text-center mb-6">
                <div className="inline-block w-20 h-20 bg-[#7D2027]/10 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-drafting-compass text-[#7D2027] text-3xl"></i>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#333333]">
                  {i18n.language === 'fr' ? "Création sur-mesure" : "Custom creation"}
                </h3>
              </div>
              <p className="text-[#333333] text-center mb-6">
                {i18n.language === 'fr'
                  ? "Le prix varie selon la taille, la complexité du design et les fonctionnalités souhaitées."
                  : "The price varies according to size, design complexity, and desired functionalities."}
              </p>
              <div className="text-center">
                <span className="text-[#7D2027] font-serif">
                  {i18n.language === 'fr' ? "À partir de" : "Starting from"} 8000€
                </span>
              </div>
            </div>
            
            <div className="bg-[#F8F5F1] p-8 rounded shadow-md">
              <div className="text-center mb-6">
                <div className="inline-block w-20 h-20 bg-[#7D2027]/10 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-hand-holding-heart text-[#7D2027] text-3xl"></i>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#333333]">
                  {i18n.language === 'fr' ? "Conseil et expertise" : "Advice and expertise"}
                </h3>
              </div>
              <p className="text-[#333333] text-center mb-6">
                {i18n.language === 'fr'
                  ? "Le prix dépend du type de service requis et du temps nécessaire pour l'évaluation."
                  : "The price depends on the type of service required and the time needed for evaluation."}
              </p>
              <div className="text-center">
                <span className="text-[#7D2027] font-serif">
                  {i18n.language === 'fr' ? "À partir de" : "Starting from"} 250€
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="italic text-[#333333]/70 mb-6">
              {i18n.language === 'fr'
                ? "Pour obtenir un devis précis adapté à votre projet, n'hésitez pas à nous contacter."
                : "To get an accurate quote tailored to your project, please don't hesitate to contact us."}
            </p>
            <Link href="/contact">
              <Button className="px-8 py-3 bg-[#7D2027] hover:bg-[#9D3F43] text-white transition-colors duration-300">
                {t("cta.contactUs")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 bg-[#7D2027] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {t("home.final.title")}
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-[#E5E5E5]">
            {t("home.final.description")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contact">
              <Button className="px-8 py-3 bg-white text-[#7D2027] hover:bg-[#F8F5F1] transition-colors duration-300 inline-flex items-center justify-center">
                {t("cta.appointment")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/creations">
              <Button variant="outline" className="px-8 py-3 border border-white hover:bg-white/10 transition-colors duration-300 inline-flex items-center justify-center">
                {t("cta.discover")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
