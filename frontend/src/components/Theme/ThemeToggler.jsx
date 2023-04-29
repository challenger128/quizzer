import React from 'react'
import {Switch, UsecolorMode, FormLabel, useColorMode} from '@chakra-ui/react'

export const ThemeToggler = ({showLabel=false, ...rest}) => {
    const {toggleColorMode, colorMode} = useColorMode();
  return (
    <>
        {showLabel && (
            <FormLabel htmlFor="theme-toggler" mb={0}>
                Сменить тему
            </FormLabel>
        )}
        <Switch
            id="theme-toggler"
            size="sm"
            isChecked={colorMode == "dark"}
            isDisabled={false}
            value={colorMode}
            colorScheme="green"
            mr={2}
            onChange={toggleColorMode}
            {...rest}
        >

        </Switch>
    </>
  )
}
