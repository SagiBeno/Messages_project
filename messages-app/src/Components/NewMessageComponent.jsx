import { useState } from "react";
import { Flex, TextArea, IconButton, Box} from "@radix-ui/themes";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

export default function NewMessageComponent( { newMessageContent, setNewMessageContent, handleSendMessage } ) {
    return (
        <Flex direction='row' align='center' justify='between' m="3">
            <TextArea
                radius="full"
                color='tomato'
                placeholder="Üzenet írása..."
                size='1'
                style={{
                    width: '95%'
                }}
                mr='1'
                value={newMessageContent}
                onChange={(e) => {
                    setNewMessageContent(e.target.value);
                }}
            />
            <IconButton
                variant="soft"
                color='tomato'
                onClick={() => {
                    handleSendMessage(newMessageContent);
                    setNewMessageContent('');
            }}>
                <PaperPlaneIcon width="20" height="20" />
            </IconButton>

        </Flex>
    )
}