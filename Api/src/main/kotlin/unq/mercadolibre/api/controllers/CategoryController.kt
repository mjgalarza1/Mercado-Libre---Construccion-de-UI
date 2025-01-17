package unq.mercadolibre.api.controllers

import com.grupo10.Models.PageDTO
import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import model.CategoryException
import service.MercadoLibreService

class CategoryController(private val service: MercadoLibreService) {

    fun getAllCategories(ctx: Context): Context {
        val categories = service.getAllCategories()
        return ctx.json(categories)
    }

    fun getCategoryById(ctx: Context): Context {
        val id = ctx.pathParam("id")
        val page = ctx.queryParam("page") ?: "1"
        try{
            if(page.toInt() < 1) { throw BadRequestResponse("Page number must be greater than 0")}
            service.getCategory(id)
        } catch (e: NumberFormatException) {
            throw BadRequestResponse("Invalid page number")
        } catch (e: CategoryException) {
            throw NotFoundResponse("Category not found")
        }
        return ctx.json(PageDTO(service.getProductsByCategory(id,page.toInt())))
    }
}