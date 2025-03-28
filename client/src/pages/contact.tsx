import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Clock, Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";

const ContactPage = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  
  // Create zod schema for the form
  const formSchema = insertContactMessageSchema.extend({
    agreedToPrivacy: z.boolean().refine(val => val === true, {
      message: i18n.language === 'fr' 
        ? "Vous devez accepter la politique de confidentialité" 
        : "You must accept the privacy policy",
    }),
  });
  
  // Create the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      agreedToPrivacy: false,
    },
  });
  
  // Submit mutation
  const contactMutation = useMutation({
    mutationFn: (values: z.infer<typeof insertContactMessageSchema>) => {
      return apiRequest("POST", "/api/contact", values);
    },
    onSuccess: () => {
      toast({
        title: i18n.language === 'fr' ? "Message envoyé !" : "Message sent!",
        description: i18n.language === 'fr' 
          ? "Nous vous contacterons très bientôt." 
          : "We will contact you very soon.",
        variant: "default",
      });
      form.reset();
      setAgreedToPrivacy(false);
    },
    onError: (error) => {
      toast({
        title: i18n.language === 'fr' ? "Erreur" : "Error",
        description: i18n.language === 'fr'
          ? "Une erreur est survenue. Veuillez réessayer."
          : "An error occurred. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    },
  });
  
  // Form submission handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Extract the agreedToPrivacy field before sending to API
    const { agreedToPrivacy, ...contactData } = values;
    contactMutation.mutate(contactData);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1590568619472-4a141bf0f7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Contact Boisserenc" 
            className="object-cover h-full w-full object-center opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <span className="inline-block mb-4 text-[#B87333] border-b border-[#B87333] pb-1 font-serif text-lg md:text-xl">
              {t("home.contact.subtitle")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight shadow-sm">
              {t("home.contact.title")}
            </h1>
            <p className="text-lg md:text-xl text-[#E5E5E5] mb-8 max-w-xl font-light">
              {t("home.contact.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#F8F5F1]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div>
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-[#7D2027]/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <MapPin className="text-[#7D2027]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#333333] mb-1">{t("home.contact.workshop")}</h3>
                    <p>42 Rue des Artisans<br/>42000 Saint-Étienne, France</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#7D2027]/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <Clock className="text-[#7D2027]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#333333] mb-1">{t("home.contact.hours")}</h3>
                    <p className="whitespace-pre-line">{t("home.contact.hoursDetails")}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#7D2027]/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <Phone className="text-[#7D2027]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#333333] mb-1">{t("home.contact.phone")}</h3>
                    <p>+33 4 77 XX XX XX</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#7D2027]/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <Mail className="text-[#7D2027]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#333333] mb-1">{t("home.contact.email")}</h3>
                    <p>contact@boisserenc.com</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-[#7D2027] hover:bg-[#9D3F43] text-white rounded-full flex items-center justify-center transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#7D2027] hover:bg-[#9D3F43] text-white rounded-full flex items-center justify-center transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#7D2027] hover:bg-[#9D3F43] text-white rounded-full flex items-center justify-center transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-[#333333] mb-6">{t("home.contact.form.title")}</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("home.contact.form.name")}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={t("home.contact.form.namePlaceholder")} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("home.contact.form.emailField")}</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder={t("home.contact.form.emailPlaceholder")} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("home.contact.form.phone")}</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder={t("home.contact.form.phonePlaceholder")} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("home.contact.form.service")}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("home.contact.form.servicePlaceholder")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="restoration">
                              {t("home.contact.form.services.restoration")}
                            </SelectItem>
                            <SelectItem value="custom">
                              {t("home.contact.form.services.custom")}
                            </SelectItem>
                            <SelectItem value="advice">
                              {t("home.contact.form.services.advice")}
                            </SelectItem>
                            <SelectItem value="other">
                              {t("home.contact.form.services.other")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("home.contact.form.message")}</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={5}
                            placeholder={t("home.contact.form.messagePlaceholder")} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="agreedToPrivacy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            {t("home.contact.form.privacy")} <a href="#" className="text-[#7D2027] hover:underline">{t("home.contact.form.privacyLink")}</a>.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full py-3 bg-[#7D2027] hover:bg-[#9D3F43] text-white"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending 
                      ? (i18n.language === 'fr' ? 'Envoi en cours...' : 'Sending...') 
                      : t("home.contact.form.submit")}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 relative overflow-hidden">
        {/* Map will be implemented with a real map library in production */}
        <div className="absolute inset-0 bg-[#E5E5E5]/20 flex items-center justify-center">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44740.66345103855!2d4.36744455!3d45.43985755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f5a96be2818d0d%3A0x408ab2ae4bffd30!2sSaint-%C3%89tienne%2C%20France!5e0!3m2!1sen!2sth!4v1693292348129!5m2!1sen!2sth" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#7D2027] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {t("home.final.title")}
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-[#E5E5E5]">
            {t("home.final.description")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="px-8 py-3 bg-white text-[#7D2027] hover:bg-[#F8F5F1] transition-colors duration-300">
              {t("cta.appointment")}
            </Button>
            <Button variant="outline" className="px-8 py-3 border border-white hover:bg-white/10 transition-colors duration-300">
              {t("cta.discover")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
