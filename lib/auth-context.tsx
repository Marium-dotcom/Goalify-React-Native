import { createContext } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";



type AuthContextType = {
  // Define the types for your authentication context here      
  user: Models.User<Models.Preferences> | null;
    signIn: (email: string, password: string) => Promise<string | null>;
    signUp: (email: string, password: string) => Promise<string | null>;
    signOut: () => Promise<void>;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined)






export function AuthProvider({ children }: { children: React.ReactNode }) {

  const user = null;
  
  const signIn = async (email: string, password: string) => {
    try {
        
        await account.createEmailPasswordSession(email, password);
        return null
        

    } catch (error) {
     if (error instanceof Error) {
        throw new Error(error.message);
      }
        throw new Error("An unexpected error occurred during sign-in.");
   
    }
  };

  const signUp = async (email: string, password: string) => {

    try {
      await account.create(ID.unique(), email, password);
      await signIn(email, password);
      return null

    } catch (error) {
    if (error instanceof Error) {
        throw new Error(error.message);
      }
        throw new Error("An unexpected error occurred during sign-up.");
    }

  };
  const signOut = async () => {};

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
    const context = createContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}