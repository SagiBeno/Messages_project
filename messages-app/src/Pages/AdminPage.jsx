import { Container, Flex, Button, Text, Box, ScrollArea } from "@radix-ui/themes";
import AdminDropdownMenu from '../Components/AdminDropdownMenu'

export default function AdminPage( { loading, setLoading, userData, toastData, setToastData, setUserData } ) {
    return (
        <Box style={{overflow: 'hidden', height: '100vh', width: '100vw'}} p='3'>
            <Box className="adminPage">
                <AdminDropdownMenu userData={userData} setUserData={setUserData}   />

                <ScrollArea type="auto" scrollbars="vertical" radius='full' style={{ height: "100%", padding: '20px' }} >
                    
                </ScrollArea>
            </Box>
            
        </Box>

    )
}