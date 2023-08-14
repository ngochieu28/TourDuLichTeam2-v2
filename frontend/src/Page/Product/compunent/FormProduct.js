import React, { useEffect, useState } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Grid from '@mui/joy/Grid';
import Container from '@mui/material/Container';
import { AppConsumer } from '../../../store';
import productApi from '../../../api/productApi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";



export default function FormProduct({ setIsGetProduct }) {
    const [state, dispatch] = AppConsumer();
    const [isEdit, setIsEdit] = useState(null)

    const schema = yup.object({
        productName: yup.string().required('This field is required'),
        price: yup.number().required('This field is required'),
        quantity: yup.number().required('This field is required'),
        description: yup.string().required('This field is required')
    })

    const { handleSubmit, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            productName: "",
            price: "",
            quantity: "",
            description: ""
        },
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        setValue("productName", state.data.productName)
        setValue("price", state.data.price)
        setValue("quantity", state.data.quantity)
        setValue("description", state.data.description)

        setIsEdit(state.data)
    }, [state.data])


    const onSubmit = (data) => {
        if (isEdit) {
            // putProduct(data);
            updateProduct(data)
            setIsEdit(null)
        }
        else {
            // postProduct(data)
            addProduct(data)
        }
        reset();
    }


    ///////////////////////// FETCH ////////////////////////////////////
    // const postProduct = async (data) => {
    //     if (!data.productName || !data.price) {
    //         return;
    //     }
    //     const res = await fetch('http://localhost:3000/product', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //     setIsGetProduct(data)
    // }

    // const putProduct = async (data) => {
    //     const res = await fetch(`http://localhost:3000/product/${state.data.id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //     setIsGetProduct(data)
    // }
    //////////////////////////////////////////////////////////////////////

    /////////////////////// AXIOS ////////////////////////////////////////
    const addProduct = async (data) => {
        let res = await productApi.addProduct(data)
            .then(setIsGetProduct(data));

    }

    const updateProduct = async (data) => {
        let res = await productApi.updateProduct(state.data.id, data)
            .then(setIsGetProduct(data))
    }

    return (
        <div>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} columns={12}>
                        <Grid xs={4}>
                            <Controller name="productName" control={control} render={({ field }) => (
                                <TextField
                                    name='productName'
                                    label='ProductName'
                                    placeholder='ProductName'
                                    {...field}
                                    fullWidth
                                    helperText={errors.productName && errors.productName.message}
                                    error={!!errors.productName}
                                />
                            )} />
                        </Grid>
                        <Grid xs={4}>
                            <Controller name="price" control={control} render={({ field }) => (
                                <TextField
                                    name='price'
                                    label='price'
                                    placeholder='price'
                                    {...field}
                                    fullWidth
                                    type='number'
                                    helperText={errors.price && errors.price.message}
                                    error={!!errors.price}
                                />
                            )} />
                        </Grid>
                        <Grid xs={4}>
                            <Controller name="quantity" control={control} render={({ field }) => (
                                <TextField
                                    name='quantity'
                                    label='quantity'
                                    placeholder='quantity'
                                    {...field}
                                    fullWidth
                                    type='number'
                                    helperText={errors.quantity && errors.quantity.message}
                                    error={!!errors.quantity}
                                />
                            )} />
                        </Grid>
                        <Grid xs={12}>
                            <Controller name="description" control={control} render={({ field }) => (
                                <TextField
                                    name='description'
                                    label='description'
                                    placeholder='description'
                                    {...field}
                                    fullWidth
                                    helperText={errors.description && errors.description.message}
                                    error={!!errors.description}
                                />
                            )} />
                        </Grid>
                    </Grid>
                    <br></br>
                    <Button variant="contained" type='submit'>{isEdit ? "Update" : "Add"}</Button>
                </form>
            </Container>
        </div>
    )
}

