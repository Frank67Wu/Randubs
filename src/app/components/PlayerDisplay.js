import React from 'react'
import { Box, TextField, Container } from '@mui/material'
import { SmashPlayerBox } from './SmashPlayerBox'


export const PlayerDisplay = ({playerColor, playerName, setPlayerName, playerTotal, changeOneTotal, loading, playerId, randomizeCharacters, playerCharacter, otherColor}) => {


    const reds = ["#EE2C2B", "#F3625A", "#E49080"]
    const blues = ["#2980F4", "#39A2F6", "#4AB2E3"]
    const yellows = ["#FEB810", "#FCD417", "#FBE218"]
    const greens = ["#22AB42", "#35CD5F", "#43E47A"]
    
    const transitionRedBlue= ["#8c5690", "#9682a8", "#9ea8b8"]
    const transitionRedGreen = ["#886c36", "#94985c", "#94ba7d"]
    const transitionRedYellow = ["#f6721e", "#f89b38", "#f0b94c"]
    const transitionBlueGreen = ["#26969b", "#37b8aa", "#46cbae"]
    const transitionBlueYellow = ["#949c82", "#9abb86", "#a2ca7e"]
    const transitionYellowGreen = ["#90b229", "#98d03b", "#9fe349"]

    let transitionColors = ["#8c5690", "#9682a8", "#9ea8b8"]

/*  if (playerColor == reds[0] && otherColor == greens[0] || otherColor == reds[0] && playerColor == greens[0]) {
      transitionColors = ["#886c36", "#94985c", "#94ba7d"]
    }
    else if (playerColor == reds[0] && otherColor == yellows[0] || otherColor == reds[0] && playerColor == yellows[0]) {
      transitionColors = ["#f6721e", "#f89b38", "#f0b94c"]
    }
    else if (playerColor == blues[0] && otherColor == greens[0] || otherColor == blues[0] && playerColor == greens[0]) {
      transitionColors = ["#26969b", "#37b8aa", "#46cbae"]
    }
    else if (playerColor == blues[0] && otherColor == yellows[0] || otherColor == blues[0] && playerColor == yellows[0]) {
      transitionColors = ["#949c82", "#9abb86", "#a2ca7e"]
    }
    else if (playerColor == yellows[0] && otherColor == greens[0] || otherColor == yellows[0] && playerColor == greens[0]) {
      transitionColors = ["#90b229", "#98d03b", "#9fe349"]
    } */
    const transitionColor = transitionColors[0]
  
    const colors = playerColor == reds[0] ? reds : playerColor == blues[0] ? blues : playerColor == yellows[0] ? yellows : greens
 

  return (
    <Box sx={{ display: "flex", flexDirection: "column", ml: "4px", mr: "4px", mb : "4px",  alignItems : "center"}}>
          <TextField variant="standard"

            sx={{borderRadius : "50px", marginBottom : "10px", border : "solid", borderColor : "black", borderWidth : "2px", 
            background: loading ? transitionColor : playerColor,
              transition: "all 1s ease",
              WebkitTransition: "all 1s ease",
              MozTransition: "all 1s ease",
              width : "200px", height : "40px"
            }}
            value={playerName}
            onChange={(e) => (setPlayerName(e.target.value))}
            InputProps={{disableUnderline : true, 
              inputProps: {
                style: { textAlign: "center", fontSize : 24, color : "white", outlineColor : "black", WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : "white", fontWeight : "bold", marginTop : "-2px"},
              }
            }} />

            <SmashPlayerBox loading={loading} colors={colors} transitionColors={transitionColors}/>

      <TextField size="small" sx={{position : "absolute", marginTop : "70px", "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
      },
      "& input[type=number]": {
        MozAppearance: "textfield",
      }, width : "200px", height : "100px", zIndex : 10,
       }} variant="standard"
       inputProps={{style: { textAlign: 'center'}}}
       InputProps={{disableUnderline: true, style: {fontSize: 80, color : "white", outlineColor : "black", WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : "black"}}} type="number" value={playerTotal} 
       onChange={(e) => changeOneTotal(playerId, e.target.value)}>{playerTotal}</TextField>

      {randomizeCharacters && <Box sx={{width : "100px", height : "75px", marginTop : "12px", mb : "12px", background: loading ? transitionColor : playerColor,             
      transition: "all 1s ease-in",
      WebkitTransition: "all 1s ease",
      MozTransition: "all 1s ease",}}>
      <img style={{width : loading ?  "0px" : "50px", height : loading ? "0px" : "50px", paddingLeft : "25px", paddingTop : "12px", 
      transition: "all 1s",
      WebkitTransition: "all 1s",
      MozTransition: "all 1s"}} alt={""} src={playerCharacter == "" ? `/Stock Icons/SSBU_spirit_Smash_Ball.png` : loading ? `/Stock Icons/SSBU_spirit_Smash_Ball.png` : `/Stock Icons/chara_2_${playerCharacter}.png`}/>
      </Box> }
       

      </Box>
  )
}
