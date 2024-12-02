import http from 'http';
import app from './app';
import { PrismaClient } from '@prisma/client';
import { supabase } from './lib/supabaseClient';

const prisma = new PrismaClient();

const PORT = process.env.PORT || 4000;

// Initialize the server
const server = http.createServer(app);

// Test Prisma and Supabase connection
const initializeConnections = async () => {
    try {
        // Test Prisma connection
        await prisma.$connect();
        console.log('✅ Connected to the database via Prisma.');

        // Test Supabase connection (optional)
        const { data, error } = await supabase.from('users').select('*').limit(1);
        if (error) throw error;
        console.log('✅ Connected to Supabase successfully.');
    } catch (error) {
        console.error('❌ Error connecting to database services:', error);
        process.exit(1);
    }
};

// Start the server
server.listen(PORT, async () => {
    await initializeConnections();
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});