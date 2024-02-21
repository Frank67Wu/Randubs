'use client'

import { Box, TextField, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


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

  useEffect(() => {
    const previousTotal = [localStorage.getItem("p1total"), localStorage.getItem("p2total"), localStorage.getItem("p3total"), localStorage.getItem("p4total")]

    if (previousTotal[0] !== 'null') {
      setTotal(previousTotal)
    }

    setPlayerOne(localStorage.getItem("p1") || "Player One")
    setPlayerOne(localStorage.getItem("p2") || "Player Two")
    setPlayerOne(localStorage.getItem("p3") || "Player Three")
    setPlayerOne(localStorage.getItem("p4") || "Player Four")

    setMatchAmount(localStorage.getItem("matchAmount") || 1) 

    setCachingFinished(true)
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
    localStorage.setItem("p1total", total[0])
    localStorage.setItem("p2total", total[1])
    localStorage.setItem("p3total", total[2])
    localStorage.setItem("p4total", total[3])
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
    }, 1300)

    return
  }

  const resetAll = () => {
    localStorage.clear()
    location.reload();
  }

  const updateTotal = (winner) => {
    console.log("ASDFASDF")
    let newTotal = []
    for (let i = 0; i < 4; i++) {
      console.log(playerColors[i] == winner)
      if (playerColors[i] == winner) {
        newTotal.push(parseInt(total[i]) + matchAmount)
        console.log(parseInt(total[i]), matchAmount)
      }
      else {
        newTotal.push(parseInt(total[i]) - matchAmount)
      }
    }

    console.log(newTotal)
    setTotal(newTotal)

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
            <Typography variant="h2">{total[0]}</Typography>
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
            <Typography variant="h2">{total[1]}</Typography>
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
            <Typography variant="h2">{total[2]}</Typography>
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
            <Typography variant="h2">{total[3]}</Typography>
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

    </Box>
  );
}
