import React from 'react'
import { Box, TextField, Container } from '@mui/material'
import { SmashPlayerBox } from './SmashPlayerBox'


export const PlayerDisplay = ({playerColor, playerName, setPlayerName, playerTotal, changeOneTotal, loading, playerId, playerCharacter}) => {

    const red = "#EE2C2B"
    const transitionColor = "#8c5690"

    const reds = ["#EE2C2B", "#F3625A", "#E49080"]
    const blues = ["#2980F4", "#39A2F6", "#4AB2E3"]

    const blue = "#0040ca"
    const purple = 	"#FFD6D7"
    
  return (
    <Box sx={{ display: "flex", flexDirection: "column", ml: "8px", mr: "8px",  alignItems : "center"}}>
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

            <SmashPlayerBox loading={loading} colors={playerColor == red ? reds : blues }/>

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

      {playerCharacter !== "" && <Box sx={{width : "100px", height : "75px", marginTop : "30px", background: loading ? transitionColor : playerColor,             
      transition: "all 1s ease-in",
      WebkitTransition: "all 1s ease",
      MozTransition: "all 1s ease",}}>
      <img style={{width : loading ?  "0px" : "50px", height : loading ? "0px" : "50px", paddingLeft : "25px", paddingTop : "12px", 
      transition: "all 1s",
      WebkitTransition: "all 1s",
      MozTransition: "all 1s"}}  src={`/Stock Icons/No Gamma Fix/chara_2_${loading ? "miigunner_00" : playerCharacter}.png`}></img>
      </Box> }
       

      </Box>
  )
}
