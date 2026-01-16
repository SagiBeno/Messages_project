import { Card, Avatar, Box, Text, Flex, Button } from "@radix-ui/themes";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

export default function FriendCardComponent ( { friend, handleSelectedFriend } ) {
    
    return (
        <Card mb="2" style={{ userSelect: 'none', cursor: 'pointer' }} onClick={() => handleSelectedFriend(friend)}>
            <Flex gap="3" align="center" direction="row" justify='between'>
                <Avatar
                    size="3"
                    radius="large"
                    fallback={`${friend.full_name.charAt(0)}${friend.full_name.split(' ')[1].charAt(0)}`}
                    variant='solid'
                    color='tomato'
                />
                <Box>
                    <Text as="div" size="2" weight="bold">
                        {friend.full_name}
                    </Text>
                    <Text as="div" size="2" color="gray">
                        {friend.username}
                    </Text>

                </Box>
                <Box>
                    <Button 
                        radius='full'
                        style={{ cursor: 'pointer', background: 'linear-gradient(45deg, #B55586, #EF652C)' }}
                        onClick={() => handleSelectedFriend(friend)}
                    >
                        <PaperPlaneIcon width='20px' height='20px' />
                    </Button> 
                </Box>
            </Flex>
        </Card>
    )
}