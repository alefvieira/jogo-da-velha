var rodada = 1
var matriz_jogo = Array(3)
matriz_jogo['a'] = Array(3)
matriz_jogo['b'] = Array(3)
matriz_jogo['c'] = Array(3)

matriz_jogo['a'][1] = 0
matriz_jogo['a'][2] = 0
matriz_jogo['a'][3] = 0

matriz_jogo['b'][1] = 0
matriz_jogo['b'][2] = 0
matriz_jogo['b'][3] = 0

matriz_jogo['c'][1] = 0
matriz_jogo['c'][2] = 0
matriz_jogo['c'][3] = 0
// ESSE CODIGO ELE É EXECUTADO ASSIM QUE O DOCUMENT(HTML) É LIDO POR COMPLETO
//DESSE JEITO É EXECUTADO O QUE ESTIVER DENTRO DA FUNCTION
$(document).ready(function(){
    
    //ESSE É O ID DO BOTÃO INPUT QUE É ACIONADO AO SER CLICADO, COM ESSA AÇÃO VAI SER INICIADO UMA FUNCTION
    $("#inicia_jogo").click(function(){
        //FOI PASSDO PARA ESSAS VARIAVEIS O CONTEUDO QUE ESTÁ INSERIDO NO INPUT TEXT DOS APELIDOS DOS JOGADORES
        
        var apelido1 =  $("#apelido1").val()
        var apelido2 = $("#apelido2").val()
        //ESSA É A CONDIÇÃO PARA IMPEDIR QUE SEJA INICIADO O JOGO SE OS CAMPOS TEXT DOS APELIDOS ESTIVEREM EM BRANCO
        if(apelido1.length == 0 || apelido1 == "" || apelido2.length == 0 || apelido2 == ""){
            alert("É necessário escolher um apelido antes de começar")
            //ESSE RETURN VAI ENCERRAR A OPERAÇÃO AO CHEGAR NO FINAL DESSA ESTRUTURA DE CONDIÇÃO
            return false
        }
        //CASO ESTEJA COM OS CAMPOS APELIDOS PREENXIDOS, SERÁ PASSADO OS NOMES PARA A PARTE ONDE IRÁ ACONTECER O JOGO
        else{
            //PASSAR PARA OS TAGS PARAGRAFOS O CONTEUDO ESCRITO NO INPUTS APELIDOS
            // document.querySelector("p#setaapelido1").innerHTML = apelido1
            // document.querySelector("p#setaapelido2").innerHTML =  apelido2

            // OUTRA FORMA DE PASSAR O CONTEUDO PARA UMA TAG É USANDO O COMANDO .html(conteudoquedesejapassarparaatag)
            $("#setaapelido1").html(apelido1)
            $("#setaapelido2").html(apelido2)
        //QUANDO PASSA PARA O JOGO ELE VAI FECHAR(HIDE) A PAGINA INICIAL E VAI ABRIR O PALCO DO JOGO(SHOW)
            $("#palco_jogo").show()
            $('#pagina_inicial').hide()

            //ESSA É A CLASSE JOGADA QUE ESTÁ PRESENTE EM TODOS OS TDs DA TABLE, TODA VEZ QUE FOR CLICADO SERÁ ACIONADO 
            //A FUNCTION 
            $(".jogada").click(function(){
                //local_click É A VARIAVEL QUE ESTÁ REFERENCIANDO this(PEGANDO O ATRIBUTO DELE MESMO).id(ESSE ATRUBUTO QUE ESTÁ RECEBER É O id) 
                var local_click = this.id
                //A FUCNTION jogadas()ESTÁ RECEBENDO PARAMENTRO(O DADO DA VARIAVEL local_click)
                jogadas(local_click)
                
            })
            //ESSA FUNÇÃO SERVE PARA MANIPULAR O JOGO 
            function jogadas(id){
                //id = local_click, OU SEJA, É O id DA CLASSE .jogada DE ACORDO COM O ELEMENTO QUE FOI CLICADO
                var icone = ''
                var ponto = 0
                //POR SER UM JOGO MULTPLAYER
                //QUANDO A rodada FOR IMPAR SERÁ REPRESENTADO PELO JOGADOR 1
                if(rodada%2 == 1){
                    // ESSE JOGADOR VAI SER ATRIBUIDO AO SIMBOLO DE BOLINHA NO JOGO
                    icone = "url('imagem/bolinha.png')"
                    //ESSA VARIAVEL ponto = -1 SERVE PARA PASSAR UM VALOR PARA A ARRAY QUE IRÁ REPRESENTAR O PRIMEIRO JOGADOR
                    ponto = -1
                    
                //ESSA FUNÇÃO SERVE PARA MANIPULAR O JOGO
                //A CONDIÇÃO PAR REPRESENTA O SEGUNDO JOGADOR 
                }else if( rodada%2 == 0){
                    //O SEU SIMBOLO SERÁ X
                    icone = "url('imagem/x.png')"
                    // O PONTO QUE IRÁ REPRESENTA-LO NA ARRAY SERÁ O NÚMERO 1
                    ponto = 1
                }
                //ESSE É O AGREGADOR QUE VAI SOMAR +1 TODA VEZ QUE FOR CLICADO NO EVENTO DA FUNCTION
                //ELE É NECESSÁRIO PARA QUE O PROGRAMA FIQUE SIMULANDO A RODADA DE CADA JOGADOR
                //PORQUE ASSIM AS CONDIÇÕES (IFs) ASSIMA IRÃO REVESAR ENTRE SI
                rodada++
                //ESSE CODIGO SERVE PARA TRANSFORMAR UMA VARIAVEL EM UMA LISTA 
                //O PONTO DE SEPARAÇÃO É O TRAÇO O QUE ESTIVER NA FRENTE SERÁ REPRESENTADO NA POSIÇÃO [0]
                //E O QUE ESTIVER DEPOIS SERÁ REPRESENTADO NA POSIÇÃO [1]
                var linha_coluna = id.split("-")
                // alert(linha_coluna[0])
                // alert(linha_coluna[1])
                //ESSE IF SERVE PARA CRIAR A CONDIÇÃO QUE IRÁ IMPEDIR DE SUBSTITUIR UMA IMAGEM QUANDO COLUNA_LINHA DA TABELA
                //JÁ ESTIVER PREENXIDA DE ACORDO COM O CODIGO NA ARRAY
                if(matriz_jogo[linha_coluna[0]][linha_coluna[1]] == 0){
                    //AO SER CLICADO NO id DA COLUNA_LINHA DA TABELA SERÁ SETADO UMA IMAGEM BACKGROUND
                    //PARA REPRESENTAR AS JOGADAS
                    $("#"+id).css("background-image", icone)
                    //IMPEDE QUE UMA IMAGEM BACKGROUND SEJA REPETIDA
                    $("#"+id).css("background-repeat"," no-repeat")
                    //ESSE COMANDO VAI SETAR(JOGAR) NA LISTA DE ACORDO COM O split(-) DO .id O PONTO DO JOGADOR QUE CLICOU O ELEMENTO DA TABELA
                    matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto
                    console.log(matriz_jogo)
                    //ESSA É A FUCNTION QUE CORRESPONDE A RESPOSTA DE QUEM FOI O VITORIOSO NA PARTIDA
                    verica_jogadas()
                }
                //SE A CONDIÇÃO IF FOR FALSE SIGINIFICA QUE O ELEMENTO NA ARRAY JÁ FOI MARCADO
                else{
                    console.log("já está marcado")
                    //ESSE CODIGO SERVE PARA QUE CASO DÊ EMPATE O CONTINUAR A REVESAR AS RODADAS
					rodada--
                } 
            }
        }
    })
    //QUANDO O BOTÃO INPUT NO PALCO DO JOGO FOR CLICADO SERÁ EXECUTADO ESSA FUNCTION
    $("#volta_ini").click(function(){
//O PALCO DO JOGO SERÁ FECHADO(HIDE) E A PAGINA INICIAL SERÁ ABERTA(SHOW)
        $("#palco_jogo").hide()
        $("#pagina_inicial").show()

        // $("#apelido1").val("")
        // $("#apelido2").val("")
//ESSE CODIGO VAI RESETAR A LISTA(ARRAY) PARA RECOMEÇAR UMA NOVA PARTIDA
        matriz_jogo['a'][1] = 0
        matriz_jogo['a'][2] = 0
        matriz_jogo['a'][3] = 0

        matriz_jogo['b'][1] = 0
        matriz_jogo['b'][2] = 0
        matriz_jogo['b'][3] = 0

        matriz_jogo['c'][1] = 0
        matriz_jogo['c'][2] = 0
        matriz_jogo['c'][3] = 0

        //ESSE CODIGO VAI LIMPAR O CAMPO ONDE VAI APARECER A MENSAGEM INFORMADO O VENCEDOR
        $(".recebe_texto_vic").html(``)
        //ESSE CODIGO VAI LIMPAR TODOS OS BACKGROUND(SIMBOLOS QUE FORAM MARCADOS NO JOGO)
        $(".jogada").css("background-image", "")
        //VAI RESETAR A VARIAVEL rodada PARA RECOMEÇAR A PARTIDA
        rodada = 1
    })  
})
//ESSA FUNCTION VAI SER EXECUTADA ASSIM O BODY FOR CARREGADO PELO EVENTO (ONLOAD)
function hidejogo(){
    //ELE VAI ACULTAR O PALCO DO JOGO ASSIM QUE A PAGINA CARREGAR
    $("#palco_jogo").hide()
}
//ESSA FUNCTION PARA POR CONDIÇÕES QUE IRÃO DIZER QUAL FOI O JOGADOR QUE VENCEU
function verica_jogadas(){
    
    //condição que expressa as formas de vitoria do jogador 2
    if( matriz_jogo["a"][1] == 1 && matriz_jogo["a"][2] == 1 && matriz_jogo["a"][3] == 1 ||
        matriz_jogo["b"][1] == 1 && matriz_jogo["b"][2] == 1 && matriz_jogo["b"][3] == 1 ||
        matriz_jogo["c"][1] == 1 && matriz_jogo["c"][2] == 1 && matriz_jogo["c"][3] == 1 ||

        matriz_jogo["a"][1] == 1 && matriz_jogo["b"][1] == 1 && matriz_jogo["c"][1] == 1 ||
        matriz_jogo["a"][2] == 1 && matriz_jogo["b"][2] == 1 && matriz_jogo["c"][2] == 1 ||
        matriz_jogo["a"][3] == 1 && matriz_jogo["b"][3] == 1 && matriz_jogo["c"][3] == 1 ||

        matriz_jogo["c"][1] == 1 && matriz_jogo["b"][2] == 1 && matriz_jogo["a"][3] == 1 ||
        matriz_jogo["a"][1] == 1 && matriz_jogo["b"][2] == 1 && matriz_jogo["c"][3] == 1){
           
            //pessoa2 É A VARIAVEL QUE PEGA O APELIDO DO JOGADOR
            //.html() É NECESSÁRIO, POIS, É UMA TAG
            var pessoa2 = $("#setaapelido2").html()
            //vai setar(jogar) O CONTEUDO DA VARIAVEL pessoa2 NO CAMPO DE TEXTO INFORMATIVO QUE FALA SOBRE QUEM VENCEU
            $(".recebe_texto_vic").html(`${pessoa2} Venceu`)
            //ESSE CODIGO VAI LIMPAR A AÇÃO DE .click NA CLASSE (".jogada")
            $(".jogada").off()            
    }
    //condição que expressa as formas de vitoria do jogador 1
    else if(matriz_jogo["a"][1] == -1 && matriz_jogo["a"][2] == -1 && matriz_jogo["a"][3] == -1 ||
            matriz_jogo["b"][1] == -1 && matriz_jogo["b"][2] == -1 && matriz_jogo["b"][3] == -1 ||
            matriz_jogo["c"][1] == -1 && matriz_jogo["c"][2] == -1 && matriz_jogo["c"][3] == -1 ||

            matriz_jogo["a"][1] == -1 && matriz_jogo["b"][1] == -1 && matriz_jogo["c"][1] == -1 ||
            matriz_jogo["a"][2] == -1 && matriz_jogo["b"][2] == -1 && matriz_jogo["c"][2] == -1 ||
            matriz_jogo["a"][3] == -1 && matriz_jogo["b"][3] == -1 && matriz_jogo["c"][3] == -1 ||

            matriz_jogo["c"][1] == -1 && matriz_jogo["b"][2] == -1 && matriz_jogo["a"][3] == -1 ||
            matriz_jogo["a"][1] == -1 && matriz_jogo["b"][2] == -1 && matriz_jogo["c"][3] == -1){
            
            var pessoa1 = $("#setaapelido1").html()
            $(".recebe_texto_vic").html(`${pessoa1} Venceu`)
            $(".jogada").off()
    }  
}