import React, { useEffect, useState } from 'react'
import userData from './Data'


const Crud = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [updateId, setUpdateId] = useState(null);

    useEffect(() => {
        sessionStorage.setItem('userData', JSON.stringify(userData));
        const storedData = sessionStorage.getItem('userData');
        const parsedStoredData = JSON.parse(storedData);
        setData(parsedStoredData);
    }, [])

    const handleEdit = (id) => {
        const DataToEdit = data.find((item) => item.id === id);
        if (DataToEdit !== undefined) {
            setName(DataToEdit.name);
            setEmail(DataToEdit.email);
            setUpdateId(id);
        }
    }
    const handleDelete = (id) => {
        if (window.confirm(`Are You Sure, You want delete number ${id}?`)) {
            const newData = data.filter((item) => item.id !== id);

            sessionStorage.setItem('userData', JSON.stringify(newData));
            setData(newData);
        }
    }
    const handleChange = (e) => {
        if (e.target.name === "userName") {
            setName(e.target.value);
        } else if (e.target.name === "userEmail") {
            setEmail(e.target.value);
        }
    };
    const handleSaveAndUpdate = () => {
        const updatedData = data.map((item) => {
            if (item.id === updateId) {
                return { id: item.id, name: name, email: email };
            } else { return item }
        })
        sessionStorage.setItem('userData', JSON.stringify(updatedData));
        setData(updatedData)
        handleCreate();
        handleclear();
        alert('Record updated');
    }

    const handleCreate = () => {
        const newCreatedData = [
            ...data,
            {
                id: data.length + 1,
                name: name,
                email: email
            }
        ]
        sessionStorage.setItem('userData', JSON.stringify(newCreatedData));
        setData(newCreatedData);
        handleclear();
    }

    const handleclear = () => {
        setName('');
        setEmail('');
    }
    return (
        <div className='container'>
            <div className="container">
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
                                    <input type="text" value={name} onChange={handleChange} className="form-control" id="userName" name='userName' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="userEmail" className="form-label">Email address</label>
                                    <input type="email" value={email} onChange={handleChange} className="form-control" id="userEmail" name='userEmail' />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveAndUpdate}>Save changes</button>
                                <button type="button" className="btn btn-warning" onClick={handleclear} >Clear
                                    <i className="fa-solid fa-broom mx-1"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table className='table table-hover text-center'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action
                            <button type="button" className="btn btn-success mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Create
                                <i className="fa-regular fa-pen-to-square mx-1"></i></button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                    <button type="button" onClick={() => handleEdit(item.id)} className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit
                                        <i className="fa-regular fa-pen-to-square mx-1"></i></button>
                                    <button type="button" onClick={() => handleDelete(item.id)} className="btn btn-danger mx-3">Delete
                                        <i className="fa-solid fa-trash mx-1"></i></button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Crud
