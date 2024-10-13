import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './style.css';
import luz from '../images/luz.png';
import tv from '../images/tv.jpeg';
import ar from '../images/ar.png';

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
    interface EstadoLuz {
        luzOn: boolean,
    }

    const [estadoInicial, setEstadoInicial] = useState<EstadoInicial>({
        luzOn: false,
        tvOn: false,
        arTemp: 18,
        arOn: false
    });

    const [estadoLuz, setEstadoLuz] = useState<EstadoLuz>({
        luzOn: false
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
        socket.on('acenderLuzSala', (novoEstado: EstadoLuz) => {
            setEstadoLuz(novoEstado);
        });
        socket.on('ligarTvSala', (novoEstado: EstadoTv) => {
            setEstadoTv(novoEstado);
        });
        socket.on('ligarArSala', (novoEstado: EstadoAr) => {
            setEstadoAr(novoEstado);
        });

        return () => {
            socket.off('estadoInicialSala');
            socket.off('acenderLuzSala');
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
    const acenderLuz = () => {
        socket.emit('acenderLuzSala');
    }

    return (
        <div className='sala'>
            <h2>Sala de estar</h2>
            <div className="componentes">
                <div className='luz'>
                    <img src={luz} className={`status ${estadoLuz.luzOn ? 'on' : 'off'}`} />
                    <button onClick={acenderLuz}>
                        {estadoLuz.luzOn ? 'Desligar Luz' : 'Ligar Luz'}
                    </button>
                </div>
                <div className='tv'>
                    <img src={tv} className={`status ${estadoTv.tvOn ? 'on' : 'off'}`} />
                    <button onClick={ligarTv}>
                        {estadoTv.tvOn ? 'Desligar TV' : 'Ligar TV'}
                    </button>
                </div>
                <div className='ar'>
                    <img src={ar} className={`status ${estadoAr.arOn ? 'on' : 'off'}`} />
                    <button onClick={ligarAr}>
                        {estadoAr.arOn ? 'Desligar Ar' : 'Ligar Ar'}
                    </button>
                    <br />
                    <label className={`status ${estadoAr.arOn ? 'on' : 'off'}`}>Temperatura:</label>
                    <input id="temp" className={`status ${estadoAr.arOn ? 'on' : 'off'}`} type="number" disabled={!estadoAr.arOn} />
                </div>
            </div>
        </div>
    )
}