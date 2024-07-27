/* eslint-disable camelcase */
"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { getUserByEmail, getUserById } from "@/data/auth/user";
import { currentUser } from "@/lib/auth";
import { unstable_update } from "@/services/auth";
import { db } from "@/services/database";
import { sendVerificationEmail } from "@/services/mail";
import { generateVerificationToken } from "@/services/token";

import { updateUserSchema } from "./schema";

export const profileActions = async (
    values: z.infer<typeof updateUserSchema>,
) => {
    const user = await currentUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);
    if (!dbUser) {
        return { error: "Unauthorized" };
    }

    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);

        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email already in use!" };
        }

        const verificationToken = await generateVerificationToken(values.email);
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        );

        return { success: "Verification email sent!" };
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordsMatch = await bcrypt.compare(
            values.password,
            dbUser.password,
        );

        if (!passwordsMatch) {
            return { error: "Incorrect password!" };
        }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10);
        values.password = hashedPassword;
        values.newPassword = undefined;
    }

    const updatedUser = await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values,
        },
    });

    unstable_update({
        user: {
            name: updatedUser.name,
            email: updatedUser.email,
            isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
            role: updatedUser.role,
        },
    });

    return { success: "User Updated!" };
};
