import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './style.css';
import Luz from "./Luz";

export default function Sala() {
    const socket = io('http://localhost:4000');

    interface EstadoInicial {
        luzOn: boolean,
        tvOn: boolean,
        arTemp: number,
        arOn: boolean
    }

    interface EstadoLuz {
        luzOn: boolean,
    }

    interface EstadoTv {
        tvOn: boolean
    }

    interface EstadoAr {
        arOn: boolean
    }

    const [estadoInicial, setEstadoInicial] = useState<EstadoInicial>({
        luzOn: false,
        tvOn: false,
        arTemp: 0,
        arOn: false
    });

    const [estadoTv, setEstadoTv] = useState<EstadoTv>({
        tvOn: false
    });

    const [estadoAr, setEstadoAr] = useState<EstadoAr>({
        arOn: false
    });

    //conectar ao backend e receber o estado inicial
    useEffect(() => {
        socket.on('estadoInicialSala', (estadoInicial: EstadoInicial) => {
            setEstadoInicial(estadoInicial);
        });
        socket.on('ligarTvSala', (novoEstado: EstadoTv) => {
            setEstadoTv(novoEstado);
        });
        socket.on('ligarArSala', (novoEstado: EstadoAr) => {
            setEstadoAr(novoEstado);
        });

        return () => {
            socket.off('estadoInicialSala');
            socket.off('ligarTvSala');
            socket.off('ligarArSala');
        }
    }, []);

    //funcao para alterar o estado dos dispositivo
    const ligarTv = () => {
        socket.emit('ligarTvSala');
    }
    const ligarAr = () => {
        socket.emit('ligarArSala');
    }
   

    return (
        <div className='sala'>
            <Luz/>
            <div className='tv'>
                <p>Sala de Estar - TV</p>
                <button onClick={ligarTv}>
                    {estadoTv.tvOn ? 'Desligar TV' : 'Ligar TV'}
                </button>
                <img src='tv.png' className={`status ${estadoTv.tvOn ? 'on' : 'off'}`} />
            </div>
            <div className='ar'>
                <p>Sala de Estar - AR Condicionado</p>
                <button onClick={ligarAr}>
                    {estadoAr.arOn ? 'Desligar Ar' : 'Ligar Ar'}
                </button>
                <label>Temperatura:</label>
                <input type="number" disabled={!estadoAr.arOn} />
                <img src='ar.png' className={`status ${estadoAr.arOn ? 'on' : 'off'}`} />
            </div>
        </div>
    )
}