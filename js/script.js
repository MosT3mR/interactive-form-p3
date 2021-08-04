/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
Student : Othman Alomair
*/

/*
Job Role
*/

const customerName = document.getElementById('name');
const otherJobRole = document.getElementById('other-job-role');
const JobRole = document.getElementById('title'); 

customerName.focus(); //The "Name" field fouces

otherJobRole.style.display = 'none'; //"Other job role" text field displays/hides when a user selects/deselects "Other" from the Job Role menu
JobRole.addEventListener('change', (e) => { 
    if(e.target.value === 'other'){
        otherJobRole.style.display = '';
    } else {
        otherJobRole.style.display = 'none';
    }
});

/*
T-Shirts
*/

const design = document.getElementById('design');
const color = document.getElementById('color');
const shirtList = color.children;
color.disabled = true;

design.addEventListener('change', (e) => {
    color.disabled = false;
    for(let i = 0; i < shirtList.length; i++){
        if(shirtList[i].getAttribute('data-theme') === design.value){
            shirtList[i].selected = true;
            shirtList[i].hidden = false;
        } else {
            shirtList[i].selected = false;
            shirtList[i].hidden = true;
        }
    }
});


/*
Register for Activities
*/

const activities = document.getElementById('activities');
let total = 0;

activities.addEventListener('change', (e) => {
    if(e.target.checked){
        total+= parseInt(e.target.getAttribute('data-cost'));
    } else {
        total-= parseInt(e.target.getAttribute('data-cost'));
    }
    document.getElementById('activities-cost').innerHTML = `Total: \$${total}`;
});


/*
Payment Info
*/

const paymentMethods = document.getElementById('payment-methods');
const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

document.getElementById('payment')[1].setAttribute('selected', '');
paypal.hidden = true;
bitcoin.hidden = true;
payment.addEventListener('change', (e) => {
    if(e.target.value === 'credit-card'){
        creditCard.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;
    } else if (e.target.value === 'paypal'){
        creditCard.hidden = true;
        paypal.hidden = false;
        bitcoin.hidden = true;
    } else if (e.target.value === 'bitcoin'){
        creditCard.hidden = true;
        paypal.hidden = true;
        bitcoin.hidden = false;
    }
});


/*
Validation
*/

const form = document.querySelector('form');
const email = document.getElementById('email');
const ccNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');


// testing

function isValidName(name) {
    return /^[A-Za-z]+$/.test(name);
}

function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

function isValidccNum(ccNum) {
    return /^\d{13,16}$/.test(ccNum); //fixed this bug
}

function isValidZip(zip) {
    return /^\d{5}$/.test(zip);
}

function isValidCvv(cvv) {
    return /^\d{3}$/.test(cvv);
}

function isValidRegister(total) {
    if(total > 0){
        return true;
    } else {
        return false;
    }
}

function isValidPayment() {
    if (payment.value === 'credit-card'){
        if(isValidccNum(ccNum.value) && isValidZip(zip.value) && isValidCvv(cvv.value)){
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}


form.addEventListener('submit', (e) => { // fixed this bug
    if(isValidName(customerName.value) && isValidEmail(email.value) && isValidRegister(total) && isValidPayment()){
        return true;
    } else{
        e.preventDefault();
        showEror(isValidName(customerName.value), customerName.parentElement);
        showEror(isValidEmail(email.value), email.parentElement);
        showEror(isValidRegister(total), activities);
    }
    if(payment.value === 'credit-card'){
        showEror(isValidccNum(ccNum.value), ccNum.parentElement);
        showEror(isValidZip(zip.value), zip.parentElement);
        showEror(isValidCvv(cvv.value), cvv.parentElement);
    }
});




// Validation in real time 
const showOrHideTip = function(show, element){
    if(show){
        element.classList.add('not-valid');
		element.classList.remove('valid')
        element.style.display = 'inherit';
    } else {
        element.style.display = 'none';
    }
}

function createListener(validator) {
    return e => {
      const text = e.target.value;
      const valid = validator(text);
      const showTip = text !== "" && !valid;
      const tooltip = e.target.nextElementSibling;
      showOrHideTip(showTip, tooltip);
    };
  }

function showEror(validator, element){
    if(!validator){
        element.classList.add('not-valid');
		element.classList.remove('valid')
		element.lastElementChild.style.display = 'inherit';
    } else{
        element.classList.remove('not-valid');
		element.classList.add('valid');
		element.lastElementChild.style.display = 'none';
    }
}


email.addEventListener("input", createListener(isValidEmail));
ccNum.addEventListener("input", createListener(isValidccNum));
zip.addEventListener("input", createListener(isValidZip));
cvv.addEventListener("input", createListener(isValidCvv));


/*
Accessibility
*/

const checkBoxs = document.querySelectorAll("input[type='checkbox']");

for(let i = 0; i < checkBoxs.length; i++){
    checkBoxs[i].addEventListener('focus', (e) => {
        checkBoxs[i].parentElement.classList.add('focus');
        }
    );
    checkBoxs[i].addEventListener('blur', (e) => {
        checkBoxs[i].parentElement.classList.remove('focus');
        }
    );
}