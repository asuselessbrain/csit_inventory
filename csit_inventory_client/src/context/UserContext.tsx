import { getCurrentUser } from "@/services/authService";
import { IUser } from "@/types";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IUserProviderValue {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    isLoading: boolean;
    setIsLoading?: Dispatch<SetStateAction<boolean>>;
    refreshUser: () => Promise<void>;
}

export const UserContext = createContext<IUserProviderValue | null>(null);

export const UserProvider = ({ children, initialUser }: { children: React.ReactNode, initialUser?: IUser | null }) => {
    const [user, setUser] = useState<IUser | null>(initialUser !== undefined ? initialUser : null);
    const [isLoading, setIsLoading] = useState<boolean>(initialUser !== undefined ? false : true);

    const fetchUser = async () => {
        setIsLoading(true);
        try {
            const data = await getCurrentUser();
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if (initialUser === undefined) {
            fetchUser();
        }
    }, [initialUser]);

    return (
        <UserContext.Provider
            value={{ user, setUser, isLoading, setIsLoading, refreshUser: fetchUser }}
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
