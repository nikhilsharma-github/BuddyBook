import { Container, Stack, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import UserGrid from "./components/UserGrid";
import { useState } from "react";
function App() {
    const [users,setUsers]=useState([]);
    return (
        <>
            <Stack minH={"100vh"}  bgGradient={"linear(to-r, #000000, #011930)"}>
                <Navbar setUsers={setUsers}></Navbar>
                <Container maxW={"1200px"} my={2}>
                    <Text
                        fontSize={{ base: "3xl", md: "40" }}
                        fontWeight={"light"}
                        textAlign={"center"}
                        mb={2}
                    >
                        <Text
                            as={"span"}
                            bgGradient={"linear(to-r, cyan.400, blue.500)"}
                            bgClip={"text"}
                        >
                            Save your Favourite Contacts.
                        </Text>
                    </Text>
                    <UserGrid users={users} setUsers={setUsers}></UserGrid>
                </Container>
            </Stack>
        </>
    );
}

export default App;
