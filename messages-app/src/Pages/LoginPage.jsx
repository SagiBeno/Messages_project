import { useState } from "react";
import { Container, Box, Card, TextField, Text, Avatar, Flex, Button, Spinner } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

import PasswordInput from "../Components/PasswordInput";

export default function LoginPage( { loading, setLoading, toastData, setToastData } ) {
    const [inpudData, setInputData] = useState({
        emailOrUsername: "",
        password: ""
    });

    let navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch('/.netlify/functions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...inpudData})
        })
            .then(async (resJSON) => {
                const res = await resJSON.json();
                if (resJSON.status === 200) {
                    setToastData( { open: true, title: 'Sikeres bejelentkezés', description: 'Sikeresen bejelentkezett a fiókjába.', isError: false } );
                    navigate('/')
                    localStorage.setItem('userData', JSON.stringify({  ...res.user, isLoggedIn: true }));
                } else if (resJSON.status === 401) {
                    setToastData( { open: true, title: 'Hibás adatok', description: 'Helytelen bejelentkezési adatok.', isError: true } );
                } else {
                    setToastData( { open: true, title: 'Hiba történt', description: 'Hiba történt a bejelentkezés során. Próbálja újra később.', isError: true } );
                }
            })
            .catch(console.warn)
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Container size="2" style={{padding: '0 10px'}}>
            <Flex
                align="center"
                justify="center"
                style={{
                    minHeight: '100vh',
                    userSelect: 'none',
                    cursor: 'default'
                }}
            >
                <Card
                    style={{
                        maxWidth: '400px',
                        width: '100%',
                        padding: '20px',
                        userSelect: 'none',
                        cursor: 'default'
                    }}>

                    <Flex align="center"
                        justify="center"
                        mb="2"
                        mt='2'>
                        <Avatar
                            src="icon.png"
                            size='5'
                            title="Mesaj icon"
                            alt="Mesaj icon"
                        />
                    </Flex>


                    <Text
                        as="p"
                        size="6"
                        weight="bold"
                        align="center"
                        mb="1"
                        style={{
                            userSelect: 'none',
                            cursor: 'default'
                        }}
                    >
                        Bejelentkezés
                    </Text>
                    <Text
                        as='p'
                        size='3'
                        align='center'
                        mb='4'
                        style={{
                            opacity: '0.6',
                            userSelect: 'none',
                            cursor: 'default'
                        }}
                    >
                        Jelentkezzen be a fiókjába!
                    </Text>

                    <Text as="label" htmlFor="emailOrUsername" mx='1'>
                        Email vagy felhasználónév
                    </Text>
                    <TextField.Root
                        radius="full"
                        placeholder="Email vagy felhasználónév"
                        size="3" name="emailOrUsername"
                        id="emailOrUsername"
                        mt="2"
                        mb="3"
                        color="tomato"
                        value={inpudData.emailOrUsername}
                        required
                        onChange={(e) => {
                            if (e.target.value.includes(' ')) return;
                            else setInputData({ ...inpudData, emailOrUsername: e.target.value })
                        }}
                    />

                    <Text
                        as="label"
                        htmlFor="password"
                        mx='1'
                        style={{
                            userSelect: 'none',
                            cursor: 'default'
                        }}
                    >
                        Jelszó
                    </Text>
                    <PasswordInput
                        inputName="password"
                        value={inpudData.password}
                        onChange={(e) => {
                            if (e.target.value.includes(' ')) return;
                            else setInputData({ ...inpudData, password: e.target.value })
                        }}
                    />

                    {
                        inpudData.emailOrUsername.length > 0 && inpudData.password.length >= 8
                            ?
                            loading
                                ?
                                <Button
                                    variant="outline"
                                    mt="4"
                                    mb="3"
                                    size="3"
                                    radius="full"
                                    disabled
                                    color="pink"
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    <Spinner loading />
                                    Bejelentkezés
                                </Button>
                                :
                                <Button
                                    variant="outline"
                                    mt="4"
                                    mb="3"
                                    size="3"
                                    radius="full"
                                    className="loginButton"
                                    style={{
                                        userSelect: 'none',
                                        cursor: 'pointer'
                                    }}
                                    color="pink"
                                    onClick={(e) => handleLogin(e)}
                                >
                                    Bejelentkezés
                                </Button>
                            :
                            <Button
                                variant="outline"
                                mt="4"
                                mb="3"
                                size="3"
                                radius="full"
                                color="pink"
                                disabled
                                style={{
                                    width: '100%'
                                }}
                            >
                                Bejelentkezés
                            </Button>
                    }

                    <Box my="5" style={{ position: "relative", textAlign: "center", opacity: 0.8, userSelect: 'none', cursor: 'default' }} color="pink">
                        <Box
                            style={{
                                height: 1,
                                backgroundColor: "#C36192",
                            }}
                        />
                        <Text
                            size="2"
                            color="gray"
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                background: "white",
                                padding: "0 8px",
                                color: "#C36192"
                            }}
                        >
                            vagy
                        </Text>
                    </Box>

                    <Text
                        as="p"
                        size="3"
                        align="center"
                    >
                        Nincs fiókja? Regisztráljon
                    </Text>


                    <Button
                        variant="outline"
                        mt="4"
                        mb="3"
                        size="3"
                        radius="full"
                        className="loginButton"
                        color="pink"
                        style={{
                            userSelect: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            navigate('/register');
                        }}
                    >
                        Regisztráció
                    </Button>

                </Card>
            </Flex>
        </Container>
    )
}