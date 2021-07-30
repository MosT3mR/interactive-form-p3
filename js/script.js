document.getElementById('name').focus(); //The "Name" field fouces, we can add addEventListener("DOMContentLoaded")


/* 
Job Role
*/

// first we hide 'the other job role if the select menu is other we show it

const otherJobRole = document.getElementById('other-job-role');
otherJobRole.style.display = 'none';
const JobRole = document.getElementById('title'); // we add the eventlistenr to the job role only

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

const shirtList = document.getElementById('color');
const shirtColors = document.getElementById('shirt-colors');
shirtColors.style.display = 'none';

const shirtDesigns = document.getElementById('shirt-designs');

const showAvailable = function(option){
    shirtColors.style.display = '';
    for(let i = 0; i < shirtList.length; i++){
        shirtList[i].setAttribute('hidden','');
        if(shirtList[i].getAttribute('data-theme') === option){
            shirtList[i].removeAttribute('hidden');
        }
    }
}

shirtDesigns.addEventListener('change', (e) => {
    if(e.target.value === 'js puns') {
        showAvailable('js puns');
    } else if (e.target.value === 'heart js') {
        showAvailable('heart js');
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

// Must be a valid email address
function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

// The "Card number" field must contain a 13 - 16 digit credit card number with no dashes or spaces.
function isValidccNum(ccNum) {
    return /^\d{13}$/.test(ccNum) | /^\d{16}$/.test(ccNum);
}

// The "Zip code" field must contain a 5 digit number.
function isValidZip(zip) {
    return /^\d{5}$/.test(zip);
}

// The "CVV" field must contain a 3 digit number.
function isValidCvv(cvv) {
    return /^\d{3}$/.test(cvv);
}

const email = document.getElementById('email');
const ccNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');



const showOrHideTip = function(show, element){
    if(show){
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


email.addEventListener("input", createListener(isValidEmail));
ccNum.addEventListener("input", createListener(isValidccNum));
zip.addEventListener("input", createListener(isValidZip));
cvv.addEventListener("input", createListener(isValidCvv));