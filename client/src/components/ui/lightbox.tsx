import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { StoveProject } from "@shared/schema";
import { useTranslation } from "react-i18next";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  stoves: StoveProject[];
  currentStove: StoveProject | null;
}

const Lightbox = ({ isOpen, onClose, stoves, currentStove }: LightboxProps) => {
  const { i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Set current index based on current stove
  useEffect(() => {
    if (currentStove) {
      const index = stoves.findIndex(stove => stove.id === currentStove.id);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [currentStove, stoves]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") {
        navigatePrev();
      } else if (e.key === "ArrowRight") {
        navigateNext();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, stoves.length]);

  // Navigate to previous stove
  const navigatePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? stoves.length - 1 : prev - 1));
  };

  // Navigate to next stove
  const navigateNext = () => {
    setCurrentIndex((prev) => (prev === stoves.length - 1 ? 0 : prev + 1));
  };

  // Get current stove data
  const getCurrentStove = () => {
    if (!stoves.length || currentIndex >= stoves.length) return null;
    return stoves[currentIndex];
  };

  const stove = getCurrentStove();
  if (!stove) return null;

  const currentLanguage = i18n.language;
  const name = currentLanguage === "fr" ? stove.name_fr : stove.name_en;
  const description = currentLanguage === "fr" ? stove.description_fr : stove.description_en;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        ref={dialogRef}
        className="max-w-6xl w-[90vw] h-[80vh] p-0 bg-black/95 border-none overflow-hidden flex flex-col"
      >
        <div className="absolute right-4 top-4 z-50">
          <button 
            onClick={onClose}
            className="rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex-1 relative overflow-hidden">
          <img
            src={stove.image}
            alt={name}
            className="absolute inset-0 w-full h-full object-contain"
          />
          
          {/* Navigation buttons */}
          <button
            onClick={navigatePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/80 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={navigateNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/80 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        {/* Caption */}
        <div className="p-4 bg-black/70 text-white">
          <h3 className="text-xl font-serif">{name}</h3>
          <p className="text-[#E5E5E5] text-sm">{description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Lightbox;
