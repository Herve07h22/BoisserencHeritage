import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { StoveProject } from "@shared/schema";
import GalleryItem from "@/components/ui/gallery-item";
import Lightbox from "@/components/ui/lightbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const Creations = () => {
  const { t, i18n } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedStove, setSelectedStove] = useState<StoveProject | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch stove data
  const { data: stoves = [], isLoading } = useQuery<StoveProject[]>({
    queryKey: ["/api/stoves"],
  });

  // Filter stoves based on active filter
  const filteredStoves = stoves.filter(stove => {
    if (activeFilter === "all") return true;
    return stove.category === activeFilter;
  });

  // Open lightbox with selected stove
  const openLightbox = (stove: StoveProject) => {
    setSelectedStove(stove);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1572097150304-5c73f7b279a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Fourneau ancien restauré par Boisserenc" 
            className="object-cover h-full w-full object-center opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <span className="inline-block mb-4 text-[#B87333] border-b border-[#B87333] pb-1 font-serif text-lg md:text-xl">
              {t("home.gallery.subtitle")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight shadow-sm">
              {t("home.gallery.title")}
            </h1>
            <p className="text-lg md:text-xl text-[#E5E5E5] mb-8 max-w-xl font-light">
              {t("home.gallery.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Filter Tabs */}
          <div className="mb-12">
            <Tabs defaultValue="all" onValueChange={setActiveFilter} className="w-full">
              <TabsList className="flex flex-wrap justify-center mb-6 space-x-2 md:space-x-4 bg-transparent h-auto">
                <TabsTrigger 
                  value="all" 
                  className={`px-4 py-2 rounded-sm mb-2 ${activeFilter === 'all' ? 'bg-[#7D2027] text-white' : 'hover:bg-[#E5E5E5] transition-colors'}`}
                >
                  {t("home.filters.all")}
                </TabsTrigger>
                <TabsTrigger 
                  value="restoration" 
                  className={`px-4 py-2 rounded-sm mb-2 ${activeFilter === 'restoration' ? 'bg-[#7D2027] text-white' : 'hover:bg-[#E5E5E5] transition-colors'}`}
                >
                  {t("home.filters.restorations")}
                </TabsTrigger>
                <TabsTrigger 
                  value="custom" 
                  className={`px-4 py-2 rounded-sm mb-2 ${activeFilter === 'custom' ? 'bg-[#7D2027] text-white' : 'hover:bg-[#E5E5E5] transition-colors'}`}
                >
                  {t("home.filters.custom")}
                </TabsTrigger>
                <TabsTrigger 
                  value="stephanois" 
                  className={`px-4 py-2 rounded-sm mb-2 ${activeFilter === 'stephanois' ? 'bg-[#7D2027] text-white' : 'hover:bg-[#E5E5E5] transition-colors'}`}
                >
                  {t("home.filters.stephanois")}
                </TabsTrigger>
                <TabsTrigger 
                  value="kitchen" 
                  className={`px-4 py-2 rounded-sm mb-2 ${activeFilter === 'kitchen' ? 'bg-[#7D2027] text-white' : 'hover:bg-[#E5E5E5] transition-colors'}`}
                >
                  {t("home.filters.kitchen")}
                </TabsTrigger>
              </TabsList>

              {/* Gallery Grid */}
              <TabsContent value={activeFilter} className="mt-4">
                {isLoading ? (
                  // Loading state
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7D2027]"></div>
                  </div>
                ) : filteredStoves.length > 0 ? (
                  // Gallery grid
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStoves.map((stove) => (
                      <GalleryItem
                        key={stove.id}
                        stove={stove}
                        onClick={openLightbox}
                      />
                    ))}
                  </div>
                ) : (
                  // No items found state
                  <div className="text-center py-12">
                    <h3 className="text-xl font-serif text-[#333333]">
                      {i18n.language === 'fr' 
                        ? 'Aucun fourneau trouvé pour cette catégorie.' 
                        : 'No stoves found for this category.'}
                    </h3>
                    <p className="text-[#333333]/70 mt-2">
                      {i18n.language === 'fr'
                        ? 'Veuillez sélectionner une autre catégorie.'
                        : 'Please select another category.'}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Historical Stoves Information */}
      <section className="py-20 bg-[#F8F5F1]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#B87333] font-serif text-xl">
                {i18n.language === 'fr' ? 'Patrimoine culinaire' : 'Culinary heritage'}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mt-2 mb-6">
                {i18n.language === 'fr'
                  ? 'Comprendre les fourneaux stéphanois'
                  : 'Understanding Stéphanois stoves'}
              </h2>
              
              <div className="space-y-4 text-[#333333]">
                <p>
                  {i18n.language === 'fr'
                    ? 'Les fourneaux stéphanois représentent un élément important du patrimoine culinaire français. Fabriqués principalement à Saint-Étienne à partir du XIXe siècle, ces fourneaux se distinguent par leur robustesse, leur élégance et leur fonctionnalité exceptionnelle.'
                    : 'Stéphanois stoves represent an important element of French culinary heritage. Mainly manufactured in Saint-Étienne from the 19th century, these stoves are distinguished by their robustness, elegance, and exceptional functionality.'}
                </p>
                <p>
                  {i18n.language === 'fr'
                    ? 'Chaque fourneau est une pièce unique, témoignant d\'un savoir-faire artisanal remarquable. La fonte, les plaques émaillées, les ornements en laiton et les techniques d\'assemblage utilisées font de ces fourneaux de véritables œuvres d\'art fonctionnelles.'
                    : 'Each stove is a unique piece, testifying to remarkable craftsmanship. The cast iron, enameled plates, brass ornaments, and assembly techniques make these stoves true functional works of art.'}
                </p>
                <p>
                  {i18n.language === 'fr'
                    ? 'À travers notre travail de restauration et de création, nous contribuons à préserver ce patrimoine unique tout en l\'adaptant aux exigences contemporaines.'
                    : 'Through our restoration and creation work, we contribute to preserving this unique heritage while adapting it to contemporary requirements.'}
                </p>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                alt="Fourneau stéphanois ancien" 
                className="w-full h-auto rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-20 bg-[#7D2027] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {i18n.language === 'fr'
              ? 'Vous avez un projet de restauration ?'
              : 'Do you have a restoration project?'}
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-[#E5E5E5]">
            {i18n.language === 'fr'
              ? 'Que vous souhaitiez restaurer un fourneau ancien ou créer une pièce sur-mesure, nos artisans sont là pour vous accompagner.'
              : 'Whether you want to restore an antique stove or create a custom piece, our artisans are here to help you.'}
          </p>
          <Button className="px-8 py-3 bg-white text-[#7D2027] hover:bg-[#F8F5F1] transition-colors duration-300">
            {t("cta.contactUs")}
          </Button>
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

export default Creations;
