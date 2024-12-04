import { Router } from 'express';
import { createMatch, getMatches } from '../models/match';
import { getProfile } from '../models/profile';

const router = Router();

// Get potential matches for a user
router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId as string;

        // Example: Fetch potential matches using filters (e.g., exclude current matches)
        const profile = await getProfile(userId);
        if (!profile) return res.status(404).json({ error: 'Profile not found' });

        // Example: Add filtering logic (e.g., based on location, interests, etc.)
        const matches: any[] = []; // Replace with actual filtered potential matches logic

        res.status(200).json({ matches });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Like a user (create match)
router.post('/like', async (req, res) => {
    try {
        const { userId, likedUserId } = req.body;

        if (!userId || !likedUserId) {
            return res.status(400).json({ error: 'Both userId and likedUserId are required' });
        }

        const match = await createMatch(userId, likedUserId);
        res.status(201).json({ message: 'User liked successfully', match });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all matches
router.get('/matches', async (req, res) => {
    try {
        const userId = req.query.userId as string;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        const matches = await getMatches(userId);
        res.status(200).json({ matches });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;