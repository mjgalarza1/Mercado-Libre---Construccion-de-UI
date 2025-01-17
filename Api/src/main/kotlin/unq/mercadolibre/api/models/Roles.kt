package unq.mercadolibre.api.models

import io.javalin.security.RouteRole

enum class Roles: RouteRole {
    ANYONE,
    USER

}