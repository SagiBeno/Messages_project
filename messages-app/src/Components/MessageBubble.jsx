import { Box, Flex, Card, Text } from "@radix-ui/themes";

export default function MessageBubble({ message, currentUserId }) {
    console.log(message)
    const isCurrentUser = message.sender_id === currentUserId;

    const currentUserMessageStyle = {
        maxWidth: "75%",
        padding: "10px 12px",
        background: 'tomato'
    }

    return (
        <Flex justify={isCurrentUser ? "end" : "start"} ml={!isCurrentUser && '3'} mr={isCurrentUser && "3"} mb="2">
            <Card
                style={ isCurrentUser ? currentUserMessageStyle : {
                    maxWidth: "75%",
                    padding: "10px 12px",
                }}
            >
                <Text size="3">{message.body}</Text>
            </Card>
        </Flex>
    );
}