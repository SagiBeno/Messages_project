import { Box, Card, Flex, Tabs, Text, ScrollArea, Heading, Avatar, Spinner, } from "@radix-ui/themes";
import TabsComponent from "./TabsComponent";
import SearchNewFriendComponent from "./SearchNewFriendComponent";
import SearchCard from "./SearchCard";
import IncomingRequestsCard from "./IncomingRequestsCard";
import FriendCardComponent from "./FriendCardComponent";
import FilterTextField from "./FilterTextField";
import SidebarDropdownMenu from "./SidebarDropdownMenu";
import { useEffect, useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function Sidebar({ userData, options, activeTab, setActiveTab, incomingRequests, friends, handleSearchNewFriend, searchData, addFriend, loading, currentUserId, handleAccept, handleSelectedFriend }) {
    const [filterText, setFilterText] = useState('');

    const filteredFriends = friends.filter((friend) => {
        const query = filterText;
        if (!query) return true;
        return (
            friend.username?.toLowerCase().includes(query) || friend.full_name?.toLowerCase().includes(query)
        );
    });

    const filteredIncomingRequests = incomingRequests.filter((request) => {
        const query = filterText;
        if (!query) return true;
        return (
            request.username?.toLowerCase().includes(query) || request.full_name?.toLowerCase().includes(query)
        );
    });

    const handleFilterChange = (filter) => {
        setFilterText(filter.trim().toLowerCase());
    }

    return (
        <Box id="sidebar" >
            <Box style={{ height: "100%" }}>
                <SidebarDropdownMenu userData={userData} />
                <Flex direction="column" style={{ height: "100%" }} gap="3">

                    <TabsComponent options={options} activeTab={activeTab} setActiveTab={setActiveTab} />

                    {
                        activeTab === 'friends' &&
                        <Box style={{ flex: 1, overflow: "hidden" }}>
                            {
                                (friends.length > 0 || incomingRequests.length > 0) &&
                                <Box pt="2" style={{ userSelect: 'none', cursor: 'default' }} mb='2'>
                                    <FilterTextField handleSearch={handleFilterChange} placeholder={'Kersés az ismerősök között'} />
                                </Box>
                            }
                            <ScrollArea type="auto" scrollbars="vertical" radius='full' style={{ height: "100%" }}>
                                {
                                    loading
                                        ?
                                        <Flex direction='column' justify='center' align='center' style={{ height: '90%' }}>
                                            <Spinner size='3' />
                                        </Flex>
                                        :
                                        <Flex direction='column' mr='3'>

                                            {
                                                (filteredIncomingRequests.length > 0) &&
                                                <>
                                                    <Text as="p" style={{ opacity: '0.6', userSelect: 'none', cursor: 'default' }} mb='2'>
                                                        Beérkező kérelmek
                                                    </Text>

                                                    {
                                                        incomingRequests.map((request, idx) => (<IncomingRequestsCard key={idx} request={request} handleAccept={handleAccept} />))
                                                    }
                                                </>
                                            }

                                            {
                                                (filteredFriends.length > 0) ?
                                                    <>
                                                        <Text as="p" style={{ opacity: '0.6', userSelect: 'none', cursor: 'default' }} mb='2'>
                                                            Ismerősök
                                                        </Text>

                                                        {
                                                            filteredFriends.map((friend, idx) => (<FriendCardComponent key={idx} friend={friend} handleSelectedFriend={handleSelectedFriend} />))
                                                        }
                                                    </>
                                                    :
                                                    <Flex direction='column' align='center'>
                                                        <Text as="p" style={{ opacity: '0.6', userSelect: 'none', cursor: 'default' }} mb='2'>
                                                            Nincsenek ismerősök
                                                        </Text>
                                                    </Flex>
                                            }



                                        </Flex>
                                }


                            </ScrollArea>
                        </Box>
                    }

                    {
                        activeTab === 'search' &&
                        <Box style={{ flex: 1, overflow: "hidden" }}>
                            <Box style={{ userSelect: 'none', cursor: 'default' }} p='1' mb='2'>
                                <SearchNewFriendComponent handleSearchNewFriend={handleSearchNewFriend} />
                            </Box>
                            {
                                loading &&
                                <Flex direction='column' justify='center' align='center' style={{ height: '100%' }}>
                                    <Spinner size='3' />
                                </Flex>
                            }
                            {
                                (searchData.length > 0 && !loading)
                                    ?
                                    <ScrollArea type="auto" scrollbars="vertical" radius='full' style={{ height: "100%" }}>
                                        <Flex direction='column' mr='3'>
                                            {
                                                searchData.map((user, idx) => <SearchCard key={idx} user={user} addFriend={addFriend} currentUserId={currentUserId} />)
                                            }
                                        </Flex>
                                    </ScrollArea>
                                    :
                                    <Flex direction='column' align='center'>
                                        <Text as="p" style={{ opacity: '0.6', userSelect: 'none', cursor: 'default' }} mb='2'>
                                            Nincs találat
                                        </Text>
                                    </Flex>
                            }
                        </Box>
                    }

                </Flex>
            </Box>
        </Box>

    );
}