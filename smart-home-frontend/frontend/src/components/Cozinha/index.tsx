import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './style.css';
import luz from '../images/luz.png';
import geladeira from '../images/geladeira.png';
import fogao from '../images/fogao.jpg';

export default function Cozinha() {
    const socket = io('http://localhost:4000');

    interface EstadoInicial {
        luzOn: boolean,
        geladeiraOn: boolean,
        fogaoOn: boolean
    }

    interface EstadoLuz {
        luzOn: boolean,
    }

    interface EstadoFogao {
        fogaoOn: boolean
    }

    interface EstadoGeladeira {
        geladeiraOn: boolean
    }

    const [estadoInicial, setEstadoInicial] = useState<EstadoInicial>({
        luzOn: false,
        geladeiraOn: false,
        fogaoOn: false
    });

    const [estadoLuz, setEstadoLuz] = useState<EstadoLuz>({
        luzOn: false
    });

    const [estadoFogao, setEstadoFogao] = useState<EstadoFogao>({
        fogaoOn: false
    });

    const [estadoGeladeira, setEstadoGeladeira] = useState<EstadoGeladeira>({
        geladeiraOn: false
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
        socket.on('ligarGeladeiraCozinha', (novoEstado: EstadoGeladeira) => {
            setEstadoGeladeira(novoEstado);
        });
        socket.on('ligarFogaoCozinha', (novoEstado: EstadoFogao) => {
            setEstadoFogao(novoEstado);
        });

        return () => {
            socket.off('estadoInicialCozinha');
            socket.off('acenderLuzCozinha');
            socket.off('ligarGeladeiraCozinha');
            socket.off('ligarFogaoCozinha');
        }
    }, []);

    //funcao para alterar o estado dos dispositivo
    const acenderLuz = () => {
        socket.emit('acenderLuzCozinha');
    };

    const ligarGeladeira = () =>{
        socket.emit('ligarGeladeiraCozinha');
    };

    const ligarFogao = () =>{
        socket.emit('ligarFogaoCozinha');
    };

    return (
        <div className='cozinha'>
            <h2>Cozinha</h2>
            <div className="componentes">
                <div className='luz'>
                    <img src={luz} className={`status ${estadoLuz.luzOn ? 'on' : 'off'}`} />
                    <button onClick={acenderLuz}>
                        {estadoLuz.luzOn ? 'Desligar Luz' : 'Ligar Luz'}
                    </button>
                </div>
                <div className="geladeira"> 
                    <img src={geladeira} className={`status ${estadoGeladeira.geladeiraOn ? 'on' : 'off'}`} />
                    <button onClick={ligarGeladeira}>
                        {estadoGeladeira.geladeiraOn ? 'Desligar Geladeira' : 'Ligar Geladeira'}
                    </button>
                </div>
                <div className="fogao"> 
                    <img src={fogao} className={`status ${estadoFogao.fogaoOn ? 'on' : 'off'}`} />
                    <button onClick={ligarFogao}>
                        {estadoFogao.fogaoOn ? 'Desligar Fogão' : 'Ligar Fogão'}
                    </button>
                </div>
            </div>
        </div>
    )
}