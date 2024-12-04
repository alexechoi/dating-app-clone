import { Router } from 'express';
import { getMessages, sendMessage } from '../models/message';

const router = Router();

// Get all messages in a conversation
router.get('/', async (req, res) => {
    try {
        const matchId = req.query.matchId as string;

        if (!matchId) {
            return res.status(400).json({ error: 'matchId is required' });
        }

        const messages = await getMessages(matchId);
        res.status(200).json({ messages });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Send a new message
router.post('/', async (req, res) => {
    try {
        const { matchId, senderId, content } = req.body;

        if (!matchId || !senderId || !content) {
            return res.status(400).json({ error: 'matchId, senderId, and content are required' });
        }

        const message = await sendMessage(matchId, senderId, content);
        res.status(201).json({ message });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;