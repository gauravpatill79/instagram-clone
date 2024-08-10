import {Container,Flex,Link,Skeleton,SkeletonCircle,Text,VStack,} from "@chakra-ui/react";
import { Box, Grid, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { savedItems } from "../../components/Profile/SavedPostsOrReels";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import useAuthStore from "../../store/authStore";

const SavedPostPage = () => {
  const [savedReels, setSavedReels] = useState([]);
    const navigate = useNavigate();
	const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    // Fetch or load saved reels here
    setSavedReels(savedItems);
  }, []);

  const BacktoSavedPost = ()=>{
    navigate(`/${authUser?.username}`);
}
  return (
    <>
    <Box py={5}borderRadius="lg" px={175} cursor="pointer" overflow="hidden">
      <span onClick={BacktoSavedPost} > <MdArrowBackIosNew /> All Posts</span>
    </Box>
    <Box borderRadius="lg" px={175} overflow="hidden">
    <Box py={5}>
      <span >Saved Reels</span>
    </Box>
      <Grid templateColumns="repeat(3, 300px)" gap={2}>
        {savedReels.map((reel) => (
          <Box key={reel.id} textAlign="center">
            <Image
              src={reel.imageUrl}
              alt={reel.description}
              boxSize="300px"
              objectFit="cover"
            />
          </Box>
        ))}
      </Grid>
    </Box>
    </>
  );
};

export default SavedPostPage;
