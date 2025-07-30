import { Router } from 'express';
import { db } from '../db';
import { messages } from '../db/schema';
import { auth, AuthRequest } from '../middleware/auth';
import { eq, and } from 'drizzle-orm';
import { Request, Response } from 'express';
const router = Router();

// Get all messages
router.get('/', auth, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const allMessages = await db.select().from(messages);
    return res.json(allMessages);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching messages' });
  }
});

// Get message by id
router.get('/:id', auth, async (req: AuthRequest, res: Response): Promise<any> => {
  const { id } = req.params;
  const [message] = await db
    .select()
    .from(messages)
    .where(eq(messages.id, parseInt(id)))

  return res.json(message);
});

// Create message
router.post('/', auth, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { content } = req.body;

    const [newMessage] = await db
      .insert(messages)
      .values({
        content,
        userId: req.user!.id,
      })
      .returning();

    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(400).json({ error: 'Error creating message' });
  }
});

// Update message
router.patch('/:id', auth, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Check if message exists and belongs to user
    const [message] = await db
      .select()
      .from(messages)
      .where(and(eq(messages.id, parseInt(id)), eq(messages.userId, req.user!.id)));

    if (!message) {
      return res.status(404).json({ error: 'Message not found or unauthorized' });
    }

    const [updatedMessage] = await db
      .update(messages)
      .set({ content, updatedAt: new Date() })
      .where(eq(messages.id, parseInt(id)))
      .returning();

    return res.json(updatedMessage);
  } catch (error) {
    return res.status(400).json({ error: 'Error updating message' });
  }
});

// Delete message
router.delete('/:id', auth, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    // Check if message exists and belongs to user
    const [message] = await db
      .select()
      .from(messages)
      .where(and(eq(messages.id, parseInt(id)), eq(messages.userId, req.user!.id)));

    if (!message) {
      return res.status(404).json({ error: 'Message not found or unauthorized' });
    }

    await db.delete(messages).where(eq(messages.id, parseInt(id)));

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: 'Error deleting message' });
  }
});

export default router;
