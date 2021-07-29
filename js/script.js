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

shirtDesigns.addEventListener('change', (e) => {
    if(e.target.value === 'js puns') {
        shirtColors.style.display = '';
        for(let i = 0; i < shirtList.length; i++){
            shirtList[i].setAttribute('hidden','');
            if(shirtList[i].getAttribute('data-theme') === 'js puns'){
                shirtList[i].removeAttribute('hidden');
            }
        }
    } else if (e.target.value === 'heart js') {
        shirtColors.style.display = '';
        for(let i = 0; i < shirtList.length; i++){
            shirtList[i].setAttribute('hidden','');
            if(shirtList[i].getAttribute('data-theme') === 'heart js'){
                shirtList[i].removeAttribute('hidden');
            }
        }
    } 
});