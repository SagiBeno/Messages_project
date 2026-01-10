import { Box, Card, Flex, Tabs, Text, ScrollArea, Heading, Avatar } from "@radix-ui/themes";

export default function Sidebar() {
    return (
        <Card style={{ height: "100%", borderRadius: 0, minWidth: '300px' }}>
            <Flex direction="column" style={{ height: "100%" }} gap="3">
                <Flex
                    direction="row"
                    justify='center'
                    align='center'
                >
                    <Avatar
                        src="icon.png"
                        size='3'
                        title="Mesaj icon"
                        alt="Mesaj icon"
                    />
                    <Heading as="h1" ml='1'>Messaj</Heading>
                </Flex>

                <Tabs.Root>
                    <Tabs.List
                        color='tomato'
                        style={{
                            display: "flex",
                            flexDirection: 'row',
                            justifyContent: "space-around"
                        }}
                    >
                        <Tabs.Trigger value="chats">Csevegések</Tabs.Trigger>
                        <Tabs.Trigger value="friends">Ismerősök</Tabs.Trigger>
                        <Tabs.Trigger value="searchFriends">Keresés</Tabs.Trigger>
                    </Tabs.List>
                </Tabs.Root>

                <Box style={{ flex: 1, overflow: "hidden" }}>
                    <ScrollArea type="auto" scrollbars="vertical" style={{ height: "100%" }}>
                        <Box pt="2">
                            Szia
                        </Box>
                    </ScrollArea>
                </Box>
            </Flex>
        </Card>
    );
}