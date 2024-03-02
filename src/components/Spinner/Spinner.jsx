import React from "react";
import { ScaleLoader } from 'react-spinners'

function Spinner() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ScaleLoader color="#0C1E40" />
        </div>
    )
}

export default Spinner