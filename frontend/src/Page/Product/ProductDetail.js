import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productApi from '../../api/productApi';

export default function ProductDetail() {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState()

    useEffect(() => {
        if (id) {
            getDetail();
        }
    }, [])

    const getDetail = async () => {
        const res = await productApi.getProductById(id)
        setProductDetail(res.data)
    }

    return (
        <div>
            <h3>ProductDetail</h3>
            <p>{productDetail.id}</p>
            <p>{productDetail.productName}</p>
            <p>{productDetail.price}</p>
            <p>{productDetail.quantity}</p>
            <p>{productDetail.description}</p>
        </div>

    )
}
