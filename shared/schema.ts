import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema for admin authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Contact message schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Blog post schema
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title_fr: text("title_fr").notNull(),
  title_en: text("title_en").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt_fr: text("excerpt_fr").notNull(),
  excerpt_en: text("excerpt_en").notNull(),
  content_fr: text("content_fr").notNull(),
  content_en: text("content_en").notNull(),
  category: text("category").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Creation/stove project schema
export const stoveProjects = pgTable("stove_projects", {
  id: serial("id").primaryKey(),
  name_fr: text("name_fr").notNull(),
  name_en: text("name_en").notNull(),
  description_fr: text("description_fr").notNull(),
  description_en: text("description_en").notNull(),
  category: text("category").notNull(),
  year: text("year"),
  image: text("image").notNull(),
  featured: integer("featured").default(0),
});

// Testimonial schema
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position_fr: text("position_fr").notNull(),
  position_en: text("position_en").notNull(),
  content_fr: text("content_fr").notNull(),
  content_en: text("content_en").notNull(),
  rating: integer("rating").default(5),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  phone: true,
  service: true,
  message: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
});

export const insertStoveProjectSchema = createInsertSchema(stoveProjects).omit({
  id: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type InsertStoveProject = z.infer<typeof insertStoveProjectSchema>;
export type StoveProject = typeof stoveProjects.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
