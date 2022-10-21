import React, { useState } from 'react'

import { createContext } from 'react'

export const WordContext = createContext();


const WordProvider = ({ children }) => {

    const [palabra, setPalabra] = useState()

   



    return (
        <WordContext.Provider

            value={{
                palabra,
                setPalabra
            }}>
            {children}
        </WordContext.Provider>
    )
}

export default WordProvider