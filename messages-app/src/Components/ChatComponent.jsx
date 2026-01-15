import { Box, Card, Text, ScrollArea, Avatar, IconButton, Tooltip, Flex, Spinner } from "@radix-ui/themes";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import NewMessageComponent from "./NewMessageComponent";
import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatComponent({ loading, selectedChat, newMessageContent, setNewMessageContent, handleSendMessage, selectedFriend, currentUserId, onBack, showBack }) {

    const bottomRef = useRef(null);
    const viweportRef = useRef(null);

    const isNearBottom = () => {
        const el = viweportRef.current;
        if (!el) return true;

        const distanceFromBottom = el.scrollHeigth - el.scrollTop - el.clientHeight;
        return distanceFromBottom < 120;
    }

    useEffect(() => {
        if (!selectedFriend.user_id || loading) return;

        if (isNearBottom()) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [selectedChat, selectedFriend.user_id, loading]);

    const selectedFriend_id = selectedFriend?.user_id;
    const selectedFriend_fullName = selectedFriend?.full_name;

    let lastMessage;
    let lastMessageIsRead;
    let lastMessageSenderId;

    if (selectedChat.length > 0) {
        lastMessage = selectedChat[selectedChat.length - 1];
        lastMessageIsRead = lastMessage.is_read;
        lastMessageSenderId = lastMessage.sender_id;
    }

    return (
        <Box className="chatComponent">
            <Box style={{ height: "100%" }} className="chatCards">

                {
                    (selectedFriend_id && selectedFriend_fullName && !loading)

                        ?
                        <>
                            <Box className="chatDataBox" >
                                {showBack && (
                                    <IconButton variant="ghost" onClick={onBack} mr="2" color='tomato'>
                                      <ChevronLeftIcon width="20px" height="20px" />
                                    </IconButton>
                                )}
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
                                {
                                    selectedChat.length > 0
                                        ?
                                        <>
                                            {selectedChat.map((message, idx) => <MessageBubble key={idx} currentUserId={currentUserId} message={message} />)}
                                            {lastMessageSenderId === currentUserId &&
                                                <Flex justify='end' mr='4'>
                                                    <Text as="p" size='1' style={{ opacity: '0.6' }} >{lastMessageIsRead ? 'Elolvasva' : 'Kézbesítve'}</Text>
                                                </Flex>
                                            }
                                            <div ref={bottomRef} />
                                        </>
                                        :
                                        <Flex p="4"
                                            justify='center'
                                            direction='column'
                                            style={{ height: '100%', textAlign: 'center' }}
                                        >
                                            Nincsenek csevegési előzmények
                                        </Flex>

                                }
                            </ScrollArea>

                            <NewMessageComponent newMessageContent={newMessageContent} setNewMessageContent={setNewMessageContent} handleSendMessage={handleSendMessage} />
                        </>
                        :
                        !loading ?

                            <Flex p="4"
                                justify='center'
                                direction='column'
                                style={{ height: '100%', textAlign: 'center' }}
                            >
                                Válasszon egy csevegést a bal oldali sávból.
                            </Flex>
                            :
                            <Flex direction='column' justify='center' align='center' style={{ height: '90%' }}><Spinner size='3' /></Flex>
                }
            </Box>
        </Box>
    )
}