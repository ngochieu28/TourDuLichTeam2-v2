import React from 'react'
import { useCheckLogin } from '../../util/CheckAdmin'

export default function AdminPage() {
    useCheckLogin();
    return (
        <h1 style={{ textAlign: 'center' }}>AdminPage</h1>
    )
}
