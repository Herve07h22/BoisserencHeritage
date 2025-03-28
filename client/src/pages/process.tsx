import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const Process = () => {
  const { t, i18n } = useTranslation();

  // Process steps data
  const processSteps = [
    {
      number: "01",
      title: t("home.steps.diagnostic.title"),
      description: t("home.steps.diagnostic.description"),
      longDescription: i18n.language === 'fr'
        ? "Lors de cette première étape essentielle, nous examinons minutieusement le fourneau pour comprendre son histoire, son état actuel et ses caractéristiques techniques spécifiques. Nous documentons chaque détail, identifions les pièces d'origine et celles qui ont été modifiées au fil du temps, et évaluons l'ampleur des travaux nécessaires. Cette analyse approfondie nous permet d'élaborer un plan de restauration sur mesure qui respecte l'authenticité de l'objet tout en répondant à vos attentes."
        : "During this essential first step, we carefully examine the stove to understand its history, current condition, and specific technical characteristics. We document every detail, identify original parts and those that have been modified over time, and assess the extent of work required. This thorough analysis allows us to develop a customized restoration plan that respects the authenticity of the object while meeting your expectations.",
      image: "https://images.unsplash.com/photo-1636490295156-a636d3c5fa4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      number: "02",
      title: t("home.steps.dismantling.title"),
      description: t("home.steps.dismantling.description"),
      longDescription: i18n.language === 'fr'
        ? "Le démontage est une phase critique qui requiert expertise et patience. Chaque composant est soigneusement démonté, numéroté et catalogué dans notre système de suivi. Nous photographions et documentons l'ensemble du processus, créant ainsi une référence précise pour la phase de réassemblage. Cette méthodologie méticuleuse nous permet de comprendre parfaitement la construction du fourneau et d'identifier les pièces qui nécessitent une attention particulière, garantissant ainsi une restauration fidèle et précise."
        : "Dismantling is a critical phase that requires expertise and patience. Each component is carefully disassembled, numbered, and cataloged in our tracking system. We photograph and document the entire process, creating an accurate reference for the reassembly phase. This meticulous methodology allows us to fully understand the stove's construction and identify parts that require special attention, ensuring a faithful and precise restoration.",
      image: "https://images.unsplash.com/photo-1643330683233-ff2ac89b002c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      number: "03",
      title: t("home.steps.restoration.title"),
      description: t("home.steps.restoration.description"),
      longDescription: i18n.language === 'fr'
        ? "C'est au cœur de cette étape que notre expertise artisanale s'exprime pleinement. Nos artisans spécialisés travaillent méticuleusement sur chaque composant du fourneau, utilisant des techniques traditionnelles transmises de génération en génération. Selon les besoins, nous restaurons les pièces métalliques par forgeage ou moulage, reproduisons les éléments en fonte endommagés, reconstituons les émaux et refaisons les surfaces émaillées. Nous privilégions l'utilisation de matériaux d'origine ou identiques à ceux d'origine pour préserver l'authenticité historique du fourneau."
        : "It is at the heart of this step that our artisanal expertise is fully expressed. Our specialized artisans work meticulously on each component of the stove, using traditional techniques passed down from generation to generation. As needed, we restore metal parts by forging or casting, reproduce damaged cast iron elements, reconstitute enamels, and redo enameled surfaces. We prioritize the use of original materials or materials identical to the original ones to preserve the historical authenticity of the stove.",
      image: "https://images.unsplash.com/photo-1533167649158-6d508895b680?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
    },
    {
      number: "04",
      title: t("home.steps.assembly.title"),
      description: t("home.steps.assembly.description"),
      longDescription: i18n.language === 'fr'
        ? "L'assemblage final est une étape de précision qui réunit tous les composants restaurés. Nous suivons scrupuleusement la documentation créée lors du démontage pour garantir que chaque pièce retrouve sa place d'origine. Une fois assemblé, le fourneau subit une série de tests rigoureux pour vérifier son bon fonctionnement, sa sécurité et sa performance thermique. Nous pouvons, selon vos besoins, intégrer des adaptations modernes discrètes pour améliorer le confort d'utilisation tout en préservant l'esthétique d'origine. Le fourneau est ensuite nettoyé, poli et préparé pour sa livraison et son installation dans votre espace."
        : "The final assembly is a precision step that brings together all the restored components. We scrupulously follow the documentation created during dismantling to ensure that each piece returns to its original place. Once assembled, the stove undergoes a series of rigorous tests to verify its proper functioning, safety, and thermal performance. We can, according to your needs, integrate discreet modern adaptations to improve user comfort while preserving the original aesthetics. The stove is then cleaned, polished, and prepared for delivery and installation in your space.",
      image: "https://images.unsplash.com/photo-1572097150304-5c73f7b279a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    }
  ];

  // Quality commitments
  const qualityCommitments = [
    {
      title: i18n.language === 'fr' ? "Respect de l'authenticité" : "Respect for authenticity",
      description: i18n.language === 'fr' 
        ? "Nous nous engageons à préserver l'authenticité historique et esthétique de chaque fourneau."
        : "We are committed to preserving the historical and aesthetic authenticity of each stove."
    },
    {
      title: i18n.language === 'fr' ? "Matériaux de qualité" : "Quality materials",
      description: i18n.language === 'fr'
        ? "Nous utilisons exclusivement des matériaux de premier choix, similaires ou identiques aux originaux."
        : "We exclusively use premium materials, similar or identical to the originals."
    },
    {
      title: i18n.language === 'fr' ? "Expertise technique" : "Technical expertise",
      description: i18n.language === 'fr'
        ? "Notre équipe possède une connaissance approfondie des techniques traditionnelles et contemporaines."
        : "Our team has in-depth knowledge of traditional and contemporary techniques."
    },
    {
      title: i18n.language === 'fr' ? "Transparence totale" : "Total transparency",
      description: i18n.language === 'fr'
        ? "Nous vous tenons informé à chaque étape du processus et documentons entièrement notre travail."
        : "We keep you informed at every step of the process and fully document our work."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1533167649158-6d508895b680?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" 
            alt="Processus de restauration d'un fourneau ancien" 
            className="object-cover h-full w-full object-center opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <span className="inline-block mb-4 text-[#B87333] border-b border-[#B87333] pb-1 font-serif text-lg md:text-xl">
              {t("home.process.subtitle")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight shadow-sm">
              {t("home.process.title")}
            </h1>
            <p className="text-lg md:text-xl text-[#E5E5E5] mb-8 max-w-xl font-light">
              {t("home.process.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-20 bg-[#F8F5F1]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mb-4">
              {i18n.language === 'fr' 
                ? "Notre méthodologie de restauration" 
                : "Our restoration methodology"}
            </h2>
            <p className="text-[#333333]">
              {i18n.language === 'fr'
                ? "Découvrez les étapes de notre processus méticuleux qui allie tradition et innovation pour redonner vie aux fourneaux d'exception."
                : "Discover the steps of our meticulous process that combines tradition and innovation to bring exceptional stoves back to life."}
            </p>
          </div>
          
          <div className="relative md:pl-8 before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-[#B87333]/30 before:hidden md:before:block">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className="grid md:grid-cols-12 gap-8 mb-16 last:mb-0 relative md:pl-8 before:content-[''] before:absolute before:left-[-37px] before:top-0 before:w-5 before:h-5 before:rounded-full before:bg-[#B87333] before:border-4 before:border-[#F8F5F1] before:z-[1] before:hidden md:before:block"
              >
                <div className="md:col-span-5">
                  <span className="text-[#7D2027] font-serif text-xl font-bold">{step.number}.</span>
                  <h3 className="text-2xl font-serif font-bold text-[#333333] mt-1 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#333333] mb-4">{step.description}</p>
                  <p className="text-[#333333]">{step.longDescription}</p>
                </div>
                <div className="md:col-span-7 rounded overflow-hidden shadow-lg">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitments */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#B87333] font-serif text-xl">
              {i18n.language === 'fr' ? "Notre engagement" : "Our commitment"}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mt-2 mb-4">
              {i18n.language === 'fr' ? "La qualité avant tout" : "Quality above all"}
            </h2>
            <p className="text-[#333333]">
              {i18n.language === 'fr'
                ? "Nous nous engageons à fournir un travail d'exception à chaque étape du processus de restauration."
                : "We are committed to providing exceptional work at every step of the restoration process."}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityCommitments.map((commitment, index) => (
              <div key={index} className="bg-[#F8F5F1] p-8 rounded shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#7D2027]/10 rounded-full flex items-center justify-center mb-6">
                  <Check className="h-6 w-6 text-[#7D2027]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#333333] mb-4">
                  {commitment.title}
                </h3>
                <p className="text-[#333333]">{commitment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Process Section */}
      <section className="py-20 bg-[#E5E5E5]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1556910633-5099dc3971e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                alt="Création sur-mesure" 
                className="w-full h-auto rounded shadow-lg"
              />
            </div>
            <div>
              <span className="text-[#B87333] font-serif text-xl">
                {i18n.language === 'fr' ? "Créations sur-mesure" : "Custom creations"}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mt-2 mb-6">
                {i18n.language === 'fr' 
                  ? "Un processus de création unique" 
                  : "A unique creation process"}
              </h2>
              
              <div className="space-y-4 text-[#333333]">
                <p>
                  {i18n.language === 'fr'
                    ? "Pour nos créations sur-mesure, le processus suit une approche similaire mais intègre une phase de conception collaborative. Nous commençons par comprendre votre vision, vos besoins et les contraintes de votre espace."
                    : "For our custom creations, the process follows a similar approach but integrates a collaborative design phase. We begin by understanding your vision, your needs, and the constraints of your space."}
                </p>
                <p>
                  {i18n.language === 'fr'
                    ? "Nos designers travaillent ensuite à l'élaboration de plans détaillés et de rendus qui vous permettent de visualiser le fourneau avant sa fabrication. Une fois le design validé, nos artisans se lancent dans la fabrication, combinant techniques traditionnelles et innovations modernes."
                    : "Our designers then work on developing detailed plans and renderings that allow you to visualize the stove before its manufacture. Once the design is validated, our artisans begin manufacturing, combining traditional techniques and modern innovations."}
                </p>
                <p>
                  {i18n.language === 'fr'
                    ? "Le résultat : un fourneau unique, inspiré des modèles historiques mais parfaitement adapté à vos besoins contemporains."
                    : "The result: a unique stove, inspired by historical models but perfectly adapted to your contemporary needs."}
                </p>
              </div>
              
              <div className="mt-8">
                <Link href="/services#custom">
                  <Button className="px-8 py-3 bg-[#7D2027] hover:bg-[#9D3F43] text-white transition-colors duration-300 inline-flex items-center justify-center">
                    {i18n.language === 'fr' ? "En savoir plus sur nos créations" : "Learn more about our creations"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 bg-[#7D2027] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {i18n.language === 'fr' ? "Prêt à démarrer votre projet ?" : "Ready to start your project?"}
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-[#E5E5E5]">
            {i18n.language === 'fr'
              ? "Contactez-nous pour discuter de votre projet de restauration ou de création sur-mesure. Notre équipe se tient à votre disposition pour répondre à toutes vos questions."
              : "Contact us to discuss your restoration or custom creation project. Our team is at your disposal to answer all your questions."}
          </p>
          <Link href="/contact">
            <Button className="px-8 py-3 bg-white text-[#7D2027] hover:bg-[#F8F5F1] transition-colors duration-300">
              {t("cta.contactUs")}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Process;
