import { TextField, IconButton } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function FilterTextField( { handleSearch, placeholder } ) {
    const [searchText, setSearchText] = useState('');

    return (
        <TextField.Root
            radius="full"
            placeholder={placeholder}
            m='1'
            value={searchText}
            onChange={(e) => {
                setSearchText(e.target.value);
                handleSearch(e.target.value)
            }}
            color="tomato"
        />
    )
}