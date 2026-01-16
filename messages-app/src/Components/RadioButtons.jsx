import { RadioGroup, Flex, Text } from "@radix-ui/themes"

export default function RadioButtons( { radioOptions, setRadioSelectedOption, selected } ) {

    return (
        <Flex justify='center' align='center' mb="4" mt='5'>
            <RadioGroup.Root 
                value={selected}
                onValueChange={setRadioSelectedOption}
                orientation="horizontal"
                color="tomato"
            >
                <Flex gap="5" align="center">
                    {
                        Object.keys(radioOptions).map( (option, idx) => (
                            <Text as="label" key={idx}>
                                <RadioGroup.Item value={option} /> {radioOptions[option]}
                            </Text>
                            
                        ))
                    }
                </Flex>
           
        </RadioGroup.Root>
        </Flex>

        
    )
}