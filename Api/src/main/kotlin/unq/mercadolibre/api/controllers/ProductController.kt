package unq.mercadolibre.api.controllers

import com.fasterxml.jackson.core.JsonParseException
import com.fasterxml.jackson.databind.exc.MismatchedInputException
import com.grupo10.Models.*
import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import model.*
import service.MercadoLibreService
import unq.mercadolibre.api.util.getUserFromContext
import unq.mercadolibre.api.util.preventEmptyFields

class ProductController(private val service: MercadoLibreService) {


    fun getAllProducts(ctx: Context): Context {
        val page = ctx.queryParam("page") ?: "1"
        try{
            if(page.toInt() < 1) {
                throw BadRequestResponse("Page number must be greater than 0")
            }
            val products = service.getAllProducts(page.toInt())
            return ctx.json(PageDTO(products))
        } catch (e: NumberFormatException) {
            throw BadRequestResponse("Invalid page number")
        } catch (e: JsonParseException) {
            throw BadRequestResponse("Invalid request body")
        }
    }


    fun createProduct(ctx:Context): Context {
        try {
            val user: User = getUserFromContext(ctx)
            val product = ctx.bodyAsClass(ProductBody::class.java)
            preventEmptyFields(product)
            productBodyValidation(product)
            val category = service.getCategory(product.categoryId)
            val draft = DraftProduct(
                product.title,
                product.description,
                product.price,
                product.images,
                product.stock,
                product.shipping,
                product.characteristics,
                category
            )
            return ctx.json(ProductDTO(service.addProduct(user.id, draft)))
        } catch (e: CategoryException ){
            throw NotFoundResponse("Category not found")
        } catch (e: MismatchedInputException) {
            throw BadRequestResponse("invalid input data")
        } catch (e: JsonParseException) {
            throw BadRequestResponse("Invalid request body")
        }
    }

    private fun productBodyValidation(product: ProductBody) {
        if (product.shipping.price < 0 || product.stock <= 0) throw BadRequestResponse("shipping or stock is invalid")
        if (product.price <= 0) throw BadRequestResponse("Product's price must be greater than 0")
        if (product.images.isEmpty()) throw BadRequestResponse("Product must have at least one image")
    }

    fun getProductById(ctx:Context): Context {
        val id = ctx.pathParam("id")
        try {
            val product = service.getProduct(id)
            return ctx.json(ProductDTO(product))
        } catch (e: ProductException) {
            throw NotFoundResponse("Product not found")
        }
    }

    fun updateProduct(ctx:Context): Context {
        try {
            val productID = ctx.pathParam("id")
            val user = getUserFromContext(ctx)

            val updated = ctx.bodyAsClass(ProductBody::class.java)
            preventEmptyFields(updated)
            productBodyValidation(updated)
            val category = service.getCategory(updated.categoryId)
            val draft = DraftProduct(
                updated.title,
                updated.description,
                updated.price,
                updated.images,
                updated.stock,
                updated.shipping,
                updated.characteristics,
                category
            )
            return ctx.json(ProductDTO(service.editProduct(user.id,productID,draft)))
        } catch (e: UserException) {
            throw NotFoundResponse("User not found")
        } catch (e: ProductException) {
            throw NotFoundResponse("Product not found or the user is not the owner of the product")
        } catch (e: MismatchedInputException) {
            throw BadRequestResponse("Invalid request body")
        } catch (e: JsonParseException) {
            throw BadRequestResponse("Invalid request body")
        } catch (e: CategoryException) {
            throw NotFoundResponse("Category not found")
        }
    }

    fun getRelatedProducts(ctx: Context){
        val id = ctx.pathParam("id")
        try{
            val products = service.getRelatedProducts(id)
            ctx.json(listOfProductDTO(products))
        } catch (e: ProductException) {
            throw BadRequestResponse("Product not found")
        }
    }
    
    fun addQuestionToProduct(ctx: Context) {
        try {
            val productID = ctx.pathParam("id")
            val question = ctx.bodyAsClass(QuestionBody::class.java)
            preventEmptyFields(question)
            val user = getUserFromContext(ctx)
            ctx.json(ProductDTO(service.addQuestion(user.id, productID, question.text)))
        } catch (e: QuestionException) {
            throw BadRequestResponse("The user is the owner of the product")
        } catch (e: UserException) {
            throw NotFoundResponse("User not found")
        } catch (e: ProductException) {
            throw NotFoundResponse("Product not found")
        } catch (e: MismatchedInputException) {
            throw BadRequestResponse("Invalid request body")
        } catch (e: JsonParseException) {
            throw BadRequestResponse("Invalid request body")
        }
    }
    
    fun addAnswerToQuestionOfProduct(ctx: Context) {
        try {
            val productID = ctx.pathParam("id")
            val questionID = ctx.pathParam("questionId")
            val question = ctx.bodyAsClass(QuestionBody::class.java)
            preventEmptyFields(question)
            val user = getUserFromContext(ctx)

            ctx.json(ProductDTO(service.addAnswer(user.id, productID, questionID, question.text)))
        } catch (e: QuestionException) {
            throw BadRequestResponse("The user is not the owner of the product or the question is not found")
        } catch (e: UserException) {
            throw NotFoundResponse("User not found")
        } catch (e: ProductException) {
            throw NotFoundResponse("Product not found")
        } catch (e: MismatchedInputException) {
            throw BadRequestResponse("Invalid request body")
        } catch (e: JsonParseException) {
            throw BadRequestResponse("Invalid request body")
        }
    }

    fun searchProduct(ctx: Context): Context {
        val query = ctx.queryParam("query") ?: throw BadRequestResponse("missing query parameter")
        val page = ctx.queryParam("page") ?: "1"
        try{
            if(page.toInt() < 1) { throw BadRequestResponse("Page number must be greater than 0")}
        } catch (e: NumberFormatException) {
            throw BadRequestResponse("Invalid page number")
        }
        return (ctx.json(PageDTO(service.searchProducts(query, page.toInt()))))
    }

    fun likeProduct(ctx: Context) {
        val productID = ctx.pathParam("id")
        val user = getUserFromContext(ctx)

        try {
            val newUser = service.toggleLike(user.id, productID)
            ctx.json(UserDTO(newUser))
        } catch (e: UserException) {
            throw NotFoundResponse("User not found")
        } catch (e: ProductException) {
            throw NotFoundResponse("Product not found")
        }
    }
}
