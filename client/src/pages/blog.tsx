import { useState } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";
import { getLocalizedBlogPosts, categories, getCategoryLabel } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Fetch blog posts
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });
  
  // Get localized blog posts
  const localizedPosts = getLocalizedBlogPosts(posts, i18n.language);
  
  // Filter posts by category
  const filteredPosts = activeCategory === "all" 
    ? localizedPosts 
    : localizedPosts.filter(post => post.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1587389871474-6140435d22a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
            alt="Journal Boisserenc" 
            className="object-cover h-full w-full object-center opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <span className="inline-block mb-4 text-[#B87333] border-b border-[#B87333] pb-1 font-serif text-lg md:text-xl">
              {t("home.blog.subtitle")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight shadow-sm">
              {t("home.blog.title")}
            </h1>
            <p className="text-lg md:text-xl text-[#E5E5E5] mb-8 max-w-xl font-light">
              {t("home.blog.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center mb-12 space-x-2 md:space-x-4">
            <Button 
              variant={activeCategory === "all" ? "default" : "outline"}
              className={`mb-2 ${activeCategory === "all" ? "bg-[#7D2027] hover:bg-[#9D3F43]" : "border-[#7D2027] text-[#7D2027] hover:bg-[#7D2027] hover:text-white"}`}
              onClick={() => setActiveCategory("all")}
            >
              {i18n.language === 'fr' ? 'Tous' : 'All'}
            </Button>
            
            {categories.map((category) => (
              <Button 
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`mb-2 ${activeCategory === category.id ? "bg-[#7D2027] hover:bg-[#9D3F43]" : "border-[#7D2027] text-[#7D2027] hover:bg-[#7D2027] hover:text-white"}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {i18n.language === 'fr' ? category.keyFr : category.keyEn}
              </Button>
            ))}
          </div>
          
          {/* Blog Posts Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7D2027]"></div>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-[#F8F5F1] rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <Link href={`/blog/${post.slug}`}>
                    <a className="block h-56 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </a>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-[#333333]/70 mb-3">
                      <span className="mr-4"><i className="far fa-calendar mr-1"></i> {post.date}</span>
                      <span><i className="far fa-folder mr-1"></i> {post.categoryLabel}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#333333] mb-3">
                      <Link href={`/blog/${post.slug}`}>
                        <a className="hover:text-[#7D2027] transition-colors">{post.title}</a>
                      </Link>
                    </h3>
                    <p className="text-[#333333] mb-4">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`}>
                      <a className="text-[#7D2027] hover:text-[#9D3F43] font-medium inline-flex items-center transition-colors">
                        {t("home.blog.readMore")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-serif text-[#333333]">
                {i18n.language === 'fr' 
                  ? 'Aucun article trouvé pour cette catégorie.' 
                  : 'No articles found for this category.'}
              </h3>
              <p className="text-[#333333]/70 mt-2">
                {i18n.language === 'fr'
                  ? 'Veuillez sélectionner une autre catégorie.'
                  : 'Please select another category.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-[#E5E5E5]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#B87333] font-serif text-xl">
              {i18n.language === 'fr' ? 'Restez informé' : 'Stay informed'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] mt-2 mb-4">
              {i18n.language === 'fr' ? 'Inscrivez-vous à notre newsletter' : 'Subscribe to our newsletter'}
            </h2>
            <p className="text-[#333333] mb-8">
              {i18n.language === 'fr'
                ? 'Recevez nos derniers articles, conseils d\'experts et nouvelles de l\'atelier directement dans votre boîte mail.'
                : 'Receive our latest articles, expert advice, and workshop news directly in your inbox.'}
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder={i18n.language === 'fr' ? 'Votre adresse email' : 'Your email address'} 
                className="px-4 py-3 rounded border border-[#CCCCCC] focus:outline-none focus:border-[#7D2027] transition-colors w-full sm:w-auto sm:flex-1"
                required
              />
              <Button className="px-6 py-3 bg-[#7D2027] hover:bg-[#9D3F43] text-white transition-colors duration-300">
                {i18n.language === 'fr' ? 'S\'inscrire' : 'Subscribe'}
              </Button>
            </form>
            
            <p className="text-[#333333]/70 text-sm mt-4">
              {i18n.language === 'fr'
                ? 'En vous inscrivant, vous acceptez notre politique de confidentialité. Vous pourrez vous désinscrire à tout moment.'
                : 'By subscribing, you agree to our privacy policy. You can unsubscribe at any time.'}
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 bg-[#7D2027] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {i18n.language === 'fr' 
              ? 'Vous avez des questions sur nos fourneaux ?' 
              : 'Do you have questions about our stoves?'}
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-[#E5E5E5]">
            {i18n.language === 'fr'
              ? 'Contactez nos experts pour obtenir des conseils personnalisés sur les fourneaux anciens, leur entretien et leur restauration.'
              : 'Contact our experts for personalized advice on antique stoves, their maintenance, and restoration.'}
          </p>
          <Link href="/contact">
            <Button className="px-8 py-3 bg-white text-[#7D2027] hover:bg-[#F8F5F1] transition-colors duration-300">
              {t("cta.contactUs")}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Blog;
