import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Api = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((response) => {
                setData(response.data);
            })
            .catch(() => {
                setError(true); 
            })
            .finally(() => {
                console.log('done');
            });
    }, []);

    return (
        <div className="container mt-4">
            {error ? (
                <div className="alert alert-danger" role="alert">
                    Error fetching data.
                </div>
            ) : (
                <div className="row">
                    {data.map((item) => (
                        <div key={item.id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img src={item.image} className="card-img-top p-3" alt={item.title} style={{ height: '200px', objectFit: 'contain' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text text-muted">{item.description}</p>
                                    <p className="card-text fw-bold">${item.price}</p>
                                    <div className="mb-2">
                                        <span className="badge bg-primary me-2">Rating: {item.rating?.rate || 'N/A'}</span>
                                        <span className="badge bg-secondary">Count: {item.rating?.count || 'N/A'}</span>
                                    </div>
                                    <p className="card-text"><small className="text-muted">Category: {item.category}</small></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Api;
