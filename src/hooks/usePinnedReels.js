import { firestore } from "../firebase/firebase"
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const usePinnedReels = () => {
  const user = useAuth();
  const [pinnedReels, setPinnedReels] = useState([]);

  useEffect(() => {
    const fetchPinnedReels = async () => {
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      const pinnedReels = userDoc.data()?.pinnedReels || [];
      setPinnedReels(pinnedReels);
    };
    if (user) {
      fetchPinnedReels();
    }
  }, [user]);

  return pinnedReels;
};

export default usePinnedReels;
