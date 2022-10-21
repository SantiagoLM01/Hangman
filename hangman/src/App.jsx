import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useWord from './hooks/useWord'

const App = () => {
    const [errorCount, setErrorCount] = useState(0)
    const [array, setArray] = useState([])
    const [abecedario, setAbecedario] = useState(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'])
    const [ganaste, setGanaste] = useState(0)
    const [terminado, setTerminado] = useState(false)
    const [arrayTrim, setArrayTrim] = useState([])
    const [letrasAdivinadas, setLetrasAdivinadas] = useState([])
    const nameDiv = useRef(null)

    const navigate = useNavigate()

    const { palabra } = useWord()

    useEffect(() => {
        if (palabra === undefined) {
            navigate('/')
        } else {
            turnStrToArray()
        }
    }, [])

    useEffect(() => {
        if (arrayTrim.length > 0) {
            if (ganaste === arrayTrim.length) {
                setTerminado(true)
            }
        }
    }, [ganaste])


    const turnStrToArray = () => {
        let arrPalabra = Array.from(palabra.toLowerCase())
        const palabraTrim = palabra.replace(/ /g, '')
        const arrayTrimPalabra = Array.from(palabraTrim.toLowerCase())
        let arrayNoDuplicados = arrayTrimPalabra.filter((item, index) => {
            return arrayTrimPalabra.indexOf(item) === index;
        })
        setArrayTrim(arrayNoDuplicados)

        let arrCompleto = []
        arrPalabra.forEach(letra => {
            arrCompleto = [...arrCompleto, { letra, display: 'hidden' }]

        })
        setArray(arrCompleto)


    }


    const handleButtonLetra = (e) => {
        if (ganaste === arrayTrim.length) return
        if (errorCount === 9) return
        const letra = e.target.innerHTML
        buttonVisbility(letra)
        const letraYaAdivinada = !!letrasAdivinadas.find(letraAdivinada => letraAdivinada === letra)
        if (letraYaAdivinada) return
        letterVisibility(letra)


        const existeLetra = !!array.find(obj => obj.letra === letra)

        if (!existeLetra) {
            setErrorCount(errorCount + 1)
        }

    }



    const shakeStickman = () => {
        if (errorCount === 9) {
            return 'animate__animated animate__shakeX'
        } else {
            return ''
        }

    }

    const letterVisibility = (letra) => {
        const existeLetra = !!array.find(obj => obj.letra === letra)
        if (existeLetra) {
            setLetrasAdivinadas([...letrasAdivinadas, letra])
            setGanaste(ganaste + 1)
            const divsHTML = nameDiv?.current?.children
            const arrayHTML = Array.from(divsHTML)
            arrayHTML.map((div) => {
                const letraDiv = div.innerHTML.substr(33, 1)
                if (letraDiv === letra) {
                    let arrAdivinado = array.map(obj => {
                        if (obj.letra === letra) {
                            obj.display = ''
                        }
                        return obj

                    })
                    setArray(arrAdivinado)
                }
            })
        }
    }

    const buttonVisbility = (letra) => {
        const abecedarioFiltrado = abecedario.filter(letraAbecedario => letraAbecedario !== letra)
        setAbecedario(abecedarioFiltrado)
    }


    return (
        <>
            <h1>Hangman</h1>
            <div className='contenedor'>
                <div className='container-stickman'>
                    <div className='base'></div>
                    {errorCount >= 2 && <div className='horizontal-stick'></div>}
                    {errorCount >= 1 && <div className='vertical-stick'></div>}
                    {errorCount >= 3 && <div className='rope'></div>}
                    <div className={`stickman ${shakeStickman()}`}>
                        {errorCount >= 4 && <div className='head'>
                            <div className='innerHead'></div>
                        </div>}
                        {errorCount >= 5 && <div className='body'></div>}
                        {errorCount >= 6 && <div className='left-arm'></div>}
                        {errorCount >= 7 && <div className='right-arm'></div>}
                        {errorCount >= 8 && <div className='left-leg'></div>}
                        {errorCount === 9 && <div className='right-leg'></div>}
                    </div>


                </div>
                <div className='mensaje'>
                    {terminado ? <h3 className='vidas'>Ganaste!!</h3> : errorCount === 9 ? <h3 className='vidas'>Perdiste!!</h3> : <h3 className='vidas'>Te quedan {9 - errorCount} vidas</h3>}
                </div>
                <div className='container-teclado'>
                    <div className='teclado'>{abecedario.map((letra, index) => (
                        <button onClick={handleButtonLetra} key={index} className='letras-teclado'>{letra}</button>
                    ))}
                    </div>
                    <div className='palabra' ref={nameDiv}>
                        {array.map((obj, index) => {
                            if (obj.letra === ' ') {
                                return (
                                    <div key={index} className='espacio'> </div>
                                )
                            } else {
                                return (
                                    <div key={index} className='letra' >
                                        <p className={`letraAdivinada ${obj.display}`}>{obj.letra}</p>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>




        </>
    )
}

export default App