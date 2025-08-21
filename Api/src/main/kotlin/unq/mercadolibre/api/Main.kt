package unq.mercadolibre.api

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import unq.mercadolibre.api.models.Roles
import com.unq.mercadolibre.api.controllers.TokenController
import com.unq.mercadolibre.api.controllers.UserController
import data.initSystem
import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.json.JavalinJackson
import service.MercadoLibreService
import unq.mercadolibre.api.controllers.CartController
import unq.mercadolibre.api.controllers.CategoryController
import unq.mercadolibre.api.controllers.ProductController

object Api {

    private val app: Javalin
    private val service: MercadoLibreService = initSystem()
    private val tokenController = TokenController(service)
    private val userController = UserController(service, tokenController)
    private val productController = ProductController(service)
    private val categoryController = CategoryController(service)
    private val cartController = CartController(service)

    init {
        app = Javalin.create { config ->
            config.http.defaultContentType = "application/json"
            config.bundledPlugins.enableCors { cors ->
                cors.addRule {
                    it.anyHost()
                }
            }
            config.jsonMapper(JavalinJackson(jacksonObjectMapper().findAndRegisterModules())) // sin esto no se puede utilizar el LocalDateTime
            config.router.apiBuilder {
                path("/") {
                    get({ ctx -> ctx.result("test") }, Roles.ANYONE)
                }

                path("/login") {
                    post(userController::loginUser, Roles.ANYONE)
                }
                path("/register") {
                    post(userController::registerUser, Roles.ANYONE)
                }
                path("/user") {
                    get(userController::getUser, Roles.USER)
                    path("/{id}") {
                        get(userController::getUserById, Roles.ANYONE)
                        path("/products") {
                            get(userController::userProducts, Roles.ANYONE)
                        }
                    }
                }

                path("/products") {
                    get(productController::getAllProducts, Roles.ANYONE)
                    post(productController::createProduct, Roles.USER)
                    path("/{id}") {
                        get(productController::getProductById, Roles.ANYONE)
                        put(productController::updateProduct, Roles.USER)

                        path("/related") {
                            get(productController::getRelatedProducts, Roles.ANYONE)
                        }

                        path("/question") {
                            post(productController::addQuestionToProduct, Roles.USER)
                            path("/{questionId}") {
                                put(productController::addAnswerToQuestionOfProduct, Roles.USER)
                            }
                        }

                        path("/like") {
                            put(productController::likeProduct, Roles.USER)
                        }
                    }
                }
                path("/search") {
                    get(productController::searchProduct, Roles.ANYONE)
                }

                path("/categories") {
                    get(categoryController::getAllCategories, Roles.ANYONE)
                    path("/{id}") {
                        get(categoryController::getCategoryById, Roles.ANYONE)
                    }
                }

                path("/cart") {
                    get(cartController::getCart, Roles.USER)
                    put(cartController::addProductToCart, Roles.USER)
                    path("/{id}") {
                        delete(cartController::removeProductFromCart, Roles.USER)
                    }
                }
                path("/purchase") {
                    post(cartController::purchaseCart, Roles.USER)
                }
            }
        }

        app.beforeMatched(tokenController::validate)

        app.after { ctx ->
            ctx.header("Access-Control-Expose-Headers", "Authorization")
        }


    }

    fun start() {
        app.start(7070)
    }

}

fun main() {
    Api.start()
}



