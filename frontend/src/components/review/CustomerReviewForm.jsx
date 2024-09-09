import React, { useState,useEffect } from 'react'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { toast } from 'react-toastify';
function CustomerReviewForm( {product,setVerify} ) {
    const [name,setName]=useState('')
    const [reviewData, setReviewData] = useState({
        name: name,
        star: 0,
        review: "",
        product: product // Default to a specific product, or you can make this dynamic
    });


    useEffect(() => {
        const username = localStorage.getItem('usernameforreview');
        setName(username)
        setReviewData({
            ...reviewData,
            name: username})
    
    }, [])
    async function handleReviewSumbit (e){
        e.preventDefault(); // Prevent form from refreshing the page

        try {
            // Post the review data to the backend

           axios.post('/add-review', reviewData).then(
            res=>{
                toast('Review Uploaded Sucessfully')
              setTimeout(() => {
                window.location.reload()
              }, 3000);
            }
           )

            // Display a success message or perform additional actions
        } catch (error) {
            // Handle any errors
            console.error('There was an error posting the review:', error);
        }
    }
    function handleInputChange(e){
        const value= e.target.value;
        setReviewData({
            ...reviewData,
            review: value})
    

    }
  return (
    <div className='cusform_div'>
        <div>Hello, {name.toUpperCase()}</div>
        <p> Share your experience with us! Your feedback helps us improve and serves as a guide for future customers.</p>
        <div className='cusform_div1'>
        <label htmlFor="">Select Star (1-5)</label>

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

<label htmlFor="">Enter Review</label>

<textarea   name="review" value={reviewData.review}  onChange={handleInputChange} rows={7} id=""></textarea>
<div className='sp-review-end'>
<button onClick={handleReviewSumbit}>Submit</button>
</div>

        </div>

    </div>
  )
}

export default CustomerReviewForm