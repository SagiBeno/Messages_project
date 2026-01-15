import { Flex, DropdownMenu, Button, Avatar, Text } from "@radix-ui/themes";

export default function SidebarDropdownMenu( {userData} ) {
    return (
        <Flex justify="between" align="center" px="4" py="3">
            <Text size="5" weight="bold">Mesaj</Text>

            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="ghost" style={{ padding: 0 }}>
                        <Avatar
                            color="tomato"
                            radius="full"
                            size="2"
                            fallback={`${userData.fullName.charAt(0)}${userData.fullName.split(' ')[1].charAt(0)}`}
                        />
                    </Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content align="end" sideOffset={8}>
                    {userData?.type === "admin" && ( <>
                            <DropdownMenu.Item onSelect={() => navigate("/admin")}>
                                Admin
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator />
                        </>
                    )}

                    <DropdownMenu.Item
                        color="red"
                        onSelect={() => {
                            localStorage.removeItem("userData");
                            //setUserData({ isLoggedIn: false });
                            navigate("/login");
                        }}
                    >
                        Kijelentkezés
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Flex>
    )
}