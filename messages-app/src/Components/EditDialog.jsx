import { Dialog, Flex, Button } from "@radix-ui/themes";
import PasswordInput from './PasswordInput';
import MyDataList from "./MyDataList";
import { Cross2Icon, CheckIcon } from "@radix-ui/react-icons";

export default function EditDialog({ user, open, setOpen }) {
    console.log(user)
    return (
        <Dialog.Root open={open} onOpenChange={setOpen} >
            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Jelszó módosítása</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Következő felhasználó jelszavának módosítása:
                </Dialog.Description>

                <MyDataList user={user} />

                <Flex direction="column" gap="3">
                    <PasswordInput value='test'></PasswordInput>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            <Cross2Icon width='15px' height='15px' /> Mégse
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button color='green'><CheckIcon width='15px' height='15px' /> Mentés</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root >

    )
}