'use client'

import { Box, TextField, Typography, Button, Container } from "@mui/material";
import { useState, useEffect } from "react";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { MatchHistory } from "./components/MatchHistory";
import { PlayerDisplay } from "./components/PlayerDisplay";



export default function Home() {

  const IN_PROGRESS = "IN PROGRESS"
  const BLUE_WIN  = "BLUE_WIN"
  const RED_WIN = "RED_WIN"

  const red = "#b20100"
  const blue = "#0040ca"
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
  const [total, setTotal] = useState([null, null, null, null])
  const [loading, setLoading] = useState(false)
  const [cachingFinished, setCachingFinished] = useState(false)
  const [history, setHistory] = useState([])
  const [histAlt, setHistAlt] = useState([])
  const [matchStatus, setMatchStatus] = useState(IN_PROGRESS)
  const [histColors, setHistColors] = useState([])

  const [themeColor, setThemeColor] = useState("black")
  const [altThemeColor, setAltThemeColor] = useState("white")

  const [matchHistoryOpen, setMatchHistoryOpen] = useState(false)

  const handleMatchHistoryClose = () => {
    setMatchHistoryOpen(false)
  }

  useEffect(() => {
    if (!cachingFinished) {
    const prev1 = localStorage.getItem("p1total") || "0"
    const prev2 = localStorage.getItem("p2total") || "0"
    const prev3 = localStorage.getItem("p3total") || "0"
    const prev4 = localStorage.getItem("p4total") || "0"

    
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



  const randomizeTeams = () => {

    let colors = [red, red, red, red]

    let indexOne = Math.floor(Math.random() * (4))
    let indexTwo = (Math.floor(Math.random() * (3)) + 1 + indexOne) % 4

    colors[indexOne] = blue
    colors[indexTwo] = blue

    setPlayerColors(colors)

    setMatchStatus(IN_PROGRESS)


    return
  }

  const resetAll = () => {
    localStorage.clear()
    location.reload();
  }

  const updateTotal = (winner) => {
    if (winner == red) {
      setMatchStatus(RED_WIN)
    }
    else {
      setMatchStatus(BLUE_WIN)
    }
    const players = [playerOne, playerTwo, playerThree, playerFour]
    let hist = []
    let alt = []
    let newTotal = []
    let histCol = []
    for (let i = 0; i < 4; i++) {
      if (playerColors[i] == winner) {
        newTotal.push(parseInt(total[i]) + parseInt(matchAmount))
        alt[i] = 1
        console.log(1)
      }
      else {
        newTotal.push(parseInt(total[i]) - parseInt(matchAmount))
        alt[i] = 0
        console.log(2)
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
    console.log(histAlt)
    if (histAlt.length > 0) {
    const lastMatch = histAlt[histAlt.length - 1]
    const tempTotal = []

    for (let i = 0; i < 4; i++) {
      if (lastMatch[i] == 1) {
        tempTotal[i] = parseInt(total[i]) - lastMatch[4]
        console.log(parseInt(total[i]), lastMatch[4])
      }
      else {
        tempTotal[i]  = parseInt(total[i]) + lastMatch[4]
      }

      
    }

    if (histColors.length > 1) {
  
    setPlayerColors(histColors[histColors.length - 1])
    setHistColors((prev) => (prev.slice(0, -1)))

    }

    setTotal(tempTotal)
    setHistAlt((prev) => (prev.slice(0, -1)))
  }
  }

  return (
    <Box sx={{ height: "100vh", minHeight : "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", mt : "16px"}}>
        <Typography fontSize={30} sx={{color : altThemeColor, WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : altThemeColor, fontWeight : "bold"}} variant="h6" >Set Money Per Game : </Typography>
        <TextField size="small" sx={{
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
          },
          "& input[type=number]": {
            MozAppearance: "textfield",
          }, width : "60px", mt : "-4px", ml : "8px",
        }}inputProps={{style: {fontSize: 30, paddingLeft : "20px", color : altThemeColor, fontWeight: "bold"}}}  type="number" value={matchAmount} onChange={(e) => setMatchAmount(parseInt(e.target.value))}>{matchAmount}</TextField>
      </Box>


      <Button onClick={() => randomizeTeams()} sx={{borderColor : altThemeColor,  width: "200px", margin: "auto", height: "120px", marginTop : "20px", marginBottom : "40px", background: "hsla(0, 85%, 55%, 1)",

      background: "linear-gradient(135deg, hsla(0, 85%, 55%, 1) 0%, hsla(214, 90%, 56%, 1) 100%)",
      
      background: "-moz-linear-gradient(135deg, hsla(0, 85%, 55%, 1) 0%, hsla(214, 90%, 56%, 1) 100%)",
      
      background: "-webkit-linear-gradient(135deg, hsla(0, 85%, 55%, 1) 0%, hsla(214, 90%, 56%, 1) 100%)",
      
      color : themeColor}}>
        <QuestionMarkIcon></QuestionMarkIcon>
      </Button>


      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <PlayerDisplay playerName={playerOne} playerColor={playerColors[0]} 
                       setPlayerName={setPlayerOne} playerTotal={total[0]}
                       changeOneTotal={changeOneTotal} loading={loading} playerId={0} />

        <PlayerDisplay playerName={playerTwo} playerColor={playerColors[1]} 
                       setPlayerName={setPlayerTwo} playerTotal={total[1]}
                       changeOneTotal={changeOneTotal} loading={loading} playerId={1} />

        <PlayerDisplay playerName={playerThree} playerColor={playerColors[2]} 
                       setPlayerName={setPlayerThree} playerTotal={total[2]}
                       changeOneTotal={changeOneTotal} loading={loading} playerId={2} />

        <PlayerDisplay playerName={playerFour} playerColor={playerColors[3]} 
                       setPlayerName={setPlayerFour} playerTotal={total[3]}
                       changeOneTotal={changeOneTotal} loading={loading} playerId={3} />

        



      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt : "32px"}}>

        <Button onClick={() => (updateTotal(red))} sx={{
          "&:hover": {
            backgroundColor: red,
          }, background: redOne, color: "black", width: "150px", height: "120px", mr: "280px", mt: "16px", color : "white", WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : "black", fontWeight : "bold", fontSize : 24, boxShadow : `${matchStatus === BLUE_WIN ? "0 0 100px ${red}" : " "}`
        }}>Red Win</Button>
        <Button onClick={() => (updateTotal(blue))} sx={{
          "&:hover": {
            backgroundColor: blue,
          }, background: blueOne, color: "black", width: "150px", height: "120px", ml: "8px", mt: "16px",  color : "white", WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : "black", fontWeight : "bold", fontSize : 24 , boxShadow : `${matchStatus === BLUE_WIN ? "0 0 100px ${blue}" : " "}`
        }}>Blue Win</Button>

      </Box>


      <Box> 
        <Button onClick={() => (resetAll())} sx={{position : "absolute", color : altThemeColor, border: "solid", width : "200px", paddingBottom : "20px", paddingTop : "20px", bottom : 0, fontSize : 24, WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : altThemeColor, fontWeight : "bold"}}>Reset All</Button>
      </Box>


      <Box sx={{display : "flex", justifyContent : "center"}}>
        <Button onClick={() => (undo())} sx={{position : "absolute", color : altThemeColor, border: "solid", minWidth : "200px", paddingBottom : "20px", paddingTop : "20px", bottom : 0, ml: "250px", fontSize : 24, WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : altThemeColor, fontWeight : "bold"}}>Undo</Button>
        <Button onClick={() => (setMatchHistoryOpen(true))} sx={{position : "absolute", color : altThemeColor, border: "solid", minWidth : "200px", paddingBottom : "20px", paddingTop : "20px", bottom : 0, mr: "250px", fontSize : 24, WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : altThemeColor, fontWeight : "bold"}}>Match History</Button>
      </Box>      

      <MatchHistory history={history} open={matchHistoryOpen} handleClose={handleMatchHistoryClose}/>

      <Button onClick={() => ("SECRET BUTTON")} sx={{position : "absolute", color : altThemeColor, border: "solid", minWidth : "200px", paddingBottom : "20px", paddingTop : "20px", bottom : 0, right : 0, fontSize : 24, WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : altThemeColor, fontWeight : "bold", opacity : 0}}>TEST</Button>

    </Box>
  );
}
