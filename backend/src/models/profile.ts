import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProfile = async (
    userId: string,
    bio: string,
    interests: string[],
    firstName: string,
    lastName: string,
    email: string,
    phone: string
) => {
    return await prisma.profile.create({
        data: {
            userId,
            bio,
            interests,
            firstName,
            lastName,
            email,
            phone,
            isActive: true, // Mark the profile as active by default
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
};

export const getProfile = async (userId: string) => {
    return await prisma.profile.findUnique({
        where: { userId },
    });
};

export const updateProfile = async (
    userId: string,
    updates: Partial<{
        bio: string;
        interests: string[];
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        isActive: boolean;
    }>
) => {
    return await prisma.profile.update({
        where: { userId },
        data: {
            ...updates,
            updatedAt: new Date(),
        },
    });
};