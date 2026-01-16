import { Dialog, Flex, Button, Text } from "@radix-ui/themes";
import PasswordInput from './PasswordInput';
import MyDataList from "./MyDataList";
import { Cross2Icon, CheckIcon } from "@radix-ui/react-icons";

export default function EditDialog({ user, open, setOpen, password, setPassword, handleEditUser }) {


    return (
        <Dialog.Root open={open} onOpenChange={setOpen} style={{ userSelect: 'none' }} >
            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Jelszó módosítása</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Következő felhasználó jelszavának módosítása:
                </Dialog.Description>

                <MyDataList user={user} />

                <Flex direction="column" gap="3" mt='3'>
                    <Text
                        as="label"
                        htmlFor="modifyPassword"
                        mx='1'
                        style={{
                            userSelect: 'none',
                            cursor: 'default'
                        }}
                        size='3'
                    >
                        Jelszó módosítása
                    </Text>
                    <PasswordInput
                        inputName="modifyPassword"
                        value={password}
                        onChange={(e) => {
                            if (e.target.value.includes(' ')) return;
                            else setPassword( e.target.value )
                        }}
                    />

                     {
                        password.length < 8 &&
                        <Text
                            as="p"
                            size='2'
                            mx='1'
                            style={{
                                userSelect: 'none',
                                cursor: 'default'
                            }}
                            align="center"
                            color="tomato"
                        >
                            A jelszónak legalább 8 karakter hosszúnak kell lennie!
                        </Text>
                    }
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close onClick={() => setPassword('')}>
                        <Button variant="soft" color="gray">
                            <Cross2Icon width='15px' height='15px' /> Mégse
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close onClick={() => handleEditUser(user)} disabled={password.trim().length < 8}>
                        <Button color='green'><CheckIcon width='15px' height='15px'  /> Mentés</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root >

    )
}