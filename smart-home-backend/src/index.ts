import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
//criar servidor http
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", //URL do Front-End React
        methods: ["GET","POST"],
    }
});

//estado inicial dos dispositivos
let dispositivosSala = {
    luzOn: false,
    tvOn : false,
    arOn : false
}
let dispositivosCozinha = {
    luzOn      : false,
    geladeiraOn: false,
    fogaoOn    : false
}

let dispositivosQuarto = {
    luzOn       : false,
    ventiladorOn: false,
    cortinaOn   : false
}
//escuta os eventos de conexao do socket
io.on('connection',(socket)=>{
    console.log('Cliente conectado',socket.id)

    //enviando o estado inicial dos dispositivos para o cliente
    socket.emit('estadoInicialSala',    dispositivosSala);
    socket.emit('estadoInicialCozinha', dispositivosCozinha);
    socket.emit('estadoInicialQuarto',  dispositivosQuarto);

    //manipulando os eventos e mudançcas do estado dos dispositivos
    socket.on('acenderLuzSala',() => {
        dispositivosSala.luzOn = !dispositivosSala.luzOn;
        io.emit('acenderLuzSala', dispositivosSala);
    });
    socket.on('ligarTvSala',() => {
        dispositivosSala.tvOn = !dispositivosSala.tvOn;
        io.emit('ligarTvSala', dispositivosSala);
    });
    socket.on('ligarArSala',() => {
        dispositivosSala.arOn = !dispositivosSala.arOn;
        io.emit('ligarArSala', dispositivosSala);
    });

    //cozinha
    socket.on('acenderLuzCozinha',() => {
        dispositivosCozinha.luzOn = !dispositivosCozinha.luzOn;
        io.emit('acenderLuzCozinha', dispositivosCozinha);
    });
    socket.on('ligarGeladeiraCozinha',() => {
        dispositivosCozinha.geladeiraOn = !dispositivosCozinha.geladeiraOn;
        io.emit('ligarGeladeiraCozinha', dispositivosCozinha);
    });
    socket.on('ligarFogaoCozinha',() => {
        dispositivosCozinha.fogaoOn = !dispositivosCozinha.fogaoOn;
        io.emit('ligarFogaoCozinha', dispositivosCozinha);
    });

    // Quarto
    socket.on('ligarLuzQuarto',() => {
        dispositivosQuarto.luzOn = !dispositivosQuarto.luzOn;
        io.emit('ligarLuzQuarto', dispositivosQuarto);
    });
    socket.on('ligarVentiladorQuarto',() => {
        dispositivosQuarto.ventiladorOn = !dispositivosQuarto.ventiladorOn;
        io.emit('ligarVentiladorQuarto', dispositivosQuarto);
    });
    socket.on('ligarCortinaQuarto',() => {
        dispositivosQuarto.cortinaOn = !dispositivosQuarto.cortinaOn;
        io.emit('ligarCortinaQuarto', dispositivosQuarto);
    });

});


//Iniciar Servidor npm start
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});