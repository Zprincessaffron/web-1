import React from 'react'
import { IoMdClose } from "react-icons/io";

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
function PostReview( {setReviewData,reviewData,handleInputChange,handleReviewSumbit,setIsAddReview} ) {
  return (
    <div className='sp-submit-review-main'>
<div className='sp-submit-review-div1'>
    <div className='sp-review-close'>
        <IoMdClose  onClick={()=>setIsAddReview(false)}/>

    </div>
  <label htmlFor="">Rate This Product</label>
  <Box sx={{ '& > legend': { mt: 2 } }} className='boxx'>
<Rating style={{overflow:"hidden"}} className='boxx'
name="simple-controlled"
value={reviewData.star}
onChange={(event, newValue) => {
    setReviewData({
        ...reviewData,
        star:newValue})
}}

/>
</Box>
<label htmlFor="">Select Products</label>
<FormControl>

<RadioGroup
row
aria-labelledby="demo-row-radio-buttons-group-label"
name="row-radio-buttons-group"
>
<FormControlLabel   name="product" value="Kashmir Saffron"  checked={reviewData.product === 'Kashmir Saffron'} onChange={handleInputChange} control={<Radio />} label="Kashmir Saffron" />
<FormControlLabel name="product" value="Spain Saffron" checked={reviewData.product === 'Spain Saffron'} onChange={handleInputChange} control={<Radio />} label="Spain saffron" />

</RadioGroup>
</FormControl>
<label htmlFor="">Review</label>

<textarea   name="review" value={reviewData.review}  onChange={handleInputChange} rows={7} id=""></textarea>
<div className='sp-review-end'>
<button onClick={handleReviewSumbit}>Submit</button>
</div>
</div>

</div>
  )
}

export default PostReview