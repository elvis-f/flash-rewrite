const nouns = [
    "katt",
    "hund",
    "kylling",
    "bilen",
    "fly",
    "bok",
    "blomst",
    "ost",
    "neo",
    "fisk",
    "kanin",
    "skjerm",
    "penger"
]

const adjectives = [
    "snill",
    "stor",
    "rik",
    "morsom",
    "liten",
    "moro",
    "høflig",
    "still",
    "mektig",
    "speciell",
    "vakker"
]

export const generateRandomCombination = () => {
    const random_noun = capitalizeFirstLetter(getRandomFromArray(nouns))
    const random_adjective = capitalizeFirstLetter(getRandomFromArray(adjectives))
    const num_string = generateRandomNumberString()
    
    return random_adjective + random_noun + num_string
}

const generateRandomNumberString = () => {
    const num = Math.floor(Math.random() * 9999);
    return String(num).padStart(4, '0'); 
}

function getRandomFromArray(arr: any[]){
    return arr[Math.floor(Math.random()*arr.length)]
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}