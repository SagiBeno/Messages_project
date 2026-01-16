import { Table, ScrollArea,IconButton } from "@radix-ui/themes";
import { TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";

export default function AdminTable( { tableData, handleEditUser, handleDeleteUser, setOpenEditDialog, setDialogData } ) {
    return (
        <ScrollArea style={{ maxHeight: "60vh", margin: '0 auto', width: '90%', }}>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Név</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Felhasználónév</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align="center">Műveletek</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {tableData.map(user => (
                        <Table.Row key={user.user_id}>
                            <Table.Cell>{user.full_name}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.username}</Table.Cell>
                            <Table.Cell align='center'>
                                <IconButton mr='1' color='gray' variant='soft' style={{cursor: 'pointer'}} onClick={() => {setDialogData(user); setOpenEditDialog(true)}}><Pencil2Icon width='20px' height='20px' /></IconButton>
                                <IconButton color='tomato' variant='soft' style={{cursor: 'pointer'}} onClick={() => handleDeleteUser(user)}><TrashIcon width='20px' height='20px' /></IconButton>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </ScrollArea>
    )
}