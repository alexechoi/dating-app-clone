import { PrismaClient } from '@prisma/client';
import { supabase } from '../lib/supabaseClient';

const prisma = new PrismaClient();

// Use Supabase for user authentication
export const signupUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
) => {
    // Create Supabase user
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);

    // Create corresponding user in Prisma
    await prisma.user.create({
        data: {
            id: data.user?.id, // Use Supabase's generated user ID
            email,
            firstName,
            lastName,
            phone,
            isActive: true, // Mark the user as active
            createdAt: new Date(),
        },
    });

    return data;
};

// Get user by email using Prisma
export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email },
    });
};

// Use Supabase to fetch the authenticated user
export const getCurrentUser = async (token: string) => {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw new Error(error.message);
    return data.user;
};