import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './style.css';

export default function Cozinha() {
    const socket = io('http://localhost:4000');

    interface EstadoInicial {
        luzOn: boolean,
    }

    interface EstadoLuz {
        luzOn: boolean,
    }

    const [estadoInicial, setEstadoInicial] = useState<EstadoInicial>({
        luzOn: false
    });

    const [estadoLuz, setEstadoLuz] = useState<EstadoLuz>({
        luzOn: false
    });

    //conectar ao backend e receber o estado inicial
    useEffect(() => {
        socket.on('estadoInicialSala', (estadoInicial: EstadoInicial) => {
            setEstadoInicial(estadoInicial);
        });
        //atualiza estado quando houver mudança
        socket.on('acenderLuzCozinha', (novoEstado: EstadoLuz) => {
            setEstadoLuz(novoEstado);
        });

        return () => {
            socket.off('estadoInicialCozinha');
            socket.off('acenderLuzCozinha');
        }
    }, []);

    //funcao para alterar o estado dos dispositivo
    const acenderLuz = () => {
        socket.emit('acenderLuzCozinha');
    }


    return (
        <div className='cozinha'>
            <div className='luz'>
                <p>Sala de Estar - Luz</p>
                <button onClick={acenderLuz}>
                    {estadoLuz.luzOn ? 'Desligar Luz' : 'Ligar Luz'}
                </button>
                <img src='./luz.png' className={`status ${estadoLuz.luzOn ? 'on' : 'off'}`} />
            </div>
        </div>
    )
}