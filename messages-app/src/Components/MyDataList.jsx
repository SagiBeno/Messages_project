import {  DataList, Link  } from '@radix-ui/themes'

export default function MyDataList({ user }) {
    return (
        <DataList.Root>
            <DataList.Item>
                <DataList.Label minWidth="88px">Teljes név</DataList.Label>
                <DataList.Value>{user.full_name}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
                <DataList.Label minWidth="88px">Felhasználónév</DataList.Label>
                <DataList.Value>{user.username}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
                <DataList.Label minWidth="88px">Email</DataList.Label>
                <DataList.Value>
                    <Link href="mailto:vlad@workos.com" color='tomato'>{user.email}</Link>
                </DataList.Value>
            </DataList.Item>
        </DataList.Root>
    )
}