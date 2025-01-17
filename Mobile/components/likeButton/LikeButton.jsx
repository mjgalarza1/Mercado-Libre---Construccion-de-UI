import { Pressable, StyleSheet } from 'react-native';
import { useUserContext } from '../../context/UserContext';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

export default function LikeButton( { productId }) {
    const { user, like } = useUserContext();

    const inactive = require('../../assets/likeButton/likeButton-inactive.svg')
    const active = require('../../assets/likeButton/likeButton-active.svg')
    const [liked, setliked] = useState(false);

    useEffect(() => {
        setliked(user?.likedproducts.some((product) => product.id === productId));
    }, [user]);

    const handleLike = async () => {
        if(user){
            like(productId);
            setliked(!liked);
        }else{
            router.navigate('./user');
        }
    }

    return (
        <Pressable style={styles.likeButtonWrapper} onPress={handleLike}>
            <Image source={liked ? active : inactive} style={{height: 20, width: 20}} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    likeButtonWrapper: {
        zIndex: 1,
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 50,
        borderWidth: 1,
        padding: 3,
    }
});
