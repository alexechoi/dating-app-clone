import { PrismaClient, type Match } from '@prisma/client';

const prisma = new PrismaClient();

export const createMatch = async (userId1: string, userId2: string): Promise<Match> => {
    return await prisma.match.create({
        data: {
            userId1,
            userId2,
            createdAt: new Date(),
        },
    });
};

export const getMatches = async (userId: string): Promise<Match[]> => {
    return await prisma.match.findMany({
        where: {
            OR: [{ userId1: userId }, { userId2: userId }],
        },
        orderBy: { createdAt: 'desc' },
    });
};