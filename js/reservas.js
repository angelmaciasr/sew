"use strict";

class Reservas {

    paintForm(){
        let form = document.createElement("form");
        form.setAttribute("method", "POST");
        
        document.body.appendChild(form);

    }

    paintFormContent(form){
        let labelUser = document.createElement("label");
        labelUser.setAttribute("for", "usuario");
        labelUser.innerHTML = "Usuario:";

        form.appendChild(labelUser);

        let inputUser = document.createElement("input");
        inputUser.setAttribute("type", "text");
        inputUser.setAttribute("name", "usuario");
        inputUser.setAttribute("id", "usuario");
        inputUser.setAttribute("required", "required");

        form.appendChild(inputUser);


        let labelPassword = document.createElement("label");
        labelPassword.setAttribute("for", "password");
        labelPassword.innerHTML = "Contraseña:";

        form.appendChild(labelPassword);

        let inputPassword = document.createElement("input");
        inputPassword.setAttribute("type", "password");
        inputPassword.setAttribute("name", "password");
        inputPassword.setAttribute("id", "password");
        inputPassword.setAttribute("required", "required");

        form.appendChild(inputPassword);
    }

    registerUserForm(){
        let form = document.getElementsByTagName("form")[0];
        form.innerHTML = ""; // Clear the form content

        this.paintFormContent(form);
        
        let submitButton = document.createElement("input");
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", "Registrar");
        submitButton.setAttribute("name", "registerUser");
        form.appendChild(submitButton);
    }

    loginUserForm(){
        let form = document.getElementsByTagName("form")[0];
        form.innerHTML = ""; // Clear the form content

        this.paintFormContent(form);
        
        let submitButton = document.createElement("input");
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", "Iniciar Sesión");
        submitButton.setAttribute("name", "loginUser");
        form.appendChild(submitButton);
    }

    removeForm(){
        let form = document.getElementsByTagName("form")[0];
        form.innerHTML = ""; // Clear the form content

        //remove login and register buttons
        const main = document.querySelector("main");
        const buttons = main.querySelectorAll("button");
        buttons.forEach(button => button.remove());
    }


    showMessage(message){
        console.log(message);
    }

}

var reservas = new Reservas();