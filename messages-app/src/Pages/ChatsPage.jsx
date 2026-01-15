import { Flex } from "@radix-ui/themes";
import Sidebar from "../Components/Sidebar";
import ChatComponent from "../Components/ChatComponent";
import { useState, useEffect } from "react";

export default function ChatsPage({ loading, setLoading, userData, toastData, setToastData, setUserData }) {

  const [tabsOptions, setTabsOptions] = useState(
    {
      friends: 'Ismerősök',
      search: 'Keresés'
    }
  );
  const [activeTab, setActiveTab] = useState("friends");
  const [searchData, setSearchData] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const [selectedFriend, setSelectedFriend] = useState({});
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [newMessageContent, setNewMessageContent] = useState('');
  const [messageLoading, setMessageLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'friends') {
      handleLoadIncomingRequests();
      handleLoadFriend();
    }
  }, [activeTab]);

  const handleLoadFriend = () => {
    setLoading(true);

    fetch(`/api/get_friends?userId=${userData.id}`)
      .then(async (resJSON) => {
        const res = await resJSON.json();
        setFriends(res);
      })
      .catch((err) => {
        console.warn(err);
        setToastData({ open: true, title: 'Sikertelen lekérdezés', description: 'Az adatok lekérése során hiba történt, kérjük próbálja meg újra.', isError: true });
      })
      .finally(() => setLoading(false));
  }

  const handleAccept = (request) => {

    setIncomingRequests((prev) => (
      prev.filter(r => r.relationship_id !== request.relationship_id)
    ));

    setFriends((prev) => [
      ...prev,
      {
        user_id: request.user_id,
        username: request.username,
        full_name: request.full_name
      }
    ]);

    fetch('/api/accept_request', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        relationshipId: request.relationship_id,
        userId: userData.id
      })
    })
      .then(async (resJSON) => {
        const res = await resJSON.json();
        console.log(res);
      })
      .catch((err) => {
        console.warn(err);
        setIncomingRequests((prev) => {
          const exists = prev.some(r => r.relationship_id === request.relationship_id);
          return exists ? prev : [request, ...prev]
        });

        setFriends((prev) => {
          const exists = prev.some(f => f.user_id === request.user_id);
          return exists ? prev : [...prev, { user_id: request.user_id, username: request.username, full_name: full_name }]
        });
        setToastData({ open: true, title: 'Sikertelen elfogadás', description: 'A kérelem elfogadása során hiba történt, kérjük próbálja újra, vagy frissítse az oldalt.', isError: true });
      })
  }

  const handleLoadIncomingRequests = () => {
    setLoading(true);
    fetch(`/api/incoming_requests?userId=${userData.id}`)
      .then(async (resJSON) => {
        const res = await resJSON.json();
        setIncomingRequests(res);
      })
      .catch((err) => {
        console.warn(err)
        setToastData({ open: true, title: 'Sikertelen lekérdezés', description: 'Az adatok lekérése során hiba történt, kérjük próbálja meg újra.', isError: true });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleSearchNewFriend = (searchText) => {

    if (searchText.length !== 0) {
      setLoading(true)

      fetch(`/api/search?q=${encodeURIComponent(searchText.trim())}&userId=${userData.id}`)
        .then(async (resJSON) => {
          const res = await resJSON.json();
          setSearchData(res);
        })
        .catch((err) => {
          console.warn(err)
          setToastData({ open: true, title: 'Sikertelen lekérdezés', description: 'Az adatok lekérése során hiba történt, kérjük próbálja meg újra.', isError: true });
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }

  const handleAddFriend = (user) => {
    setSearchData((prev) => (
      prev.map((u) => (
        u.user_id === user.user_id
          ?
          { ...u, accepted: false, requester_id: userData.id, addressee_id: user.user_id }
          :
          u
      ))
    ));

    fetch('/api/add_friend', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requesterId: userData.id,
        addresseeId: user.user_id
      })
    })
      .then(async (resJSON) => {
        const res = await resJSON.json();
      })
      .catch((err) => {
        console.warn(err);

        setSearchData(prev => (
          prev.map(u => (
            u.user_id === user.user_id
              ?
              {
                ...u,
                accepted: null,
                requester_id: null,
                addressee_id: null
              }
              :
              u
          ))
        ))

        setToastData({ open: true, title: 'Sikertelen felvétel', description: 'A kérelem küldése során hiba lépett fel, kérjük próbálja újra, vagy ellenőrizze az ismerősök listáját.', isError: true });

      });
  }


  const handleSelectedFriend = (friend) => {
    setSelectedFriend(friend);
    setMessageLoading(true);

    fetch(`/api/get_messages?currentUserId=${userData.id}&selectedUserId=${friend.user_id}`)
      .then(async (resJSON) => {
        const res = await resJSON.json();
        setSelectedChat(res);
      })
      .catch((err) => {
        console.warn(err);
        setToastData({ open: true, title: 'Lekérdezési hiba', description: 'Az adatok lekérdezése során hiba történt, kérjük próbálja meg újra.', isError: true });
      })
      .finally(() => setMessageLoading(false));

  }

  const handleSendMessage = (message) => {
    if (message.trim() === '') return;

    const message_id = Date.now();
    const tempMessage = {
      message_id: message_id,
      sender_id: userData.id,
      receiver_id: selectedFriend.user_id,
      body: message,
      created_at: new Date().toISOString(),
      is_read: false,
      optimistic: true,
    };

    setSelectedChat(prev => [...prev, tempMessage]);

    fetch("/api/send_message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderId: userData.id,
        receiverId: selectedFriend.user_id,
        body: message,
      }),
    })
      .then( async (resJSON) => {
        const res = await resJSON.json();
        if (resJSON.status !== 201) {
          setSelectedChat(prev => prev.filter(m => m.message_id !== message_id));
          setToastData( { open: true, title: 'Sikertelen küldés', description: 'Az üzenet küldése során hiba lépett fel, kérjük próbálja meg újra.', isError: true } );
        } else {
          setSelectedChat([...selectedChat, res])
        }
      } )
      .catch( (err) => {
        console.warn(err);
        setToastData( { open: true, title: 'Sikertelen küldés', description: 'Az üzenet küldése során hiba lépett fel, kérjük próbálja meg újra.', isError: true } );
        setSelectedChat(prev => prev.filter(m => m.message_id !== message_id));
      } );
  }

  return (
    <Flex direction="row" height="100vh" width="100vw" justify="space-between" align="center" className="chatPage">

      <Sidebar
        loading={loading}
        options={tabsOptions}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleSearchNewFriend={handleSearchNewFriend}
        searchData={searchData}
        addFriend={handleAddFriend}
        currentUserId={userData.id}
        incomingRequests={incomingRequests}
        handleAccept={handleAccept}
        friends={friends}
        handleSelectedFriend={handleSelectedFriend}
        userData={userData}
      />
      <ChatComponent loading={messageLoading} currentUserId={userData.id} selectedChat={selectedChat} selectedFriend={selectedFriend} newMessageContent={newMessageContent} setNewMessageContent={setNewMessageContent} handleSendMessage={handleSendMessage} />

    </Flex>
  )
}