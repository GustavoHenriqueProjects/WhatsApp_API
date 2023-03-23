'use strict'

export const getUsuarios = async () => {
    const url = `http://localhost:8080/v1/whatsapp/usuarios`

    const response = await fetch(url)
    const data = await response.json()

    return{
        ...data
    }
}