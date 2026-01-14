import { Box, Card, Text, ScrollArea, Avatar, IconButton, Tooltip, Flex } from "@radix-ui/themes";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import NewMessageComponent from "./NewMessageComponent";
import { useState } from "react";

export default function ChatComponent({ selectedChat, newMessageContent, setNewMessageContent, handleSendMessage, selectedFriend }) {
    
    const selectedFriend_id = selectedFriend?.user_id;
    const selectedFriend_fullName = selectedFriend?.full_name;

    return (
        <Box className="chatComponent">
            <Box style={{ height: "100%" }} className="chatCards">

                {
                    (selectedFriend_id && selectedFriend_fullName)

                        ?
                        <>
                            <Box className="chatDataBox" >

                                <Avatar
                                    fallback={`${selectedFriend_fullName.charAt(0)}${selectedFriend_fullName.split(' ')[1].charAt(0)}`}
                                    color='bronze'
                                    variant="soft"
                                    radius="full"
                                    size='2'
                                />
                                <Text as="p" size='3' style={{ margin: '0 auto', fontWeight: 'bold' }}>{selectedFriend_fullName}</Text>
                            </Box>

                            <ScrollArea type="auto" scrollbars="vertical" mt='2'>

                            </ScrollArea>

                            <NewMessageComponent newMessageContent={newMessageContent} setNewMessageContent={setNewMessageContent} handleSendMessage={handleSendMessage} />
                        </>
                        :

                        <Flex p="4"
                            justify='center'
                            direction='column'
                            style={{ height: '100%', textAlign: 'center' }}
                        >
                            Válasszon egy csevegést a bal oldali sávból, vagy kezdjen egy újat!
                        </Flex>
                }
            </Box>
        </Box>
    )
}