export const totalPrice = (cart) => cart?.items?.reduce((total, item) => { return total + item.product.price * item.amount + item.product.shipping.price }, 0).toFixed(2)
export const shippingTotal = (cart) => cart?.items?.reduce((total, item) => { return total + item.product.shipping.price }, 0).toFixed(2)
