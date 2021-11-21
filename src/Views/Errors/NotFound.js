import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div>
            <h1>Not Found</h1>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    )
}
