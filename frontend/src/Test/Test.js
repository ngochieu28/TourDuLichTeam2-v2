import React from 'react';
import { TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    fullName: yup.string().max(50, "Must be less than 50 characters").required('Required'),
    email: yup.string().email('Invalid email address').required('Required'),
    phoneNumber: yup.string().matches(/^\d{9,11}$/, "Must be between 9 and 11 digits").required('Required'),
    address: yup.string().max(50, "Must be less than 50 characters").required('Required'),
});

const MyForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                {...register('fullName')}
                label="Họ và tên"
                error={!!errors.fullName}
                helperText={errors?.fullName?.message}
            />

            <TextField
                {...register('email')}
                label="Email"
                error={!!errors.email}
                helperText={errors?.email?.message}
            />

            <TextField
                {...register('phoneNumber')}
                label="Số điện thoại"
                error={!!errors.phoneNumber}
                helperText={errors?.phoneNumber && errors?.phoneNumber?.message}
            />

            <TextField
                {...register('address')}
                label="Địa chỉ"
                error={!!errors.address}
                helperText={errors?.address && errors?.address?.message}
            />

            <Button type="submit">Submit</Button>
        </form>
    );
};

export default MyForm;