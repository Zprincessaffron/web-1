import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apho from '../../images/apho.png'
import '../../styles/Review.css'
import profile from '../../images/profilepng.png'
import StarProduct from '../product/StarProduct'

function Review() {
    const [reviews,setReviews] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const review = await axios.get('/allreviews');
                setReviews(review.data.slice(0,3));  
            } catch (err) {
                console.log(err)     
        };
    }
        fetchProducts();  // Call the async function to fetch data
    }, []); 
     

    
  return (
    <div className='review-main'>
         {reviews.map((review,indes) => (
         <div className='review-div' key={review._id}>
         <img src={apho} alt="" />
         
         <div className='review-div4'>
         <span>product purchased</span> <h2>{review.product}</h2>
         </div>
         <div className='review-message'>{review.review}</div>
         <div className='reviewdiv1'>
            <img src={profile} alt="" />
            <div className='review-div2'>
                <h1>{review.name}</h1>
                <StarProduct starValue={review.star}/>
            </div>
         </div>
         <div className='review-div3'>
            <h2>posted on {review.date.slice(8,10)
               }/{review.date.slice(5,7)
               }/{review.date.slice(0,4)
               }</h2>
         </div>

         
     </div>
      ) )}
    </div>
  )
}

export default Review