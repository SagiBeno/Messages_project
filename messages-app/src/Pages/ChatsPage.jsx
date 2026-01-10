import { Box, Flex, Card, Text, Button, ScrollArea, Heading } from "@radix-ui/themes";
import Sidebar from "../Components/Sidebar";

export default function ChatsPage() {
  return (
    <Flex direction="row" height="100vh" width="100vw">
      <Box
        style={{
          width: 320,
        }}
        className="sidebar"
      >
        <Flex direction="column" style={{ height: "100%" }}>
          <Box p="3">
            <Heading>Messaj</Heading>
          </Box>

          <Box style={{ flex: 1, overflow: "hidden" }}>
            <Sidebar />
          </Box>
        </Flex>
      </Box>

      <Box
        style={{
          width: 'calc(100% - 320px)',
        }}
      >
        <Flex direction="column" style={{ height: "100%" }} mt=''>

          <Box style={{ flex: 1, overflow: "hidden" }}>
            <Card style={{ height: "100%"}}>
              <ScrollArea type="auto" scrollbars="vertical" style={{ height: "100%" }}>
                <Box p="4">
                  Válassz egy csevegést a bal oldali sávból, vagy kezdj egy újat!
                </Box>
              </ScrollArea>
            </Card>

          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}