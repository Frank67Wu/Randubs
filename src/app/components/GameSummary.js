import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export const GameSummary = ({ hist, background, open, handleClose}) => {

  const backgroundColor = background == "black" ? "#343434" : "#FAF9F6"
  const color = background == "black" ? "white" : "black"

  const testData = [['koro', 'Stephen', 'Sam', 'Frank', 0, 1], ['koro', 'Stephen', 'Sam', 'Frank', 0, 1], ['Sam', 'Stephen', 'koro', 'Frank', 1, 1]]

  const [winRates, setWinRates] = useState(null)
  const [winStreak, setWinStreak] = useState(null)
  const [lossStreak, setLossStreak] = useState(null)

  const getWinRates = () => {

    const data = {}

    if (hist.length === 0) {
      return null
    }

    for (const match of hist) {
      for (let i = 0; i < 3; i += 2) {
        const stringify = JSON.stringify([match[i], match[i + 1]].sort())

        if (stringify in data) {
          const oldData = data[stringify]
          if (i === 0 && match[4] === 0 || i === 2 && match[4] === 1) {
            oldData[2] += 1
            oldData[4] += match[5]
          }
          else {
            oldData[4] -= match[5]
          }
          oldData[3] += 1
        }

        else {
          const d = []
          d.push(match[i])
          d.push(match[i + 1])
          if (i === 0 && match[4] === 0 || i === 2 && match[4] === 1) {
            d.push(1)
            d.push(1)
            d.push(match[5])
          }
          else {
            d.push(0)
            d.push(1)
            d.push(match[5] * -1)
          }

          data[stringify] = d
        }
      }
    }

    const dataArray = Object.values(data)

    dataArray.sort((a, b) => (a[2] / a[3] > b[2] / b[3]) ? 1 : ((b[2] / b[3] >= a[2] / a[3]) ? -1 : 0))

    return dataArray

  }

  const formatStreak = (streak) => {
    if (!streak || streak.length === 0) {
      return ""
    }
    if (streak.length == 1) {
      return (`${streak[0][0]} ${streak[0][1] > 0 ? "won" : "lost"} ${Math.abs(streak[0][1])} ${Math.abs(streak[0][1]) === 1 ? "game" : "games" } in a row`)
    }
    else {
      let names = ""
      for (let i = 0; i < streak.length; i++) {
        if (i == (streak.length - 1)) {
          names += ` and ${streak[i][0]}`
        }
        else if (i == 0) {
          names += `${streak[i][0]}`
        }
        else {
          names += `, ${streak[i][0]}`
        }
      }

      names += `${streak[0][1] > 0 ? " won" : " lost"} ${Math.abs(streak[0][1])} ${Math.abs(streak[0][1]) === 1 ? "game" : "games" } in a row`
      return names
    }
  }

  const getWinStreak = () => {
    const biggestLoss = {}
    const biggestWin = {}
    const currentStreak = {}
    let maxLoss = 0
    let maxWin = 0


    for (const match of hist) {
      if (hist.length === 0) {
        return null
      }
      for (let i = 0; i < 4; i++) {
        if (currentStreak[match[i]] === undefined || currentStreak[match[i]] == 0) {
          if (i < 2 && match[4] === 0 || i > 2 && match[4] === 1) {
            currentStreak[match[i]] = 1
          }
          else {
            currentStreak[match[i]] = -1
          }
        }

        else if (currentStreak[match[i]] > 0) {
          if (i < 2 && match[4] === 0 || i >= 2 && match[4] === 1) {
            currentStreak[match[i]] += 1
          }
          else {
            if (biggestWin[match[i]] === undefined || biggestWin[match[i]] <= currentStreak[match[i]]) {
              biggestWin[match[i]] = currentStreak[match[i]]
            }
            if (currentStreak[match[i]] > maxWin) {
              maxWin = currentStreak[match[i]]
            }
            currentStreak[match[i]] = -1
          }
        }
        else if (currentStreak[match[i]] < 0) {
          if (i >= 2 && match[4] === 0 || i < 2 && match[4] === 1) {
            currentStreak[match[i]] -= 1
          }
          else {
            if (biggestLoss[match[i]] === undefined || biggestLoss[match[i]] >= currentStreak[match[i]]) {
              biggestLoss[match[i]] = currentStreak[match[i]]
            }
            if (currentStreak[match[i]] < maxLoss) {
              maxLoss = currentStreak[match[i]]
            }
            currentStreak[match[i]] = 1
          }
        }
      }
    }

    const names = Object.keys(currentStreak)
    for (const name of names) {
      console.log(biggestWin, biggestLoss, currentStreak)
        if (biggestWin[name] === undefined || currentStreak[name] >= biggestWin[name]) {
          if (currentStreak[name] > 0) {
            biggestWin[name] = currentStreak[name]
          }
          if (currentStreak[name] > maxWin) {
            maxWin = currentStreak[name]
          }
        }
        if (biggestLoss[name] === undefined || currentStreak[name] <= biggestLoss[name]) {
          if (currentStreak[name] < 0) {
            biggestLoss[name] = currentStreak[name]
          }
          if (currentStreak[name] < maxLoss) {
            maxLoss = currentStreak[name]
          }
      }
    }

    let lossArr = Object.entries(biggestLoss)
    let winArr = Object.entries(biggestWin)

    lossArr = lossArr.filter((a) => a[1] == maxLoss)
    winArr = winArr.filter((a) => a[1] == maxWin)

    return [winArr, lossArr]
  }

  useEffect(() => {
    setWinRates(getWinRates())
    const streaks = getWinStreak()
    setWinStreak(streaks[0])
    setLossStreak(streaks[1])

  }, [hist])


  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle sx={{ textAlign: "center", background: backgroundColor, color: color, fontSize: 36, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: color, fontWeight: "bold" }}>Game Summary</DialogTitle>
      <List sx={{ pt: 0, background: backgroundColor, color: color }}>
        {winRates && winRates.map((pair, index) => (
          <ListItem disableGutters key={index}>
            <ListItemButton >
              <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%", alignItems: "center" }}>
                <Box sx={{ display: "flex", width: "300px", minWidth: "300px", textAlign: "center" }}>
                  <ListItemText primaryTypographyProps={{
                    style: {
                      fontWeight:
                        "bold", fontSize: 20, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: color
                    }
                  }} primary={`${pair[0]} + ${pair[1]}`} />
                </Box>

                <Box sx={{ display: "flex", minWidth: "100px", justifyContent: "center", WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: color }}>
                  {`${parseFloat(pair[2])}W`}
                </Box>
                <Box sx={{ display: "flex", minWidth: "100px", justifyContent: "center", WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: color }}>
                  {`${parseFloat(pair[3]) - parseFloat(pair[2])}L`}
                </Box>

                <Box sx={{ display: "flex", minWidth: "100px", justifyContent: "center", fontWeight: 'bold', WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: color }}>
                  {`${Math.floor(parseFloat(pair[2]) / parseFloat(pair[3]) * 100)}% WR`}
                </Box>

                <Box sx={{ display: "flex", minWidth: "100px", justifyContent: "center", fontWeight: 'bold', WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: color }}>
                  {`${pair[4]}$`}
                </Box>

              </Box>

            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List sx={{ display : "flex", flexDirection : "column", pt: 0, background: backgroundColor, color: color, alignItems : "center", justifyContent : "center", paddingTop : "50px"}}>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "100%", alignItems: "center" }}>
      <Box sx={{ display: "flex", textAlign: "center" }}>
        <ListItemText primaryTypographyProps={{
          style: {
            fontWeight:
              "bold", fontSize: 24, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: color
          }
        }} primary={formatStreak(winStreak)} />
      </Box>
      <Box sx={{ display: "flex", textAlign: "center", mt : "30px", mb : "50px" }}>
        <ListItemText primaryTypographyProps={{
          style: {
            fontWeight:
              "bold", fontSize: 24, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: color
          }
        }} primary={formatStreak(lossStreak)} />
      </Box>
      </Box>


      </List>
    </Dialog>
  )
}
