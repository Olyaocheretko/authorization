const url = 'http://localhost:3000/users'
const tabs = document.getElementById('tabs')
const tabs_buttons = tabs.getElementsByClassName('_tabs-button')
const tabs_blocks = tabs.getElementsByClassName('_tabs-block')
const sign_in_button = document.getElementById('button-sign-in')
const sign_up_button = document.getElementById('button-sign-up')
const sign_in_login_id = 'sign-in_user-login'
const sign_in_pass_id = 'sign-in_user-password'
const message_class = 'message-block'
let emptyFieldMessage = 'Please add your login and password'
let error_class = 'message-block__error'

window.onload = function() {
    addOnClickTabs(tabs_buttons, tabs_blocks)
    checkForSignIn(sign_in_button, sign_in_login_id, sign_in_pass_id, message_class, emptyFieldMessage, error_class)
}

function addOnClickTabs(tabs_buttons, tabs_blocks) {
    for (let index = 0; index < tabs_buttons.length; index++) {
        let tabs_button = tabs_buttons[index]
        tabs_button.onclick = function(event) {
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

function checkForSignIn(button, login_id, pass_id, messageClass, errorMessage, errorClass) {
    button.onclick = function (event) {
        event.preventDefault();
        clearMessageButton(messageClass)

        if (areValuesExist([login_id, pass_id])) {
            getUsers(url).then((response) => {
                let currLogin = document.getElementById(login_id).value
                let currPass = document.getElementById(pass_id).value
                areLogPassMatch(response, currLogin, currPass, error_class)
            })
        }
        else {
            renderMessageButton(errorMessage, errorClass)
        }
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

function areLogPassMatch(users, log, pass, errorClass) {
    let errorLogMessage = 'Not existing login. Try again!'
    let errorPassMessage = 'Wrong password. Try again!'
    let welcomeMessage = `Congratulations! You have successfully logged in as user ${log}`
    let welcome_class = 'message-block__welcome'

    let isLoginExist = users.some((user) => user.login === log)
    if (!isLoginExist) {
        renderMessageButton(errorLogMessage, errorClass)
    }
    else {
        let isPassExist = users.some((user) => user.password === pass)
        if (!isPassExist) {
            renderMessageButton(errorPassMessage, errorClass)
        }
        else {
            renderMessageButton(welcomeMessage, welcome_class)
            let formBody = document.getElementById('container').childNodes[1]
            formBody.remove()
        }
    }
}

function renderMessageButton(message, className) {
    let messageItem = document.createElement('div')
    let container_block = document.getElementById('container')
    messageItem.className = `message-block ${className} btn`
    messageItem.innerText = message
    container_block.append(messageItem)
}
