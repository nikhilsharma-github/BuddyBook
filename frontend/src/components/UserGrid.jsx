import React, { useEffect, useState } from "react";
import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import UserCard from "./UserCard";
import { BASE_URL } from "../constants/constants";

const UserGrid = ({ users, setUsers }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetch(BASE_URL + "/friends");
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message || "Failed to fetch users");
                }
                setUsers(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        getUsers();
    }, [setUsers]);

    return (
        <>
            <Grid
                templateColumns={{
                    base: "1fr",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                gap={4}
            >
                {users.map((user) => (
                    <UserCard key={user.role} user={user} setUsers={setUsers} />
                ))}
            </Grid>
            {isLoading && (
                <Flex justify={"center"}>
                    <Spinner size={"xl"}></Spinner>
                </Flex>
            )}
            {!isLoading && users.length === 0 && (
                <Flex justifyContent={"center"}>
                    <Text fontSize={"xl"}>
                        <Text
                            as={"span"}
                            fontSize={"2xl"}
                            fontWeight={"bold"}
                            mr={2}
                        >
                            Poor you! 🥺
                        </Text>
                        No friends found.
                    </Text>
                </Flex>
            )}
        </>
    );
};

export default UserGrid;
