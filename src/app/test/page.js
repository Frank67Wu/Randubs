'use client'
import React from 'react'
import { createAllCharacters } from '../actions/characterActions'
import { Box, Button } from '@mui/material'

export default function Page () {
  return (
    <Box>

<Button onClick={() => createAllCharacters()}> Add all Characters </Button>

    </Box>
        

  )
}
