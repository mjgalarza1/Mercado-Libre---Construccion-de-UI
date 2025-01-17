import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (token) => {
    try{
        await AsyncStorage.setItem('authorization', token);
    }catch(err){
        console.log(err)
    }
}

export const clearToken = async () => {
    try{
        await AsyncStorage.setItem('authorization', '');
    }catch(err){
        console.log(err)
    }
}

export const getToken = async () => {
    try{
        const token = await AsyncStorage.getItem('authorization');
        return token;
    } catch(err){
        console.log(err)
        return null
    }
}
