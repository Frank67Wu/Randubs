import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box } from '@mui/material';

export const MatchHistory = ({history, open, handleClose}) => {


  return (
    <Dialog fullWidth maxWidth="md"  onClose={handleClose} open={open}>
      <DialogTitle sx={{textAlign : "center"}}>Match History</DialogTitle>
      <List sx={{ pt: 0}}>
        {history.map((match) => (
          <ListItem disableGutters key={match}>
            <ListItemButton onClick={() => console.log(1)}>
              <Box sx={{display: "flex", justifyContent : "space-evenly", width : "100%"}}>
                <ListItemText sx={{maxWidth : "200px"}} primary={`${match[0]} / ${match[1]}`} />
                <Box sx={{display: "flex", justifyContent : "center"}}>
                    <ListItemText primary={`${match[4] ? "-" : "+"} ${match[5]}`}/>
                    {match[4] ? <ArrowRightIcon fontSize='large' sx={{mt : "-2px"}}/> : 
                                <ArrowLeftIcon fontSize='large' sx={{mt : "-2px"}}/>}  
                    <ListItemText primary={`${match[4] ? "+" : "-"} ${match[5]}`}/>
                </Box>
                
                <ListItemText sx={{maxWidth : "200px"}} primary={`${match[2]} / ${match[3]}`} />
              
              </Box>
              
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

