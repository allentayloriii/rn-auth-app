import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { Request, Response, Router } from "express";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { db } from "../db";
import { users } from "../db/schema";
import { auth, AuthRequest } from "../middleware/auth";
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/avatars",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: Images only!"));
  },
});

// Register
router.post("/register", async (req: Request, res: Response): Promise<any> => {
  console.log("Registering user:", req.body);
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    console.log("Check if user exists");
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (existingUser.length > 0) {
      console.log("Email already exists:", email);
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    console.log("Hash password");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    console.log("Create user");
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        name,
      })
      .returning();

    // Generate token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET
    );

    return res.status(201).json({ token });
  } catch (error) {
    console.log("Error creating user:", error);
    return res.status(400).json({ error: "Error creating user" });
  }
});

// Login
router.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Find user
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

    return res.json({ token });
  } catch (error) {
    return res.status(400).json({ error: "Error logging in" });
  }
});

// Get User Info
router.get(
  "/me",
  auth,
  async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      // Get full user info from database
      const [userInfo] = await db
        .select()
        .from(users)
        .where(eq(users.id, req.user!.id));

      if (!userInfo) {
        return res.status(404).json({ error: "User not found" });
      }

      // Don't send password back to client
      const { password: _, ...userWithoutPassword } = userInfo;

      return res.json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Error fetching user info" });
    }
  }
);

// Upload avatar
router.post(
  "/me/avatar",
  auth,
  upload.single("avatar"),
  async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Please upload a file" });
      }
      // Get current user to check for existing avatar
      const [currentUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, req.user!.id));

      // If user has an existing avatar, delete it
      if (currentUser?.avatar) {
        const oldAvatarPath = path.join(__dirname, "../..", currentUser.avatar);
        try {
          await fs.unlink(oldAvatarPath);
        } catch (err) {
          console.error("Error deleting old avatar:", err);
          // Continue even if delete fails
        }
      }

      const avatarPath = `/uploads/avatars/${req.file!.filename}`;

      await db
        .update(users)
        .set({ avatar: avatarPath })
        .where(eq(users.id, req.user!.id));
      return res.json({ avatar: avatarPath });
    } catch (error) {
      return res.status(400).json({ error: "Error uploading avatar" });
    }
  }
);

export default router;
