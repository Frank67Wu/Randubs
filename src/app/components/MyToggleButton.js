import * as React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';

export const MyToggleButton = ({alignment, handleAlignment, theme}) => {

  const color = theme == "black" ? "white" : "black"

  const style = {fontSize : 32, WebkitTextStrokeWidth : "1px", WebkitTextStrokeColor : "black", color : "black", mt : "-10px", mb : "-10px"}
  


  return (
    <ToggleButtonGroup
      sx ={{mt : "16px", ml : "48px", background : "white"}}
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
    <ToggleButton value={0} aria-label="left aligned">
    <Typography sx={style}> 0 </Typography>
  </ToggleButton>
  <ToggleButton value={1} aria-label="centered">
  <Typography sx={style}> 1 </Typography>
  </ToggleButton>
  <ToggleButton value={2} aria-label="right aligned">
  <Typography sx={style}> 2 </Typography>
  </ToggleButton>
  <ToggleButton value={5} aria-label="justified">
  <Typography sx={style}> 5 </Typography>
  </ToggleButton>
</ToggleButtonGroup>
  )
}