import { Box, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { savedItems } from "../../components/Profile/SavedPostsOrReels";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import OpenSavedReels from "../../components/Profile/OpenSavedReels";
import { firestore } from "../../firebase/firebase"; // Ensure Firebase is initialized correctly
import { doc, getDoc } from "firebase/firestore";

const SavedPostPage = () => {
  const [savedReels, setSavedReels] = useState([]);
  const [sortedReels, setSortedReels] = useState([]);
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchSavedReels = async () => {
      const userDocRef = doc(firestore, "users", authUser?.uid);
      const userDoc = await getDoc(userDocRef);
      
      const pinnedReelsIds = userDoc.data()?.pinnedReels || [];
      const allSavedReels = savedItems.map((reel) => ({
        ...reel,
        isPinned: pinnedReelsIds.includes(reel.id),
      }));

      setSavedReels(allSavedReels);

      const pinnedReels = allSavedReels.filter((reel) => reel.isPinned);
      const nonPinnedReels = allSavedReels.filter((reel) => !reel.isPinned);
      setSortedReels([...pinnedReels, ...nonPinnedReels]);
    };

    fetchSavedReels();
  }, [authUser]);

  const updateSortedReels = (updatedReels) => {
    setSortedReels(updatedReels);
  };

  const BacktoSavedPost = () => {
    navigate(`/${authUser?.username}`);
  };

  return (
    <>
      <Box py={5} borderRadius="lg" px={175} cursor="pointer" overflow="hidden">
        <span onClick={BacktoSavedPost}>
          <MdArrowBackIosNew /> All Posts
        </span>
      </Box>
      <Box borderRadius="lg" px={175} overflow="hidden">
        <Box py={5}>
          <span>Saved Reels</span>
        </Box>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={2}
        >
          <OpenSavedReels
            setSortedReels={updateSortedReels}
            savedReels={sortedReels}
          />
        </Grid>
      </Box>
    </>
  );
};

export default SavedPostPage;
