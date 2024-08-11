// useAuth.js
import { auth } from "../firebase/firebase"; // Assumes you have initialized Firebase Auth
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useAuth;
