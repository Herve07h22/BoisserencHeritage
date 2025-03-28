import { BlogPost } from "@shared/schema";

export const categories = [
  {
    id: "histoire",
    keyFr: "Histoire",
    keyEn: "History"
  },
  {
    id: "conseils",
    keyFr: "Conseils",
    keyEn: "Tips"
  },
  {
    id: "projets",
    keyFr: "Projets",
    keyEn: "Projects"
  },
  {
    id: "techniques",
    keyFr: "Techniques",
    keyEn: "Techniques"
  }
];

export function formatDate(dateInput: Date | string | number, locale: string): string {
  try {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return locale === 'fr' ? 'Date non disponible' : 'Date unavailable';
  }
}

export function getCategoryLabel(categoryId: string, language: string): string {
  const category = categories.find(c => c.id === categoryId);
  if (!category) return categoryId;
  return language === 'fr' ? category.keyFr : category.keyEn;
}

export function getLocalizedBlogPosts(posts: BlogPost[], language: string): any[] {
  return posts.map(post => ({
    id: post.id,
    title: language === 'fr' ? post.title_fr : post.title_en,
    excerpt: language === 'fr' ? post.excerpt_fr : post.excerpt_en,
    content: language === 'fr' ? post.content_fr : post.content_en,
    slug: post.slug,
    category: post.category,
    categoryLabel: getCategoryLabel(post.category, language),
    image: post.image,
    date: formatDate(post.createdAt, language)
  }));
}
