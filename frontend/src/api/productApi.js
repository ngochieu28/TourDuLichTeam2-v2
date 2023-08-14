import axiosClient from "./axiosClient";

const productApi = {
    getAll() {
        const url = `/product`
        return axiosClient.get(url)
    },
    getAllProduct(page) {
        const url = `/product?_page=${page}&_limit=5`
        return axiosClient.get(url)
    },
    getProductById(id) {
        const url = `/product/${id}`
        return axiosClient.get(url)
    },
    addProduct(data) {
        const url = '/product'
        return axiosClient.post(url, data)
    },

    updateProduct(id, data) {
        const url = `/product/${id}`
        return axiosClient.put(url, data)
    },
    deleteProduct(id) {
        const url = `/product/${id}`
        return axiosClient.delete(url)
    }
}

export default productApi