( () => {

    let inputs = document.querySelectorAll('input')
    let message = document.getElementById('mensagem')
    let submit = document.getElementById('submit')
    let modalText = document.getElementById('modalTexto')
    let modal = document.getElementById('modal')

    const emailRegex = /^\S+@\S+\.\S+$/;

    const sendEmail = async (e) => {

        e.preventDefault()
        // Avoid mutiple requests
        if(submit.classList.contains('loading')) return 

        submit.classList.add('loading')
        submit.setAttribute('enabled', false)
    

        let namePassed, emailPassed, subjectPassed, messagePassed

        inputs.forEach( (element) => {
        
            if(element.id === 'nome'){
                namePassed = validateName(element)
            } 
    
            if(element.id === 'email'){
                emailPassed = validateEmail(element)
            }

            if(element.id === 'assunto'){
                subjectPassed = validateSubject(element)
            }
    
        })

        messagePassed = validateMessage(message)

        let definitiveSubject = `${namePassed} - ${subjectPassed}`

        let data = {
            access_key: '878d38b1-c164-41f8-817b-984945a194ec',
            email: emailPassed,
            subject: definitiveSubject,
            message: messagePassed
        }

        messagePassed = validateMessage(message)

        if(namePassed && emailPassed && subjectPassed && messagePassed){
            
            await fetch('https://api.web3forms.com/submit', {method: 'POST', body: JSON.stringify(data), headers: {
                'Content-Type': 'application/json'
            }})
            .then((res) => {
                
                // Throw a error if inst sucessful created
                if(res.status !== 200){
                    throw new Error('Bad request');
                }

                // Change the modal message
                modalText.innerText = 'Obrigado pelo contato, recebemos sua mensagem com sucesso!'

                // Clear input fields

                inputs.forEach(element => {
                    element.value = ''
                })

                message.value = ''

                submit.classList.remove('loading')
                submit.setAttribute('enabled', true)
                modal.style.display = 'flex'

            })
            .catch((err) => {

                modalText.innerText = 'Houve um erro ao enviar sua mensagem, tente novamente mais tarde!'
                modal.style.display = 'flex'
                submit.classList.remove('loading')
                submit.setAttribute('enabled', true)
                console.log('Error => ' + err)

            })
        }

        submit.classList.remove('loading')
        submit.setAttribute('enabled', true)

    }


    const validateName = (element) => {
        
        if(element.value.length < 5){
            element.previousElementSibling.classList.add('texto-invalido')
            element.previousElementSibling.innerText = 'Qual o seu nome? -> O nome digitado é muito curto! '
            element.classList.add('invalido')
            return false
        }

        return element.value

    }

    const validateEmail = (element) => {
        
        if(!emailRegex.test(element.value)){
            element.previousElementSibling.classList.add('texto-invalido')
            element.previousElementSibling.innerText = 'Qual o email? -> O email é inválido! '
            element.classList.add('invalido')
            return false
        }

        return element.value

    }

    const validateSubject = (element) => {
        
        if(element.value.length < 5){
            element.previousElementSibling.classList.add('texto-invalido')
            element.previousElementSibling.innerText = 'Qual o assunto da mensagem? -> O assunto digitado é muito curto! '
            element.classList.add('invalido')
            return false
        }

        return element.value
    }

    const validateMessage = (element) => {
        
        if(element.value.length < 3){
            element.classList.add('invalido')
            return false
        }

        return element.value
    }

    document.getElementById('submit').addEventListener("click", sendEmail)

})()