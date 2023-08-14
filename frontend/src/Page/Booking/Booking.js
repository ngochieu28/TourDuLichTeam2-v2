import React from 'react'
import { Container, Form, FormGroup, Label, Input, Row, Col, Table } from "reactstrap";
import { useState } from 'react';

const Booking = () => {
    const [count, setCount] = useState(1);
    const [childCount, setChildCount] = useState(0)
    const [treNho, setTreNho] = useState(0)
    const [emBe, setEmBe] = useState(0)

    const increaseAdultCount = () => {
        setCount(count + 1);
    };

    const decreaseAdultCount = () => {
        if (count > 1) {
            setCount(count - 1);
        } else {
            alert("Số lượng không thể nhỏ hơn 1!");
        }
    };

    const increaseChildCount = () => {
        setChildCount(childCount + 1);
    };

    const decreaseChildCount = () => {
        if (count > 0) {
            setChildCount(childCount - 1);
        }
    };

    const increaseTreNho = () => {
        setTreNho(treNho + 1);
    };

    const decreaseTreNho = () => {
        if (count > 0) {
            setTreNho(treNho - 1);
        }
    };

    const increaseEmbe = () => {
        setEmBe(emBe + 1);
    };

    const decreaseEmbe = () => {
        if (count > 0) {
            setEmBe(emBe - 1);
        }
    };

    return (
        <div >

        </div>
    )
}
export default Booking;