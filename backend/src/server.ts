import http from 'http';
import app from './app';
import { PrismaClient } from '@prisma/client';
import { supabase } from './lib/supabaseClient';

const prisma = new PrismaClient();

const PORT = process.env.PORT || 4000;

// Validate environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_KEY in environment variables.');
    process.exit(1);
}

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

// Graceful shutdown
const shutdown = async () => {
    console.log('🚦 Shutting down gracefully...');
    await prisma.$disconnect();
    server.close(() => {
        console.log('💤 Server shut down.');
        process.exit(0);
    });
};

// Listen for termination signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Start the server
server.listen(PORT, async () => {
    await initializeConnections();
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});