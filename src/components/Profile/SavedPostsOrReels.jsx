import { Box, Flex, Grid, Skeleton, Text, VStack, Image } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

// Mock data for saved posts/reels (adjust the array according to your data structure)
export const savedItems = [
  {
    id: 1,
    type: "reel",
    imageUrl: "https://picsum.photos/1024",
    description: "Saved Reel 1",
    comments: [
        { id: 1, text: "Good Job" },
    ],
    likes : 20,
  },
  {
    id: 2,
    type: "reel",
    imageUrl: "https://picsum.photos/1024?random=1",
    description: "Saved Reel 2",
    comments: [
        { id: 1, text: "Good Job" },
    ],
    likes : 20,
  },
  {
    id: 3,
    type: "reel",
    imageUrl: "https://picsum.photos/1024?random=2",
    description: "Saved Reel 3",
    comments: [
        { id: 1, text: "Good Job" },
    ],
    likes : 20,
  },
  {
    id: 4,
    type: "reel",
    imageUrl: "https://picsum.photos/1024?random=3",
    description: "Saved Reel 4",
    comments: [
        { id: 1, text: "Good Job" },
    ],
    likes : 20,
  },
  {
    id: 5,
    type: "reel",
    imageUrl: "https://picsum.photos/1024?random=4",
    description: "Saved Reel 5",
    comments: [
        { id: 1, text: "Good Job" },
    ],
    likes : 20,
  },
  {
    id: 6,
    type: "reel",
    imageUrl: "https://picsum.photos/1024?random=5",
    description: "Saved Reel 6",
    comments: [
        { id: 1, text: "Good Job" },
    ],
    likes : 20,
  }
  // Add more items if needed
];

const SavedPostsOrReels = () => {
    const navigate = useNavigate();
    const handleSaveClick = () =>{
        navigate('/saved-reels');
    }
  return (
    <Box
      py={5}
      borderRadius="lg"
      overflow="hidden"
      w="300px" // Set the width of the outer box
      ml="0"
    >  <span mb={10} >Only you can see what you've saved</span> 
      <Grid templateColumns="repeat(2, 1fr)" gap={0.5}>
        {savedItems.slice(0, 4).map((item) => (
          <Box key={item.id} cursor="pointer" textAlign="center"  onClick={item.type === 'reel' ? handleSaveClick : undefined}>
            <Image
              src={item.imageUrl}
              alt={item.description}
              boxSize="150px"
              objectFit="cover"
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};


export default SavedPostsOrReels;
