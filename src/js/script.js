// DECLARAÇÕES DOS ELEMENTOS USANDO DOM (DOCUMENT OBJECT MODEL)
const videoElemento = document.getElementById("video");
const botaoScanear = document.getElementById("btn-texto");
const resultado = document.getElementById("saida");
const canvas = document.getElementById("canvas");

// FUNÇÃO QUE VAI HABILITAR A CÂMERA

async function configurarCamera(){
    try{
        const midia = await navigator.mediaDevices.getUserMedia({
            video:{facingMode: "environment"}, //habilitando a camera traseira
            audio: false
        })
        videoElemento.srcObject = midia;
        videoElemento.onplay(); //garante que o video comece 
    }catch(erro){
        resultado.innerHTML="Erro ao acessar a camera", erro;
    }
}
// Executa a função da camera
configurarCamera();

// função para ler o texto da imagem e mostrar na tela

botaoScanear.onclick = async()=>{
    botaoScanear.disable = true;
    resultado.innerText = "Fazendo a leitura... aguarde"

    // chama a estrutura do canva
    const context = canvas.getContext("2d");

    // ajusta o tamanho da tela do vídeo
    canvas.clientWidth = videoElemento.videoWidth; // largura
    canvas.clientWidth = videoElemento.videoHeight; // altura

    // reset de qualquer transformação para garantir que a foto não
    // fique invertida
    context.setTransform(1, 0, 1, 0, 0);

    // Aplica o filtro de contraste e escala de cinza no canvas antes
    // de tirar a foto (ajuda a evitar letras aleatorias)
    context.filter = 'constraste(1.2) grayscale(1)';

    // construindo a tela para tirar a foto
    context.drawImage(videoElemento, 0, 0, canvas.width,canvas.height);
    try{
        // captura o texto da imagem e traduz para portugues
        const {data: { Text }} = await Tesseract.recognize(
            canvas,
            'por'
        );
        // remove espaços em branco
        const textoFinal = text.trim();
        // condicional ternaria ? if e : else - se o texto for maior, ok. se não for, mostra mensagem de erro
        resultado.innerText = textoFinal.length > 0 ? textFinal : "Não foi possivel identificar o texto";

    }catch(erro){
        console.error(erro);
        resultado.innerTexto = "Erro ao processar", erro;
    }finally{
        // desabilita o botão para começar nova leitura
        botaoScanear.disable = false;
    }


}
