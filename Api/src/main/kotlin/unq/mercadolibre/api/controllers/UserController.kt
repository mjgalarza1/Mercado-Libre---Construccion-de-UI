package com.unq.mercadolibre.api.controllers


import com.fasterxml.jackson.core.JsonParseException
import com.fasterxml.jackson.databind.exc.MismatchedInputException
import com.grupo10.Models.*
import io.javalin.http.*
import model.DraftNewUser
import model.UserException
import service.MercadoLibreService
import unq.mercadolibre.api.util.getUserFromContext
import unq.mercadolibre.api.util.preventEmptyFields
import java.util.regex.Pattern

class UserController(private val service: MercadoLibreService, private val tokenController: TokenController) {

    fun loginUser(ctx: Context): Context {
        try {
            val body = ctx.bodyAsClass(LoginBody::class.java)
            preventEmptyFields(body)

            val user = service.getUser(body.email, body.password)
            val token = tokenController.generateUserToken(user)
            ctx.header(HEADER, token)
            return ctx.json(UserDTO(user))
        } catch (e: UserException) {
            throw NotFoundResponse("user not found")
        } catch (e: MismatchedInputException) {
            throw BadRequestResponse("Invalid request body")
        } catch (e: JsonParseException) {
            throw BadRequestResponse("Invalid request body")
        }
    }

    fun getUser(ctx:Context): Context {
        return ctx.json(UserDTO(getUserFromContext(ctx)))

    }

    fun getUserById(ctx:Context): Context {
        val id = ctx.pathParam("id")
        try {
            val user = service.getUser(id)
            return ctx.json(SimpleUser(user))
        } catch (e: UserException) {
            throw NotFoundResponse("User not found")
        }

    }


    fun registerUser(ctx: Context): Context {
        try {
            val body = ctx.bodyAsClass(RegisterBody::class.java)
            preventEmptyFields(body)

            if(!isEmailValid(body.email)){ throw BadRequestResponse("email is not valid")
            } else {
                val draft = DraftNewUser(body.name, body.email, body.password, body.image)
                val user = service.registerNewUser(draft)
                val token = tokenController.generateUserToken(user)
                ctx.header(HEADER, token)
                return ctx.json(UserDTO(user))
            }

        } catch (e: UserException) {
            throw BadRequestResponse("email already in use")
        } catch (e: MismatchedInputException) {
            throw BadRequestResponse("Invalid request body")
        } catch (e: JsonParseException) {
            throw BadRequestResponse("Invalid request body")
        }
    }

    fun userProducts(ctx: Context): Context {
        val id = ctx.pathParam("id")
        val page = ctx.queryParam("page") ?: "1"
        try {
            service.getUser(id)
        } catch (e: UserException) {
            throw NotFoundResponse("user not found")
        }
        val userProducts = service.getProductsByUser(id, page.toInt())
        return ctx.json(PageDTO(userProducts))
    }

    fun isEmailValid(email: String): Boolean {
      return Pattern.compile(
        "^(([\\w-]+\\.)+[\\w-]+|([a-zA-Z]|[\\w-]{2,}))@"
        + "((([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\\.([0-1]?"
        + "[0-9]{1,2}|25[0-5]|2[0-4][0-9])\\."
        + "([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\\.([0-1]?"
        + "[0-9]{1,2}|25[0-5]|2[0-4][0-9]))|"
        + "([a-zA-Z]+[\\w-]+\\.)+[a-zA-Z]{2,4})$"
      ).matcher(email).matches()
    }

}
