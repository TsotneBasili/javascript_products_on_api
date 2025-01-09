const userButton = document.querySelector("#user_button")
userButton.addEventListener('click', ()=> {
    window.location.href = './sign_in.html'
})


function stringToHash(string) {

    let hash = 0;

    if (string.length == 0) return hash;

    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return hash;
}

const form = document.querySelector('#sign_in_form');

let users = [
    {
    email:"io@gmail.com",
    password: stringToHash("password1")
    },
    {
    email:"io1@gmail.com",
    password: stringToHash("password1")
    }
]


function errorMassage(element, massage) {
    form.classList.remove('was-validated')

    form.classList.add('not-validated')


    // Remove any existing error messages
    const existingError = element.parentElement.querySelector('.invalid-feedback');
    if (existingError) {
        element.parentElement.removeChild(existingError);
    }

    const div = document.createElement('div');
    div.innerText = massage;
    div.classList.add('invalid-feedback');
    element.classList.add('is-invalid');
    element.parentElement.appendChild(div);
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = form.email.value;
    const password = stringToHash(form.password.value);
    console.log(event);
    

    //server imitation
    const user = users.find(user => user.email === email)
    if (!user) {
        errorMassage(form.email, "please check credentials")
        errorMassage(form.password, "please check credentials")
        return;
    } 
    
    if (user.password === password){
        form.classList.remove('not-validated')

        form.classList.add('was-validated')

        const existingError = form.email.parentElement.querySelector('.invalid-feedback');
        if (existingError) {
            form.email.parentElement.removeChild(existingError);
        }
        const existingError1 = form.password.parentElement.querySelector('.invalid-feedback');
        if (existingError1) {
            form.password.parentElement.removeChild(existingError1);
        }
        return
    }
    
    errorMassage(form.email, "please check credentials")
    errorMassage(form.password, "please check credentials")
});