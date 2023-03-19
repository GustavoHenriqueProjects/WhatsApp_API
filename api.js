/*****************************************************************
 * Objettivo: Criar uma API para manipulação de dados de usuarios.
 * Autor: Gustavo Henrique
 * Data: 18/23/2023
 * Versão: 1.0
 ****************************************************************/

const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const {response} = require('express')

//Import do arquivo de funções
const dadosWhatsApp = require('./modulo/usuarios.js')
//Objeto com as informações da classe express
const app = express()

app.use((request,response,next) =>{

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')

    app.use(cors())
    next()
})

app.use('/v1/whatsapp/usuarios', cors(), async function(request, response, next){
    const usuarios = dadosWhatsApp.getUsuarios()
    let statusCode = 200
    response.status(statusCode)
    response.json(usuarios)    
    /*for(let cont = 0; cont < usuarios.usuarios.length; cont++){
        const nome = usuario.usuarios[cont].apelido
        console.log(nome)
    }*/
})

app.get('/v1/whatsapp/contatos', cors(), async function(request, response, next){

    //Recebendo o valor da variavel vinda do request.query.nameUser
    let nomeUsuario = request.query.nameUser
    let statusCode
    let contatos = {}
    
    //Verificando se o nome do usuário é válido
    if(nomeUsuario =='' || nomeUsuario == undefined || !isNaN(nomeUsuario)){
        statusCode = 400
        contatos.message = 'Não é possivel processar a requisição, pois o nome informado não atende a requisição.'
    }else{
        let listaContatos = dadosWhatsApp.getContatosUsuario(nomeUsuario)

        if(listaContatos){
            statusCode = 200
            contatos = listaContatos
        }else{
            statusCode = 404
            contatos.message = 'Usuário não encontrado.'
        }
    }
    response.status(statusCode)
    response.json(contatos)
})

//Carregar os EndPOints e aguardar as requisições
//Protocolo HTTP 8080
app.listen(8080, function(){
    console.log('Servidor rodando na porta 8080')
})