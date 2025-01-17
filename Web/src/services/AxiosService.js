import axios from 'axios';

const axiosService = axios.create({
  baseURL: 'http://localhost:7070', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
  IDLE: "idle"
};

//USER

export async function getUserById(id, setUser, setStatus) {
  setStatus(STATUS.LOADING);
  try {
    const response = await axiosService.get(`/user/${id}`);
    setUser(response.data);
    setStatus(STATUS.SUCCESS);
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
    setStatus(STATUS.ERROR);
  }
}


export async function login(loginBody) {
  try {
    const response = await axiosService.post('/login', loginBody);
    localStorage.setItem('authorization', response.headers['authorization']); 
    localStorage.setItem('username', response.data.name); 
    return true; 
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
    return false;
  }
};

export async function register(registerBody) {
  try {
    const response = await axiosService.post('/register', registerBody);
    localStorage.setItem('authorization', response.headers['authorization']);
    localStorage.setItem('username', response.data.name);
    return true;
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
    return error.response.data.title;
  }
}


export async function getUserDetails(setUserDTO, setStatus) {
  setStatus(STATUS.LOADING);
  try {
    const response = await axiosService.get('/user', {
      headers: {
        'Authorization': localStorage.getItem('authorization'),
      }
    }, );
    setUserDTO(response.data);
    setStatus(STATUS.SUCCESS);
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
    setStatus(STATUS.ERROR);
  }
}

// PRODUCTS

export async function getProduct(productId, setProduct, setStatus) {
  setStatus(STATUS.LOADING);
  try {
    const response = await axiosService.get(`/products/${productId}`);
    setProduct(response.data);
    setStatus(STATUS.SUCCESS);
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
    setStatus(STATUS.ERROR);
  }
};

export async function getProducts(setProducts, setStatus, page) {
  setStatus(STATUS.LOADING);
  try {
    const response = await axiosService.get('/products', {params: {page: page}});
    setProducts(response.data);
    setStatus(STATUS.SUCCESS);
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
    setStatus(STATUS.ERROR);
  }
}

export async function getRelatedProducts(productId, setProducts, setStatus= () => {}){
  setStatus(STATUS.LOADING);
  try {
    const response = await axiosService.get(`/products/${productId}/related`);
    setProducts(response.data.products);
    setStatus(STATUS.SUCCESS);
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
    setStatus(STATUS.ERROR);
  }
};

export async function createProduct(productData, setStatus) {
  setStatus(STATUS.LOADING);
  try {
      const response = await axiosService.post('/products', productData, {
        headers: {
          'Authorization': localStorage.getItem('authorization'),
          'Content-Type': 'application/json',
        }
      });
      setStatus(STATUS.SUCCESS);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      setStatus(STATUS.ERROR);
    }
}

export async function updateProduct(id, product, setStatus){
  setStatus(STATUS.LOADING);
  try {
    await axiosService.put(`/products/${id}`, product, {
      headers: {
        'Authorization' : localStorage.getItem('authorization')
      }
    });
    setStatus(STATUS.SUCCESS);
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
    setStatus(STATUS.ERROR);
  }
}


export async function likeProduct(id) {
  try {
    await axiosService.put(`/products/${id}/like`,{}, {
      headers: {
        'Authorization' : localStorage.getItem('authorization')
      }
    });
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
  }
}

export async function searchProducts(query, setProducts, setStatus, page) {
  setStatus(STATUS.LOADING);
  try {
    const response = await axiosService.get('/search', {
      params: {
        query: query,
        page: page
      }
    });
    setProducts(response.data);
    setStatus(STATUS.SUCCESS);
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
    setStatus(STATUS.ERROR);
  }
}


export async function getUserProducts(id, setProducts, setStatus, page) {
  setStatus(STATUS.LOADING);
  try {
    const response = await axiosService.get(`/user/${id}/products`, {
      params: {
        page: page
      }
    });
    setProducts(response.data);
    setStatus(STATUS.SUCCESS);
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
    setStatus(STATUS.ERROR);
  }
}

export async function addQuestionToProduct(id, questionBody, setStatus){ 
  setStatus(STATUS.LOADING);
  try {
    await axiosService.post(`/products/${id}/question`, questionBody, {
      headers: {
        'Authorization' : localStorage.getItem('authorization')
      }
    });
    setStatus(STATUS.SUCCESS);
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
    setStatus(STATUS.ERROR);
  }
}

export async function addAnswerToAQuestion(id, questionId, questionBody, setStatus){ 
  setStatus(STATUS.LOADING);
  try {
    await axiosService.put(`/products/${id}/question/${questionId}`, questionBody, {
      headers: {
        'Authorization' : localStorage.getItem('authorization')
      }
    });
    setStatus(STATUS.SUCCESS);
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
    setStatus(STATUS.ERROR);
  }
}



// CATEGORIES

export async function getCategories(setCategories, setStatus){
  setStatus(STATUS.LOADING);
  try {
    const response = await axiosService.get('/categories');
    setCategories(response.data);
    setStatus(STATUS.SUCCESS);
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
    setStatus(STATUS.ERROR);
  }
}

export async function getCategory(categoryID, setCategory, setStatus){
  setStatus(STATUS.LOADING);
  try {
    const response = await axiosService.get(`/categories`);
    setCategory(response.data.find(category => category.id === categoryID));
    setStatus(STATUS.SUCCESS);
    } catch (error) {
      console.error(`${error.message} - ${error.response.data.title}`);
      setStatus(STATUS.ERROR);
  }
};

export async function getPageByCategory(categoryID, setProducts, setStatus, page,){
  setStatus(STATUS.LOADING);
  try {
    const response = await axiosService.get(`/categories/${categoryID}`, {params: {page: page}});
    setProducts(response.data);
    setStatus(STATUS.SUCCESS);
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
    setStatus(STATUS.ERROR);
  }
};



//  CART

export async function getCart(setCart) {
  try {
    const response = await axiosService.get('/cart', 
      {
        headers: {
          'Authorization' : localStorage.getItem('authorization')
        }
    });
    const sortedItems = response.data.items.sort((a, b) => a.product.title.localeCompare(b.product.title));
    setCart(sortedItems);
  } catch (error) {
    console.log(error)
  }
}

export async function addToCart(productId, amount, setStatus) {
  setStatus(STATUS.LOADING);
  try {
    await axiosService.put('/cart', {
      productId: productId,
      amount: amount
    }, {
      headers: {
        'Authorization' : localStorage.getItem('authorization')
      }
    });
    setStatus(STATUS.SUCCESS);
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
    setStatus(STATUS.ERROR);
  }
}

export async function removeFromCart(productId) {
  try {
    await axiosService.delete(`/cart/${productId}`, {
      headers: {
        'Authorization' : localStorage.getItem('authorization')
      }
    });

  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
  }
}

export async function purchaseCart(paymentBody, setStatus) {
  setStatus(STATUS.LOADING);
  try {
    await axiosService.post('/purchase', paymentBody, {
      headers: {
        'Authorization' : localStorage.getItem('authorization')
      }
    });
    setStatus(STATUS.SUCCESS);
  } catch (error) {
    console.error(`${error.message} - ${error.response.data.title}`);
    setStatus(STATUS.ERROR);
  }
}