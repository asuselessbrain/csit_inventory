"use client";

import { getCurrentUser } from "@/services/authService/auth.client";
import { IUser } from "@/types";
import { createContext, useContext, useState } from "react";

type UserContextType = {
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    loadUser: () => void;
    loading: boolean
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(() => getCurrentUser());
    const loading = false

    const loadUser = () => {
        setUser(getCurrentUser())
    };

    return (
        <UserContext.Provider
            value={{ user, setUser, loadUser, loading }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within UserProvider");
    }
    return context;
};
