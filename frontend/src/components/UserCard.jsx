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
                title: "User Deleted Successfully",
                description: "User Deleted Successfully",
                duration: 2000,
                position: "top-center",
                isClosable: true,
            });
        } catch (error) {
            toast({
                status: "error",
                title: "An Error Occured",
                description: error.message,
                duration: 4000,
                position: "top-center",
                isClosable: true,
            });
        } finally {
        }
    };
    return (
        <>
            <Card>
                <CardHeader>
                    <Flex gap={4}>
                        <Flex flex={"1"} gap={"4"} alignItems={"center"}>
                            <Avatar src={user.imgUrl} />

                            <Box>
                                <Heading size="sm">{user.name}</Heading>
                                <Text>{user.role}</Text>
                            </Box>
                        </Flex>

                        <Flex>
                            <EditModal user={user} setUsers={setUsers} />
                            <IconButton
                                variant="ghost"
                                colorScheme="red"
                                size={"sm"}
                                aria-label="See menu"
                                icon={<BiTrash size={20} />}
                                onClick={handleDeleteUser}
                            />
                        </Flex>
                    </Flex>
                </CardHeader>

                <CardBody>
                    <Text>{user.description}</Text>
                </CardBody>
            </Card>
        </>
    );
};

export default UserCard;
