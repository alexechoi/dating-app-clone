import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createMatch = async (userId1: string, userId2: string) => {
    return await prisma.match.create({
        data: {
            userId1,
            userId2,
            createdAt: new Date(), // Timestamp when the match is created
        },
    });
};

export const getMatches = async (userId: string) => {
    return await prisma.match.findMany({
        where: {
            OR: [{ userId1: userId }, { userId2: userId }],
        },
        orderBy: { createdAt: 'desc' }, // Sort matches by most recent
    });
};