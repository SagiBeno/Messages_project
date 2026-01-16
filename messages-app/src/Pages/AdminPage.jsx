import { Container, Flex, Button, Text, Box, ScrollArea, Spinner } from "@radix-ui/themes";
import AdminDropdownMenu from '../Components/AdminDropdownMenu';
import RadioButtons from "../Components/RadioButtons";
import { useEffect, useState } from "react";
import AdminTable from "../Components/AdminTable";
import EditDialog from "../Components/EditDialog";

export default function AdminPage({ loading, setLoading, userData, toastData, setToastData, setUserData }) {
    const [radioOptions, setRadioOptions] = useState({
        newUser: 'Új felhasználó',
        admin: 'Adminok',
        user: 'Felhasználók'
    });
    const [radioSelectedOption, setRadioSelectedOption] = useState('');
    const [tableData, setTableData] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [dialogData, setDialogData] = useState({});
    const [modifyPassword, setModifyPassword] = useState('');

    const handleEditUser = (user) => {
        fetch("/api/modify_password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ adminUserId: userData.id, targetUserId: user.user_id, newPassword: modifyPassword }),
        })
            .then(async (resJSON) => {
                const res = await resJSON.json();
                if (res.success) setToastData({ open: true, title: 'Sikeres módosítás', description: 'A módosítás sikeresen megtörtént!', isError: false });
                else setToastData({ open: true, title: 'Sikertelen módosítás', description: 'A módosítás során hiba lépett fel, kérjük próbálja meg újra', isError: true });
            })
            .catch(() => {
                setToastData({ open: true, title: 'Sikertelen módosítás', description: 'A módosítás során hiba lépett fel, kérjük próbálja meg újra', isError: true });
            })
            .finally(() => {
                setModifyPassword('');
            });
    }

    const handleDeleteUser = (user) => {
        console.log(user)
    }

    const handleGetData = () => {
        setLoading(true);
        fetch(`/api/get_data_for_admin?adminUserId=${encodeURIComponent(userData.id)}&type=${encodeURIComponent(radioSelectedOption)}`)
            .then(async (resJSON) => {
                const res = await resJSON.json();
                setTableData(res);
            })
            .catch(() => {
                setToastData({ open: true, title: 'Sikertelen lekérdezés', description: 'Az adatok lekérése során hiba történt, kérjük próbálja meg újra.', isError: true });
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {

        if (radioSelectedOption === 'user' || radioSelectedOption === 'admin') {
            handleGetData();
        }
    }, [radioSelectedOption]);

    return (
        <Box style={{ overflow: 'hidden', height: '100vh', width: '100vw' }} p='3'>
            <Box className="adminPage">
                <AdminDropdownMenu userData={userData} setUserData={setUserData} />

                <RadioButtons radioOptions={radioOptions} setRadioSelectedOption={setRadioSelectedOption} />
                {
                    loading &&
                    <Flex direction='column' justify='center' align='center' style={{ height: '90%' }}>
                        <Spinner size='3' />
                    </Flex>
                }

                {
                    tableData.length > 0 &&
                    <AdminTable
                        tableData={tableData}
                        handleDeleteUser={handleDeleteUser}
                        setOpenEditDialog={setOpenEditDialog}
                        setDialogData={setDialogData}
                    />
                }

                {
                    dialogData.user_id && <EditDialog open={openEditDialog} setOpen={setOpenEditDialog} user={dialogData} password={modifyPassword} setPassword={setModifyPassword} handleEditUser={handleEditUser} />
                }

            </Box>

        </Box>

    )
}