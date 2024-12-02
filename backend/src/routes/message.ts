import { Router } from 'express';
import { getMessages, sendMessage } from '../models/message';

const router = Router();

// Get conversation history
router.get('/:matchId', async (req, res) => {
    try {
        const { matchId } = req.params;

        if (!matchId) {
            return res.status(400).json({ error: 'matchId is required' });
        }

        const messages = await getMessages(matchId);
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Send a new message
router.post('/:matchId', async (req, res) => {
    try {
        const { matchId } = req.params;
        const { senderId, content } = req.body;

        if (!matchId || !senderId || !content) {
            return res.status(400).json({ error: 'matchId, senderId, and content are required' });
        }

        const message = await sendMessage(matchId, senderId, content);
        res.status(201).json({ message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;