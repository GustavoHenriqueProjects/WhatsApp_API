/**************************************************************************************
 * Objetivo: Realizar o consumo de funções que fornecem o nome dos usarios que utilizam
 * o WhatsApp e envia os dados para o front.
 * Data: 19/03/2023
 * Autor: Gustavo Henrique
***************************************************************************************/

'use strict'
import { getUsuarios } from'./endPointUsers.js'
import { getContatos } from'./endPointContatos.js'

/**************************************************************************************
 * Função responsavel por esperar a requisição dos nomes de todos 
 * os usuarios do whatsApp, e deacordo com o usuario selecionado
 * retorna os contatos.
 * 
 **************************************************************************************/
const getListaUsuarios = async () => {

    const listaDeUsuarios = document.getElementById('lista_usuario')
    listaDeUsuarios.setAttribute('id','lista_usuario')
    const usuarios = await getUsuarios()

    usuarios.usuarios.forEach(usuario => {
        const option = document.createElement('option')
        const nome = usuario.nome
        option.textContent = nome
        listaDeUsuarios.append(option)
        }
    ) 

    const select = document.querySelector('#lista_usuario')

    select.addEventListener('change', async function () {
    const usuario = select.value
    const contatos = await getContatos(usuario)
    console.log(contatos)
    
    
})
}

getListaUsuarios()
