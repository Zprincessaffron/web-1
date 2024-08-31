import React, { useEffect, useState } from 'react'
import '../../styles/ProductPage.css'
import pp_back from '../../images/pp_back4.jpg'
import pp_back2 from '../../images/pp_back2.jpg'
import product2 from '../../images/product2.jpg'
import product3 from '../../images/product3.jpg'
import StarProduct from './StarProduct'
import Navbar from '../../navbar/NavBar'




function ProductPage() {
    const [scaleImg,setScaleImg] =useState(false)
    const [product,setProduct] =useState(true)
    const [height,setheight] =useState(true)
    const [showSecondPage, setShowSecondPage] = useState(false);
    const [grams,setGrams]=useState('5')
    const [quality,setQuantity]=useState(1)

    useEffect(() => {
        setTimeout(() => {
            setScaleImg(true)
        }, 100);
      
    }, [])
    function handleGram(val){
        setGrams(val)
    }

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY >= 20) {
          setShowSecondPage(true);
        } else {
          setShowSecondPage(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      // Cleanup the event listener when the component is unmounted
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    const [scrollToTop, setScrollToTop] = useState(false);

    useEffect(() => {
      if (scrollToTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setScrollToTop(false); // Reset the state to avoid repetitive scrolling
      }
    }, [scrollToTop]);
  
    function handleProduct(val){
        setProduct(val)
        setScrollToTop(true)
    }
    function handleQuantityInc(){
        setQuantity(quality +1 )

    }
    function handleQuantityDec(){
        if(quality>0){
            setQuantity(quality -1 )
        }

    }
  return (
    <div className='pp_main'>
     <Navbar/>
    {product?(
          <div className={`pp_div1`} style={{backgroundImage:`url(${pp_back})`}}>
          <div className={`pp_div11  ${!height?"true":"false"}`}>
              <h1>KASHMIRI SAFFRON</h1>
              <div className={`pp_div11_1 ${height?"true":"false"}`}>
              <p>High-quality saffron threads handpicked from the finest flowers.
              Premium Quality, Exquisite Flavor: Discover the luxury <br/>of Indian Kashmiri Saffron,
              renowned for its vibrant color, delicate aroma, and unparalleled flavor.
               Hand-harvested <br/>from the lush fields of Kashmir, our saffron is  the epitome of quality and authenticity.<br/> Each strand is carefully selected  to ensure you experience only the finest.
               Origin: Kashmir, India<br/>
      Type: Saffron Threads (Grade 1)<br/>
      Flavor Profile: Sweet, floral, with a subtle earthy undertone<br/>
      Color: Deep red with orange-yellow hues<br/>
      Aroma: Rich, aromatic, and heady <br/>
      Purity: 100% pure, with no additives or artificial color <br/>
                
                
                </p><button className='pp_viewmore' onClick={()=>{setheight(!height)}}>{height? "Hide":"View More"}</button></div>
              <div className='pp_div11_2'><h2>Grams : </h2> <button>5 gram</button> <button>2gram</button></div>
              <div className='pp_div11_3'><h1>stock:</h1> <h2>instock</h2></div>
              <div className='pp_div11_7'>
                  <StarProduct/>
              </div>
              <div className='pp_div11_6'>
              <div className='pp_div11_4'> <button className='pp_btn_min' onClick={handleQuantityDec}>-</button> {quality}<button className='pp_btn_plus' onClick={handleQuantityInc}>+</button></div>
              <div className='pp_div11_5'><button>add to cart</button> <button>buy now</button></div>
              </div>
          </div>
      </div>
    
    ):(  <div className={`pp_div1`} style={{backgroundImage:`url(${pp_back})`}}>
        <div className={`pp_div11  ${!height?"true":"false"}`}>
            <h1>SPAIN SAFFRON</h1>
            <div className={`pp_div11_1 ${height?"true":"false"}`}>
            <p>Unmatched quality with vibrant color and rich flavor from the heart of Spain.
            Discover the exquisite flavor and vibrant color <br/> our Premium Spanish Saffron.
            Sourced from the sun-drenched fields of Spain, this high-quality saffron is known for its intense aroma, rich flavor, <br/> and deep red hue. Each strand is carefully hand-harvested to ensure the highest standards <br/>  of quality and authenticity.
             Origin: Spain<br/>
    Type: Spanish Saffron, Grade A+ (highest quality)<br/>
    Flavor Profile: Sweet and floral with a hint of earthy richness<br/>
    Color: Deep crimson red, indicative of purity and potency<br/>
    Aroma: Intense and floral with subtle earthy undertones <br/>
    Purity: 100% pure saffron with no additives or fillers <br/>
              
              
              </p><button className='pp_viewmore' onClick={()=>{setheight(!height)}}>VIEW MORE</button></div>
            <div className='pp_div11_2'><h2>Grams : </h2> <button>5 gram</button> <button>2gram</button></div>
            <div className='pp_div11_3'><h1>stock:</h1> <h2>instock</h2></div>
            <div className='pp_div11_7'>
                <StarProduct/>
            </div>
            <div className='pp_div11_6'>
            <div className='pp_div11_4'> <button className='pp_btn_min'>-</button> 1<button className='pp_btn_plus'>+</button></div>
            <div className='pp_div11_5'><button>add to cart</button> <button>buy now</button></div>
            </div>
        </div>
    </div>
  )}
{showSecondPage?(
    <div className={`pp_div2 ${showSecondPage? 'true':'false'}`}>
    <div onClick={()=>handleProduct(true)}>
    <h1>KASHMIRI SAFFRON</h1>

            <img src={product2} alt="" />
        </div>
        <div onClick={()=>handleProduct(false)}>
        <h1>SPAIN SAFFRON</h1>
            <img src={product2} alt="" />
            
        </div>
    
    </div>
):(null)}

    </div>
  )
}

export default ProductPage
