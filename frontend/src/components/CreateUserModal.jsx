import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalOverlay,
    useDisclosure,
    Textarea,
    Radio,
    RadioGroup,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from "../constants/constants";

const CreateUserModal = ({ setUsers }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        role: "",
        description: "",
        gender: "",
    });
    const toast = useToast();

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(BASE_URL + "/friends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.msg);
            }

            toast({
                status: "success",
                title: "Yay!",
                description: "Friend Created Successfully",
                duration: 2000,
                position: "top-center",
            });
            onClose();
            setUsers((prevUsers) => [...prevUsers, data]);
            setInputs({ name: "", role: "", description: "", gender: "" });
        } catch (e) {
            toast({
                status: "error",
                title: "An Error Occurred",
                description: e.message,
                duration: 4000,
                position: "top-center",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button
                fontSize={{ base: "10px", md: "20px" }}
                onClick={onOpen}
                colorScheme="blue"
                leftIcon={<BiAddToQueue size={20} />}
            >
                Add Buddy
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <form action="" onSubmit={handleCreateUser}>
                <ModalContent 
                bg="#000918" 
                color="white">
                        <ModalHeader color="blue.500">
                            My New Buddy
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Flex direction="column" gap={4}>
                                <FormControl isRequired>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input
                                        placeholder="John Doe"
                                        value={inputs.name}
                                        onChange={(e) =>
                                            setInputs({
                                                ...inputs,
                                                name: e.target.value,
                                            })
                                        }
                                        variant="flushed"
                                        maxLength={20}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Role</FormLabel>
                                    <Input
                                        placeholder="Software Engineer"
                                        value={inputs.role}
                                        onChange={(e) =>
                                            setInputs({
                                                ...inputs,
                                                role: e.target.value,
                                            })
                                        }
                                        variant="flushed"
                                        maxLength={20}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        resize="none"
                                        overflowY="hidden"
                                        placeholder="He's a software engineer who loves to code and build things."
                                        value={inputs.description}
                                        onChange={(e) =>
                                            setInputs({
                                                ...inputs,
                                                description: e.target.value,
                                            })
                                        }
                                        variant="flushed"
                                        maxLength={200}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Gender</FormLabel>
                                    <RadioGroup
                                        onChange={(value) =>
                                            setInputs({
                                                ...inputs,
                                                gender: value,
                                            })
                                        }
                                        value={inputs.gender}
                                    >
                                        <Flex gap={5}>
                                            <Radio
                                                value="male"
                                                colorScheme="blue"
                                            >
                                                Male
                                            </Radio>
                                            <Radio
                                                value="female"
                                                colorScheme="pink"
                                            >
                                                Female
                                            </Radio>
                                        </Flex>
                                    </RadioGroup>
                                </FormControl>
                            </Flex>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="green"
                                mr={3}
                                type="submit"
                                isLoading={isLoading}
                            >
                                Add
                            </Button>
                            <Button onClick={onClose} colorScheme="red">
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
};

export default CreateUserModal;
