import React from 'react'
import TableApp from '../../conponents/TableApp'
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import FormProduct from './compunent/FormProduct';
import productApi from '../../api/productApi';
import Pagination from '@mui/material/Pagination';

export default function Product() {

    const [product, setProduct] = useState([]);
    const [column] = useState(["ProductID", "ProductName", "Price", "Quantity", "Description", "", ""])
    const [isGetProduct, setIsGetProduct] = useState();
    const [currentPage, setCurrentPage] = useState(1)
    const [productTest, setProductTest] = useState([]);

    useEffect(() => {
        getProduct();
        fetchAll()
    }, [isGetProduct])

    useEffect(() => {
        getProduct();
    }, [currentPage])

    const getProduct = async () => {
        const res = await productApi.getAllProduct(currentPage);
        // const data = await res.json();
        setProduct(res.data)
    }

    const handelPageChange = (event, values) => {
        setCurrentPage(values)
    }

    const fetchAll = async () => {
        const res = await productApi.getAll()
        setProductTest(res.data)
    }

    const countPage = productTest.length % 5 === 0 ? productTest.length / 5 : Math.floor(productTest.length / 5) + 1;

    return (
        <>
            <h1>Product</h1>
            <Container >
                <div>
                    <FormProduct setIsGetProduct={setIsGetProduct} />
                </div>
                <br></br>
                <hr></hr>
                <TableApp product={product} column={column} setIsGetProduct={setIsGetProduct} />
                <Pagination className='ChangePage' count={countPage} variant='outlined' shape='rounded' onChange={handelPageChange} />
            </Container>
        </>

    )
}
