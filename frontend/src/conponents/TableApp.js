import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { AppConsumer } from '../store';
import { SET_DATA } from '../store/action';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link as LinkApp } from 'react-router-dom';
import productApi from '../api/productApi';


export default function TableApp({ product, column, setIsGetProduct }) {

    const [state, dispatch] = AppConsumer();

    const handelEdit = (index) => {
        dispatch(SET_DATA(product[index]))
    }

    const handelDelete = (id) => {
        console.log(id);
        deleteProduct(id)
    }

    const deleteProduct = async (id) => {
        const res = await productApi.deleteProduct(id)
        setIsGetProduct(id)
    }



    const renderTableCell = () => {
        if (product.length > 0) {
            product.map(item => {
                Object.keys(item).forEach(key => {
                    return {
                        [key]: item[key]
                    }
                })
            })

        }
    }
    renderTableCell()

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {column.map((column, index) => (
                            <TableCell key={index} align="center">{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {product.map((item, index) => (
                        <TableRow
                            key={item.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="center">
                                {item.id}
                            </TableCell>
                            <LinkApp to={`${item.id}`}>
                                <TableCell align="center">{item.productName}</TableCell>
                            </LinkApp>
                            <TableCell align="center">{item.price}</TableCell>
                            <TableCell align="center">{item.quantity}</TableCell>
                            <TableCell align="center">{item.description}</TableCell>
                            <TableCell align="center"><Button variant="outlined" onClick={() => handelEdit(index)} startIcon={<EditIcon />}>Edit</Button></TableCell>
                            <TableCell align="center"> <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handelDelete(item.id)}>
                                Delete
                            </Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
    );
}