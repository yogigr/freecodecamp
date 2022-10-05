function telephoneCheck(str) {
    //check bracket
    let brackets = 0;
    for (let index = 0; index < str.length; index++) {
        if (str[index] == '(' || str[index] == ')') {
            brackets++;
        }
    }
    if (brackets % 2 === 0) {
        const regx = /^(1{0,1})(\s{0,1})(\({0,1})\d{3}(\){0,1}|\-|\s)(\s{0,1})\d{3}(\-{0,1}|\s)\d{4}$/g
        return str.match(regx) !== null;
    }
    return false;
    
}

console.log(telephoneCheck("555-555-5555") === true);
console.log(telephoneCheck("1 555-555-5555"));
console.log(telephoneCheck("1 (555) 555-5555") === true);
console.log(telephoneCheck("5555555555") === true);
console.log(telephoneCheck("555-555-5555") === true);
console.log(telephoneCheck("(555)555-5555") === true);
console.log(telephoneCheck("1(555)555-5555") === true);
console.log(telephoneCheck("555-5555") === false);
console.log(telephoneCheck("5555555") === false);
console.log(telephoneCheck("1 555)555-5555") === false);