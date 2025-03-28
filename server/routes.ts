import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/blog", async (req: Request, res: Response) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req: Request, res: Response) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.get("/api/stoves", async (req: Request, res: Response) => {
    try {
      const stoves = await storage.getStoveProjects();
      res.json(stoves);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stove projects" });
    }
  });

  app.get("/api/stoves/featured", async (req: Request, res: Response) => {
    try {
      const stoves = await storage.getFeaturedStoveProjects();
      res.json(stoves);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured stove projects" });
    }
  });

  app.get("/api/stoves/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const stove = await storage.getStoveProjectById(id);
      if (!stove) {
        return res.status(404).json({ message: "Stove project not found" });
      }
      
      res.json(stove);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stove project" });
    }
  });

  app.get("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      const savedContact = await storage.createContactMessage(contactData);
      res.status(201).json(savedContact);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
