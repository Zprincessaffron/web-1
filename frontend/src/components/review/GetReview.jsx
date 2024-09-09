import React from 'react'
import { IoIosStar } from "react-icons/io";
import { useUserContext } from '../../context/MainContext';
import '../../styles/Review.css'

function GetReview( {spainRewiew} ) {
    const { isAddReview,setIsAddReview }=useUserContext()

  return (
    <div className='sp-review-main'>
    <div className='sp-review-div1'>
        <h2>Ratings & Reviews</h2> <div><span>4.1</span>{spainRewiew.length} Reviews And Ratings</div> <button onClick={()=>setIsAddReview(true)}>Rate Product</button>
    </div>
    {spainRewiew.map((review)=>(
        <div className='sp-reviews'>
        <div className='sp-reviews_1'>
            <div className='sp-rating'>{review.star} <IoIosStar/></div>
            <div className='sp-reviews-msg'>{review.review}</div>
            <div className='sp-review-date'><span>{review.name}</span><span>{review.date.slice(8,10)
       }/{review.date.slice(5,7)
       }/{review.date.slice(0,4)
       }</span></div>
        </div>
        <div className='sp-blankdiv'>

        </div>

    </div>
    ))}
</div>
  )
}

export default GetReview