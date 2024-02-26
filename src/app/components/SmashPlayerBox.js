import React from 'react'
import { Container, Box } from '@mui/material'


export const SmashPlayerBox = ({colors, loading, transitionColors}) => {

  return (
    <Container sx={{height:  "150px", width : "190px", overflow : "hidden", position : "relative", border: "solid", borderColor : "black"}}>
      <Box sx={{
        position: "absolute" , height: 0, width : 0, borderLeft: "130px solid transparent", borderTop: `140px solid white`, zIndex: 4, marginLeft : "45px", marginTop : "-10px"
        }}>
      </Box>

      <Box sx={{
        position: "absolute" , height: 0, width : 0, borderLeft: "300px solid transparent", borderTop: `190px solid ${loading ? transitionColors[0] : colors[0]}`, zIndex: 3, marginLeft : "-125px",            
        transition: "all 1s ease",
        WebkitTransition: "all 1s ease",
        MozTransition: "all 1s ease",
        }}>
      </Box>

      <Box sx={{
        position: "absolute" , height: 0, width : 0, borderRight: "220px solid transparent", borderBottom: `128px solid ${loading ? transitionColors[1] : colors[1]}`, zIndex: 5,
        transition: "all 1s ease",
        WebkitTransition: "all 1s ease",
        MozTransition: "all 1s ease", 
        marginLeft : "-50px", marginTop : "30px",}}>
      </Box>

      <Box sx={{
        position: "absolute" , height: 0, width : 0, borderRight: "160px solid transparent", borderBottom: `80px solid ${loading ? transitionColors[2] : colors[2]}`, zIndex: 6, 
        transition: "all 1s ease",
        WebkitTransition: "all 1s ease",
        MozTransition: "all 1s ease",
        marginLeft : "-50px", marginTop : "70px"}}>
      </Box>


      </Container>
  )
}
