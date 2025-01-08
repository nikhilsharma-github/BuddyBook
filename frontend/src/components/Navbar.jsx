import {
    Box,
    Button,
    Container,
    Flex,
    Text
} from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import CreateUserModal from "./CreateUserModal";

const Navbar = ({ setUsers }) => {
    return (
        <Container maxW={"1200px"}>
            <Box
                px={4}
                my={4}
                borderRadius={16}
                bg="#0f192f"
            >
                <Flex
                    h="16"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    {/* Left side */}
                    <Flex
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={3}
                        display={{ base: "none", sm: "flex" }}
                    >
                        <img
                            src="/BuddyBook.png"
                            alt="BuddyBook"
                            width={50}
                            height={40}
                        />
                        <Text
                            fontSize={"40px"}
                            fontFamily="'Delius Swash Caps'"
                            bgGradient="linear(to-l, #ffe600, #ff1088)"
                            bgClip="text"
                        >
                            BuddyBook
                        </Text>
                    </Flex>
                    {/* Right side */}
                    <Flex gap={3} alignItems={"center"}>
                        <Text
                            fontSize={"lg"}
                            fontWeight={500}
                            display={{ base: "none", md: "block" }}
                        ></Text>
                        <CreateUserModal setUsers={setUsers}></CreateUserModal>
                    </Flex>
                </Flex>
            </Box>
        </Container>
    );
};
export default Navbar;
