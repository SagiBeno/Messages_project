import { Dialog, Flex, Button, Text } from "@radix-ui/themes";
import MyDataList from "./MyDataList";
import { Cross2Icon, TrashIcon } from "@radix-ui/react-icons";

export default function DeleteDialog({ user, open, setOpen, handleDeleteUser }) {

    return (
        <Dialog.Root open={open} onOpenChange={setOpen} style={{ userSelect: 'none' }} >
            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Felhasználó törlése</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Következő felhasználó törlése:
                </Dialog.Description>

                <MyDataList user={user} />

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            <Cross2Icon width='15px' height='15px' /> Mégse
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close onClick={() => handleDeleteUser(user)}>
                        <Button color='tomato'><TrashIcon width='15px' height='15px' /> Törlés</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root >

    )
}