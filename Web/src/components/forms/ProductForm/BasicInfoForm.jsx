function BasicInfoForm({ formData, setFormData, errors, setErrors, categories }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'shipping') {
            setFormData(prevState => ({
                ...prevState,
                shipping: {
                    "price": parseFloat(value)
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
        setErrors(prevState => ({
            ...prevState,
            [name]: false
        }));
    };

    return (
        <div className="row row-cols-2 py-4">
        <label className="px-4 d-flex flex-column">
            Titulo
            <input 
            type="text" 
            name="title" 
            placeholder='Ingrese un título'
            value={formData.title} 
            className={errors.title ? "input-error" : ""}
            onChange={handleChange}
            />
        </label>

        <label className="px-4 d-flex flex-column">
            Descripción
            <textarea type="text" name="description" 
            value={formData.description} 
            placeholder='Ingrese una descripción'
            className={errors.description ? "input-error" : ""}
            onChange={handleChange}/>
        </label>

        <label className="px-4 d-flex flex-column">
            Precio
            <input 
            type="number" 
            min="0" 
            placeholder='Ingrese el precio del producto'
            name="price" value={formData.price} 
            className={errors.price ? "input-error" : ""}
            onChange={handleChange}/>
            {errors.price && <span className="error-message">Ingrese un numero positivo valido</span>}
        </label>

        <label className="px-4 d-flex flex-column">
            Stock
            <input 
            type="number" 
            min="0" 
            name="stock" value={formData.stock} 
            placeholder='Ingrese la cantidad de stock disponible'
            className={errors.stock ? "input-error" : ""}
            onChange={handleChange}/>
            {errors.stock && <span className="error-message">Ingrese un numero positivo valido</span>}
        </label>

        <label className="px-4 d-flex flex-column">
            Envío
            <input 
            type="number" 
            min="0" 
            placeholder='Ingrese el precio de envío'
            name="shipping" value={formData.shipping.price} 
            className={errors.shipping ? "input-error" : ""}
            onChange={handleChange}/>
            {errors.shipping && <span className="error-message">Ingrese un numero positivo valido</span>}
        </label>

        <label className="px-4 d-flex flex-column">
            Categoria
            <select 
            style={{maxHeight:"45px"}}
            className={`text-capitalize rounded p-1 mt-1 ${errors.categoryId ? "input-error" : ""}`} 
            name="categoryId" 
            onChange={handleChange}
            defaultValue={formData.categoryId || "Seleccionar"}
            >
                <option disabled>Seleccionar</option>
                {categories ?
                    categories.map((category) => (
                        <option 
                        key={category.id} 
                        value={category.id}
                        >
                            {category.name.replace("-", " ")}
                        </option>
                    ))
                    : null
                }
            </select>
        </label>
    </div>
    );
}

export default BasicInfoForm;