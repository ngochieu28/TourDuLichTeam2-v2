import React from 'react'
import { useCheckAdmin } from '../../util/CheckLogin'

export default function AdminPage() {
    useCheckAdmin();
    return (
        <h1 style={{ textAlign: 'center' }}>AdminPage</h1>
    )
}
