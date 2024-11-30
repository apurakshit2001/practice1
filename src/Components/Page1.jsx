import React, { useEffect, useState } from 'react';
import Data from './Data';

const Page1 = () => {
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({
        userName: "",
        userEmail: ""
    })

    useEffect(() => {
        sessionStorage.setItem('userData', JSON.stringify(Data));

        const storedData = JSON.parse(sessionStorage.getItem('userData'));
        setData(storedData);
    }, []);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleEdit = (item) => {
        setSelectedItem(item.id)
    }

    const handleSaveAndUpdate = () => {
        const updatedData = data.map(
            (item) => {
                if (item.id === selectedItem) {
                    return { ...item, name: formData.userName, email: formData.userEmail };
                } else {
                    return item;
                }
            }
        );
        setData(updatedData);
    
        sessionStorage.setItem('userData', JSON.stringify(updatedData));
    
        setFormData({ userName: "", userEmail: "" });
        setSelectedItem(null);
    };
    


    return (
        <div className='container'>
            <h1>Data List</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id} className='my-3'>
                        <strong>{item.name}</strong> - {item.email}

                        <button type="button" className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal"
                            onClick={() => handleEdit(item)}>
                            Edit
                            <i className="fa-regular fa-pen-to-square mx-1"></i>
                        </button>
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">DataBase Update</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="userName" className="form-label">Enter Name</label>
                                            <input type="text" className="form-control" id="userName" name='userName' placeholder="Arpan Rakshit" onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="userEmail" className="form-label">Email address</label>
                                            <input type="email" className="form-control" id="userEmail" name='userEmail' placeholder="name@example.com" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={handleSaveAndUpdate}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page1;
