import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import GalleryItem from "@/components/ui/gallery-item";
import Lightbox from "@/components/ui/lightbox";
import { type StoveProject, type BlogPost, type Testimonial } from "@shared/schema";
import { getLocalizedBlogPosts, formatDate } from "@/lib/blog";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [_, setLocation] = useLocation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedStove, setSelectedStove] = useState<StoveProject | null>(null);
  
  const currentLanguage = i18n.language;

  // Query featured stove projects
  const { data: stoves = [] } = useQuery<StoveProject[]>({
    queryKey: ['/api/stoves/featured'],
  });

  // Query testimonials
  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  // Query blog posts
  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const localizedBlogPosts = getLocalizedBlogPosts(blogPosts, currentLanguage);

  const openLightbox = (stove: StoveProject) => {
    setSelectedStove(stove);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://www.boisserenc.com/images/jasmin-accueil.jpg')",
            filter: "brightness(0.65)"
          }}
        ></div>
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">
              {i18n.language === 'fr' 
                ? 'Restauration et création de fourneaux' 
                : 'Restoration and creation of stoves'}
            </h1>
            <p className="text-xl text-white mb-8 drop-shadow-md">
              {i18n.language === 'fr'
                ? 'L\'artisanat d\'excellence au service du patrimoine culinaire français'
                : 'Excellence craftsmanship serving French culinary heritage'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="px-6 py-3 bg-[#7D2027] hover:bg-[#9D3F43] text-white transition-colors duration-300"
                onClick={() => setLocation("/creations")}
              >
                {i18n.language === 'fr' ? 'Découvrir nos réalisations' : 'Discover our creations'}
              </Button>
              <Button 
                variant="outline" 
                className="px-6 py-3 border border-white text-white hover:bg-white/10 transition-colors duration-300"
                onClick={() => setLocation("/contact")}
              >
                {i18n.language === 'fr' ? 'Nous contacter' : 'Contact us'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-[#F8F5F1]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#B87333] font-serif text-xl">
                {i18n.language === 'fr' ? 'À propos de nous' : 'About us'}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mt-2 mb-6">
                {i18n.language === 'fr' ? 'L\'atelier Boisserenc' : 'The Boisserenc Workshop'}
              </h2>
              
              <div className="space-y-4 text-[#333333]">
                <p>
                  {i18n.language === 'fr'
                    ? 'Fondé en 1982 par Jean Boisserenc, notre atelier s\'est spécialisé dans la restauration de fourneaux stéphanois, ces imposants poêles en fonte et acier qui ont révolutionné les cuisines françaises au XIXe siècle.'
                    : 'Founded in 1982 by Jean Boisserenc, our workshop specializes in the restoration of Stéphanois stoves, those imposing cast iron and steel wood stoves that revolutionized French kitchens in the 19th century.'}
                </p>
                <p>
                  {i18n.language === 'fr'
                    ? 'Notre équipe d\'artisans qualifiés perpétue ce savoir-faire unique, tout en l\'enrichissant de techniques modernes permettant d\'adapter ces magnifiques pièces aux exigences actuelles.'
                    : 'Our team of skilled craftsmen perpetuates this unique expertise, while enriching it with modern techniques to adapt these magnificent pieces to current requirements.'}
                </p>
                <p className="font-serif text-xl italic">
                  {i18n.language === 'fr'
                    ? 'Chaque fourneau raconte une histoire, et notre mission est de préserver ce patrimoine tout en lui donnant une nouvelle vie.'
                    : 'Each stove tells a story, and our mission is to preserve this heritage while giving it new life.'}
                </p>
              </div>
              
              <div className="mt-8">
                <Link href="/about">
                  <Button variant="link" className="text-[#7D2027] hover:text-[#9D3F43] transition-colors duration-300 p-0 h-auto">
                    {i18n.language === 'fr' ? 'En savoir plus sur notre atelier' : 'Learn more about our workshop'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://www.boisserenc.com/images/projects/creation-cuisson-9831-JAMin.jpg" 
                  alt="Détail d'un fourneau stéphanois" 
                  className="w-full h-auto rounded shadow-lg"
                />
                <img 
                  src="https://www.boisserenc.com/images/projects/fourneaux-cuisson-bois-2725-PASSlaigue.jpg" 
                  alt="Fourneau stéphanois" 
                  className="w-full h-auto rounded shadow-lg"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img 
                  src="https://www.boisserenc.com/images/projects/creation-cuisson-SUDAN-RIAL.jpg" 
                  alt="Restauration en cours" 
                  className="w-full h-auto rounded shadow-lg"
                />
                <img 
                  src="https://www.boisserenc.com/images/projects/creation-modeles-mixtes-1314-HELMs.jpg" 
                  alt="L'équipe de l'atelier" 
                  className="w-full h-auto rounded shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#B87333] font-serif text-xl">
              {i18n.language === 'fr' ? 'Nos services' : 'Our services'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mt-2 mb-4">
              {i18n.language === 'fr' ? 'Notre expertise à votre service' : 'Our expertise at your service'}
            </h2>
            <p className="text-[#333333]">
              {i18n.language === 'fr'
                ? 'De la restauration à la création sur-mesure, nous proposons un accompagnement complet pour votre projet.'
                : 'From restoration to custom creation, we offer comprehensive support for your project.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F8F5F1] rounded p-8 shadow-md transition-transform duration-300 hover:translate-y-[-10px]">
              <div className="w-16 h-16 bg-[#7D2027]/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-history text-[#7D2027] text-2xl"></i>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#333333] mb-4">
                {i18n.language === 'fr' ? 'Restauration' : 'Restoration'}
              </h3>
              <p className="text-[#333333] mb-6">
                {i18n.language === 'fr'
                  ? 'Restauration complète de fourneaux anciens dans le respect de leur authenticité, tout en les adaptant aux normes actuelles.'
                  : 'Complete restoration of antique stoves while respecting their authenticity and adapting them to current standards.'}
              </p>
              <Button variant="link" className="text-[#7D2027] hover:text-[#9D3F43] p-0" onClick={() => setLocation("/services")}>
                {i18n.language === 'fr' ? 'En savoir plus' : 'Learn more'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-[#F8F5F1] rounded p-8 shadow-md transition-transform duration-300 hover:translate-y-[-10px]">
              <div className="w-16 h-16 bg-[#7D2027]/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-drafting-compass text-[#7D2027] text-2xl"></i>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#333333] mb-4">
                {i18n.language === 'fr' ? 'Création sur-mesure' : 'Custom creation'}
              </h3>
              <p className="text-[#333333] mb-6">
                {i18n.language === 'fr'
                  ? 'Conception et fabrication de fourneaux uniques selon vos souhaits et contraintes, alliant esthétique traditionnelle et fonctionnalités modernes.'
                  : 'Design and manufacture of unique stoves according to your wishes and constraints, combining traditional aesthetics and modern features.'}
              </p>
              <Button variant="link" className="text-[#7D2027] hover:text-[#9D3F43] p-0" onClick={() => setLocation("/services")}>
                {i18n.language === 'fr' ? 'En savoir plus' : 'Learn more'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-[#F8F5F1] rounded p-8 shadow-md transition-transform duration-300 hover:translate-y-[-10px]">
              <div className="w-16 h-16 bg-[#7D2027]/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-tools text-[#7D2027] text-2xl"></i>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#333333] mb-4">
                {i18n.language === 'fr' ? 'Conseil et entretien' : 'Consulting and maintenance'}
              </h3>
              <p className="text-[#333333] mb-6">
                {i18n.language === 'fr'
                  ? 'Expertise, conseils d\'acquisition et services d\'entretien régulier pour préserver la beauté et le bon fonctionnement de votre fourneau.'
                  : 'Expertise, acquisition advice, and regular maintenance services to preserve the beauty and proper functioning of your stove.'}
              </p>
              <Button variant="link" className="text-[#7D2027] hover:text-[#9D3F43] p-0" onClick={() => setLocation("/services")}>
                {i18n.language === 'fr' ? 'En savoir plus' : 'Learn more'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="py-20 bg-[#E5E5E5]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#B87333] font-serif text-xl">
              {i18n.language === 'fr' ? 'Nos réalisations' : 'Our creations'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mt-2 mb-4">
              {i18n.language === 'fr' ? 'Projets à la une' : 'Featured projects'}
            </h2>
            <p className="text-[#333333]">
              {i18n.language === 'fr'
                ? 'Découvrez quelques-unes de nos restaurations et créations les plus remarquables.'
                : 'Discover some of our most remarkable restorations and creations.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stoves.map((stove) => (
              <GalleryItem 
                key={stove.id} 
                stove={stove} 
                onClick={openLightbox}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/creations">
              <Button className="px-8 py-3 bg-[#7D2027] hover:bg-[#9D3F43] text-white transition-colors duration-300">
                {i18n.language === 'fr' ? 'Voir toutes nos réalisations' : 'See all our creations'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#F8F5F1]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#B87333] font-serif text-xl">
              {i18n.language === 'fr' ? 'Témoignages' : 'Testimonials'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mt-2 mb-4">
              {i18n.language === 'fr' ? 'Ce que disent nos clients' : 'What our clients say'}
            </h2>
            <p className="text-[#333333]">
              {i18n.language === 'fr'
                ? 'Découvrez l\'expérience de ceux qui nous ont fait confiance pour leurs projets.'
                : 'Discover the experience of those who have trusted us with their projects.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded shadow-md">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={`fas fa-star ${i < (testimonial.rating || 0) ? 'text-[#B87333]' : 'text-gray-300'}`}
                    ></i>
                  ))}
                </div>
                <p className="text-[#333333] italic mb-6">
                  {currentLanguage === 'fr' ? testimonial.content_fr : testimonial.content_en}
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-[#333333]">{testimonial.name}</p>
                  <p className="text-sm text-[#7D2027]">
                    {currentLanguage === 'fr' ? testimonial.position_fr : testimonial.position_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#B87333] font-serif text-xl">
              {i18n.language === 'fr' ? 'Notre blog' : 'Our blog'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mt-2 mb-4">
              {i18n.language === 'fr' ? 'Articles récents' : 'Recent articles'}
            </h2>
            <p className="text-[#333333]">
              {i18n.language === 'fr'
                ? 'Découvrez nos articles sur l\'histoire des fourneaux stéphanois et nos conseils d\'entretien.'
                : 'Discover our articles on the history of Stéphanois stoves and our maintenance tips.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {localizedBlogPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-[#F8F5F1] rounded overflow-hidden shadow-md">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image || ''} 
                    alt={post.title} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-[#B87333] mb-2">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    <span>{formatDate(new Date(post.createdAt), currentLanguage)}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#333333] mb-2">
                    {post.title}
                  </h3>
                  <p className="text-[#333333] mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="link" className="text-[#7D2027] hover:text-[#9D3F43] p-0">
                      {i18n.language === 'fr' ? 'Lire l\'article' : 'Read article'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button variant="outline" className="px-8 py-3 border border-[#7D2027] text-[#7D2027] hover:bg-[#7D2027] hover:text-white transition-colors duration-300">
                {i18n.language === 'fr' ? 'Voir tous les articles' : 'See all articles'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#7D2027] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {i18n.language === 'fr' ? 'Prêt à donner vie à votre projet ?' : 'Ready to bring your project to life?'}
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-[#E5E5E5]">
            {i18n.language === 'fr'
              ? 'Que vous souhaitiez restaurer un fourneau ancien ou créer une pièce sur-mesure, notre équipe est à votre disposition.'
              : 'Whether you want to restore an antique stove or create a custom piece, our team is at your disposal.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="default"
              className="px-8 py-3 bg-white !text-[#7D2027] hover:bg-[#F8F5F1] transition-colors duration-300"
              onClick={() => setLocation("/contact")}
            >
              {i18n.language === 'fr' ? 'Nous contacter' : 'Contact us'}
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-3 border border-white text-white hover:bg-white/10 transition-colors duration-300"
              onClick={() => setLocation("/process")}
            >
              {i18n.language === 'fr' ? 'Notre processus' : 'Our process'}
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox for gallery items */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        stoves={stoves}
        currentStove={selectedStove}
      />
    </>
  );
};

export default Home;