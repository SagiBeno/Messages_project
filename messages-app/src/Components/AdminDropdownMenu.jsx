import { Flex, DropdownMenu, Button, Avatar, Text, Box } from "@radix-ui/themes";
import { useNavigate } from 'react-router-dom';
import { ExitIcon } from "@radix-ui/react-icons";

export default function AdminDropdownMenu( { userData, setUserData } ) {
    let navigate = useNavigate();

    return (
        <Flex direction='row' justify="between" align="center" px="4" py="3" style={{ background: 'linear-gradient(45deg, rgba(181, 85, 134, 0.5), rgba(239, 101, 44, 0.5))' }}>
            <Flex direction='row' align='center'>
                <Avatar
                    src="icon.png"
                    radius="full"
                    size="2"
                    fallback='Mesaj icon'
                    mr='1'
                />
                <Text size="5" weight="bold">Mesaj</Text>
            </Flex>
            

            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="ghost" style={{ padding: 0 }}>
                        <Avatar
                            color="crimson"
                            variant="solid"
                            radius="full"
                            size="2"
                            fallback={`${userData.fullName.charAt(0)}${userData.fullName.split(' ')[1].charAt(0)}`}
                        />
                    </Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content align="end" sideOffset={8}>

                    <DropdownMenu.Item onSelect={() => navigate("/")}>
                        Csevegések
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />

                    <DropdownMenu.Item
                        color="red"
                        onSelect={() => {
                            localStorage.removeItem("userData");
                            setUserData({ isLoggedIn: false });
                            navigate("/login");
                        }}
                    >
                        <ExitIcon width='15px' height='15px' /> Kijelentkezés
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Flex>
    )
}