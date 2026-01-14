import { Box, Card, Text, ScrollArea, Avatar, Flex } from "@radix-ui/themes";
import NewMessageComponent from "./NewMessageComponent";
import { useState } from "react";

export default function ChatComponent( { chat, messageContent, setMessageContent, handleSendMessage } ) {

    return (
        <Box style={{ overflow: "hidden", height: "100%", width: '100%' }} className="chatComponent">
            <Card style={{ height: "100%", padding: '0px' }} className="chatCards">
                <Box className="chatDataBox" >
                    <Avatar fallback="A" color='bronze' variant="soft" radius="full" size='2' />
                    <Text as="p" size='3' style={{ margin: '0 auto', fontWeight: 'bold' }}>Név</Text>
                </Box>

                <ScrollArea type="auto" scrollbars="vertical" mt='2'>
                    
                </ScrollArea>

                <NewMessageComponent messageContent={messageContent} setMessageContent={setMessageContent} handleSendMessage={handleSendMessage} />
            </Card>
        </Box>
    )
}