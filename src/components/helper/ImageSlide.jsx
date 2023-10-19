import React, { useContext, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai';
import { FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { LogedInUser } from '../../App';


const ImageSlide = ({ img =[] , mainImage, _id}) => {
  const [focusedImage, setFocusedImage ] = useState(img[0]);
  const [fillHeart, setFillHeart] = useState(false);
  const ProjectId = 'j7qoo6mywx67';
  const { logedIn, setLogedIn } = useContext(LogedInUser);
  if(sessionStorage.getItem('userInfo')){
    setLogedIn(true);
  }
   
  //move to wishList
  const moveItemToWishList = async() =>{
    const authToken = sessionStorage.getItem('authToken');
    const body = {
      "productId": `${_id}`
    }
    try{
      const res = await fetch('https://academics.newtonschool.co/api/v1/ecommerce/wishlist', {
        method: "PATCH",
        headers: {
            projectId: ProjectId ,
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      const result = await res.json();
      if(result.status === "success"){
        toast.success("Item added to Wishlist successfully", {
            theme: "dark",
        })
        
    }else if(result.status === "fail"){
      toast.warning("Item alredy in wishlist", {
        theme: "dark",
    })
    }
    else{
        toast.error("Something went wrong", {
            theme:"dark",
        })
    }
    }catch(err){
      console.log(err);
    }
  }
  const handleWishList = () => {
   if(!logedIn){
    toast.error("Log In first", {
      theme : "dark",
    })
   }else{
    moveItemToWishList();
    setFillHeart(true)
   }
  }
  return (
    <div className='image-wrapper'>
      <div>
        {
            img.slice(0, 6).map((currImage, index)=>{
                return (
                    <figure key={index}>
                        <img src={currImage} alt="product" className='image-feature'  onClick={()=>setFocusedImage(currImage)}/>
                    </figure>
                )
            })
        }
      </div>
      <div style={{display:"flex"}}>
        <img src={focusedImage? focusedImage : mainImage} alt='focused' className='main-image'/>
        {fillHeart? <AiFillHeart style={{position:"relative", left:"40px", color:"#03b695", fontSize:"20px"}}/> :
        <FiHeart style={{position:"relative", left:"40px", fontSize:"20px"}} onClick={handleWishList}/>}
      </div>
    </div>
  )
}

export default ImageSlide
