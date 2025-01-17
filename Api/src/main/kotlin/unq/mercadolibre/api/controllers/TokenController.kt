package com.unq.mercadolibre.api.controllers

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTCreator
import com.auth0.jwt.algorithms.Algorithm
import io.javalin.http.Context
import io.javalin.http.UnauthorizedResponse
import javalinjwt.JWTGenerator
import javalinjwt.JWTProvider
import model.User
import model.UserException
import service.MercadoLibreService
import unq.mercadolibre.api.models.Roles


val HEADER = "Authorization"
val SECRET = "Secret"

class UserGenerator: JWTGenerator<User> {
    override fun generate(user: User, alg: Algorithm?): String {
        val token: JWTCreator.Builder = JWT.create().withClaim("id", user.id)
        return token.sign(alg)
    }
}

class TokenController(private val service: MercadoLibreService) {

    private val algorithm = Algorithm.HMAC256(SECRET)
    private val verifier = JWT.require(algorithm).build()
    private val generator = UserGenerator()
    private val provider = JWTProvider(algorithm,generator,verifier)

    fun validate(ctx: Context) {
        val header = ctx.header(HEADER)
        when {
            ctx.routeRoles().contains(Roles.ANYONE) -> return
            header == null -> {
                throw UnauthorizedResponse("Invalid Token")
            }

            else -> {
                val user = tokenToUser(header)
                ctx.attribute("user", user)
                return
            }
        }
    }


    fun tokenToUser(header: String): User {
        val validateToken = provider.validateToken(header)
        if(validateToken.isPresent) {
            val userId = validateToken.get().getClaim("id").asString()
            try {
                return service.getUser(userId)
            } catch (error: UserException) {
                throw UnauthorizedResponse("User not found")
            }
        } else {
            throw UnauthorizedResponse("Invalid Token")
        }

    }

    fun generateUserToken(user: User): String {
        return generator.generate(user, algorithm)
    }
}


