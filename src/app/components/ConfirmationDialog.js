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

export const ConfirmationDialog = ({open, handleClose, background, characterHistory, onClick}) => {

  const backgroundColor = background == "black" ? "#343434" : "#FAF9F6"
  const color = background == "black" ? "white" : "black"

  return (
    <Dialog maxWidth="xs"  onClose={handleClose} open={open}>
      <DialogTitle sx={{textAlign : "center", background : backgroundColor, color : color, fontSize : 36, WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : color, fontWeight : "bold"}}> Confirm Reset All </DialogTitle>
      <List sx={{ pt: 0, background: backgroundColor, color : color}}>
      <Box sx={{display : "flex"}}>
      <ListItem  >
      <ListItemButton
        onClick={() => (onClick("YES"))}
      >
        <ListItemText primaryTypographyProps={{fontSize: '24px', WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : color, fontWeight : "bold", mt : "4px", textAlign : "center"}} primary="Yes" />
      </ListItemButton>
    </ListItem>
    <ListItem >
      <ListItemButton
        onClick={() => (onClick("NO"))}
      >
        <ListItemText primaryTypographyProps={{fontSize: '24px', WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : color, fontWeight : "bold", mt : "4px", textAlign : "center"}} primary="No" />
      </ListItemButton>
    </ListItem>
      
      </Box>

        
      </List>
    </Dialog>
  );
}

