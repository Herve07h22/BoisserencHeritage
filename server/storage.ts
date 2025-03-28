import { 
  users, type User, type InsertUser,
  contactMessages, type ContactMessage, type InsertContactMessage,
  blogPosts, type BlogPost, type InsertBlogPost,
  stoveProjects, type StoveProject, type InsertStoveProject,
  testimonials, type Testimonial, type InsertTestimonial 
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Blog post methods
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  
  // Stove project methods
  createStoveProject(project: InsertStoveProject): Promise<StoveProject>;
  getStoveProjects(): Promise<StoveProject[]>;
  getFeaturedStoveProjects(): Promise<StoveProject[]>;
  getStoveProjectById(id: number): Promise<StoveProject | undefined>;
  
  // Testimonial methods
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getTestimonials(): Promise<Testimonial[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private blogPosts: Map<number, BlogPost>;
  private stoveProjects: Map<number, StoveProject>;
  private testimonials: Map<number, Testimonial>;
  
  private nextUserId: number;
  private nextContactMessageId: number;
  private nextBlogPostId: number;
  private nextStoveProjectId: number;
  private nextTestimonialId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.blogPosts = new Map();
    this.stoveProjects = new Map();
    this.testimonials = new Map();
    
    this.nextUserId = 1;
    this.nextContactMessageId = 1;
    this.nextBlogPostId = 1;
    this.nextStoveProjectId = 1;
    this.nextTestimonialId = 1;
    
    // Initialize with sample data
    this.initBlogPosts();
    this.initStoveProjects();
    this.initTestimonials();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.nextUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.nextContactMessageId++;
    const createdAt = new Date();
    const contactMessage: ContactMessage = { 
      ...message, 
      id, 
      createdAt,
      phone: message.phone || null,
      service: message.service || null
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  // Blog post methods
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.nextBlogPostId++;
    const createdAt = new Date();
    const blogPost: BlogPost = { 
      ...post, 
      id, 
      createdAt,
      image: post.image || null 
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
  
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
  }
  
  // Stove project methods
  async createStoveProject(project: InsertStoveProject): Promise<StoveProject> {
    const id = this.nextStoveProjectId++;
    const stoveProject: StoveProject = { 
      ...project, 
      id,
      year: project.year || null,
      featured: project.featured || 0 
    };
    this.stoveProjects.set(id, stoveProject);
    return stoveProject;
  }
  
  async getStoveProjects(): Promise<StoveProject[]> {
    return Array.from(this.stoveProjects.values());
  }
  
  async getFeaturedStoveProjects(): Promise<StoveProject[]> {
    return Array.from(this.stoveProjects.values())
      .filter(project => project.featured !== null && project.featured > 0)
      .sort((a, b) => (a.featured || 0) - (b.featured || 0));
  }
  
  async getStoveProjectById(id: number): Promise<StoveProject | undefined> {
    return this.stoveProjects.get(id);
  }
  
  // Testimonial methods
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.nextTestimonialId++;
    const newTestimonial: Testimonial = { 
      ...testimonial, 
      id,
      rating: testimonial.rating || null 
    };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
  
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  // Initialize sample data
  private initBlogPosts() {
    [
      {
        title_fr: "L'histoire fascinante des fourneaux stéphanois",
        title_en: "The fascinating history of Stéphanois stoves",
        slug: "histoire-fourneaux-stephanois",
        excerpt_fr: "Découvrez l'histoire riche et passionnante des fourneaux stéphanois qui ont révolutionné les cuisines françaises au XIXe siècle.",
        excerpt_en: "Discover the rich and fascinating history of Stéphanois stoves that revolutionized French kitchens in the 19th century.",
        content_fr: "L'histoire complète des fourneaux stéphanois...",
        content_en: "The complete history of Stéphanois stoves...",
        category: "histoire",
        image: "https://www.boisserenc.com/images/projects/creation-cuisson-9831-JAMin.jpg"
      },
      {
        title_fr: "5 conseils pour entretenir votre fourneau ancien",
        title_en: "5 tips for maintaining your antique stove",
        slug: "conseils-entretien-fourneau-ancien",
        excerpt_fr: "Découvrez nos meilleures astuces pour prolonger la durée de vie de votre fourneau ancien et maintenir ses performances optimales.",
        excerpt_en: "Discover our best tips to extend the life of your antique stove and maintain its optimal performance.",
        content_fr: "Des conseils d'entretien pour votre fourneau ancien...",
        content_en: "Maintenance tips for your antique stove...",
        category: "conseils",
        image: "https://www.boisserenc.com/images/projects/creation-cuisson-bois-5321-WAS.jpg"
      },
      {
        title_fr: "Restauration exceptionnelle : Le fourneau du Château de Versailles",
        title_en: "Exceptional restoration: The stove of the Palace of Versailles",
        slug: "restauration-fourneau-versailles",
        excerpt_fr: "Plongez dans les coulisses de notre dernier projet de restauration pour les cuisines historiques du Château de Versailles.",
        excerpt_en: "Go behind the scenes of our latest restoration project for the historic kitchens of the Palace of Versailles.",
        content_fr: "La restauration du fourneau du Château de Versailles...",
        content_en: "The restoration of the Palace of Versailles' stove...",
        category: "projets",
        image: "https://www.boisserenc.com/images/projects/fourneaux-cuisson-bois-2725-PASSlaigue.jpg"
      }
    ].forEach(post => {
      this.createBlogPost(post);
    });
  }
  
  private initStoveProjects() {
    [
      {
        name_fr: "Le Grand Palais",
        name_en: "The Grand Palais",
        description_fr: "Fourneau stéphanois, circa 1890",
        description_en: "Stéphanois stove, circa 1890",
        category: "restoration",
        year: "1890",
        image: "https://www.boisserenc.com/images/projects/creation-cuisson-SUDAN-RIAL.jpg",
        featured: 1
      },
      {
        name_fr: "Château Lafitte",
        name_en: "Château Lafitte",
        description_fr: "Création sur-mesure, 2019",
        description_en: "Custom creation, 2019",
        category: "custom",
        year: "2019",
        image: "https://www.boisserenc.com/images/projects/creation-cuisson-9831-JAMin.jpg",
        featured: 2
      },
      {
        name_fr: "Villa Médicis",
        name_en: "Villa Medici",
        description_fr: "Cuisinière, circa 1920",
        description_en: "Kitchen stove, circa 1920",
        category: "kitchen",
        year: "1920",
        image: "https://www.boisserenc.com/images/projects/creation-modeles-mixtes-1314-HELMs.jpg",
        featured: 3
      },
      {
        name_fr: "Hôtel de Paris",
        name_en: "Hotel de Paris",
        description_fr: "Fourneau stéphanois, circa 1905",
        description_en: "Stéphanois stove, circa 1905",
        category: "restoration",
        year: "1905",
        image: "https://www.boisserenc.com/images/projects/creation-cuisson-bois-5321-WAS.jpg",
        featured: 4
      },
      {
        name_fr: "L'Impérial",
        name_en: "The Imperial",
        description_fr: "Création sur-mesure, 2021",
        description_en: "Custom creation, 2021",
        category: "custom",
        year: "2021",
        image: "https://www.boisserenc.com/images/projects/fourneaux-cuisson-bois-2725-PASSlaigue.jpg",
        featured: 0
      },
      {
        name_fr: "Manoir des Bois",
        name_en: "Manoir des Bois",
        description_fr: "Cuisinière, circa 1880",
        description_en: "Kitchen stove, circa 1880",
        category: "kitchen",
        year: "1880",
        image: "https://www.boisserenc.com/images/projects/fourneaux-cuisson-bois-9832-TrD.jpg",
        featured: 0
      }
    ].forEach(project => {
      this.createStoveProject(project);
    });
  }
  
  private initTestimonials() {
    [
      {
        name: "Michel F.",
        position_fr: "Propriétaire, Château de Loire",
        position_en: "Owner, Loire Castle",
        content_fr: "L'équipe de Boisserenc a restauré le fourneau stéphanois de notre château avec un respect extraordinaire pour son histoire et ses détails d'origine. Un travail d'orfèvre.",
        content_en: "The Boisserenc team restored our château's Stéphanois stove with extraordinary respect for its history and original details. A masterpiece of craftsmanship.",
        rating: 5
      },
      {
        name: "Sophie D.",
        position_fr: "Chef, Restaurant étoilé",
        position_en: "Chef, Starred Restaurant",
        content_fr: "Notre fourneau sur-mesure est devenu la pièce maîtresse de notre cuisine. Le mariage entre l'esthétique traditionnelle et les fonctionnalités modernes est parfaitement réussi.",
        content_en: "Our custom stove has become the centerpiece of our kitchen. The marriage between traditional aesthetics and modern functionality is perfectly executed.",
        rating: 5
      },
      {
        name: "Jean-Pierre L.",
        position_fr: "Collectionneur, Paris",
        position_en: "Collector, Paris",
        content_fr: "L'expertise et les conseils prodigués par Boisserenc ont été déterminants dans notre choix d'acquisition d'un fourneau ancien. Leur service d'accompagnement est inestimable.",
        content_en: "The expertise and advice provided by Boisserenc were decisive in our choice to acquire an antique stove. Their support service is invaluable.",
        rating: 5
      }
    ].forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
}

export const storage = new MemStorage();
