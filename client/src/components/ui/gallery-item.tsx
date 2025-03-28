import { useState } from "react";
import { StoveProject } from "@shared/schema";
import { useTranslation } from "react-i18next";

interface GalleryItemProps {
  stove: StoveProject;
  onClick: (stove: StoveProject) => void;
}

const GalleryItem = ({ stove, onClick }: GalleryItemProps) => {
  const { i18n } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  
  const currentLanguage = i18n.language;
  const name = currentLanguage === "fr" ? stove.name_fr : stove.name_en;
  const description = currentLanguage === "fr" ? stove.description_fr : stove.description_en;

  return (
    <div 
      className="overflow-hidden rounded group shadow-md transform transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
      onClick={() => onClick(stove)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="block relative">
        <img 
          src={stove.image} 
          alt={name} 
          className={`w-full h-64 object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : ''}`}
        />
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div>
            <h3 className="text-white font-serif text-xl">{name}</h3>
            <p className="text-[#E5E5E5] text-sm">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
