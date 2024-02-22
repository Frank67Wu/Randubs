'use client'

import { Box, TextField, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { MatchHistory } from "./components/MatchHistory";


export default function Home() {

  const red = "#F52E2E"
  const blue = "#5464FF"
  const purple = 	"#FFD6D7"

  const [playerOne, setPlayerOne] = useState("Player One")
  const [playerTwo, setPlayerTwo] = useState("Player Two")
  const [playerThree, setPlayerThree] = useState("Player Three")
  const [playerFour, setPlayerFour] = useState("Player Four")
  const [matchAmount, setMatchAmount] = useState(1)
  const [playerColors, setPlayerColors] = useState([red, red, blue, blue])
  const [total, setTotal] = useState(["0", "0", "0", "0"])
  const [loading, setLoading] = useState(false)
  const [cachingFinished, setCachingFinished] = useState(false)
  const [history, setHistory] = useState([])
  const [histAlt, setHistAlt] = useState([])

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

    setMatchAmount(localStorage.getItem("matchAmount") || 1) 

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
    setLoading(true)
    let colors = [red, red, red, red]

    let indexOne = Math.floor(Math.random() * (4))
    let indexTwo = (Math.floor(Math.random() * (3)) + 1 + indexOne) % 4

    colors[indexOne] = blue
    colors[indexTwo] = blue

    setPlayerColors(colors)


    setTimeout(() => {
      setLoading(false)
    }, 900)

    return
  }

  const resetAll = () => {
    localStorage.clear()
    location.reload();
  }

  const updateTotal = (winner) => {
    const players = [playerOne, playerTwo, playerThree, playerFour]
    let hist = []
    let alt = []
    let newTotal = []
    for (let i = 0; i < 4; i++) {
      if (playerColors[i] == winner) {
        newTotal.push(parseInt(total[i]) + matchAmount)
        alt[i] = 1
      }
      else {
        newTotal.push(parseInt(total[i]) - matchAmount)
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
    console.log(matchAmount)

    setHistory((oldhist) => [...oldhist, hist])
    setTotal(newTotal)
    setHistAlt((oldAlt) => [...oldAlt, alt])

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
      }
      else {
        tempTotal[i]  = parseInt(total[i]) + lastMatch[4]
      }
    }
    console.log(tempTotal)
    setTotal(tempTotal)
    setHistAlt((prev) => (prev.slice(0, -1)))
  }
  }

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", mt : "16px"}}>
        <Typography variant="h6">Set Money Per Game : </Typography>
        <TextField size="small" sx={{
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
          },
          "& input[type=number]": {
            MozAppearance: "textfield",
          }, width : "40px", mt : "-4px", ml : "8px"
        }} type="number" value={matchAmount} onChange={(e) => setMatchAmount(parseInt(e.target.value))}>{matchAmount}</TextField>
      </Box>


      <Button onClick={() => randomizeTeams()} sx={{ border: "solid", width: "8%", margin: "auto", height: "70px", mb : "64px"}}>
        <QuestionMarkIcon></QuestionMarkIcon>
      </Button>


      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column", ml: "8px", mr: "8px" }}>
          <TextField
            sx={{
              backgroundColor: playerColors[0] == blue ? loading ? purple : blue : loading ? purple : red,
              transition: "all 1s ease",
              WebkitTransition: "all 1s ease",
              MozTransition: "all 1s ease"
            }}
            value={playerOne}
            onChange={(e) => (setPlayerOne(e.target.value))}
            InputProps={{
              inputProps: {
                style: { textAlign: "center" },
              }
            }} />
          <Box sx={{
            height: "170px", marginTop: "16px", borderRadius: "5px", background: playerColors[0], display: "flex", justifyContent: "center", alignItems: "center",
            backgroundColor: playerColors[0] == blue ? loading ? purple : blue : loading ? purple : red,
            transition: "all 1s ease",
            WebkitTransition: "all 1s ease",
            MozTransition: "all 1s ease"
          }}>
          <TextField size="small" sx={{  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
          },
          "& input[type=number]": {
            MozAppearance: "textfield",
          }, width : "200px", height : "100px", zIndex : 100,
           }} variant="standard"
           inputProps={{style: { textAlign: 'center' }}}
           InputProps={{disableUnderline: true, style: {fontSize: 80 }}} type="number" value={total[0]} onChange={(e) => changeOneTotal(0, e.target.value)}>{total[0]}</TextField>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", ml: "8px", mr: "8px" }}>
          <TextField
            sx={{
              backgroundColor: playerColors[1] == blue ? loading ? purple : blue : loading ? purple : red,
              transition: "all 1s ease",
              WebkitTransition: "all 1s ease",
              MozTransition: "all 1s ease"
            }}
            value={playerTwo}
            onChange={(e) => (setPlayerTwo(e.target.value))}
            InputProps={{
              inputProps: {
                style: { textAlign: "center" },
              }
            }} />
          <Box sx={{
            height: "170px", marginTop: "16px", borderRadius: "5px", background: playerColors[1], display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: playerColors[1] == blue ? loading ? purple : blue : loading ? purple : red,
            transition: "all 1s ease",
            WebkitTransition: "all 1s ease",
            MozTransition: "all 1s ease"
          }}>
          <TextField size="small" sx={{  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
          },
          "& input[type=number]": {
            MozAppearance: "textfield",
          }, width : "200px", height : "100px", zIndex : 100,
           }} variant="standard"
           inputProps={{style: { textAlign: 'center' }}}
           InputProps={{disableUnderline: true, style: {fontSize: 80 }}} type="number" value={total[1]} onChange={(e) => changeOneTotal(1, e.target.value)}>{total[1]}</TextField>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", ml: "8px", mr: "8px" }}>
          <TextField
            sx={{
              backgroundColor: playerColors[2] == blue ? loading ? purple : blue : loading ? purple : red,
              transition: "all 1s ease",
              WebkitTransition: "all 1s ease",
              MozTransition: "all 1s ease"
            }}
            value={playerThree}
            onChange={(e) => (setPlayerThree(e.target.value))}
            InputProps={{
              inputProps: {
                style: { textAlign: "center" },
              }
            }} />
          <Box sx={{
            height: "170px", marginTop: "16px", borderRadius: "5px", background: playerColors[2], display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: playerColors[2] == blue ? loading ? purple : blue : loading ? purple : red,
            transition: "all 1s ease",
            WebkitTransition: "all 1s ease",
            MozTransition: "all 1s ease"
          }}>
          <TextField size="small" sx={{  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
          },
          "& input[type=number]": {
            MozAppearance: "textfield",
          }, width : "200px", height : "100px", zIndex : 100,
           }} variant="standard"
           inputProps={{style: { textAlign: 'center' }}}
           InputProps={{disableUnderline: true, style: {fontSize: 80 }}} type="number" value={total[2]} onChange={(e) => changeOneTotal(2, e.target.value)}>{total[2]}</TextField>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", ml: "8px", mr: "8px" }}>
          <TextField
            sx={{
              backgroundColor: playerColors[3] == blue ? loading ? purple : blue : loading ? purple : red,
              transition: "all 1s ease",
              WebkitTransition: "all 1s ease",
              MozTransition: "all 1s ease"
            }}
            value={playerFour}
            onChange={(e) => (setPlayerFour(e.target.value))}
            InputProps={{
              inputProps: {
                style: { textAlign: "center" },
              }
            }} />
          <Box sx={{
            height: "170px", marginTop: "16px", borderRadius: "5px", background: playerColors[3], display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: playerColors[3] == blue ? loading ? purple : blue : loading ? purple : red,
            transition: "all 1s ease",
            WebkitTransition: "all 1s ease",
            MozTransition: "all 1s ease"
          }}>
          <TextField size="small" sx={{  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
          },
          "& input[type=number]": {
            MozAppearance: "textfield",
          }, width : "200px", height : "100px", zIndex : 100,
           }} variant="standard"
           inputProps={{style: { textAlign: 'center' }}}
           InputProps={{disableUnderline: true, style: {fontSize: 80 }}} type="number" value={total[3]} onChange={(e) => changeOneTotal(3, e.target.value)}>{total[3]}</TextField>
          </Box>
        </Box>



      </Box>


      <Box sx={{ display: "flex", justifyContent: "center" }}>

        <Button onClick={() => (updateTotal(red))} sx={{
          "&:hover": {
            backgroundColor: red,
          }, background: red, color: "black", width: "150px", height: "120px", mr: "8px", mt: "16px"
        }}>Red Win</Button>
        <Button onClick={() => (updateTotal(blue))} sx={{
          "&:hover": {
            backgroundColor: blue,
          }, background: blue, color: "black", width: "150px", height: "120px", ml: "8px", mt: "16px"
        }}>Blue Win</Button>

      </Box>


      <Box> 
        <Button onClick={() => (resetAll())} sx={{color : "black", border: "solid", bottom : 10, position : "fixed", width : "200px", paddingBottom : "20px", paddingTop : "20px"}}>Reset All</Button>
      </Box>


      <Box sx={{display : "flex", justifyContent : "center"}}>
        <Button onClick={() => (undo())} sx={{color : "black", border: "solid", minWidth : "200px", paddingBottom : "20px", paddingTop : "20px", mt : "64px", mr : "16px"}}>Undo</Button>
        <Button onClick={() => (setMatchHistoryOpen(true))} sx={{color : "black", border: "solid", minWidth : "200px", paddingBottom : "20px", paddingTop : "20px", mt : "64px" , ml: "16px"}}>Match History</Button>
      </Box>      

      <MatchHistory history={history} open={matchHistoryOpen} handleClose={handleMatchHistoryClose}/>

    </Box>
  );
}
