import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';

export const ColorToggle = ({alignment, handleAlignment, theme}) => {

  const style = {fontSize : 32, mt : "-10px", mb : "-10px"}
  const padding = {paddingLeft : "4px", paddingRight : "4px"}

  return (
    <ToggleButtonGroup
      sx ={{mt : "16px", ml : "100px", background : "white"}}
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
    <ToggleButton sx={{width : "50px", background : "#E49080", "&.Mui-selected, &:hover": {
        backgroundColor:  "#EE2C2B", "&.Mui-selected:hover": {
            backgroundColor:  "#EE2C2B", 
          }
      }}} value={"RED"} aria-label="left aligned">
    <Typography >  </Typography>
  </ToggleButton>
  
  <ToggleButton sx={{width : "50px", background : "#4AB2E3", "&.Mui-selected, &:hover": {
    backgroundColor:  "#2980F4", "&.Mui-selected:hover": {
        backgroundColor:  "#2980F4", 
      }
  }}} value={"BLUE"} aria-label="centered">
  <Typography sx={[style, padding]}>  </Typography>
  </ToggleButton>

  <ToggleButton sx={{width : "50px", background : "#43E47A", "&.Mui-selected, &:hover": {
    backgroundColor:  "#22AB42", "&.Mui-selected:hover": {
        backgroundColor:  "#22AB42", 
      }
  }}} value={"GREEN"} aria-label="right aligned">
  <Typography sx={[style, padding]}>  </Typography>
  </ToggleButton>

  <ToggleButton sx={{width : "50px", background : "#FBE218", "&.Mui-selected, &:hover": {
    backgroundColor:  "#FEB810", "&.Mui-selected:hover": {
        backgroundColor:  "#FEB810", 
      }
  }}}  value={"YELLOW"} aria-label="justified">
  <Typography sx={[style, padding]}>  </Typography>
  </ToggleButton>
</ToggleButtonGroup>
  )
}
