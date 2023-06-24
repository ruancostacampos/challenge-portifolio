( () => {
    
    let inputs = document.querySelectorAll('input')
    let textarea = document.getElementById('mensagem')
    let modal = document.getElementById("modal")
    let modalButton = document.getElementById('modalButton')

    const focusIn = (e) => {

        if(e.target.id === 'nome'){
            e.target.previousElementSibling.innerText = 'Qual o seu nome?'
            e.target.previousElementSibling.classList.remove('texto-invalido')
        }

        if(e.target.id === 'email'){
            e.target.previousElementSibling.innerText = 'Qual o seu email?'
            e.target.previousElementSibling.classList.remove('texto-invalido')
        }

        if(e.target.id === 'assunto'){
            e.target.previousElementSibling.innerText = 'Qual o assunto da mensagem?'
            e.target.previousElementSibling.classList.remove('texto-invalido')
        }

        if(e.target.id === 'mensagem'){
            e.target.classList.remove('invalido')
            return
        }

        e.target.previousElementSibling.classList.add('ativo')
        e.target.classList.remove('invalido')
    }

    const focusOut = (e) => {

        if (e.target.value === '') {
            e.target.previousElementSibling.classList.remove('ativo')
        }

    }

    inputs.forEach(element => {
        element.addEventListener("focus", focusIn)
        element.addEventListener("focusout", focusOut)
    })

    textarea.addEventListener("focus", focusIn)
    textarea.addEventListener("focus", focusOut)

    modalButton.addEventListener("click", (e) => {
        modal.style.display = 'none'
    })

})()