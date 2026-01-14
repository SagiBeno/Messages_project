import { Box, Card, Flex, Tabs, Text, ScrollArea, Heading, Avatar, TextField, Spinner } from "@radix-ui/themes";
import TabsComponent from "./TabsComponent";
import SearchNewFriendComponent from "./SearchNewFriendComponent";
import SearchCard from "./SearchCard";
import IncomingRequestsCard from "./IncomingRequestsCard";
import FriendCardComponent from "./FriendCardComponent";
import FilterTextField from "./FilterTextField";
import { useEffect, useState } from "react";

export default function Sidebar({ options, activeTab, setActiveTab, incomingRequests, friends, handleSearchNewFriend, searchData, addFriend, loading, currentUserId, handleAccept }) {
    const [filterText, setFilterText] = useState(''); 
    
    const filteredFriends = friends.filter( (friend) => {
        const query = filterText;
        if (!query) return true;
        return (
            friend.username?.toLowerCase().includes(query) || friend.full_name?.toLowerCase().includes(query)
        );
    } );

    const filteredIncomingRequests = incomingRequests.filter( (request) => {
        const query = filterText;
        if (!query) return true;
        return (
            request.username?.toLowerCase().includes(query) || request.full_name?.toLowerCase().includes(query)
        );
    } );

    const handleFilterChange = (filter) => {
        setFilterText(filter.trim().toLowerCase());
    }

    return (
            <Box style={{ overflow: "hidden", height: "100%", minWidth: '300px'}} >
                <Card style={{ height: "100%", borderRadius: 0, }}>
                    <Flex direction="column" style={{ height: "100%" }} gap="3">
                        <Flex
                            direction="row"
                            justify='center'
                            align='center'
                        >
                            <Avatar
                                src="icon.png"
                                size='3'
                                title="Mesaj icon"
                                alt="Mesaj icon"
                            />
                            <Heading as="h1" ml='1'>Messaj</Heading>
                        </Flex>

                        <TabsComponent options={options} activeTab={activeTab} setActiveTab={setActiveTab} />

                        {
                            activeTab === 'chats' &&
                            <Box style={{ flex: 1, overflow: "hidden" }}>
                                <ScrollArea type="auto" scrollbars="vertical" style={{ height: "100%" }}>
                                    <Box pt="2">
                                        Csevegések
                                    </Box>
                                </ScrollArea>
                            </Box>
                        }

                        {
                            activeTab === 'friends' &&
                            <Box style={{ flex: 1, overflow: "hidden" }}>
                                <ScrollArea type="auto" scrollbars="vertical" radius='full' style={{ height: "100%", paddingRight: '15px' }}>
                                    {
                                        loading
                                            ?
                                            <Flex direction='column' justify='center' align='center' style={{ height: '90%' }}>
                                                <Spinner size='3' />
                                            </Flex>
                                            :
                                            <Flex direction='column'>
                                               
                                                {
                                                    (friends.length > 0 || incomingRequests.length > 0) &&
                                                    <Box pt="2" style={{ userSelect: 'none', cursor: 'default' }} mb='2'>
                                                        <FilterTextField handleSearch={handleFilterChange} placeholder={'Kersés az ismerősök között'} />
                                                    </Box>
                                                }
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
                                                                filteredFriends.map((friend, idx) => (<FriendCardComponent key={idx} friend={friend} />))
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
                                <ScrollArea type="auto" scrollbars="vertical" radius='full' style={{ height: "100%", userSelect: 'none', cursor: 'default' }}>
                                    <Box pt="2" style={{ userSelect: 'none', cursor: 'default' }} mb='2'>
                                        <SearchNewFriendComponent handleSearchNewFriend={handleSearchNewFriend} />
                                    </Box>

                                    {
                                        loading &&
                                        <Flex direction='column' justify='center' align='center' style={{ height: '90%' }}>
                                            <Spinner size='3' />
                                        </Flex>
                                    }

                                    {
                                        searchData.length > 0
                                            ?
                                            <Flex direction='column'>
                                                {
                                                    searchData.map((user, idx) => <SearchCard key={idx} user={user} addFriend={addFriend} currentUserId={currentUserId} />)
                                                }
                                            </Flex>
                                            :
                                            <Flex direction='column' align='center'>
                                                <Text as="p" style={{ opacity: '0.6', userSelect: 'none', cursor: 'default' }} mb='2'>
                                                    Nincs találat
                                                </Text>
                                            </Flex>
                                    }
                                </ScrollArea>
                            </Box>
                        }

                    </Flex>
                </Card>
            </Box>

    );
}