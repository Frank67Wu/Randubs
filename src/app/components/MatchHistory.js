import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box } from '@mui/material';

export const MatchHistory = ({history, open, handleClose, background, characterHistory}) => {

  const backgroundColor = background == "black" ? "#343434" : "#FAF9F6"
  const color = background == "black" ? "white" : "black"

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle sx={{textAlign : "center", background : backgroundColor, color : color, fontSize : 36, WebkitTextStrokeWidth : "1px" , WebkitTextStrokeColor : color, fontWeight : "bold"}}>Match History</DialogTitle>
      <List sx={{ pt: 0, background: backgroundColor, color : color}}>
        {history.map((match, index) => (
          <ListItem disableGutters key={index}>
            <ListItemButton >
              <Box sx={{display: "flex", justifyContent : "space-evenly", width : "100%"}}>
              <Box sx={{display : "flex", minWidth : "300px", textAlign : "center"}}>
                {characterHistory[index] && characterHistory[index][0] !== "" && <img style={{width : "50px", height : "50px"}} alt={""} src={`/Stock Icons/chara_2_${characterHistory[index][0]}.png`}/>}
                <ListItemText sx={{ml : "5px", mt : "15px"}} primary={`${match[0]} / ${match[1]}`} />
                {characterHistory[index] && characterHistory[index][0] !== "" && <img style={{width : "50px", height : "50px"}} alt={""} src={`/Stock Icons/chara_2_${characterHistory[index][1]}.png`}/>}
              </Box>

                <Box sx={{display: "flex", justifyContent : "center"}}>
                    <ListItemText primaryTypographyProps={{fontSize: '24px', fontWeight : "bold", mt : "4px"}}  primary={`${match[4] ? "-" : "+"} ${match[5]}`}/>
                    {match[4] ? <ArrowRightIcon fontSize='large' sx={{mt : "8px", transform: "scale(1.6)"}}/> : 
                                <ArrowLeftIcon fontSize='large' sx={{mt : "8px", transform: "scale(1.6)"}}/>}  
                    <ListItemText primaryTypographyProps={{fontSize: '24px', fontWeight : "bold", mt : "4px"}}  primary={`${match[4] ? "+" : "-"} ${match[5]}`}/>
                </Box>
                
                <Box sx={{display : "flex", minWidth : "300px", textAlign : "center"}}>
                {characterHistory[index] && characterHistory[index][0] !== "" && <img style={{width : "50px", height : "50px"}} alt={""} src={`/Stock Icons/chara_2_${characterHistory[index][2]}.png`}/>}
                <ListItemText sx={{ml : "5px", mt : "15px"}} primary={`${match[2]} / ${match[3]}`} />
                {characterHistory[index] && characterHistory[index][0] !== "" && <img style={{width : "50px", height : "50px"}} alt={""} src={`/Stock Icons/chara_2_${characterHistory[index][3]}.png`}/>}
              </Box>
              
              </Box>
              
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

