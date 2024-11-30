import React, { useEffect, useState } from 'react'

const CRUD = () => {
    const [name, setName] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([
        { id: 1, name: "Arpan" },
        { id: 2, name: "Arnab" }
    ])

    useEffect(() => {
        localStorage.setItem('USER', JSON.stringify(data));
        const storedData = JSON.parse(localStorage.getItem('USER'));
        setData(storedData);
    }, [])

    const handleCreate = () => {
        const demoData = [...data, { id: data.length + 1, name: name }]
        localStorage.setItem('USER', JSON.stringify(demoData));
        setData(demoData);
    }

    const handleSave = () => {
        let updatedData = data.map((user) => {
            if (user.id === selectedId) {
                return ({ ...user, name: name })
            }else{
                return user
            }
        })
        localStorage.setItem('USER', JSON.stringify(updatedData));
        setData(updatedData);
    }


    const handleEdit = (id) => {
        let dataTOedit = data.find((user) => user.id === id);
        if (dataTOedit !== undefined) {
            setName(dataTOedit.name);
            setSelectedId(dataTOedit.id);
        }
    }

    const handleDelete = (id) => {
        let newArr = data.filter((user) => user.id !== id);
        localStorage.setItem('USER', JSON.stringify(newArr));
        setData(newArr);
    }
    const handleClear = () => {
        setName('');
    }
    return (
        <div>
            <div>
                <input type="text" value={name} onChange={(event) => { setName(event.target.value) }} placeholder='Name..' />
                <button onClick={handleCreate}>Create</button>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleClear}>Clear</button>
            </div>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
                {data.map((user, id) => {
                    return (
                        <tr key={id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>
                                <button onClick={() => handleEdit(user.id)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default CRUD
