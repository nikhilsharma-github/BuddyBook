import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BASE_URL } from "../constants/constants";

function EditModal({ setUsers, user }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: user.name,
        role: user.role,
        description: user.description,
    });
    const toast = useToast();

    const handleEditUser  = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(BASE_URL + "/friends/" + user.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }

            setUsers((prevUsers) =>
                prevUsers.map((u) => (u.id === user.id ? data[0] : u))
            );
            toast({
                status: "success",
                title: "Yayy! 🎉",
                description: "Friend updated successfully.",
                duration: 2000,
                position: "top-center",
            });
            onClose();
        } catch (error) {
            toast({
                status: "error",
                title: "An error occurred.",
                description: error.message,
                duration: 4000,
                position: "top-center",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <IconButton
                onClick={onOpen}
                variant="ghost"
                colorScheme="green"
                aria-label="Edit user"
                size={"sm"}
                icon={<BiEditAlt size={20} />}
            />

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <form onSubmit={handleEditUser }>
                    <ModalContent bg="#000918" color="white">
                        <ModalHeader color="green.400">Edit Buddy Information</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Flex direction="column" gap={4}>
                                <FormControl isRequired>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input
                                        placeholder="John Doe"
                                        value={inputs.name}
                                        onChange={(e) =>
                                            setInputs((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        variant="flushed"
                                        color="white"
                                        maxLength={15}
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Role</FormLabel>
                                    <Input
                                        placeholder="Software Engineer"
                                        value={inputs.role}
                                        onChange={(e) =>
                                            setInputs((prev) => ({
                                                ...prev,
                                                role: e.target.value,
                                            }))
                                        }
                                        variant="flushed"
                                        color="white"
                                        maxLength={15}
                                    />
                                </FormControl>
                            <FormControl isRequired>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        resize={"none"}
                                        overflowY={"hidden"}
                                        placeholder="He's a software engineer who loves to code and build things."
                                        value={inputs.description}
                                        onChange={(e) =>
                                            setInputs((prev) => ({
                                                ...prev,
                                                description: e.target.value,
                                            }))
                                        }
                                        variant="flushed"
                                        color="white"
                                        maxLength={100}
                                    />
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
                                Update
                            </Button>
                            <Button onClick={onClose} colorScheme="red">Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
}

export default EditModal;