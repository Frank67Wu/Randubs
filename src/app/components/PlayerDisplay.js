import React from 'react'
import { Box, TextField, Container } from '@mui/material'
import { SmashPlayerBox } from './SmashPlayerBox'


export const PlayerDisplay = ({playerColor, playerName, setPlayerName, playerTotal, changeOneTotal, loading, playerId}) => {

    const red = "#b20100"

    const reds = ["#EE2C2B", "#F3625A", "#E49080"]
    const blues = ["#2980F4", "#39A2F6", "#4AB2E3"]

    const blue = "#0040ca"
    const purple = 	"#FFD6D7"

    
  return (
    <Box sx={{ display: "flex", flexDirection: "column", ml: "8px", mr: "8px" }}>
          <TextField variant="standard"

            sx={{borderRadius : "50px", marginBottom : "10px", border : "solid", borderColor : "black", borderWidth : "1px", 
            background: `linear-gradient(110deg, ${playerColor} 45%, white 45%)`,
              transition: "all 1s ease",
              WebkitTransition: "all 1s ease",
              MozTransition: "all 1s ease",
              width : "200px", height : "40px"
            }}
            value={playerName}
            onChange={(e) => (setPlayerName(e.target.value))}
            InputProps={{disableUnderline : true, 
              inputProps: {
                style: { textAlign: "center", fontSize : 24, color : "white", outlineColor : "black", WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : "black", fontWeight : "bold", marginTop : "-2px"},
              }
            }} />

            <SmashPlayerBox colors={playerColor == red ? reds : blues }/>

      <TextField size="small" sx={{position : "absolute", marginTop : "70px", "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
      },
      "& input[type=number]": {
        MozAppearance: "textfield",
      }, width : "200px", height : "100px", zIndex : 100,
       }} variant="standard"
       inputProps={{style: { textAlign: 'center' }}}
       InputProps={{disableUnderline: true, style: {fontSize: 80, color : "white", outlineColor : "black", WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : "black"}}} type="number" value={playerTotal} 
       onChange={(e) => changeOneTotal(playerId, e.target.value)}>{playerTotal}</TextField>

        </Box>
  )
}
