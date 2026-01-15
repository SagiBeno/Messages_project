import { RadioGroup } from "@radix-ui/themes"

export default function RadioButtons( { radioOptions } ) {


    return (
        
        <RadioGroup.Root name="selector" color="tomato">
            {
                Object.keys(radioOptions).map( (option, idx) => <RadioGroup.Item key={idx} value={option}>{radioOptions[option]}</RadioGroup.Item>)
            }
        </RadioGroup.Root>
    )
}