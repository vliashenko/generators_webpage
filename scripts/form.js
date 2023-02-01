const submitButton = document.querySelectorAll(".modal-form__button");
const modalContainer = document.querySelector(".modal-container");

//-----Validation----//

const validateEmail = (email) => {
    let isEmail =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)
    return isEmail; 
};

function numberChecker(str){
    let isPhone = /^[+]\d+$/.test(str);
    let isPhones = /^\d+$/.test(str);

    if(isPhone || isPhones){
        return true;
    } else {
        return false;
    }
}

function nameCheck(str) {
    let isName = /^[А-ЩЬЮЯҐЄІЇЫЭЪЁA-Za-zа-щьюяґєіїыэъё.,'!?-]+/.test(str);
    return isName;
}

//-----Validation----//




//----Submitting----//

submitButton.forEach((btn) => {
    btn.addEventListener('click',(e)=> {
    e.preventDefault();
    checkDataInput()
    })
})

function inputChecker(func, inputName) {
    if(!func(inputName.value)){
        inputName.style.border = "solid red";
        return false

    } else {
        inputName.style.border = "solid green";
        return true
    }
    
}

function textInputChecker(inputName) {
    let field = inputName.value

    if(field.length < 1) {
        return "Прошу зателефонувати мені з приводу консультації"
    } else {
        return field
    }
}

function checkDataInput() {
    const formInputs = document.querySelectorAll('.modal-form__input');
    const formInputText = document.querySelector('.modal-form__textarea');

    let trueOrFalse;
    
    formInputs.forEach((inputField,index) => {
        if( index === 0){
            console.log(inputChecker(nameCheck,inputField));
            inputChecker(nameCheck,inputField)? trueOrFalse = true : trueOrFalse = false
        }
         if ( index === 2){
            console.log(inputChecker(validateEmail,inputField));
            inputChecker(validateEmail,inputField)? trueOrFalse = true : trueOrFalse = false  
        } 
         if ( index === 3){
            console.log(inputChecker(numberChecker,inputField));
            inputChecker(numberChecker,inputField)? trueOrFalse = true : trueOrFalse = false
        }
        if ( index === 4){
            return true
        }
    })

    let modalTextField = formInputText;

    let textValue = textInputChecker(modalTextField)
    console.log(textValue);
    trueOrFalse? FormSend(
        JSON.stringify({
            name: formInputs[0].value,
            email: formInputs[3].value, 
            phone: formInputs[4].value, 
            text: textValue
    })) : console.log('error');
        
}

//----Submitting----//




//-----Form Sending-----//

const success =`
    <h1 class="modal-container__title">Заявка Успішно прийнята! Невдовзі з вами зв'яжуться. Дякуємо!</h1> 
`;

const error = `
    <h1 class="modal-container__title">Помилка з'єднання з сервером, спробуйте пізніше. Дякуємо!</h1> 
`

function successTemplate(container) {
    container.innerHTML = success
    container.style.top = "90%"
}

function errorTemplate(container) {
    container.innerHTML = error
    container.style.top = "90%"
}

function FormSend(data) {
    fetch("send.php", {
        method: "POST",
        body: data,
    })
    .then(res => {
        if(!res.ok) {
            errorTemplate(modalContainer)
        } else {
            successTemplate(modalContainer)
        }
    })
        
}
