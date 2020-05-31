const firstName = document.getElementById('InputFName');
const lastName = document.getElementById('InputLName');

const password = document.getElementById('InputPass');
const confPass = document.getElementById('confPass')

const time = document.getElementById("time")

const form = document.getElementById("myForm");

firstName.addEventListener('blur', checkFirstName);
lastName.addEventListener('blur', checkLastName);
password.addEventListener('blur', checkPassword);
confPass.addEventListener('blur', confirmPassword);
time.addEventListener('blur', checkTime);

//execute the form if all verifications are OK
form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!checkFirstName() && 
    !checkLastName() )
    //checkPassword() &&
    //confirmPassword() &&
    //checkTime()) 
    {
        console.log('test de functionare');
        var gender = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
        // get the html table
        // 0 = the first table, if we ahve many in the html doc
        var table = document.getElementsByTagName('table')[0];
        // add new empty row to the table
        // 0 = in the top
        // table.rows.length = insert the line at the bottom of table
        // table.rows.length/2 + 1 = insert the line in the center of table
        var newRow = table.insertRow(table.rows.length);
        // add cells to the row
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        // add values to the cell
        cell1.innerHTML = firstName.value;
        cell2.innerHTML = lastName.value;
        cell3.innerHTML = gender;
        cell4.innerHTML = time.value;
        
    }
    
})

// validator functions
function checkFirstName(){
    if(checkIfEmpty(firstName)) return;

    if(verifyLength(firstName)) return;

    if(!onlyLetters(firstName)) return;
    
    return false;
}

function checkLastName(){
    if(checkIfEmpty(lastName)) return;

    if(verifyLength(lastName)) return;

    if(!onlyLetters(lastName)) return;
    
    return false;
}

function checkPassword(){
    if(checkIfEmpty(password)) return;

    if(!verifyLength(password, 4, 12)) return;

    //if(!onlyLetters(password)) return;

    if(!correctContent(password, 2)) return;
    
    return false;
}

function confirmPassword(){
    if(confPass.value.trim() === password.value.trim()){
        setValid(confPass, `${confPass.placeholder} is correct`);
        return true;
    } else {
        setInvalid(confPass, `${confPass.placeholder} not OK, please check again`)
    }
}

function checkTime(){
    if(correctContent(time, 6)) return;

    return false;
}


// utility functions
function checkIfEmpty(field){
    if(isEmpty(field.value.trim())){
        setInvalid(field, `${field.placeholder} must not be empty ! ` );
        return true;
    } else {
        setValid(field, ` OK ${field.placeholder} is not empty ! `);
        return false;
    }
}

function isEmpty(value){
    if(value === '') {
        // let c = document.getElementById('myDiv').childNodes;
        // console.log(c);
        // c[1].innerHTML= 'green';
        return true;
    } else {
        return false;
    }          
 }

 function setInvalid(param, message){
    let c = param.parentNode.childNodes;
        //console.log(c);
    c[7].innerHTML = message;
    c[7].style.color = "red";
    
 }

 function setValid(param, message){
    let c = param.parentNode.childNodes;
    //console.log(c);
    c[7].innerHTML = message;
    c[7].style.color = "green";
 }

 function verifyLength(field, min, max){
    if(field.value.trim().length >= min && field.value.trim().length < max ){
        setValid(field, ` OK ${field.placeholder} is long enough !`)
        return true;
    } else if (field.value.trim().length < min) {
        setInvalid(field, `${field.placeholder} must be longer than ${min} letters!`)
        return false;
    } else {
        setInvalid(field, `${field.placeholder} must be shorter than ${max} letters!`)
        return false;
    }

 }

 function onlyLetters(field){
    if(/^[a-zA-Z ]+$/.test(field.value)){
        setValid(field, `${field.placeholder} is OK !`)
        return true;
    } else {
        setInvalid(field, `${field.placeholder} must be only letters !` )
        return false;  
    }
 }

function correctContent(field, code) {
    let regEx;
    switch(code){
        case 1: 
        // letters
        regEx = /(?=.*[a-zA-Z])/;
        return matchWithRegEx(regEx, field, `Must contains at least one letter`);
        case 2:
        // letters and numbers
        regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
        return matchWithRegEx(regEx, field, `Must contain at least one letter and one number `);
        case 3:
        // uppercase, lowercase, numbers
        regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
        return matchWithRegEx(regEx, field, `Must contain at least one uppercase, one lowercase, one number `);
        case 4:
        // uppercase, lowercase, numbers, special character
        regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
        return matchWithRegEx(regEx, field, `Must contain at least one uppercase, one lowercase, one number, one special character `);
        case 5:
        // validate email
        regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return matchWithRegEx(regEx, field, `Must be email format `);
        // vlidate time
        case 6:
        regEx = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/
        return matchWithRegEx(regEx, field, `Must be time format `);
        
        default:
        return false;
    }
}

function matchWithRegEx(regEx, field, message){
    if(field.value.match(regEx)){
        setValid(field, `${field.placeholder} is OK`);
        return true;
    } else {
        setInvalid(field, message);
        return false;
    }
}


// add rows

// function addRow(){
//         //var gender = document.getElementById()
//         var table = document.getElementsByTagName('table')[0];
//         var newRow = table.insertRow(table.rows.length);
//         var cell1 = newRow.insertCell(0);
//         var cell2 = newRow.insertCell(1);
//         var cell3 = newRow.insertCell(2);

//         cell1.innerHTML = firstName.value;
//         cell2.innerHTML = lastName.value;
//         cell3.innerHTML = time.value;
// }