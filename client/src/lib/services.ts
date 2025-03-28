export interface Service {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  features: string[];
  linkKey: string;
}

export const services: Service[] = [
  {
    id: "restoration",
    icon: "tools",
    titleKey: "services.restoration.title",
    descriptionKey: "services.restoration.description",
    features: [
      "services.restoration.features.diagnostic",
      "services.restoration.features.dismantling", 
      "services.restoration.features.adaptation",
      "services.restoration.features.installation"
    ],
    linkKey: "services.restoration.cta"
  },
  {
    id: "custom",
    icon: "drafting-compass",
    titleKey: "services.custom.title",
    descriptionKey: "services.custom.description",
    features: [
      "services.custom.features.design",
      "services.custom.features.materials", 
      "services.custom.features.techniques",
      "services.custom.features.integration"
    ],
    linkKey: "services.custom.cta"
  },
  {
    id: "expertise",
    icon: "hand-holding-heart",
    titleKey: "services.expertise.title",
    descriptionKey: "services.expertise.description",
    features: [
      "services.expertise.features.authentication",
      "services.expertise.features.valuation", 
      "services.expertise.features.maintenance",
      "services.expertise.features.sourcing"
    ],
    linkKey: "services.expertise.cta"
  }
];
