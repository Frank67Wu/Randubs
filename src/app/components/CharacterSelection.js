// import { Box } from "@mui/material"
// import { useState, useEffect } from "react"
// import DialogTitle from '@mui/material/DialogTitle';
// import Dialog from '@mui/material/Dialog';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import { smashCodeNames, rowOne, rowTwo, rowThree, rowFour, rowFive, rowSix, rowSeven} from "../const/smashCodeNames";

// export const CharacterSelection = ({ background}) => {

//   const backgroundColor = background == "black" ? "#343434" : "#FAF9F6"
//   const color = background == "black" ? "white" : "black"

//   const testData = [['koro', 'Stephen', 'Sam', 'Frank', 0, 1], ['koro', 'Stephen', 'Sam', 'Frank', 0, 1], ['Sam', 'Stephen', 'koro', 'Frank', 1, 1]]

//   return (
//     <Dialog fullWidth maxWidth="md" open={true}>
//       <DialogTitle sx={{ textAlign: "center", background: backgroundColor, color: color, fontSize: 36, WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: color, fontWeight: "bold" }}>Game Summary</DialogTitle>
//       <List sx={{ pt: 0, background: backgroundColor, color: color }}>

//       <ListItem key={0}>
//       {rowOne.map((name, index) => (
//           <ListItemButton >
//             <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%", alignItems: "center" }}>
//                 {<img style={{filter : "brightness(50%)"}} src={`/Stock Icons/chara_2_${name}_00.png`}/>  }
//             </Box>

//           </ListItemButton>
//       ))}
//       </ListItem>

//       <ListItem key={1}>
//       {rowTwo.map((name, index) => (
//           <ListItemButton >
//             <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%", alignItems: "center" }}>
//                 {<img src={`/Stock Icons/chara_2_${name}_00.png`}/>}
//             </Box>
//           </ListItemButton>
//       ))}
//       </ListItem>

//       <ListItem  key={2}>
//       {rowThree.map((name, index) => (
//           <ListItemButton >
//             <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%", alignItems: "center" }}>
//                 {<img src={`/Stock Icons/chara_2_${name}_00.png`}/>}
//             </Box>

//           </ListItemButton>
//       ))}
//       </ListItem>

//       <ListItem key={3}>
//       {rowFour.map((name, index) => (
//           <ListItemButton >
//             <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%", alignItems: "center" }}>
//                 {<img src={`/Stock Icons/chara_2_${name}_00.png`}/>}
//             </Box>

//           </ListItemButton>
//       ))}
//       </ListItem>

//       <ListItem key={4}>
//       {rowFive.map((name, index) => (
//           <ListItemButton >
//             <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%", alignItems: "center" }}>
//                 {<img src={`/Stock Icons/chara_2_${name}_00.png`}/>}
//             </Box>

//           </ListItemButton>
//       ))}
//       </ListItem>

//       <ListItem key={0}>
//       {rowSix.map((name, index) => (
//           <ListItemButton >
//             <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%", alignItems: "center" }}>
//                 {<img src={`/Stock Icons/chara_2_${name}_00.png`}/>}
//             </Box>

//           </ListItemButton>
//       ))}
//       </ListItem>

//       <ListItem key={0}>
//       {rowSeven.map((name, index) => (
//           <ListItemButton >
//             <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%", alignItems: "center" }}>
//                 {<img src={`/Stock Icons/chara_2_${name}_00.png`}/>}
//             </Box>

//           </ListItemButton>
//       ))}
//       </ListItem>

//       </List>
//     </Dialog>
//   )
// }
