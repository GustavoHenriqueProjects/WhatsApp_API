'use strict'

export const getContatos = async ($nomeUsuario) => {
    const url = `http://localhost:8080/v1/whatsapp/contatos?nameUser=${$nomeUsuario}`

    const response = await fetch(url)
    const data = await response.json()

    return{
        ...data
    }
}