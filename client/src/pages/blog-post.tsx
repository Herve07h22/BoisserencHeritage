import { useParams, Link } from "wouter";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";
import { getLocalizedBlogPosts, formatDate, getCategoryLabel } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { Calendar, Folder, ArrowLeft, Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const BlogPostPage = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  
  // Fetch the specific blog post
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${slug}`],
  });
  
  // Fetch all blog posts to get related ones
  const { data: allPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });
  
  // If the post is loading, show a loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F8F5F1]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7D2027]"></div>
      </div>
    );
  }
  
  // If there's an error or no post found, show an error message
  if (error || !post) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#F8F5F1]">
        <h2 className="text-2xl font-serif font-bold text-[#333333] mb-4">
          {i18n.language === 'fr' ? 'Article non trouvé' : 'Article not found'}
        </h2>
        <p className="text-[#333333] mb-6">
          {i18n.language === 'fr'
            ? 'L\'article que vous cherchez n\'existe pas ou a été déplacé.'
            : 'The article you are looking for does not exist or has been moved.'}
        </p>
        <Link href="/blog">
          <Button className="bg-[#7D2027] hover:bg-[#9D3F43] text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {i18n.language === 'fr' ? 'Retour au blog' : 'Back to blog'}
          </Button>
        </Link>
      </div>
    );
  }
  
  // Get localized content
  const title = i18n.language === 'fr' ? post.title_fr : post.title_en;
  const content = i18n.language === 'fr' ? post.content_fr : post.content_en;
  const categoryLabel = getCategoryLabel(post.category, i18n.language);
  const formattedDate = formatDate(post.createdAt, i18n.language);
  
  // Get related posts (same category, excluding current)
  const relatedPosts = getLocalizedBlogPosts(
    allPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 2),
    i18n.language
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0 bg-black">
          <img 
            src={post.image} 
            alt={title} 
            className="object-cover h-full w-full object-center opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <Link href="/blog">
              <a className="inline-flex items-center text-[#B87333] hover:text-[#D19A66] transition-colors mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {i18n.language === 'fr' ? 'Retour au blog' : 'Back to blog'}
              </a>
            </Link>
            <div className="flex items-center text-sm text-white mb-4">
              <span className="flex items-center mr-4">
                <Calendar className="mr-2 h-4 w-4 text-[#B87333]" />
                {formattedDate}
              </span>
              <span className="flex items-center">
                <Folder className="mr-2 h-4 w-4 text-[#B87333]" />
                {categoryLabel}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight shadow-sm">
              {title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="prose prose-lg max-w-none">
                {/* This is a simple placeholder. In a real implementation, you would parse the HTML content */}
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </article>
              
              {/* Share */}
              <div className="mt-12 pt-8 border-t border-[#E5E5E5]">
                <h3 className="text-xl font-serif font-bold text-[#333333] mb-4">
                  {i18n.language === 'fr' ? 'Partager cet article' : 'Share this article'}
                </h3>
                <div className="flex space-x-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#7D2027] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#F8F5F1] p-6 rounded shadow-md mb-8">
                <h3 className="text-xl font-serif font-bold text-[#333333] mb-4 border-b border-[#E5E5E5] pb-2">
                  {i18n.language === 'fr' ? 'Articles similaires' : 'Similar articles'}
                </h3>
                {relatedPosts.length > 0 ? (
                  <div className="space-y-6">
                    {relatedPosts.map((related) => (
                      <div key={related.id} className="flex items-start">
                        <Link href={`/blog/${related.slug}`}>
                          <a className="block w-24 h-24 rounded overflow-hidden shrink-0 mr-4">
                            <img 
                              src={related.image} 
                              alt={related.title} 
                              className="w-full h-full object-cover"
                            />
                          </a>
                        </Link>
                        <div>
                          <h4 className="font-medium text-[#333333] hover:text-[#7D2027] transition-colors">
                            <Link href={`/blog/${related.slug}`}>
                              <a>{related.title}</a>
                            </Link>
                          </h4>
                          <p className="text-sm text-[#333333]/70">{related.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#333333]">
                    {i18n.language === 'fr'
                      ? 'Aucun article similaire trouvé.'
                      : 'No similar articles found.'}
                  </p>
                )}
              </div>
              
              <div className="bg-[#F8F5F1] p-6 rounded shadow-md">
                <h3 className="text-xl font-serif font-bold text-[#333333] mb-4 border-b border-[#E5E5E5] pb-2">
                  {i18n.language === 'fr' ? 'À propos de nous' : 'About us'}
                </h3>
                <p className="text-[#333333] mb-4">
                  {i18n.language === 'fr'
                    ? 'Atelier Boisserenc est spécialisé dans la restauration et fabrication sur-mesure de fourneaux stéphanois anciens, perpétuant un savoir-faire unique depuis 1987.'
                    : 'Atelier Boisserenc specializes in the restoration and custom manufacturing of antique Stéphanois stoves, perpetuating a unique know-how since 1987.'}
                </p>
                <Link href="/about">
                  <Button variant="outline" className="w-full border-[#7D2027] text-[#7D2027] hover:bg-[#7D2027] hover:text-white">
                    {i18n.language === 'fr' ? 'En savoir plus' : 'Learn more'}
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
            {i18n.language === 'fr' 
              ? 'Intéressé par nos services ?' 
              : 'Interested in our services?'}
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-[#E5E5E5]">
            {i18n.language === 'fr'
              ? 'Découvrez comment nous pouvons restaurer ou créer le fourneau de vos rêves.'
              : 'Discover how we can restore or create the stove of your dreams.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contact">
              <Button className="px-8 py-3 bg-white text-[#7D2027] hover:bg-[#F8F5F1] transition-colors duration-300">
                {i18n.language === 'fr' ? 'Nous contacter' : 'Contact us'}
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="px-8 py-3 border border-white hover:bg-white/10 transition-colors duration-300">
                {i18n.language === 'fr' ? 'Voir nos services' : 'View our services'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPostPage;
