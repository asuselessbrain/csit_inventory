import { getCurrentUser } from "@/services/authService/auth.client";
import { IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    loading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loadUser: () => void
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setIsLoading] = useState(true);

    const loadUser = () => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setIsLoading(false);
    };

    useEffect(() => {
        const subscribe = () => loadUser();

        return () => subscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, setIsLoading, loadUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext)

    if (context === undefined) {
        throw new Error("useUser must be use within the User Provider context")
    }
    return context
}
