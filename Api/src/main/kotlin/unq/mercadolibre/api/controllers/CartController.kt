package unq.mercadolibre.api.controllers

import com.fasterxml.jackson.core.JsonParseException
import com.fasterxml.jackson.databind.exc.MismatchedInputException
import com.grupo10.Models.CartBody
import com.grupo10.Models.CartDTO
import com.grupo10.Models.PaymentBody
import com.grupo10.Models.UserDTO
import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import io.javalin.http.UnauthorizedResponse
import model.*
import service.MercadoLibreService
import unq.mercadolibre.api.util.getUserFromContext
import unq.mercadolibre.api.util.preventEmptyFields
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException

class CartController(private val service: MercadoLibreService) {

    fun getCart(ctx: Context) {
        val user = getUserFromContext(ctx)
        try {
            val cart = service.getCart(user.id)
            ctx.json(CartDTO(cart))
        } catch (e: UserException){
            throw UnauthorizedResponse(e.message!!)
        }
    }

    fun addProductToCart(ctx: Context){
        val user = getUserFromContext(ctx)
        try {
            val product = ctx.bodyAsClass(CartBody::class.java)
            preventEmptyFields(product)
            if(product.amount <= 0) throw BadRequestResponse("Amount must be greater than 0")
            ctx.json(CartDTO(service.updateItemCart(user.id, product.productId, product.amount)))
        } catch (e: UserException){
            throw NotFoundResponse("User was not found")
        } catch (e: ProductException){
            throw NotFoundResponse("Product was not found")
        } catch (e: MismatchedInputException) {
            throw BadRequestResponse("Invalid request body")
        } catch (e: JsonParseException) {
            throw BadRequestResponse("Invalid request body")
        }
    }

    fun removeProductFromCart(ctx: Context){
        val productId = ctx.pathParam("id")
        val user = getUserFromContext(ctx)
        try {
            ctx.json(CartDTO(service.deleteItemFromCart(user.id, productId)))
        } catch (e: UserException){
            throw NotFoundResponse("User was not found")
        } catch (e: ProductException){
            throw NotFoundResponse("Product was not found")
        }
    }

    fun purchaseCart(ctx: Context){
        val user = getUserFromContext(ctx)
        val formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss")

        try {
            val payment = ctx.bodyAsClass(PaymentBody::class.java)
            preventEmptyFields(payment)
            service.purchase(
                user.id,
                Payment(payment.cardNumber,
                    LocalDateTime.parse((payment.expirationDate + "/01 00:00:00"), formatter),
                    payment.cvv,
                    payment.name
                )
            )
            ctx.json(UserDTO(service.getUser(user.id)))

        } catch (e: PurchaseException){
            throw BadRequestResponse("The cart is empty or items are out of stock.")
        } catch (e: UserException){
            throw NotFoundResponse("User was not found")
        } catch (e: MismatchedInputException) {
            throw BadRequestResponse("Invalid request body")
        } catch (e: JsonParseException) {
            throw BadRequestResponse("Invalid request body")
        } catch (e: DateTimeParseException) {
            throw BadRequestResponse("Invalid request body. The expirationDate must follow the yyyy/mm format")
        }
    }

}