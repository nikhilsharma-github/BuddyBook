import React from "react";
import {
    Avatar,
    Box,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    IconButton,
    Text,
    useToast,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../constants/constants";

const UserCard = ({ user, setUsers }) => {
    const toast = useToast();

    const handleDeleteUser = async () => {
        try {
            const res = await fetch(BASE_URL + "/friends/" + user.id, {
                method: "DELETE",
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
            toast({
                status: "success",
                title: "User  Deleted Successfully",
                description: "User  Deleted Successfully",
                duration: 2000,
                position: "top-center",
                isClosable: true,
            });
        } catch (error) {
            toast({
                status: "error",
                title: "An Error Occurred",
                description: error.message,
                duration: 4000,
                position: "top-center",
                isClosable: true,
            });
        }
    };

    return (
        <Card
            bgGradient="linear(to-l, #041637, #002e27)" // Dark background for the card
            color="white" // White text color
            borderRadius="md" // Rounded corners
            boxShadow="md" // Shadow for depth
            _hover={{
                boxShadow: "lg",
                transform: "scale(1.02)",
                transition: "0.2s",
            }} // Hover effect
        >
            <CardHeader>
                <Flex gap={4}>
                    <Flex flex={"1"} gap={"4"} alignItems={"center"}>
                        <Avatar src={user.imgUrl} />
                        <Box>
                            <Heading size="sm">{user.name}</Heading>
                            <Text fontSize="sm" color="gray.400">
                                {user.role}
                            </Text>
                        </Box>
                    </Flex>
                    <Flex>
                        <EditModal user={user} setUsers={setUsers} />
                        <IconButton
                            variant="ghost"
                            colorScheme="red"
                            size={"sm"}
                            aria-label="Delete user"
                            icon={<BiTrash size={20} />}
                            onClick={handleDeleteUser}
                        />
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text color="gray.300">{user.description}</Text>
            </CardBody>
        </Card>
    );
};

export default UserCard;
