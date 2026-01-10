import { Box, Card, Flex, Tabs, Text, ScrollArea } from "@radix-ui/themes";

export default function Sidebar() {
    return (
        <Card style={{ height: "100%", borderRadius: 0, minWidth: '20vw' }}>
            <Flex direction="column" style={{ height: "100%" }} gap="3">
                <Box>
                    <Text weight="bold" size="4">
                        Üzenetek
                    </Text>
                </Box>

                <Tabs.Root >
                    <Tabs.List>
                        <Tabs.Trigger value="chats">Csevegések</Tabs.Trigger>
                        <Tabs.Trigger value="friends">Ismerősök</Tabs.Trigger>
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