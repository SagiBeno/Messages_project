import { Container, Flex, Button, Text, Box, ScrollArea } from "@radix-ui/themes";
import AdminDropdownMenu from '../Components/AdminDropdownMenu';
import RadioButtons from "../Components/RadioButtons";
import { useState } from "react";

export default function AdminPage( { loading, setLoading, userData, toastData, setToastData, setUserData } ) {
    const [radioOptions, setRadioOptions] = useState({
        newUser: 'Új felhasználó',
        admin: 'Adminok',
        users: 'Felhasználók'
    });

    return (
        <Box style={{overflow: 'hidden', height: '100vh', width: '100vw'}} p='3'>
            <Box className="adminPage">
                <AdminDropdownMenu userData={userData} setUserData={setUserData}   />

                <RadioButtons radioOptions={radioOptions}/>

                <ScrollArea type="auto" scrollbars="vertical" radius='full' style={{ height: "100%", padding: '20px' }} >
                    
                </ScrollArea>
            </Box>
            
        </Box>

    )
}