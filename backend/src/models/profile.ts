import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProfile = async (userId: string, bio: string, interests: string[]) => {
    return await prisma.profile.create({
        data: {
            userId,
            bio,
            interests,
        },
    });
};

export const getProfile = async (userId: string) => {
    return await prisma.profile.findUnique({
        where: { userId },
    });
};