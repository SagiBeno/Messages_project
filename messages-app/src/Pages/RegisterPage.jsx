import { useState } from "react";
import { Container, Box, Card, TextField, IconButton, Text, Avatar, Flex, Separator, Button, Spinner } from "@radix-ui/themes";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import PasswordInput from "../Components/PasswordInput";

export default function LoginPage() {
    const [validData, setValidData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inpudData, setInputData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        fullName: ""
    });

    const handleLogin = (e) => {
        e.preventDefault();
        // Login logic here
        console.log("Login attempt with:", inpudData);
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
                        Regisztráció
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
                        Hozzon létre egy fiókot!
                    </Text>

                    <Text as="label" htmlFor="emailInput" mx='1'>
                        Email
                    </Text>
                    <TextField.Root
                        type="email"
                        radius="full"
                        placeholder="minta.janos@gmail.com"
                        size="3" name="emailInput"
                        id="emailInput"
                        mt="2"
                        mb="3"
                        color="tomato"
                        value={inpudData.email}
                        required
                        onChange={(e) => {
                            if (e.target.value.includes(' ')) return;
                            else setInputData({ ...inpudData, email: e.target.value })
                        }}
                    />

                    <Text as="label" htmlFor="usernameInput" mx='1'>
                        Felhasználónév
                    </Text>
                    <TextField.Root
                        type="text"
                        radius="full"
                        placeholder="Felhasználónév"
                        size="3" name="usernameInput"
                        id="usernameInput"
                        mt="2"
                        mb="3"
                        color="tomato"
                        value={inpudData.username}
                        required
                        onChange={(e) => {
                            if (e.target.value.includes(' ')) return;
                            else setInputData({ ...inpudData, username: e.target.value })
                        }}
                    />

                     <Text as="label" htmlFor="usernameInput" mx='1'>
                        Teljes név
                    </Text>
                    <TextField.Root
                        type="text"
                        radius="full"
                        placeholder="Minta János"
                        size="3" name="fullNameInput"
                        id="fullNameInput"
                        mt="2"
                        mb="3"
                        color="tomato"
                        value={inpudData.fullName}
                        required
                        onChange={(e) => {
                            if (e.target.value.includes(' ')) return;
                            else setInputData({ ...inpudData, fullName: e.target.value })
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

                    <Text
                        as="label"
                        htmlFor="passwordComfirm"
                        mx='1'
                        style={{
                            userSelect: 'none',
                            cursor: 'default'
                        }}
                    >
                        Jelszó megerosítése
                    </Text>
                    <PasswordInput
                        inputName="passwordComfirm"
                        value={inpudData.passwordComfirm}
                        onChange={(e) => {
                            if (e.target.value.includes(' ')) return;
                            else setInputData({ ...inpudData, passwordComfirm: e.target.value })
                        }}
                    />

                    {
                        inpudData.emailOrUsername && inpudData.password && inpudData.password.length >= 8 && inpudData.password === inpudData.passwordComfirm
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
                    >
                        Regisztráció
                    </Button>

                </Card>
            </Flex>
        </Container>
    )
}