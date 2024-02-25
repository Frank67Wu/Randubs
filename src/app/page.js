'use client'

import { Box, TextField, Typography, Button, Container, ToggleButton } from "@mui/material";
import { useState, useEffect } from "react";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { MatchHistory } from "./components/MatchHistory";
import { PlayerDisplay } from "./components/PlayerDisplay";
import SettingsIcon from '@mui/icons-material/Settings';
import { Settings } from "@mui/icons-material";
import ThemeSwitch from "./components/ThemeSwitch";
import SimpleSwitch from "./components/SimpleSwitch";
import { smashCodeNames } from "./const/smashCodeNames";
import { MyToggleButton } from "./components/MyToggleButton";



export default function Home() {

  const IN_PROGRESS = "IN PROGRESS"
  const BLUE_WIN  = "BLUE_WIN"
  const RED_WIN = "RED_WIN"

  const red = "#EE2C2B"
  const blue = "#2980F4"
  const purple = 	"#FFD6D7"

  const redOne = "#EE2C2B"
  const redTwo = "#F3625A"
  const redThree = "#f19d8c"

  const blueOne = "#2980F4"
  const blueTwo = "#39A2F6"
  const blueThree = "#4AB2E3"

  const [playerOne, setPlayerOne] = useState("")
  const [playerTwo, setPlayerTwo] = useState("")
  const [playerThree, setPlayerThree] = useState("")
  const [playerFour, setPlayerFour] = useState("")
  const [matchAmount, setMatchAmount] = useState(1)
  const [playerColors, setPlayerColors] = useState([red, red, blue, blue])
  const [total, setTotal] = useState(["", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [cachingFinished, setCachingFinished] = useState(false)
  const [history, setHistory] = useState([])
  const [histAlt, setHistAlt] = useState([])
  const [matchStatus, setMatchStatus] = useState(IN_PROGRESS)
  const [histColors, setHistColors] = useState([])
  const [loadingTime, setLoadingTime] = useState(1)

  const [characterHistory, setCharacterHistory] = useState([])

  const [settingsOpen, setSettingsOpen] = useState(false)

  const [randomizeCharacters, setRandomizeCharacters] = useState(false)
  const [includeExtraColors, setIncludeExtraColors] = useState(false)

  const [themeColor, setThemeColor] = useState("black")
  const [altThemeColor, setAltThemeColor] = useState("white")

  const [matchHistoryOpen, setMatchHistoryOpen] = useState(false)
  const [playerCharacters, setPlayerCharacters] = useState(["", "", "", ""])

  const handleMatchHistoryClose = () => {
    setMatchHistoryOpen(false)
  }

  useEffect(() => {
    if (!cachingFinished) {
    const prev1 = localStorage.getItem("p1total") || "0"
    const prev2 = localStorage.getItem("p2total") || "0"
    const prev3 = localStorage.getItem("p3total") || "0"
    const prev4 = localStorage.getItem("p4total") || "0"

    setThemeColor(localStorage.getItem("theme") || "black")
    setAltThemeColor(localStorage.getItem("altTheme") || "white")
    setRandomizeCharacters(localStorage.getItem("randomize") == true ? true : false)
    setLoadingTime(localStorage.getItem("loadingTime") || 1)

    document.body.style.background = localStorage.getItem("altTheme") == "black" ? "#FFF5EE" : "#343434"
    document.body.style.color = localStorage.getItem("altTheme") == "black" ? "black" : "white"

    
    setTotal([prev1, prev2, prev3, prev4])

    setPlayerOne(localStorage.getItem("p1") || "Player One")
    setPlayerTwo(localStorage.getItem("p2") || "Player Two")
    setPlayerThree(localStorage.getItem("p3") || "Player Three")
    setPlayerFour(localStorage.getItem("p4") || "Player Four")

    if (!isNaN(localStorage.getItem("matchAmount"))) {
      setMatchAmount(1)
    }
    else {
      setMatchAmount(localStorage.getItem("matchAmount"))
    } 
    setCachingFinished(true)
    }
  }, [])

  useEffect(() => {
    if (cachingFinished) {
      localStorage.setItem("p1", playerOne)
      localStorage.setItem("p2", playerTwo)
      localStorage.setItem("p3", playerThree)
      localStorage.setItem("p4", playerFour)
    }
  }, [playerOne, playerTwo, playerThree, playerFour])

  useEffect(() => {
    if (cachingFinished) {
    localStorage.setItem("p1total", total[0])
    localStorage.setItem("p2total", total[1])
    localStorage.setItem("p3total", total[2])
    localStorage.setItem("p4total", total[3])
    }
  }, [total])

  useEffect(() => {
    if (cachingFinished) {
      localStorage.setItem("matchAmount", matchAmount)
    }
  }, [matchAmount])

  useEffect(() => {
    if (cachingFinished) {
      localStorage.setItem("randomize",randomizeCharacters)
    }
  }, [randomizeCharacters])

  useEffect(() => {
    if (cachingFinished) {
      localStorage.setItem("loadingTime",loadingTime)
    }
  }, [loadingTime])

  useEffect(() => {
    if (cachingFinished) {
      localStorage.setItem("theme",themeColor)
      localStorage.setItem("altTheme", altThemeColor)
    }
  }, [themeColor])

  useEffect(() => {
    console.log(randomizeCharacters)
  }, [randomizeCharacters])

  const changeLoadingTime = (e, newAlignment) => {
    setLoadingTime(newAlignment);
  };

  const randomizeTeams = () => {

    setLoading(true)

    if (randomizeCharacters) {
      randomizeChars()
    }

    let colors = [red, red, red, red]

    let indexOne = Math.floor(Math.random() * (4))
    let indexTwo = (Math.floor(Math.random() * (3)) + 1 + indexOne) % 4

    colors[indexOne] = blue
    colors[indexTwo] = blue

    setPlayerColors(colors)

    setMatchStatus(IN_PROGRESS)

    const lt = loadingTime || 1

    setTimeout(() => {
      setLoading(false)
    }, lt * 1000);
    return
  }

  const resetAll = () => {
    localStorage.clear()
    location.reload();
  }

  const updateTotal = (winner) => {
    if (loading) {
      return 0
    }
    if (winner == red) {
      setMatchStatus(RED_WIN)
    }
    else {
      setMatchStatus(BLUE_WIN)
    }
    const players = [playerOne, playerTwo, playerThree, playerFour]
    let chars = []
    let hist = []
    let alt = []
    let newTotal = []
    let histCol = []
    for (let i = 0; i < 4; i++) {
      chars.push(playerCharacters[i])
      if (playerColors[i] == winner) {
        newTotal.push(parseInt(total[i]) + parseInt(matchAmount))
        alt[i] = 1
      }
      else {
        newTotal.push(parseInt(total[i]) - parseInt(matchAmount))
        alt[i] = 0
      }

      if (playerColors[i] == red) {
        hist.unshift(players[i])
      }
      else {
        hist.push(players[i])
      }
    }

    if (winner == red) {
      hist.push(0)
    } 
    else {
      hist.push(1)
    }

    hist.push(matchAmount)
    alt.push(matchAmount)

    for (let col of playerColors) {
      histCol.push(col)
    }

    setHistory((oldhist) => [...oldhist, hist])
    setCharacterHistory((prev) => [...prev, chars])
    setTotal(newTotal)
    setHistAlt((oldAlt) => [...oldAlt, alt])
    setHistColors((oldColors) => [...oldColors, histCol])

  }

  const changeOneTotal = (player, newValue) => {
    const newTotal = []
    for (let i = 0; i < 4 ; i++) {
      if (i === player) {
        newTotal.push(newValue)
      }
      else {
        newTotal.push(total[i])
      }
    }
    setTotal(newTotal)
  }

  const undo = () => {
    if (loading) {
      return 0
    }
    if (histAlt.length > 0) {
    const lastMatch = histAlt[histAlt.length - 1]
    const tempTotal = []

    for (let i = 0; i < 4; i++) {
      if (lastMatch[i] == 1) {
        tempTotal[i] = parseInt(total[i]) - lastMatch[4]
      }
      else {
        tempTotal[i]  = parseInt(total[i]) + lastMatch[4]
      }

      
    }

    if (histColors.length > 1) {
  
    setPlayerColors(histColors[histColors.length - 1])

    }

    setHistColors((prev) => (prev.slice(0, -1)))
    setHistory((prev) => (prev.slice(0, -1)))
    setCharacterHistory((prev) => (prev.slice(0, -1)))

    setTotal(tempTotal)
    setHistAlt((prev) => (prev.slice(0, -1)))
  }
  }

  const themeSwitch = () => {
    document.body.style.background = themeColor == "black" ? "#FAF9F6" : "#343434"
    document.body.style.color = themeColor == "black" ? "black" : "white"
    const currentTheme = themeColor
    setThemeColor(altThemeColor)
    setAltThemeColor(currentTheme)
  }

  const generateRandomCharacter = () => {
    const index  = Math.floor(Math.random() * smashCodeNames.length);
    let name = ""
    if (smashCodeNames[index].length == 1) {
      name = smashCodeNames[index][0]
    }
    else {
      const secondIndex = Math.floor(Math.random() * smashCodeNames[index].length);
      name = smashCodeNames[index][secondIndex]
    }

    if (index < 4) {
      return name + "_00"
    }

    else {
      const alt = Math.floor(Math.random() * 8);
      return name + "_0" + alt.toString()
    }
  }

  const randomizeChars = () => {
    const chars = []
    for (let i = 0; i < 4; i++) {
      chars.push(generateRandomCharacter())
    }
    console.log(chars)
    setPlayerCharacters(chars)
  } 

  return (
    <Box sx={{display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", mt : "24px", ml : "24px",}}>
        <Typography fontSize={30} sx={{color : altThemeColor, WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : altThemeColor, fontWeight : "bold"}} variant="h6" >Set Money Per Game : </Typography>
        <TextField size="small" sx={{
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
          },
          "& input[type=number]": {
            MozAppearance: "textfield",
          }, width : "60px", mt : "-4px", ml : "8px",
        }}inputProps={{style: {fontSize: 30, paddingLeft : 0, paddingRight : 0, color : altThemeColor, fontWeight: "bold", textAlign : "center"}}}  type="number" value={matchAmount}  onChange={(e) => setMatchAmount(parseInt(e.target.value))}>{matchAmount}</TextField>
        
        <Button onClick={()=> (setSettingsOpen(!settingsOpen))} sx={{position : "absolute", right : 10, top : 10, background : themeColor, borderRadius : "15px", border : "2px solid white"}}>
          <SettingsIcon sx={{width : "60px", height : "60px", color : altThemeColor}}/>
        </Button>

      </Box>

      <Box sx={{position : "absolute", minHeight : settingsOpen ? "500px" : "0px", height : settingsOpen ? "500px" : "0px", width : "420px", background : themeColor, zIndex : 100, borderRadius : "15px", border : settingsOpen ? `3px solid ${altThemeColor}` : `0px solid ${altThemeColor}`, display : "flex", flexDirection : "column", overflow : "hidden", transition: "all 0.3s ease-out", right : 100}}>
          <Box sx={{display : "flex"}}>
            <Typography sx ={{fontWeight : "bold", fontSize : 24, WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : altThemeColor, ml : "24px", mt : "16px"}} variant="h6"> Theme </Typography>
            <ThemeSwitch onChange={() => (themeSwitch())}  thememode={themeColor}></ThemeSwitch>
          </Box>

          <Box sx={{display : "flex"}}>
            <Typography sx ={{fontWeight : "bold", fontSize : 24, WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : altThemeColor, ml : "24px", mt : "16px"}} variant="h6"> Randomize Characters </Typography>
            <SimpleSwitch disable={false} checked={randomizeCharacters} onChange={() => (setRandomizeCharacters(!randomizeCharacters))} thememode={themeColor}></SimpleSwitch>
          </Box>

          <Box sx={{display : "flex"}}>
            <Typography sx ={{fontWeight : "bold", fontSize : 24, WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : altThemeColor, ml : "24px", mt : "24px"}} variant="h6"> Loading Time </Typography>
            <MyToggleButton theme={themeColor} alignment={loadingTime} handleAlignment={changeLoadingTime}></MyToggleButton>
          </Box> 

          <Box sx={{display : "flex", }}>
            <Typography sx ={{fontWeight : "bold", fontSize : 24, WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : altThemeColor, ml : "24px", mt : "16px", opacity : 0}} variant="h6"> Extra Colors </Typography>
            <SimpleSwitch disable={true} checked={includeExtraColors} onChange={() => (setIncludeExtraColors(!includeExtraColors))} thememode={themeColor}></SimpleSwitch>
          </Box> 

          
          
      </Box>


      <Button onClick={() => randomizeTeams()} sx={{borderColor : altThemeColor,  width: "200px", margin: "auto", height: "120px", marginTop : "-60px", marginBottom : "40px", background: "hsla(0, 85%, 55%, 1)",

      background: "linear-gradient(135deg, hsla(0, 85%, 55%, 1) 0%, hsla(214, 90%, 56%, 1) 100%)",
      
      background: "-moz-linear-gradient(135deg, hsla(0, 85%, 55%, 1) 0%, hsla(214, 90%, 56%, 1) 100%)",
      
      background: "-webkit-linear-gradient(135deg, hsla(0, 85%, 55%, 1) 0%, hsla(214, 90%, 56%, 1) 100%)",
      
      color : themeColor, borderWidth : "2px", borderStyle : "solid", borderColor: "black"}}>
        <QuestionMarkIcon sx={{width : "80px", height : "80px"}}></QuestionMarkIcon>
      </Button>


      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <PlayerDisplay playerName={playerOne} playerColor={playerColors[0]} 
                       setPlayerName={setPlayerOne} playerTotal={total[0]}
                       changeOneTotal={changeOneTotal} loading={loading} playerId={0}
                       playerCharacter={playerCharacters[0]} randomizeCharacters={randomizeCharacters}/>

        <PlayerDisplay playerName={playerTwo} playerColor={playerColors[1]} 
                       setPlayerName={setPlayerTwo} playerTotal={total[1]}
                       changeOneTotal={changeOneTotal} loading={loading} playerId={1} 
                       playerCharacter={playerCharacters[1]} randomizeCharacters={randomizeCharacters}/>

        <PlayerDisplay playerName={playerThree} playerColor={playerColors[2]} 
                       setPlayerName={setPlayerThree} playerTotal={total[2]}
                       changeOneTotal={changeOneTotal} loading={loading} playerId={2} 
                       playerCharacter={playerCharacters[2]} randomizeCharacters={randomizeCharacters}/>

        <PlayerDisplay playerName={playerFour} playerColor={playerColors[3]} 
                       setPlayerName={setPlayerFour} playerTotal={total[3]}
                       changeOneTotal={changeOneTotal} loading={loading} playerId={3}
                       playerCharacter={playerCharacters[3]} randomizeCharacters={randomizeCharacters} />

        



      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt : "32px", alignItems : "center", mb : "150px"}}>

        <Button onClick={() => (updateTotal(red))} sx={{
          "&:hover": {
            backgroundColor: redTwo,
          }, background: redOne, color: altThemeColor, width: "150px", height: "120px", mt: "16px", WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : altThemeColor, fontWeight : "bold", fontSize : 24, boxShadow : matchStatus == RED_WIN ? `0 0 100px ${red} ` : " "
        }}>Red Win</Button>

        <Typography sx={{width : "290px", minWidth : "200px", color: altThemeColor, WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : altThemeColor, fontWeight : "bold", textAlign : "center", paddingTop : "20px"}} fontSize={32}> GAME {history.length}</Typography>
        <Button onClick={() => (updateTotal(blue))} sx={{
          "&:hover": {
            backgroundColor: blueTwo,
          }, background: blueOne, color: altThemeColor, width: "150px", height: "120px", mt: "16px", WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : altThemeColor, fontWeight : "bold", fontSize : 24 , boxShadow : matchStatus == BLUE_WIN ? `0 0 100px ${blue} ` : " ", 
        }}>Blue Win</Button>

      </Box>


      <Box> 
        <Button onClick={() => (resetAll())} sx={{position : "absolute", color : altThemeColor, border: "solid", width : "200px", paddingBottom : "20px", paddingTop : "20px", bottom : 10, fontSize : 24, WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : altThemeColor, fontWeight : "bold",  background : themeColor}}>Reset All</Button>
      </Box>


      <Box sx={{display : "flex", justifyContent : "center"}}>
        <Button onClick={() => (undo())} sx={{position : "absolute", color : altThemeColor, border: "solid", minWidth : "200px", paddingBottom : "20px", paddingTop : "20px", bottom : 10, ml: "250px", fontSize : 24, WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : altThemeColor, fontWeight : "bold",  background : themeColor}}>Undo</Button>
        <Button onClick={() => (setMatchHistoryOpen(true))} sx={{position : "absolute", color : altThemeColor, border: "solid", minWidth : "200px", paddingBottom : "20px", paddingTop : "20px", bottom : 10, mr: "250px", fontSize : 24, WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : altThemeColor, fontWeight : "bold", background : themeColor}}>Match History</Button>
      </Box>    
      
      <MatchHistory characterHistory={characterHistory} background={themeColor} history={history} open={matchHistoryOpen} handleClose={handleMatchHistoryClose}/>

    </Box>
  );
}
