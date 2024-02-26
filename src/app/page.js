'use client'

import { Box, TextField, Typography, Button, Container, ToggleButton } from "@mui/material";
import { useState, useEffect, useLayoutEffect } from "react";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { MatchHistory } from "./components/MatchHistory";
import { PlayerDisplay } from "./components/PlayerDisplay";
import SettingsIcon from '@mui/icons-material/Settings';
import ThemeSwitch from "./components/ThemeSwitch";
import SimpleSwitch from "./components/SimpleSwitch";
import { smashCodeNames } from "./const/smashCodeNames";
import { MyToggleButton } from "./components/MyToggleButton";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import UndoIcon from '@mui/icons-material/Undo';
import HistoryIcon from '@mui/icons-material/History';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ConfirmationDialog } from "./components/ConfirmationDialog";
import FeedbackIcon from '@mui/icons-material/Feedback';
import Link from 'next/link'; 
import { ColorToggle } from "./components/ColorToggle";




export default function Home() {

  const IN_PROGRESS = "IN PROGRESS"
  const COLOR_ONE_WIN = "COLOR_ONE_WIN"
  const COLOR_TWO_WIN = "COLOR_TWO_WIN"

  const reds = ["#EE2C2B", "#F3625A", "#E49080"]
  const blues = ["#2980F4", "#39A2F6", "#4AB2E3"]
  const yellows = ["#FEB810", "#FCD417", "#FBE218"]
  const greens = ["#22AB42", "#35CD5F", "#43E47A"]

  const [playerOne, setPlayerOne] = useState("")
  const [playerTwo, setPlayerTwo] = useState("")
  const [playerThree, setPlayerThree] = useState("")
  const [playerFour, setPlayerFour] = useState("")
  const [matchAmount, setMatchAmount] = useState(1)

  const [total, setTotal] = useState(["", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [cachingFinished, setCachingFinished] = useState(false)
  const [history, setHistory] = useState([])
  const [histAlt, setHistAlt] = useState([])
  const [matchStatus, setMatchStatus] = useState(IN_PROGRESS)
  const [histColors, setHistColors] = useState([])
  const [loadingTime, setLoadingTime] = useState(1)
  const [includeMiis, setIncludeMiis] = useState(true)
  const [cols, setCols] = useState(["RED", "BLUE"])
  const [colorOne, setColorOne] = useState(reds)
  const [colorTwo, setColorTwo] = useState(blues)
  const [playerColors, setPlayerColors] = useState([colorOne[0], colorOne[0], colorTwo[0], colorTwo[0]])

  const [characterHistory, setCharacterHistory] = useState([])
  const [confirmResetOpen, setConfirmResetOpen] = useState(false)

  const [settingsOpen, setSettingsOpen] = useState(false)

  const [randomizeCharacters, setRandomizeCharacters] = useState(false)
  const [includeExtraColors, setIncludeExtraColors] = useState(false)

  const [themeColor, setThemeColor] = useState("black")
  const [altThemeColor, setAltThemeColor] = useState("white")

  const [matchHistoryOpen, setMatchHistoryOpen] = useState(false)
  const [playerCharacters, setPlayerCharacters] = useState(["", "", "", ""])


  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  const [screenWidth, screenHeight] = useWindowSize()

  const handleMatchHistoryClose = () => {
    setMatchHistoryOpen(false)
  }

  const handleConfirmResetClose = () => {
    setConfirmResetOpen(false)
  }

  useEffect(() => {
    if (!cachingFinished) {
      const prev1 = localStorage.getItem("p1total") || "0"
      const prev2 = localStorage.getItem("p2total") || "0"
      const prev3 = localStorage.getItem("p3total") || "0"
      const prev4 = localStorage.getItem("p4total") || "0"

      setThemeColor(localStorage.getItem("theme") || "black")
      setAltThemeColor(localStorage.getItem("altTheme") || "white")
      setRandomizeCharacters(localStorage.getItem("randomize") == "true" ? true : false)
      setLoadingTime(localStorage.getItem("loadingTime") || 1)
      setIncludeMiis(localStorage.getItem("includeMiis") == "false" ? false : true)
      setCols([localStorage.getItem("colOne") || "RED", localStorage.getItem("colTwo") || "BLUE"])

      const c1 = localStorage.getItem("colOne") || "RED"
      const c2 = localStorage.getItem("colTwo") || "BLUE"

      const colOne = c1 == "RED" ? reds : c1 == "BLUE" ? blues : c1 == "GREEN" ? greens : yellows
      const colTwo = c2 == "RED" ? reds : c2 == "BLUE" ? blues : c2 == "GREEN" ? greens : yellows

      setColorOne(colOne)
      setColorTwo(colTwo)

      setPlayerColors([colOne[0], colOne[0], colTwo[0], colTwo[0]])

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
      localStorage.setItem("randomize", randomizeCharacters)
    }
  }, [randomizeCharacters])

  useEffect(() => {
    if (cachingFinished) {
      localStorage.setItem("loadingTime", loadingTime)
    }
  }, [loadingTime])

  useEffect(() => {
    if (cachingFinished) {
      localStorage.setItem("theme", themeColor)
      localStorage.setItem("altTheme", altThemeColor)
    }
  }, [themeColor])

  useEffect(() => {
    if (cachingFinished) {
      localStorage.setItem("includeMiis", includeMiis)
    }
  }, [includeMiis])

  useEffect(() => {
    if (cachingFinished) {
      setColorOne(cols[0] == "RED" ? reds : cols[0] == "BLUE" ? blues : cols[0] == "GREEN" ? greens : yellows)
      setColorTwo(cols[1] == "RED" ? reds : cols[1] == "BLUE" ? blues : cols[1] == "GREEN" ? greens : yellows)
      localStorage.setItem("colOne", cols[0])
      localStorage.setItem("colTwo", cols[1])
    }
  }, [cols])

  const changeLoadingTime = (e, newAlignment) => {
    setLoadingTime(newAlignment);
  };

  const changeColors = (e, newAlignment) => {
    if (newAlignment == cols[0] || newAlignment == cols[1]) {
      return 0
    }
    setCols((prev) => ([prev[1] , newAlignment]))
  }

  const randomizeTeams = () => {

    setLoading(true)

    if (randomizeCharacters) {
      randomizeChars()
    }

    let colors = [colorOne[0], colorOne[0], colorOne[0], colorOne[0]]

    let indexOne = Math.floor(Math.random() * (4))
    let indexTwo = (Math.floor(Math.random() * (3)) + 1 + indexOne) % 4

    colors[indexOne] = colorTwo[0]
    colors[indexTwo] = colorTwo[0]

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
    if (winner == colorOne[0]) {
      setMatchStatus(COLOR_ONE_WIN)
    }
    else {
      setMatchStatus(COLOR_TWO_WIN)
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

      if (playerColors[i] == colorOne[0]) {
        hist.unshift(players[i])
      }
      else {
        hist.push(players[i])
      }
    }

    if (winner == colorOne[0]) {
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
    for (let i = 0; i < 4; i++) {
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
          tempTotal[i] = parseInt(total[i]) + lastMatch[4]
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
    let index = 0
    if (!includeMiis) {
      index = Math.floor(Math.random() * (smashCodeNames.length - 3)) + 3;
    }
    else {
      index = Math.floor(Math.random() * smashCodeNames.length);
    }
    let name = ""
    if (smashCodeNames[index].length == 1) {
      name = smashCodeNames[index][0]
    }
    else {
      const secondIndex = Math.floor(Math.random() * smashCodeNames[index].length);
      name = smashCodeNames[index][secondIndex]
    }

    if (index < 3) {
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
    setPlayerCharacters(chars)
  }

  const confirmReset = (choice) => {
    if (choice == "YES") {
      resetAll()
    }
    else if (choice == "NO") {
      setConfirmResetOpen(false)
    }
  }



  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", ml: "4px", flexWrap: "wrap", height: "100px" }}>
        <AttachMoneyIcon sx={{ width: "60px", height: "60px" , mt: "-4px", mt : "10px" }}></AttachMoneyIcon>
        <TextField size="small" sx={{
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
          },
          "& input[type=number]": {
            MozAppearance: "textfield",
          }, width: "60px", ml: "8px", mt : "12px"
        }} inputProps={{ style: { fontSize: 30, paddingLeft: 0, paddingRight: 0, color: altThemeColor, fontWeight: "bold", textAlign: "center" } }} type="number" value={matchAmount} onChange={(e) => setMatchAmount(parseInt(e.target.value))}>{matchAmount}</TextField>

      </Box>

      <Button onClick={() => (setSettingsOpen(!settingsOpen))} sx={{ position: "absolute", right: 10, top: 10, background: themeColor, borderRadius: "15px", border: "2px solid white", padding : screenWidth > 900 ? "10px 10px 10px 10px" : "15px 0px 15px 0px", zIndex : 101}}>
        <SettingsIcon sx={{ width: screenWidth > 900 ? "60px" : "30px", height: screenWidth > 900 ? "60px" : "30px", color: altThemeColor,}} />
      </Button>

      <Box sx={{
        position: "absolute", minHeight: settingsOpen ? "60%" : "0px", height: settingsOpen ? "70%" : "0px", width: "420px", minWidth:
          "400px", background: themeColor, zIndex: 100, borderRadius: "15px", border: settingsOpen ? `3px solid ${altThemeColor}` : `0px solid ${altThemeColor}`, display: "flex", flexDirection: "column", overflow: "hidden", transition: "all 0.3s ease-out", right: 0,
      }}>

        <Box sx={{ display: "flex", mb : "16px" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: 44, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, ml: "24px", mt: "24px" }} variant="h6"> Settings </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: 24, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, ml: "24px", mt: "16px" }} variant="h6"> Theme </Typography>
          <ThemeSwitch onChange={() => (themeSwitch())} thememode={themeColor}></ThemeSwitch>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: 24, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, ml: "24px", mt: "16px" }} variant="h6"> Randomize Characters </Typography>
          <SimpleSwitch ml={"20px"} disable={false} checked={randomizeCharacters} onChange={() => (setRandomizeCharacters(!randomizeCharacters))} thememode={themeColor}></SimpleSwitch>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: 24, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, ml: "24px", mt: "24px" }} variant="h6"> Loading Time </Typography>
          <MyToggleButton theme={themeColor} alignment={loadingTime} handleAlignment={changeLoadingTime}></MyToggleButton>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: 24, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, ml: "24px", mt: "16px" }} variant="h6"> Include Miis </Typography>
          <SimpleSwitch ml={"144px"} disable={false} checked={includeMiis} onChange={() => (setIncludeMiis(!includeMiis))} thememode={themeColor}></SimpleSwitch>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: 24, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, ml: "24px", mt: "24px" }} variant="h6"> Colors </Typography>
          <ColorToggle theme={themeColor} alignment={cols} handleAlignment={changeColors}></ColorToggle>
        </Box>

        <Box sx={{ display: "flex", }}>
          <Typography sx={{ fontWeight: "bold", fontSize: 24, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, ml: "24px", mt: "16px", opacity: 0 }} variant="h6"> Extra Colors </Typography>
          <SimpleSwitch disable={true} checked={includeExtraColors} onChange={() => (setIncludeExtraColors(!includeExtraColors))} thememode={themeColor}></SimpleSwitch>
        </Box>



      </Box>


      <Button onClick={() => randomizeTeams()} sx={{
        display: "flex", borderColor: altThemeColor, width: "12%", minWidth: "150px", margin: "auto", height: "120px", marginTop: "-100px", marginBottom: "40px", background: "hsla(0, 85%, 55%, 1)",

        background: "linear-gradient(135deg, hsla(0, 85%, 55%, 1) 0%, hsla(214, 90%, 56%, 1) 100%)",

        background: "-moz-linear-gradient(135deg, hsla(0, 85%, 55%, 1) 0%, hsla(214, 90%, 56%, 1) 100%)",

        background: "-webkit-linear-gradient(135deg, hsla(0, 85%, 55%, 1) 0%, hsla(214, 90%, 56%, 1) 100%)",

        color: themeColor, borderWidth: "2px", borderStyle: "solid", borderColor: "black"
      }}>
        <QuestionMarkIcon sx={{ width: "80px", height: "80px" }}></QuestionMarkIcon>
      </Button>


      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>

        <Box sx={{ display: "flex" }}>
          <PlayerDisplay playerName={playerOne} playerColor={playerColors[0]}
            setPlayerName={setPlayerOne} playerTotal={total[0]}
            changeOneTotal={changeOneTotal} loading={loading} playerId={0}
            playerCharacter={playerCharacters[0]} randomizeCharacters={randomizeCharacters}
            otherColor={playerColors[0] == colorOne[0] ? colorTwo[0] : colorOne[0]}
          />

          <PlayerDisplay playerName={playerTwo} playerColor={playerColors[1]}
            setPlayerName={setPlayerTwo} playerTotal={total[1]}
            changeOneTotal={changeOneTotal} loading={loading} playerId={1}
            playerCharacter={playerCharacters[1]} randomizeCharacters={randomizeCharacters}
            otherColor={playerColors[1] == colorOne[0] ? colorTwo[0] : colorOne[0]} />

        </Box>

        <Box sx={{ display: "flex" }}>

          <PlayerDisplay playerName={playerThree} playerColor={playerColors[2]}
            setPlayerName={setPlayerThree} playerTotal={total[2]}
            changeOneTotal={changeOneTotal} loading={loading} playerId={2}
            playerCharacter={playerCharacters[2]} randomizeCharacters={randomizeCharacters}
            otherColor={playerColors[2] == colorOne[0] ? colorTwo[0] : colorOne[0]} />

          <PlayerDisplay playerName={playerFour} playerColor={playerColors[3]}
            setPlayerName={setPlayerFour} playerTotal={total[3]}
            changeOneTotal={changeOneTotal} loading={loading} playerId={3}
            playerCharacter={playerCharacters[3]} randomizeCharacters={randomizeCharacters}
            otherColor={playerColors[3] == colorOne[0] ? colorTwo[0] : colorOne[0]} />


        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: "32px", alignItems: "center", mb: "150px" }}>

        <Button onClick={() => (updateTotal(colorOne[0]))} sx={{
          "&:hover": {
            backgroundColor: colorOne[1],
          }, background: colorOne[0], color: altThemeColor, width : screenWidth > 900 ? "200px" : "150px", height: "120px", mt: "16px", WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, fontWeight: "bold", fontSize: 24, boxShadow: matchStatus == COLOR_ONE_WIN ? `0 0 100px ${colorOne[0]} ` : " "
        }}>{cols[0]} Win</Button> 

        <Typography sx={{ width: "200px", minWidth: "200px", color: altThemeColor, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, fontWeight: "bold", textAlign: "center", paddingTop: "20px" }} fontSize={32}> GAME {history.length}</Typography>

        <Button onClick={() => (updateTotal(colorTwo[0]))} sx={{
          "&:hover": {
            backgroundColor: colorTwo[1],
          }, background: colorTwo[0], color: altThemeColor, width : screenWidth > 900 ? "200px" : "150px", height: "120px", mt: "16px", WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, fontWeight: "bold", fontSize: 24, boxShadow: matchStatus == COLOR_TWO_WIN ? `0 0 100px ${colorTwo[0]} ` : " ",
        }}>{cols[1]} Win</Button>

      </Box>


      <Box>
        <Button onClick={() => (setConfirmResetOpen(true))} sx={{ position: "absolute", color: altThemeColor, border: "solid", minWidth: screenWidth > 900 ? "200px" : "50px", padding: screenWidth > 900 ? "20px 0px 20px 0px" : "20px 20px 20px 20px", bottom: 10, fontSize: 24, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, fontWeight: "bold", background: themeColor }}>
          {screenWidth > 900 ? "Reset All" : <RestartAltIcon sx={{ width: "40px", height: "40px" }}></RestartAltIcon>}</Button>
      </Box>


      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => (undo())} sx={{ position: "absolute", color: altThemeColor, border: "solid", minWidth: screenWidth > 900 ? "200px" : "50px", padding: screenWidth > 900 ? "20px 0px 20px 0px" : "20px 20px 20px 20px", bottom: 10, ml: "25%", fontSize: 24, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, fontWeight: "bold", background: themeColor }}>
          {screenWidth > 900 ? "Undo" : <UndoIcon sx={{ width: "40px", height: "40px" }}></UndoIcon>}
        </Button>
        <Button onClick={() => (setMatchHistoryOpen(true))} sx={{ position: "absolute", color: altThemeColor, border: "solid", minWidth: screenWidth > 900 ? "200px" : "50px", padding: screenWidth > 900 ? "20px 0px 20px 0px" : "20px 20px 20px 20px", bottom: 10, mr: "25%", fontSize: 24, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, fontWeight: "bold", background: themeColor }}>
          {screenWidth > 900 ? "Match History" : <HistoryIcon sx={{ width: "40px", height: "40px" }}></HistoryIcon>}


        </Button>
      </Box>


      <Link href="https://forms.gle/TmG5wPV442KwRhRe8" passHref={true}>
      <Box>
      <Button sx={{ position: "absolute", color: altThemeColor, border: "solid", minWidth: screenWidth > 900 ? "200px" : "50px", padding: screenWidth > 900 ? "20px 0px 20px 0px" : "20px 20px 20px 20px", bottom: 10, right: 0, fontSize: 24, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, fontWeight: "bold", background: themeColor }}>
        {screenWidth > 900 ? "Feedback" : <FeedbackIcon sx={{ width: "40px", height: "40px" }}></FeedbackIcon>}</Button>
    </Box>
      </Link>

      <MatchHistory characterHistory={characterHistory} background={themeColor} history={history} open={matchHistoryOpen} handleClose={handleMatchHistoryClose} />

      <ConfirmationDialog open={confirmResetOpen} background={themeColor} handleClose={handleConfirmResetClose} onClick={confirmReset}></ConfirmationDialog>

    </Box>
  );
}
