import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './style.css';
import luz from '../images/luz.png';
import ventilador from '../images/ventilador2.gif';
import cortina from '../images/cortina.jpg';

export default function Quarto() {
    const socket = io('http://localhost:4000');

    interface EstadoInicial {
        luzOn: boolean,
        ventiladorOn: boolean,
        cortinaOn:Boolean
    }

    interface EstadoLuz {
        luzOn: boolean,
    }
    interface EstadoVentilador {
        ventiladorOn: boolean,
    }
    interface EstadoCortina {
        cortinaOn: boolean,
    }

    const [estadoInicial, setEstadoInicial] = useState<EstadoInicial>({
        luzOn: false,
        ventiladorOn: false,
        cortinaOn: false
    });

    const [estadoLuz, setEstadoLuz] = useState<EstadoLuz>({
        luzOn: false
    });
    const [estadoVentilador, setEstadoVentilador] = useState<EstadoVentilador>({
        ventiladorOn: false
    });
    const [estadoCortina, setEstadoCortina] = useState<EstadoCortina>({
        cortinaOn: false
    });

    //conectar ao backend e receber o estado inicial
    useEffect(() => {
        socket.on('estadoInicialSala', (estadoInicial: EstadoInicial) => {
            setEstadoInicial(estadoInicial);
        });
        //atualiza estado quando houver mudança
        socket.on('ligarLuzQuarto', (novoEstado: EstadoLuz) => {
            setEstadoLuz(novoEstado);
        });
        socket.on('ligarVentiladorQuarto', (novoEstado: EstadoVentilador) => {
            setEstadoVentilador(novoEstado);
        });
        socket.on('ligarCortinaQuarto', (novoEstado: EstadoCortina) => {
            setEstadoCortina(novoEstado);
        });

        return () => {
            socket.off('estadoInicialQuarto');
            socket.off('ligarLuzQuarto');
            socket.off('ligarVentiladorQuarto');
            socket.off('ligarCortinaQuarto');
        }
    }, []);

    //funcao para alterar o estado dos dispositivo
    const acenderLuz = () => {
        socket.emit('ligarLuzQuarto');
    }
    const ligarVentilador = () => {
        socket.emit('ligarVentiladorQuarto');
    }
    const ligarCortina = () => {
        socket.emit('ligarCortinaQuarto');
    }


    return (
        <div className='quarto'>
            <h2>Quarto</h2>
            <div className="componentes">
                <div className='luz'>
                    <img src={luz} className={`status ${estadoLuz.luzOn ? 'on' : 'off'}`} />
                    <button onClick={acenderLuz}>
                        {estadoLuz.luzOn ? 'Desligar Luz' : 'Ligar Luz'}
                    </button>
                </div>
                <div className='ventilador'>
                    <img src={ventilador} className={`status ${estadoVentilador.ventiladorOn ? 'on' : 'off'}`} />
                    <button onClick={ligarVentilador}>
                        {estadoVentilador.ventiladorOn ? 'Desligar Ventilador' : 'Ligar Ventilador'}
                    </button>
                </div>
                <div className='cortina'>
                    <img src={cortina} className={`status ${estadoCortina.cortinaOn ? 'on' : 'off'}`} />
                    <button onClick={ligarCortina}>
                        {estadoCortina.cortinaOn ? 'Desligar Cortina' : 'Ligar Cortina'}
                    </button>
                </div>
            </div>
        </div>
    )
}