import starIcon from '../../../assets/star.svg'
import starFilledIcon from '../../../assets/star-fill.svg'
import './LikeStarSwitch.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserDetails, likeProduct } from '../../../services/AxiosService';

function LikeStarSwitch({productId}) {
    const navigate = useNavigate();

    const auth = localStorage.getItem('authorization');

    const [liked, setLiked] = useState(false);
    const [user, setUser] = useState({});
    const [star, setstar] = useState(starIcon);

    useEffect(() => {
        auth ? getUserDetails(setUser, ()=>{}) : setUser(null)
    },[])

    useEffect(() => {
        user?.likedproducts?.find(likedProduct => likedProduct.id === productId) ? setLiked(true) : setLiked(false)
    },[user])
    
    useEffect(() => {
        liked ? setstar(starFilledIcon) : setstar(starIcon)
    },[liked])

   const handleLike = (e) => {
    e.stopPropagation()
        if(auth){
            setLiked(!liked)
            likeProduct(productId)
        } else {
           navigate('/login')
        }
    }

    return (
        <img src={star} onClick={handleLike} className='like-button bg-body border rounded-circle p-3 m-2 position-absolute top-0 end-0 w-auto z-1'/>
    );
}

export default LikeStarSwitch;
