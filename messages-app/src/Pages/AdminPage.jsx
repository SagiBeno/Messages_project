import { Container, Flex, Button, Text, Box, ScrollArea } from "@radix-ui/themes";
import AdminDropdownMenu from '../Components/AdminDropdownMenu';
import RadioButtons from "../Components/RadioButtons";
import { useEffect, useState } from "react";
import AdminTable from "../Components/AdminTable";

export default function AdminPage( { loading, setLoading, userData, toastData, setToastData, setUserData } ) {
    const [radioOptions, setRadioOptions] = useState({
        newUser: 'Új felhasználó',
        admin: 'Adminok',
        user: 'Felhasználók'
    });
    const [radioSelectedOption, setRadioSelectedOption] = useState('');
    const [tableData, setTableData] = useState([]);

    useEffect(() => {

        if (radioSelectedOption === 'user' || radioSelectedOption === 'admin') {
            setLoading(true);
            fetch(`/api/get_data_for_admin?adminUserId=${encodeURIComponent(userData.id)}&type=${encodeURIComponent(radioSelectedOption)}`)
                .then( async (resJSON) => {
                    const res = await resJSON.json();
                    setTableData(res);
                })
                .catch(() => {
                    setToastData({ open: true, title: 'Sikertelen lekérdezés', description: 'Az adatok lekérése során hiba történt, kérjük próbálja meg újra.', isError: true });
                });
        }
    }, [radioSelectedOption]);

    return (
        <Box style={{overflow: 'hidden', height: '100vh', width: '100vw'}} p='3'>
            <Box className="adminPage">
                <AdminDropdownMenu userData={userData} setUserData={setUserData}   />

                <RadioButtons radioOptions={radioOptions} setRadioSelectedOption={setRadioSelectedOption} />

                {
                    tableData.length > 0 && <AdminTable tableData={tableData} />
                }
            </Box>
            
        </Box>

    )
}