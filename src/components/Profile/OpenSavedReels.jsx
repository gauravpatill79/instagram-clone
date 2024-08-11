import {Box,GridItem,Image,Modal,ModalBody,ModalCloseButton,ModalContent,ModalOverlay,Text,Flex,Button,useDisclosure,VStack,Divider,Avatar} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsPinAngleFill } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useShowToast from "../../hooks/useShowToast";
import useUserProfileStore from "../../store/userProfileStore";
import SavedReelFooter from "./SavedReelFooter";
import { firestore } from "../../firebase/firebase"; // Make sure Firebase is initialized correctly
import { doc, updateDoc, getDoc } from "firebase/firestore";
import useAuth from "../../hooks/useAuth";

const OpenSavedReels = ({ reel, pinReel }) => {
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const showToast = useShowToast();
  const user = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPinned, setIsPinned] = useState(false);
  useEffect(() => {
    const checkIfPinned = async () => {
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        const pinnedReels = userDoc.data()?.pinnedReels || [];
        setIsPinned(pinnedReels.includes(reel.id));
      }
    };

    checkIfPinned();
  }, [user, reel.id]);
  
  const handlePinReel = async () => {
    if (user) {
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      let pinnedReels = userDoc.data()?.pinnedReels || [];

      if (pinnedReels.includes(reel.id)) {
        // If the reel is already pinned, do nothing or show a message
        showToast("Reel is already pinned!", "error");
        return;
      }

      if (pinnedReels.length >= 3) {
        pinnedReels = [...pinnedReels.slice(1), reel.id];
      } else {
        pinnedReels.push(reel.id);
      }

      // Update the pinned reels in Firestore
      await updateDoc(userDocRef, {
        pinnedReels: pinnedReels,
      });

      setIsPinned(true); // Set the reel as pinned
      showToast("Reel pinned successfully!", "success");
    }
  };

  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {reel.likes}
              </Text>
            </Flex>

            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {reel.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Image
          src={reel.imageUrl}
          alt="saved reel"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
      </GridItem>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap="4"
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={reel.imageUrl} alt="saved reel" />
              </Flex>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar
                      src={userProfile.profilePicURL}
                      size={"sm"}
                      name=""
                    />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  <Button onClick={handlePinReel} disabled={isPinned}>
                    <BsPinAngleFill color={isPinned ? "yellow" : "white"} />
                  </Button>
                </Flex>
                <Flex
                  flex={1}
                  flexDir={"column"}
                  px={10}
                  display={{ base: "none", md: "flex" }}
                >
                  <SavedReelFooter reel={reel} />
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OpenSavedReels;
