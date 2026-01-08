import { useState } from "react"
import { TextField, IconButton } from "@radix-ui/themes";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export default function PasswordInput( { inputName, value, onChange } ) {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <TextField.Root
            radius="full"
            placeholder="Jelszó"
            size="3"
            name={inputName}
            id={inputName}
            mb="3"
            type={showPassword ? "text" : "password"}
            color="tomato"
            value={value}
            onChange={onChange}
        >
            <TextField.Slot side="right">
                <IconButton
                    style={{
                        color: "#C36192",
                        cursor: "pointer",
                    }}
                    variant="ghost"
                    size="2"
                    aria-label={showPassword ? "Jelszó elrejtése" : "Jelszó megjelenítése"}
                    onClick={handleShowPassword}
                >

                    {
                        showPassword ?
                            <EyeClosedIcon height="25" width="25" />
                            :
                            <EyeOpenIcon height="25" width="25" />
                    }
                </IconButton>
            </TextField.Slot>
        </TextField.Root>
    )
}