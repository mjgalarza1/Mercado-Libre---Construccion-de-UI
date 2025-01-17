export const formatStr = (str = "") => {
    return (str.charAt(0).toUpperCase() + str.slice(1)).replace("-"," ");
}