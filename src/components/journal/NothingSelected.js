import React from 'react'

export const NothingSelected = () => {
    return (
        <div className="nothing__main-content">
            <div className="mb-5">
                <p>
                    Selecciona..
                    <br />
                    crea una entrada
                </p>
            </div>

            {/* <i className="far fa-star fa-4x mt-5"></i> */}
            <i class="fas fa-smile-beam fa-5x"></i>
        </div>
    )
}
