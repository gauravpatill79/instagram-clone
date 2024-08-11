import { Box, Button, Divider, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";

const SavedReelFooter = ({ reel }) => {
	const [comment, setComment] = useState("");
	const commentRef = useRef(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleSubmitComment = () => {
		// Handle the comment submission (could be local state management)
		console.log("Comment submitted:", comment);
		setComment("");
	};

	const handleLikeReel = () => {
		// Handle the like functionality
		console.log("Reel liked!");
	};

	return (
		<Box mb={10} marginTop={10} >
			{reel.description && (
				<Text fontSize='sm' fontWeight={700}>
					Description:{" "}
					<Text as='span' fontWeight={400}>
						{reel.description}
					</Text>
				</Text>
			)}
			<Divider my={4} bg={"gray.500"} mb={300}/> 
			<Flex alignItems={"centre"} gap={4} w={"full"} pt={0} ml={0} mb={5}>
				<Box onClick={handleLikeReel} cursor={"pointer"} fontSize={18}>
					<NotificationsLogo />
				</Box>
				<Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
					<CommentLogo />
				</Box>
			</Flex>
			<Text fontWeight={600} fontSize={"sm"}>
				{reel.likes} likes
			</Text>
			{reel.comments.length > 0 && (
				<Text fontSize='sm' color={"gray"} cursor={"pointer"} onClick={onOpen}>
					View all {reel.comments.length} comments
				</Text>
			)}
			
			{/* Comments modal */}
			{isOpen && (
				<Box>
					{reel.comments.map((comment, index) => (
						<Text key={index}>{comment}</Text>
					))}
					<Button onClick={onClose}>Close</Button>
				</Box>
			)}

			<Flex alignItems={"flex-start"} gap={2} justifyContent={"space-between"} w={"full"}>
				<InputGroup>
					<Input
						variant={"flushed"}
						placeholder={"Add a comment..."}
						fontSize={14}
						onChange={(e) => setComment(e.target.value)}
						value={comment}
						ref={commentRef}
					/>
					<InputRightElement>
						<Button
							fontSize={14}
							color={"blue.500"}
							fontWeight={600}
							cursor={"pointer"}
							_hover={{ color: "white" }}
							bg={"transparent"}
							onClick={handleSubmitComment}
						>
							Post
						</Button>
					</InputRightElement>
				</InputGroup>
			</Flex>
		</Box>
	);
};

export default SavedReelFooter;
