import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const LanguageToggle = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  
  // Toggle language
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="text-sm flex items-center text-white focus:outline-none">
        <span className="mr-1">{t(`language.${i18n.language}`)}</span>
        <ChevronDown className="h-3 w-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white text-[#333333] shadow-md rounded mt-1 z-10 min-w-[80px]">
        <DropdownMenuItem 
          className="py-2 px-4 hover:text-[#7D2027] cursor-pointer"
          onClick={() => changeLanguage("fr")}
        >
          {t("language.fr")}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="py-2 px-4 hover:text-[#7D2027] cursor-pointer"
          onClick={() => changeLanguage("en")}
        >
          {t("language.en")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
