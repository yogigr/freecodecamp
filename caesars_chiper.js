function rot13(str) {
    const src = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    let converted = '';
    str = str.toLowerCase();
    for (let i = 0; i < str.length; i++) {
        if (src.includes(str[i])) {
            let index = src.findIndex(e => e == str[i]);
            converted += index > 12 ? src[index - 13] : src[index + 13];
        } else {converted += str[i];}
    }
    return converted.toUpperCase();
}

console.log(rot13("SERR PBQR PNZC") === "FREE CODE CAMP");
console.log(rot13("SERR CVMMN!") === "FREE PIZZA!");
console.log(rot13("SERR YBIR?") === "FREE LOVE?");
console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.") === "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.");