import React, { useState } from "react";

const Predict = ({ data = [] }) => {
    const [loading, setLoading] = useState(false);

    return (
        <div>
            {loading ? (
                <p>Loading prediction...</p>
            ) : (
                <div>
                    {data.length > 0 ? (
                        <p>Prediction: {data[0]}</p>
                    ) : (
                        <p>No prediction available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Predict;
