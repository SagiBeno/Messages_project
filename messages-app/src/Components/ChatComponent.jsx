import { Box, Card, Text, ScrollArea, Avatar, Flex } from "@radix-ui/themes";
import NewMessageComponent from "./NewMessageComponent";

export default function ChatComponent({ chat }) {



    return (
        <Box style={{ overflow: "hidden", height: "100%", width: '100%' }} className="chatComponent">
            <Card style={{ height: "100%", padding: '0px' }} className="chatCards">
                <Box className="chatDataBox" >
                    <Avatar fallback="A" color='violet' variant="soft" radius="full" size='2' />
                    <Text as="p" size='3' style={{ margin: '0 auto', fontWeight: 'bold' }}>Név</Text>
                </Box>

                <ScrollArea type="auto" scrollbars="vertical" mt='2'>
                    <Box m='3'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto nostrum cumque blanditiis doloremque iure, nihil facilis eum nesciunt, quidem itaque quis ipsum aperiam modi iusto incidunt minima vitae delectus ipsa.
                        Numquam eius cum voluptates asperiores dolores vitae autem quo tempore. Error excepturi inventore dolorum, nihil hic soluta adipisci similique ut in fugit facere quibusdam ipsum id odit libero, sit pariatur.
                        Voluptates autem soluta corrupti ullam cum quisquam pariatur hic, vitae qui, numquam voluptate sit consequatur placeat at? Ut illum quos aliquid est nesciunt ipsa tenetur optio rem recusandae, necessitatibus qui!
                        Rem necessitatibus nesciunt in sapiente maiores, vitae inventore voluptatem sint. Quasi, deleniti voluptates ea esse accusamus quibusdam! Vitae doloribus quaerat deserunt aperiam sit excepturi quis cumque, dolores voluptas esse delectus?
                        Perspiciatis culpa hic dolorum maiores, iste tenetur voluptatum velit ea quae aut veritatis debitis est. Cum ea quod consectetur reiciendis exercitationem deserunt nam est, rerum veritatis ratione, voluptatum labore mollitia.
                        Explicabo, odio perferendis nobis numquam velit delectus adipisci porro. Ipsa dolorem ducimus, odio ipsam hic dignissimos, saepe eligendi laborum laboriosam et harum sit facilis nam facere inventore temporibus minus natus.
                        Expedita numquam, debitis fugit sit nesciunt porro aliquid officia vitae aperiam ipsa soluta voluptatem quis repellat cum dolor iure maxime mollitia esse sunt voluptatum quas recusandae accusamus, qui dicta! Est?
                        Ea pariatur rem excepturi tempora quas harum accusamus in veritatis quos rerum voluptatem, consectetur dolorum magnam eveniet velit distinctio blanditiis cumque similique repudiandae odio? Maiores ex distinctio nemo eligendi minus?
                        Nobis perferendis nesciunt delectus maxime quae laudantium deleniti odio nostrum soluta nihil reprehenderit vero, veniam repellat blanditiis dolorem at quibusdam vitae quas. Magni, voluptatum aliquam dolor impedit veritatis deserunt praesentium.
                        Debitis adipisci aut a omnis vero, laborum impedit ipsa, cum quam soluta, repellendus incidunt fugiat quae sapiente rem explicabo voluptatum blanditiis quos? Maiores quam, atque magni adipisci necessitatibus a illum!
                    </Box>
                </ScrollArea>

                <NewMessageComponent />
            </Card>
        </Box>
    )
}