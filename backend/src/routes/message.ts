import { Router } from 'express';

const router = Router();

// Get conversation history
router.get('/:matchId', async (req, res) => {
    const { matchId } = req.params;
    // Fetch messages logic
    res.status(200).json({ messages: [] });
});

// Send a new message
router.post('/:matchId', async (req, res) => {
    const { matchId } = req.params;
    const { senderId, content } = req.body;
    // Send message logic
    res.status(201).json({ message: 'Message sent successfully' });
});

export default router;