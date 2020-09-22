import React from 'react';

import './styles.css';

export default function Button({ children, ...rest }) {
    return (
        <button type="submit" {...rest} className="button">
        {children}
    </button>
    )
}