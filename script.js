const url = 'http://localhost:3000/users'
const tabs = document.getElementById('tabs')
const tabs_buttons = tabs.getElementsByClassName('_tabs-button')
const tabs_blocks = tabs.getElementsByClassName('_tabs-block')
const sign_in_button = document.getElementById('button-sign-in')
const sign_up_button = document.getElementById('button-sign-up')
const sign_in_login_id = 'sign-in_user-login'
const sign_in_pass_id = 'sign-in_user-password'
const sign_up_login_id = 'sign-up_user-login'
const sign_up_pass_id = 'sign-up_user-password'
const sign_up_pass_repeated_id = 'sign-up_user-pass-repeated'

const message_class = 'message-block'
const error_class = 'message-block__error'
const welcome_class = 'message-block__welcome'
const emptyLogPassMessage = 'Please add your login and password'
const emptyLogMessage = 'Please enter your login'
const emptyPassMessage = 'Please enter your password'
const emptyRepeatedPassMessage = 'Please enter your password again'

window.onload = function() {
    addOnClickTabs(tabs_buttons, tabs_blocks, message_class)
    checkSignIn(sign_in_button, sign_in_login_id, sign_in_pass_id, message_class, emptyLogPassMessage, error_class, welcome_class)
    checkSignUp(sign_up_button, sign_up_login_id, sign_up_pass_id, sign_up_pass_repeated_id, message_class, emptyLogMessage, emptyPassMessage, emptyRepeatedPassMessage, error_class, welcome_class)
}

function addOnClickTabs(tabs_buttons, tabs_blocks, messageClass) {
    for (let index = 0; index < tabs_buttons.length; index++) {
        let tabs_button = tabs_buttons[index]
        tabs_button.onclick = function(event) {
            clearMessageButton(messageClass)
            for (let index = 0; index < tabs_buttons.length; index++) {
                let _tabs_button = tabs_buttons[index]

                _tabs_button.classList.remove('_active')
                tabs_blocks[index].classList.remove('_active')
            }
            this.classList.add('_active')
            tabs_blocks[index].classList.add('_active')
        }
    }
}

function checkSignIn(button, login_id, pass_id, messageClass, errorMessage, errorClass, welcomeClass) {
    button.onclick = function (event) {
        event.preventDefault();
        clearMessageButton(messageClass)

        if (areValuesExist([login_id, pass_id])) {
            getUsers(url).then((response) => {
                let currLogin = document.getElementById(login_id).value
                let currPass = document.getElementById(pass_id).value
                checkLogPassMatch(response, currLogin, currPass, errorClass, welcomeClass)
            })
            return
        }
        renderMessageButton(errorMessage, errorClass)
    }
}

function clearMessageButton(buttonClass) {
    let button = document.querySelector(`.${buttonClass}`)
    if (button) {
        button.remove()
    }
}

function areValuesExist(ids) {
    let valuesExist = true

    ids.forEach(function (id) {
        let input = document.getElementById(id)
        if (!input.value) {
            valuesExist = false
        }
    })
    return valuesExist
}

async function getUsers(url) {
    let users = []
    let data = await(await fetch(url)).json()
    for(let i = 0; i < data.length; i++) {
        users.push(data[i])
    }
    return users
}

function checkLogPassMatch(users, log, pass, errorClass, welcomeClass) {
    let errorLoginMessage = 'Not existing login. Try again!'
    let errorPassMessage = 'Wrong password. Try again!'
    let welcomeMessage = `Congratulations! You have successfully logged in as user ${log}`

    let user = users.find((user) => user.login === log)
    if (!user) {
        renderMessageButton(errorLoginMessage, errorClass)
        return
    }
    if (user.password !== pass) {
        renderMessageButton(errorPassMessage, errorClass)
        return
    }
    renderMessageButton(welcomeMessage, welcomeClass)
    let formBody = document.getElementById('container').childNodes[1]
    formBody.remove()
}

function renderMessageButton(message, className) {
    let messageItem = document.createElement('div')
    let container_block = document.getElementById('container')
    messageItem.className = `message-block ${className} btn`
    messageItem.innerText = message
    container_block.append(messageItem)
}

function checkSignUp(button, login_id, pass_id, pass_repeated_id, messageClass, errorLoginMessage, errorPassMessage, errorPassRepeatedMessage, errorClass, welcomeClass) {
    button.onclick = function (event) {
        event.preventDefault();
        clearMessageButton(messageClass)

        if (!areValuesExist([login_id])) {
            renderMessageButton(errorLoginMessage, errorClass)
            return
        }
        if (!areValuesExist([pass_id])) {
            renderMessageButton(errorPassMessage, errorClass)
            return
        }
        if (!areValuesExist([pass_repeated_id])) {
            renderMessageButton(errorPassRepeatedMessage, errorClass)
            return
        }
        getUsers(url).then((response) => {
            let currLogin = document.getElementById(login_id).value
            let currPass = document.getElementById(pass_id).value
            let currRepeatedPass = document.getElementById(pass_repeated_id).value
            let errorLoginMessage = 'User with this login exists'
            let errorPassMessage = 'You entered different passwords. Please edit them and try again.'
            let welcomeMessage = `Congratulations! You have successfully registered as ${currLogin}`
            let isLoginExist = response.some((user) => user.login === currLogin)

            if (isLoginExist) {
                renderMessageButton(errorLoginMessage, errorClass)
                return
            }
            if (currPass !== currRepeatedPass) {
                renderMessageButton(errorPassMessage, errorClass)
                return
            }
            postUsers(url, currLogin, currPass).then((response) => {
                renderMessageButton(welcomeMessage, welcomeClass)
                let formBody = document.getElementById('container').childNodes[1]
                formBody.remove()
            })
        })
    }
}

async function postUsers(url, login, pass) {
     await(await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: `${login}`,
            password: `${pass}`
        }),
    })).json()
}