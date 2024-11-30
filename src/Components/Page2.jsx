import React, { useEffect, useState } from 'react'
import nameData from './Users';
const Page2 = () => {
    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [city, setCIty] = useState('');

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(nameData));
        const storedData = localStorage.getItem('userData');
        const parsedStoredData = JSON.parse(storedData);
        setData(parsedStoredData);
        console.log("Fetching data from local storage Done!!");
    }, [])


    const handleEdit = (id) => { 
        const editUser = data.find(user => user.id === id);
        setName(editUser.name);
        setEmail(editUser.email);
        setAge(editUser.age);
        setCIty(editUser.city);
        setSelectedUser(id);
    }

    const handleDelete = (id) => {
        if (window.confirm(`Deleted Id number - ${id}, succesfully`)) {
            const newData = data.filter(user => user.id !== id);
            localStorage.setItem('userData', JSON.stringify(newData));
            setData(newData);
        } else {
            alert("Delete operation cancelled");
        }
    }

    const handleChange = (event) => {
        if (event.target.name === 'name') {
            setName(event.target.value);
        } else if (event.target.name === 'email') {
            setEmail(event.target.value);
        } else if (event.target.name === 'age') {
            setAge(event.target.value);
        } else if (event.target.name === 'city') {
            setCIty(event.target.value);
        }
    };


    const handleSaveAndUpdate = () => {
        if (selectedUser !== null) {
            const updatedData = data.map(user => {
                if (user.id === selectedUser) {
                    return ({
                        ...user,
                        name: name,
                        email: email,
                        age: age,
                        city: city
                    })
                } else {
                    return user;
                }
            })
            localStorage.setItem('userData', JSON.stringify(updatedData));
            setData(updatedData);
            handleclear();
        }else{
            handleclear();
            handleCreate();
        }
    }


    const handleCreate = () => {
        const newCreatedData = [
            ...data,
            {
                id: data.length + 1,
                name: name,
                email: email,
                age: age,
                city: city
            }
        ]
        localStorage.setItem('userData', JSON.stringify(newCreatedData));
        setData(newCreatedData);
    }

    const handleclear = () => {
        setName('');
        setEmail('');
        setAge('');
        setCIty('');
    }
    return (
        <div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">Edit Data & Save</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <span className="input-group-text">Name</span>
                                <input type="text" onChange={handleChange} value={name} aria-label="name" name='name' className="form-control" />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Email</span>
                                <input type="email" onChange={handleChange} value={email} aria-label="email" name='email' className="form-control" />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Age</span>
                                <input type="number" onChange={handleChange} value={age} aria-label="age" name='age' className="form-control" />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">City</span>
                                <input type="text" onChange={handleChange} value={city} aria-label="city" name='city' className="form-control" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleSaveAndUpdate} className="btn btn-primary">Save changes</button>
                            <button type="button" className="btn btn-warning" onClick={handleclear} >Clear
                                <i className="fa-solid fa-broom mx-1"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <table className='table table-hover table-striped text-center'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>City</th>
                        <th>Actions
                        <button type="button" className="btn btn-success mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Create
                        <i className="fa-regular fa-pen-to-square mx-1"></i></button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>{user.city}</td>
                                <td>
                                    <button type="button" onClick={() => handleEdit(user.id)} className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit
                                        <i className="fa-regular fa-pen-to-square mx-1"></i></button>
                                    <button type="button" onClick={() => handleDelete(user.id)} className="btn btn-danger mx-3">Delete
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

export default Page2
