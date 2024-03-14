// 'use client'

// import { Box, TextField, Typography, Button, Container, ToggleButton } from "@mui/material";
// import { useState, useEffect, useLayoutEffect, useContext } from "react";
// import { MatchHistory } from "../components/MatchHistory";
// import { PlayerDisplay } from "../components/PlayerDisplay";
// import SettingsIcon from '@mui/icons-material/Settings';
// import ThemeSwitch from "../components/ThemeSwitch";
// import { smashCodeNames } from "../const/smashCodeNames";
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import HistoryIcon from '@mui/icons-material/History';
// import FeedbackIcon from '@mui/icons-material/Feedback';
// import Link from 'next/link'; 
// import { socket } from "../socket";
// import { io } from "socket.io-client";

// export default function Spectate({params}) {

//   const IN_PROGRESS = "IN PROGRESS"
  
//   const reds = ["#EE2C2B", "#F3625A", "#E49080"]
//   const blues = ["#2980F4", "#39A2F6", "#4AB2E3"]
//   const yellows = ["#FEB810", "#FCD417", "#FBE218"]
//   const greens = ["#22AB42", "#35CD5F", "#43E47A"]

//   const [playerNames, setPlayerNames] = useState(["Player One", "Player Two", "Player Three", "Player Four"])
//   const [matchAmount, setMatchAmount] = useState(1)

//   const [total, setTotal] = useState(["", "", "", ""])
//   const [loading, setLoading] = useState(false)
//   const [cachingFinished, setCachingFinished] = useState(false)
//   const [history, setHistory] = useState([])
//   const [loadingTime, setLoadingTime] = useState(1)
//   const [histAlt, setHistAlt] = useState([])
//   const [matchStatus, setMatchStatus] = useState(IN_PROGRESS)
//   const [colorOne, setColorOne] = useState(reds)
//   const [colorTwo, setColorTwo] = useState(blues)
//   const [playerColors, setPlayerColors] = useState([colorOne[0], colorOne[0], colorTwo[0], colorTwo[0]])
//   const [hasInfo, setHasInfo] = useState(false)

//   const [characterHistory, setCharacterHistory] = useState([])

//   const [settingsOpen, setSettingsOpen] = useState(false)

//   const [randomizeCharacters, setRandomizeCharacters] = useState(false)

//   const [themeColor, setThemeColor] = useState("black")
//   const [altThemeColor, setAltThemeColor] = useState("white")

//   const [matchHistoryOpen, setMatchHistoryOpen] = useState(false)
//   const [playerCharacters, setPlayerCharacters] = useState(["", "", "", ""])

//   const [roomCode, setRoomCode] = useState("")

//   const socket = io('http://18.119.165.24:80')

//   useEffect(() => {
    
//     socket.emit("join room", params.roomName)

//     socket.on("join room", (roomName) => {
//       console.log(roomName)
//     })

//     if (!hasInfo) {
//         socket.emit("get info")
//         setHasInfo(true)
//     }

//     socket.on("post info", (info) => {
//         setPlayerColors(info.colors)
//         setPlayerNames(info.names)
//         setMatchAmount(info.amount)
//         setRandomizeCharacters(info.randomize)
//         setHistory(info.hist)
//         setPlayerCharacters(info.chars)
//         setTotal(info.tot)
//     })

//     socket.on("randomize colors", (colors) => {
//       setPlayerColors(colors)
//     })

//     socket.on("change name", (names) => {
//         setPlayerNames(names)
//     })

//     socket.on("change amount", (amount) => {
//         setMatchAmount(amount)
//     })

//     socket.on("randomize characters", (randomize) => {
//         setRandomizeCharacters(randomize)
//     })

//     socket.on("change total", (tot) => {
//         setTotal(tot)
//     })

//     socket.on("change loading time", (loading) => {
//         setLoadingTime(loading)
//     })

//     socket.on("change loading", (status) => {
//         setLoading(status)
//     }) 

//     socket.on("change characters", (chars) => {
//         setPlayerCharacters(chars)
//     })

//     socket.on("change history", (hist) => {
//         setHistory(hist[0])
//         setCharacterHistory(hist[1])
//     })

//   }, [])


//   function useWindowSize() {
//     const [size, setSize] = useState([0, 0]);
//     useLayoutEffect(() => {
//       function updateSize() {
//         setSize([window.innerWidth, window.innerHeight]);
//       }
//       window.addEventListener('resize', updateSize);
//       updateSize();
//       return () => window.removeEventListener('resize', updateSize);
//     }, []);
//     return size;
//   }

//   const [screenWidth, screenHeight] = useWindowSize()

//   const handleMatchHistoryClose = () => {
//     setMatchHistoryOpen(false)
//   }

//   useEffect(() => {
//     if (!cachingFinished) {

//       setThemeColor(localStorage.getItem("theme") || "black")
//       setAltThemeColor(localStorage.getItem("altTheme") || "white")
    

//       document.body.style.background = localStorage.getItem("altTheme") == "black" ? "#FFF5EE" : "#343434"
//       document.body.style.color = localStorage.getItem("altTheme") == "black" ? "black" : "white"

//       setCachingFinished(true)
//     }
//   }, [])



//   useEffect(() => {
//     if (cachingFinished) {
//       localStorage.setItem("theme", themeColor)
//       localStorage.setItem("altTheme", altThemeColor)
//     }
//   }, [themeColor])

//   const changePlayerName = () => {
//     return
//   }



//   const changeOneTotal = (player, newValue) => {
//     return
//   }

//   const themeSwitch = () => {
//     document.body.style.background = themeColor == "black" ? "#FAF9F6" : "#343434"
//     document.body.style.color = themeColor == "black" ? "black" : "white"
//     const currentTheme = themeColor
//     setThemeColor(altThemeColor)
//     setAltThemeColor(currentTheme)
//   }

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column" }}>
//       <Box sx={{ display: "flex", ml: "4px", flexWrap: "wrap", height: "100px" }}>
//         <AttachMoneyIcon sx={{ width: "60px", height: "60px" , mt: "-4px", mt : "10px" }}></AttachMoneyIcon>
//         <TextField size="small" sx={{
//           "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
//             display: "none",
//           },
//           "& input[type=number]": {
//             MozAppearance: "textfield",
//           }, width: "60px", ml: "8px", mt : "12px"
//         }} inputProps={{ style: { fontSize: 30, paddingLeft: 0, paddingRight: 0, color: altThemeColor, fontWeight: "bold", textAlign: "center" } }} type="number" value={matchAmount}>{matchAmount}</TextField>

//       </Box>

//       <Button onClick={() => (setSettingsOpen(!settingsOpen))} sx={{ position: "absolute", right: 10, top: 10, background: themeColor, borderRadius: "15px", border: "2px solid white", padding : screenWidth > 900 ? "10px 10px 10px 10px" : "15px 0px 15px 0px", zIndex : 101}}>
//         <SettingsIcon sx={{ width: screenWidth > 900 ? "60px" : "30px", height: screenWidth > 900 ? "60px" : "30px", color: altThemeColor,}} />
//       </Button>

//       <Box sx={{
//         position: "absolute", minHeight: settingsOpen ? "60%" : "0px", height: settingsOpen ? "70%" : "0px", width: "420px", minWidth:
//           "400px", background: themeColor, zIndex: 100, borderRadius: "15px", border: settingsOpen ? `3px solid ${altThemeColor}` : `0px solid ${altThemeColor}`, display: "flex", flexDirection: "column", overflow: "hidden", transition: "all 0.3s ease-out", right: 0,
//       }}>

//         <Box sx={{ display: "flex", mb : "16px" }}>
//           <Typography sx={{ fontWeight: "bold", fontSize: 44, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, ml: "24px", mt: "24px" }} variant="h6"> Settings </Typography>
//         </Box>
//         <Box sx={{ display: "flex" }}>
//           <Typography sx={{ fontWeight: "bold", fontSize: 24, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, ml: "24px", mt: "16px" }} variant="h6"> Theme </Typography>
//           <ThemeSwitch onChange={() => (themeSwitch())} thememode={themeColor}></ThemeSwitch>
//         </Box>
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>

//         <Box sx={{ display: "flex" }}>
//           <PlayerDisplay playerName={playerNames[0]} playerColor={playerColors[0]}
//             setPlayerName={changePlayerName} playerTotal={total[0]}
//             changeOneTotal={changeOneTotal} loading={loading} playerId={0}
//             playerCharacter={playerCharacters[0]} randomizeCharacters={randomizeCharacters}
//           />

//           <PlayerDisplay playerName={playerNames[1]} playerColor={playerColors[1]}
//             setPlayerName={changePlayerName} playerTotal={total[1]}
//             changeOneTotal={changeOneTotal} loading={loading} playerId={1}
//             playerCharacter={playerCharacters[1]} randomizeCharacters={randomizeCharacters} />

//         </Box>

//         <Box sx={{ display: "flex" }}>

//           <PlayerDisplay playerName={playerNames[2]} playerColor={playerColors[2]}
//             setPlayerName={changePlayerName} playerTotal={total[2]}
//             changeOneTotal={changeOneTotal} loading={loading} playerId={2}
//             playerCharacter={playerCharacters[2]} randomizeCharacters={randomizeCharacters} />

//           <PlayerDisplay playerName={playerNames[3]} playerColor={playerColors[3]}
//             setPlayerName={changePlayerName} playerTotal={total[3]}
//             changeOneTotal={changeOneTotal} loading={loading} playerId={3}
//             playerCharacter={playerCharacters[3]} randomizeCharacters={randomizeCharacters} />


//         </Box>
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "center", mt: "32px", alignItems: "center", mb: "150px" }}>

//         <Typography sx={{ width: "200px", minWidth: "200px", color: altThemeColor, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, fontWeight: "bold", textAlign: "center", paddingTop: "20px" }} fontSize={32}> GAME {history.length}</Typography>

//       </Box>


//       <Box sx={{ display: "flex", justifyContent: "center" }}>

//         <Button onClick={() => (setMatchHistoryOpen(true))} sx={{ position: "absolute", color: altThemeColor, border: "solid", minWidth: screenWidth > 900 ? "200px" : "50px", padding: screenWidth > 900 ? "20px 0px 20px 0px" : "20px 20px 20px 20px", bottom: 10, mr: "25%", fontSize: 24, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, fontWeight: "bold", background: themeColor }}>
//           {screenWidth > 900 ? "Match History" : <HistoryIcon sx={{ width: "40px", height: "40px" }}></HistoryIcon>}


//         </Button>
//       </Box>


//       <Link href="https://forms.gle/TmG5wPV442KwRhRe8" passHref={true}>
//       <Box>
//       <Button sx={{ position: "absolute", color: altThemeColor, border: "solid", minWidth: screenWidth > 900 ? "200px" : "50px", padding: screenWidth > 900 ? "20px 0px 20px 0px" : "20px 20px 20px 20px", bottom: 10, right: 0, fontSize: 24, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: altThemeColor, fontWeight: "bold", background: themeColor }}>
//         {screenWidth > 900 ? "Feedback" : <FeedbackIcon sx={{ width: "40px", height: "40px" }}></FeedbackIcon>}</Button>
//     </Box>
//       </Link>

//       <MatchHistory characterHistory={characterHistory} background={themeColor} history={history} open={matchHistoryOpen} handleClose={handleMatchHistoryClose} />

//     </Box>
//   );
// }
