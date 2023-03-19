/****************************************************************************************
 * Obejetivo: Realizar o consumo de um Json e retorna para o frontEnd no formato solicitado.
 * Autor: Gustavo Henrique
 * Data: 17/03/2023
 * Versão: 1.0
 ****************************************************************************************/

const { get } = require('http')
const usuarios = require('./contatos.js')

const getUsuarios = function(){
    const usuariosJson = {}
    const usuariosArray = []
    usuarios['whats-users'].forEach(function (usuarios) {
        const nomesUsuarios = {} 
        nomesUsuarios.nome = usuarios.account
        nomesUsuarios.apelido = usuarios.nickname
        usuariosArray.push(nomesUsuarios)
    })
    usuariosJson.usuarios = usuariosArray
    return usuariosJson
}

const getContatosUsuario = function ($nome) {

    const nomeUsuarioPrincipal = $nome
    const usuarioPrincipalContatos = []
    let status = false
    
    usuarios['whats-users'].forEach(function (usuario) {
        if (usuario.account == nomeUsuarioPrincipal) {
            status = true
            usuario.contacts.forEach(function (contatos) {
                const contatosJson = {
                    name: contatos.name,
                    description: contatos.description,
                    image: contatos.image,
                }
                const mensagens = []
                contatos.messages.forEach(function (conteudoMensagens) {
                    const conversas = {
                        sender: conteudoMensagens.sender,
                        content: conteudoMensagens.content,
                        timestamp: conteudoMensagens.time
                    }
                    mensagens.push(conversas)
                })
                contatosJson.messages = mensagens
                usuarioPrincipalContatos.push(contatosJson)
            })
        }
    })

    if(status){
        return usuarioPrincipalContatos
        //return JSON.stringify(usuarioPrincipalContatos)
    }else{
        return status
    }
}
  
//getContatosUsuario("Ricardo da Silva")
module.exports = {
    getUsuarios,
    getContatosUsuario
}