import { Box, Grid, Image, Text } from "@chakra-ui/react";

// Mock data for liked posts/reels
const likedItems = [
  {
    id: 1,
    type: "post", // or "reel"
    imageUrl: "https://via.placeholder.com/150",
    description: "Liked Post 1",
  },
  {
    id: 2,
    type: "reel",
    imageUrl: "https://via.placeholder.com/150",
    description: "Liked Reel 1",
  },
  // Add more items as needed
];

const LikedPostsOrReels = () => {
  return (
    <Box py={5}>
      <Grid templateColumns="repeat(auto-fit, minmax(100px, 1fr))" gap={4}>
        {likedItems.map((item) => (
          <Box key={item.id} cursor="pointer" textAlign="center">
            <Image
              src={item.imageUrl}
              alt={item.description}
              boxSize="100px"
              objectFit="cover"
              borderRadius="md"
            />
            <Text fontSize="sm" mt={2}>
              {item.description}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default LikedPostsOrReels;
