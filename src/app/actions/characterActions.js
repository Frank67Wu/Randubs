import { smashCodeNamesFormatted, handleAlt } from "../const/smashCodeNames";
import axios from "axios";


export async function createAllCharacters() {


    for (const [index, char] of smashCodeNamesFormatted.entries()) {
        axios.post("/api/character", { codeName : char[0], id : index + 1, 
        })
    }
}



export async function updateScore(match) {

    console.log(match)

    let charOne = match[0] > match[1] ? match[0].slice(0, -3) : match[1].slice(0, -3)
    let charTwo = match[0] > match[1] ? match[1].slice(0, -3) : match[0].slice(0, -3)

    charOne = handleAlt[charOne] || charOne
    charTwo = handleAlt[charTwo] || charTwo 

    axios.patch("/api/duo", {characterOne : charOne, characterTwo : charTwo, win : match[4] == 0 ? 1 : 0, loss : match[4] == 0 ? 0 : 1})

    let charThree = match[2] > match[3] ? match[2].slice(0, -3) : match[3].slice(0, -3)
    let charFour = match[2] > match[3] ? match[3].slice(0, -3) : match[2].slice(0, -3)

    charThree = handleAlt[charThree] || charThree
    charFour = handleAlt[charFour] || charFour 

    axios.patch("/api/duo", {characterOne : charThree, characterTwo : charFour, win : match[4] == 1 ? 1 : 0, loss : match[4] == 1 ? 0 : 1})

}
