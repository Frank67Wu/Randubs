import React from 'react'
import { Container, Box } from '@mui/material'


export const SmashPlayerBox = ({colors}) => {


  return (
    <Container sx={{height:  "150px", width : "200px", overflow : "hidden", position : "relative", border: "solid", borderColor : "black"}}>
      <Box sx={{
        position: "absolute" , height: 0, width : 0, borderLeft: "130px solid transparent", borderTop: `140px solid white`, zIndex: 4, marginLeft : "45px", marginTop : "-10px"
        }}>
      </Box>

      <Box sx={{
        position: "absolute" , height: 0, width : 0, borderLeft: "300px solid transparent", borderTop: `190px solid ${colors[0]}`, zIndex: 3, marginLeft : "-125px",
        }}>
      </Box>

      <Box sx={{
        position: "absolute" , height: 0, width : 0, borderRight: "220px solid transparent", borderBottom: `128px solid ${colors[1]}`, zIndex: 5, 
        marginLeft : "-50px", marginTop : "30px",}}>
      </Box>

      <Box sx={{
        position: "absolute" , height: 0, width : 0, borderRight: "160px solid transparent", borderBottom: `80px solid ${colors[2]}`, zIndex: 6, 
        marginLeft : "-50px", marginTop : "70px"}}>
      </Box>


      </Container>
  )
}
