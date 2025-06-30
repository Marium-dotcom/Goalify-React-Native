import { createContext, use, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";



type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>; // ✅ Added this
  isLoading: boolean;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined)






export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const user = await account.get();
      setUser(user);
      setIsLoading(false);
      return user;
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred while fetching user data.");
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);


  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await account.createEmailPasswordSession(email, password);
      await fetchUser();
      setIsLoading(false);
      return null;
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred during sign-in.");
    }
  };

  const signUp = async (email: string, password: string) => {

    try {
      setIsLoading(true);
      await account.create(ID.unique(), email, password);
      await signIn(email, password);
      setIsLoading(false);
      return null

    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred during sign-up.");
    }

  };
  const signOut = async () => {
    await account.deleteSession("current");
    setIsLoading(true);
    // ...sign out logic...
    setUser(null);
    setIsLoading(false);
  };
const forgotPassword = async (email: string) => {
  await account.createRecovery(email, 'http://localhost:8081/reset-password');
};

  return (
<AuthContext.Provider value={{ user, signIn, signUp, signOut, forgotPassword, isLoading }}>
  {children}
</AuthContext.Provider>
  );
}


export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}