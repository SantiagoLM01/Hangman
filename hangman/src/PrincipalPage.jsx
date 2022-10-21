import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useWord from './hooks/useWord'

const PrincipalPage = () => {

    const navigate = useNavigate()

    const {palabra, setPalabra } = useWord()
    const [input, setInput] = useState()




    const handleJugarEscogido = () => {
        setPalabra(input)
        navigate('/hangman')


    }

    const handleJugarAleatorio = () => {
        const palabras = ['Costa Rica','Pizza','Serpiente','Republica Democratica del Congo','Chocolate','Zanahoria','Computadora','Telefono','Parlante','Alcohol','Volcan','Perro','Gato','Estados Unidos','Netflix','Covid 19', 'Pandemia', 'Alitas', 'Arepa', 'Navidad', 'Rugby', 'Baloncesto', 'Futbol']
        const palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];
        setPalabra(palabraAleatoria)
        navigate('/hangman')
    }

    const onInputChange = ({ target }) => {
        const { value } = target;
        setInput( value);
        
    }


    return (
        <>
            <h1>Hangman</h1>
            <div className='grid contenedor'>
                <div className='form-palabra-escogida'>
                    <h1>Palabra Escogida</h1>
                    <label className='label-input' htmlFor="">Escoge una Palabra</label>
                    <input name='palabra' value={input} onChange={onInputChange} className='input-palabra' type="text" />
                    <button onClick={handleJugarEscogido} className='btn-jugar'>Empieza  Jugar con la Palabra Introducida</button>

                </div>
                <div className='form-palabra-aleatoria'>
                    <h1>Palabra Aleatoria</h1>
                    <h3>Dale Click abajo para una Palabra Aleatoria</h3>
                    <button onClick={handleJugarAleatorio} className='btn-jugar'>Empieza  Jugar con una Palabra Aleatoria</button>
                </div>
            </div>
        </>
    )
}

export default PrincipalPage