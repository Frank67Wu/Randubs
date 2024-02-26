
import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';




const MaterialUISwitch = styled(Switch)(({ theme, thememode }) => ({
    width: 93,
    height: 51,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(0px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(40px)',
        '& .MuiSwitch-thumb:before': {

        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: thememode === 'black' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: thememode === 'black' ? '#003892' : '#001e3c',
      width: 48,
      height: 48,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: thememode === 'black' ? '#8796A5' : '#aab4be',
      borderRadius: 41 / 2,
    },
  }));
  

  export default function SimpleSwitch({thememode, onChange, checked, disable, ml}) {
    return (<MaterialUISwitch onChange={onChange} checked={checked} thememode={thememode} sx={{ mt : "10px", ml, opacity : disable ? 0 : 100}}  />)
  }