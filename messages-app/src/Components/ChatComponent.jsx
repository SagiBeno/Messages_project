import { Box, Card, Text, ScrollArea, Avatar, IconButton, Tooltip } from "@radix-ui/themes";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import NewMessageComponent from "./NewMessageComponent";
import { useState } from "react";

export default function ChatComponent({ chat, newMessageContent, setNewMessageContent, handleSendMessage }) {
    
    return (
        <Box className="chatComponent">
            <Box style={{ height: "100%" }} className="chatCards">

                <Box className="chatDataBox" >
                    <Tooltip content="Csevegések">
                        <IconButton radius="full" mr='1' color='tomato' id='hamburgerMenuIcon'>
                            <HamburgerMenuIcon />
                        </IconButton>
                    </Tooltip>

                    <Avatar 
                        fallback=''
                        color='bronze'
                        variant="soft"
                        radius="full"
                        size='2'
                    />
                    <Text as="p" size='3' style={{ margin: '0 auto', fontWeight: 'bold' }}>Név</Text>
                </Box>

                <ScrollArea type="auto" scrollbars="vertical" mt='2'>

                </ScrollArea>

                <NewMessageComponent newMessageContent={newMessageContent} setNewMessageContent={setNewMessageContent} handleSendMessage={handleSendMessage} />
            </Box>
        </Box>
    )
}