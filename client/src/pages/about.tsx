import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-[#F8F5F1]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#B87333] font-serif text-xl">À propos de nous</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#333333] mt-2 mb-4">
              Atelier Boisserenc
            </h1>
            <p className="text-lg text-[#333333]">
              Artisans restaurateurs de fourneaux stéphanois depuis 1982
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-4 text-[#333333]">
                <p>
                  Fondé en 1982 par Jean Boisserenc, notre atelier s'est spécialisé dans la restauration et la création de fourneaux stéphanois, ces imposants poêles en fonte et acier qui ont marqué l'histoire de la cuisine française.
                </p>
                <p>
                  Aujourd'hui dirigé par la seconde génération, l'atelier Boisserenc maintient vivante cette tradition tout en l'enrichissant de techniques et de connaissances modernes. Notre équipe d'artisans qualifiés partage la même passion et le même engagement envers l'excellence, chaque projet bénéficiant d'une attention méticuleuse aux moindres détails.
                </p>
                <p className="font-serif text-xl italic">
                  Chaque fourneau raconte une histoire unique, et notre mission est de préserver cette histoire tout en donnant une nouvelle vie à ces magnifiques témoins du patrimoine culinaire français.
                </p>
              </div>
            </div>
            
            <div>
              <img 
                src="https://www.boisserenc.com/images/projects/atelier-artisan-fourneau-art-01.jpg" 
                alt="L'équipe de l'atelier Boisserenc" 
                className="w-full h-auto rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#B87333] font-serif text-xl">Notre expertise</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mt-2 mb-4">
              Un savoir-faire unique
            </h2>
            <p className="text-[#333333]">
              Notre expertise s'étend à tous les aspects de la restauration et de la création de fourneaux, 
              alliant techniques ancestrales et innovations modernes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F8F5F1] p-8 rounded shadow-md">
              <div className="w-14 h-14 bg-[#7D2027]/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-history text-[#7D2027] text-2xl"></i>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#333333] mb-4">
                Connaissance historique
              </h3>
              <p className="text-[#333333]">
                Notre maîtrise de l'histoire des fourneaux, particulièrement des fourneaux stéphanois, 
                nous permet d'appréhender chaque pièce dans son contexte historique et technique.
              </p>
            </div>
            
            <div className="bg-[#F8F5F1] p-8 rounded shadow-md">
              <div className="w-14 h-14 bg-[#7D2027]/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-hammer text-[#7D2027] text-2xl"></i>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#333333] mb-4">
                Maîtrise technique
              </h3>
              <p className="text-[#333333]">
                Du travail du métal à l'émaillage, en passant par la mécanique et la thermique, 
                nos artisans maîtrisent toutes les compétences nécessaires à la restauration complète.
              </p>
            </div>
            
            <div className="bg-[#F8F5F1] p-8 rounded shadow-md">
              <div className="w-14 h-14 bg-[#7D2027]/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-lightbulb text-[#7D2027] text-2xl"></i>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#333333] mb-4">
                Innovation adaptée
              </h3>
              <p className="text-[#333333]">
                Nous savons intégrer des technologies modernes dans les fourneaux anciens, 
                les rendant fonctionnels et sécurisés pour un usage contemporain, tout en préservant leur authenticité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#E5E5E5]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#B87333] font-serif text-xl">Notre équipe</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mt-2 mb-4">
              Les artisans de Boisserenc
            </h2>
            <p className="text-[#333333]">
              Chaque membre de notre équipe apporte son expertise unique et sa passion pour créer des chefs-d'œuvre durables.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded overflow-hidden shadow-md text-center">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://www.boisserenc.com/images/projects/atelier-artisan-fourneau-art-01.jpg" 
                  alt="Pierre Boisserenc" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-[#333333]">Pierre Boisserenc</h3>
                <p className="text-[#7D2027] mb-3">Maître Artisan, Directeur</p>
                <p className="text-[#333333] text-sm">
                  Formé auprès de son père, Pierre perpétue l'héritage familial tout en apportant une vision moderne.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded overflow-hidden shadow-md text-center">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://www.boisserenc.com/images/projects/creation-cuisson-bois-5321-WAS.jpg" 
                  alt="Marc Durand" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-[#333333]">Marc Durand</h3>
                <p className="text-[#7D2027] mb-3">Artisan Métallier</p>
                <p className="text-[#333333] text-sm">
                  Spécialiste du travail des métaux, Marc apporte 20 ans d'expérience dans la restauration des pièces métalliques.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded overflow-hidden shadow-md text-center">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://www.boisserenc.com/images/creation-cuisson-bois.jpg" 
                  alt="Sophie Leroux" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-[#333333]">Sophie Leroux</h3>
                <p className="text-[#7D2027] mb-3">Émailleuse</p>
                <p className="text-[#333333] text-sm">
                  Experte en émaillage et finitions, Sophie maîtrise les techniques traditionnelles pour des résultats authentiques.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded overflow-hidden shadow-md text-center">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://www.boisserenc.com/images/projects/fourneaux-cuisson-bois-9832-TrD.jpg" 
                  alt="Lucas Martin" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-[#333333]">Lucas Martin</h3>
                <p className="text-[#7D2027] mb-3">Ingénieur Thermique</p>
                <p className="text-[#333333] text-sm">
                  Lucas adapte les systèmes de chauffe anciens aux normes modernes, alliant sécurité et performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Section */}
      <section className="py-20 bg-[#F8F5F1]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://www.boisserenc.com/images/projects/atelier-boisserenc-stove.jpg" 
                alt="L'atelier Boisserenc" 
                className="w-full h-auto rounded shadow-lg"
              />
            </div>
            
            <div>
              <span className="text-[#B87333] font-serif text-xl">Notre lieu de création</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mt-2 mb-6">
                L'atelier
              </h2>
              
              <div className="space-y-4 text-[#333333]">
                <p>
                  Situé au cœur de Saint-Étienne, notre atelier est à la fois un lieu de production et un espace de patrimoine. Dans ces murs chargés d'histoire, nous disposons de tous les équipements nécessaires pour mener à bien nos projets de restauration et de création.
                </p>
                <p>
                  L'atelier est divisé en plusieurs espaces spécialisés : la forge, l'espace de démontage et d'analyse, l'atelier de restauration mécanique, la cabine d'émaillage et l'espace d'assemblage final. Cette organisation nous permet de maîtriser chaque étape du processus.
                </p>
                <p>
                  Nous vous invitons à venir visiter notre atelier sur rendez-vous. C'est l'occasion de découvrir notre savoir-faire en action et de discuter directement avec nos artisans de votre projet.
                </p>
              </div>
              
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="px-8 py-3 bg-[#7D2027] hover:bg-[#9D3F43] text-white transition-colors duration-300 inline-flex items-center justify-center">
                    Planifier une visite <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#7D2027] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {i18n.language === 'fr' ? 'Confiez-nous votre projet' : 'Entrust us with your project'}
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-[#E5E5E5]">
            {i18n.language === 'fr' 
              ? 'Que vous souhaitiez restaurer un fourneau ancien ou créer une pièce sur-mesure, notre équipe est à votre disposition pour donner vie à votre vision.'
              : 'Whether you want to restore an antique stove or create a custom piece, our team is at your disposal to bring your vision to life.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contact">
              <Button className="px-8 py-3 bg-white text-[#7D2027] hover:bg-[#F8F5F1] transition-colors duration-300 inline-flex items-center justify-center">
                {i18n.language === 'fr' ? 'Prendre rendez-vous' : 'Make an appointment'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/creations">
              <Button variant="outline" className="px-8 py-3 border border-white hover:bg-white/10 transition-colors duration-300 inline-flex items-center justify-center">
                {i18n.language === 'fr' ? 'Découvrir nos créations' : 'Discover our creations'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;