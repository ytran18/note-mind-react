import { useEffect, useState } from "react";
import { auth } from "@core/firebase/firebase";

interface User {
    _id: string;
    name: string;
    email: string;
    image: string;
};

const useAuth = (): { user: User | null; loading: boolean } => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                const userData: User = {
                    _id: authUser.uid,
                    name: authUser.displayName!,
                    email: authUser.email!,
                    image: authUser.photoURL!,
                };
                setUser(userData);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
  
        return () => unsubscribe();
    }, []);
  
    return { user, loading };
};
  
export default useAuth;