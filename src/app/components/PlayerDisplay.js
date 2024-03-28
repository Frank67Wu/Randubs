import React, { useEffect, useState } from 'react'
import { Box, TextField, Container, Button } from '@mui/material'
import { SmashPlayerBox } from './SmashPlayerBox'


export const PlayerDisplay = ({ playerColor, playerName, setPlayerName, playerTotal, changeOneTotal, loading, playerId, randomizeCharacters, playerCharacter }) => {

  const transitionColor = "#8c5690"

  const reds = ["#EE2C2B", "#F3625A", "#E49080"]
  const blues = ["#2980F4", "#39A2F6", "#4AB2E3"]
  const yellows = ["#FEB810", "#FCD417", "#FBE218"]
  const greens = ["#22AB42", "#35CD5F", "#43E47A"]

  const colors = playerColor == reds[0] ? reds : playerColor == blues[0] ? blues : playerColor == yellows[0] ? yellows : greens

  return (
    <Box sx={{ display: "flex", flexDirection: "column", ml: "4px", mr: "4px", mb: "4px", alignItems: "center", overflow: "hidden", position: "relative" }}>
      <TextField variant="standard"

        sx={{
          borderRadius: "50px", marginBottom: "10px", border: "solid", borderColor: "black", borderWidth: "2px",
          background: loading ? transitionColor : playerColor,
          transition: "all 1s ease",
          WebkitTransition: "all 1s ease",
          MozTransition: "all 1s ease",
          width: "200px", height: "40px"
        }}
        value={playerName}
        onChange={(e) => (setPlayerName(playerId, e.target.value))}
        InputProps={{
          disableUnderline: true,
          inputProps: {
            style: { textAlign: "center", fontSize: 24, color: "white", outlineColor: "black", WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: "white", fontWeight: "bold", marginTop: "-2px" },
          }
        }} />

      <SmashPlayerBox loading={loading} colors={colors} />

      <TextField size="small" sx={{
        position: "absolute", marginTop: "70px", "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
          display: "none",
        },
        "& input[type=number]": {
          MozAppearance: "textfield"
        }, width: "200px", height: "100px", zIndex: 10
      }} variant="standard"
        inputProps={{ style: { textAlign: 'center' } }}
        InputProps={{ disableUnderline: true, style: { fontSize: 80, color: "white", outlineColor: "black", WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: "black" } }} type="number" value={playerTotal}
        onChange={(e) => changeOneTotal(playerId, e.target.value)}>{playerTotal}</TextField>

      {randomizeCharacters && <Box sx={{
        width: "100px", height: "75px", marginTop: "12px", mb: "12px", background: loading ? transitionColor : playerColor,
        transition: "all 1s ease-in",
        WebkitTransition: "all 1s ease",
        MozTransition: "all 1s ease",
      }}>
        <img style={{
          width: loading ? "0px" : "50px", height: loading ? "0px" : "50px", paddingLeft: "25px", paddingTop: "12px",
          transition: "all 1s",
          WebkitTransition: "all 1s",
          MozTransition: "all 1s"
        }} alt={""} src={playerCharacter == "" ? `/Stock Icons/SSBU_spirit_Smash_Ball.png` : loading ? `/Stock Icons/SSBU_spirit_Smash_Ball.png` : `/Stock Icons/chara_2_${playerCharacter}.png`} />
      </Box>}

    </Box>
    
  )
}
