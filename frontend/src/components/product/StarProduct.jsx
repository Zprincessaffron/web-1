import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import StarBorderIcon from '@mui/icons-material/StarBorder';


function StarProduct({starValue}) {
    const [value,setValue]=useState(2)
  return (
    <div>
        <Box 

>

<Rating name="read-only" value={starValue} 
    emptyIcon={<StarBorderIcon style={{ color: 'white' }} fontSize="inherit" />}
      readOnly />
</Box>
    </div>
  )
}

export default StarProduct