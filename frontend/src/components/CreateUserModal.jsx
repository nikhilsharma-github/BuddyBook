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
import React from "react";
import { BiAddToQueue } from "react-icons/bi";
import { useState } from "react";
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
                title: "yay!",
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
                title: "An Error Occured",
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
            <Button onClick={onOpen}>
                <BiAddToQueue size={20} />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form action="" onSubmit={handleCreateUser}>
                    <ModalContent>
                        <ModalHeader>My new Buddy</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Flex alignItems={"center"} gap={4}>
                                <FormControl>
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
                                    />
                                </FormControl>
                                <FormControl>
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
                                    />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        resize={"none"}
                                        overflowY={"hidden"}
                                        placeholder="He's a software engineer who loves to code and build things."
                                        value={inputs.description}
                                        onChange={(e) =>
                                            setInputs({
                                                ...inputs,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                </FormControl>
                                <RadioGroup mt={4}>
                                    <Flex gap={5}>
                                        <Radio
                                            value="male"
                                            onChange={(e) =>
                                                setInputs({
                                                    ...inputs,
                                                    gender: e.target.value,
                                                })
                                            }
                                        >
                                            Male
                                        </Radio>
                                        <Radio
                                            value="female"
                                            onChange={(e) =>
                                                setInputs({
                                                    ...inputs,
                                                    gender: e.target.value,
                                                })
                                            }
                                        >
                                            Female
                                        </Radio>
                                    </Flex>
                                </RadioGroup>
                            </Flex>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                type="submit"
                                isLoading={isLoading}
                            >
                                Add
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
};

export default CreateUserModal;
