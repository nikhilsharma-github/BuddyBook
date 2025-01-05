import React from "react";
import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
const UserCard = ({user}) => {
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
                            <EditModal user={user} />
                            <IconButton
                                variant="ghost"
                                colorScheme="red"
                                size={"sm"}
                                aria-label="See menu"
                                icon={<BiTrash size={20} />}
                                // onClick={handleDeleteUser}
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