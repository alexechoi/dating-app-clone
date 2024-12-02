import { Request, Response, NextFunction } from 'express';
import { supabase } from '../lib/supabaseClient';

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: any; // Replace 'any' with the specific user type if available
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token format

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Attach the user to the request object
    req.user = data.user;

    next();
};