import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch all messages in a conversation
export const getMessages = async (matchId: string) => {
    return await prisma.message.findMany({
        where: { matchId },
        orderBy: { createdAt: 'asc' }, // Sort messages by the time they were sent
    });
};

// Send a new message in a conversation
export const sendMessage = async (matchId: string, senderId: string, content: string) => {
    return await prisma.message.create({
        data: {
            matchId,
            senderId,
            content,
            createdAt: new Date(), // Automatically set the timestamp
        },
    });
};