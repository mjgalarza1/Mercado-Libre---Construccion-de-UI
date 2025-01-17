package unq.mercadolibre.api.util

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.UnauthorizedResponse
import model.User

fun getUserFromContext(ctx: Context): User {
    return ctx.attribute<User>("user") ?: throw UnauthorizedResponse()
}

fun preventEmptyFields(body: Any) {
    for(prop in body.javaClass.declaredFields) {
        prop.isAccessible = true
        if(prop.get(body) == null || prop.get(body) == "") {
            throw BadRequestResponse("Empty field: ${prop.name}")
        }
    }
}