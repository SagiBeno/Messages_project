import { RadioGroup } from "@radix-ui/themes"

export default function RadioButtons( { radioOptions, setRadioSelectedOption } ) {


    return (
        
        <RadioGroup.Root name="selector" color="tomato">
            {
                Object.keys(radioOptions).map( (option, idx) => <RadioGroup.Item key={idx} value={option} onClick={(e) => setRadioSelectedOption(e.target.value)}>{radioOptions[option]}</RadioGroup.Item>)
            }
        </RadioGroup.Root>
    )
}