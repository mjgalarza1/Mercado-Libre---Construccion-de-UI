package com.grupo10.Models

import model.*
import utilities.Page

class LoginBody(val email: String, val password: String)

class RegisterBody(val name: String, val email: String, val password: String, val image: String)

class ProductBody(var title: String, var description: String, var price: Double, var images: MutableList<String>, var stock: Int, var shipping: Shipping, var characteristics: MutableList<Characteristic>, var categoryId: String)


class UserDTO(user: User) {
    val id = user.id
    val name = user.name
    val email = user.email
    val image = user.image
    val purchaseHistory = user.purchaseHistory.map { PurchaseHistoryDTO(it) }
    val products = user.products.map { SimpleProductDTO(it) }
    val likedproducts = user.likedProducts.map { SimpleProductDTO(it) }
    val salesHistory = user.salesHistory.map { SaleHistoryDTO(it) }
}

class SaleHistoryDTO(saleHistory: SaleHistory) {
    val product = SimpleProductDTO(saleHistory.product)
    val amount = saleHistory.amount
    val payment = PaymentDTO(saleHistory.payment)
    val date = saleHistory.date
    val user = SimpleUser(saleHistory.user)
}

class SimpleProductDTO(product: Product) {
    val id = product.id
    var title = product.title
    var description = product.description
    var price = product.price
    var images = product.images
    val owner = SimpleUser(product.owner)
    var category = product.category
    var shipping = product.shipping
}

class SimpleUser(user: User) {
    val id = user.id
    val name = user.name
    val email = user.email
    val image = user.image
}

class ItemDTO(item: Item) {
    val product = SimpleProductDTO(item.product)
    var amount = item.amount
}

class PurchaseHistoryDTO(purchaseHistory: PurchaseHistory) {
    val items = purchaseHistory.items.map { ItemDTO(it) }
    val payment = PaymentDTO(purchaseHistory.payment)
    val date = purchaseHistory.date
}

class PaymentDTO(payment: Payment) {
    val name = payment.name
    val cardNumber = payment.cardNumber
    val cvv = payment.cvv
    val expirationDate =  payment.expirationDate.year.toString() + "/" + payment.expirationDate.monthValue.toString()

}


class ProductDTO(product: Product) {
    val id: String = product.id
    val owner: SimpleUser = SimpleUser(product.owner)
    var title: String = product.title
    var description: String = product.description
    var images: MutableList<String> = product.images
    var stock: Int = product.stock
    var price: Double = product.price
    var shipping = product.shipping
    var characteristic: MutableList<Characteristic> = product.characteristics
    var category = product.category
    val questions: MutableList<QuestionDTO> = product.questions.map { QuestionDTO(it) }.toMutableList()
}


class PageDTO(prods: Page<Product>) {
    val products = prods.items.map { SimpleProductDTO(it)}
    val currentPage = prods.currentPage
    val amountOfPages = prods.amountOfPages
    val amountOfElements = prods.amountOfElements
}

class QuestionBody(val text: String)

class CartBody(val productId: String, val amount: Int)

class PaymentBody(val cardNumber: String, val expirationDate: String, val cvv: String, val name: String)

class QuestionDTO(question: Question) {
    val id = question.id
    val user = SimpleUser(question.user)
    val text = question.text
    var response = question.response
}

class CartDTO(cart: Cart) {
    val user = SimpleUser(cart.user)
    val items = cart.items.map { ItemDTO(it) }
}

class listOfProductDTO(products: List<Product>) {
   val products = products.map { SimpleProductDTO(it) }
}

class Category(id: String, name: String)