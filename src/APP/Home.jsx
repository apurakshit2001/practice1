import React, { useEffect, useState } from 'react';

const Home = () => {
    const usersList = [
        { "user_id": 1001, 'firstName': 'John', 'lastName': 'Doe', 'age': 52, 'sal': 32000, 'doj': '12/12/21' },
        { "user_id": 1002, 'firstName': 'Smith', 'lastName': 'Winchester', 'age': 29, 'sal': 52000, 'doj': '08/01/23' },
        { "user_id": 1003, 'firstName': 'Doe', 'lastName': 'Diana', 'age': 33, 'sal': 22000, 'doj': '01/01/20' },
        { "user_id": 1004, 'firstName': 'Michael', 'lastName': 'Henna', 'age': 43, 'sal': 45000, 'doj': '11/22/18' },
    ];

    const [data, setData] = useState([]);
    const [userExp, setUserExp] = useState([]);

    useEffect(() => {
        setData(usersList);
        document.body.style.padding = '25px'
    }, []);

    const handleSortAgeDesc = (e) => {
        let descSortArr = [...data]
        descSortArr.sort((a, b) => a.age - b.age)
        setData(descSortArr);
    }

    const handleSortAgeAsc = (e) => {
        let descSortArr = [...data]
        descSortArr.sort((a, b) => a.age - b.age)
        setData(descSortArr.reverse());
    }

    const handleSortSalaryDesc = (e) => {
        let descSortArr = [...data]
        descSortArr.sort((a, b) => a.sal - b.sal)
        setData(descSortArr);
    }

    const handleSortDojDesc = (e) => {
        let descSortArr = [...data]
        descSortArr.sort((a, b) => new Date(b.doj) - new Date(a.doj))
        setData(descSortArr);
    }

    const handleSortDojAsc = (e) => {
        let descSortArr = [...data]
        descSortArr.sort((a, b) => new Date(b.doj) - new Date(a.doj))
        setData(descSortArr.reverse());
    }

    const handleAverageSalary = (e) => {
        let text = document.getElementById('output');
        let totalSalary = 0;
        for (let i = 0; i < data.length; i++) {
            totalSalary = totalSalary + parseFloat(data[i].sal);
        }
        let avgSal = totalSalary / data.length;
        text.textContent = `Average Salary: ${avgSal.toFixed(2)}`;
    }

    const handleShowUserEXP = (e) => {
        let expArr = data.map((user) => {
            let today = new Date();
            let doj = new Date(user.doj);
            let yearsOfExp = today.getFullYear() - doj.getFullYear();
            return {
                ...user,
                exp: yearsOfExp
            }
        })
        setUserExp(expArr);
    }
    const handleShowUsersNamedDoe = (e) => {
        let filterdUsers = data.filter((user) => {
            if (user.firstName.includes('Doe') || user.lastName.includes('Doe')) {
                return user;
            }
        })
        setData(filterdUsers);
    }

    const handleShowFilterdUsers = (e) => {
        let filterdUsers = data.filter((user) => {
            if (user.age > 20 && user.age < 30) {
                return user;
            }
        })
        setData(filterdUsers);
    }

    const handleShowFilterdExpUsers = (e) => {
        let filterdUsers = data.filter((user) => {
            let today = new Date();
            let doj = new Date(user.doj);
            let yearsOfExp = today.getFullYear() - doj.getFullYear();
            if (yearsOfExp > 2) {
                return user;
            }
        })
        setData(filterdUsers);
    }

    const handleTaDA = (e) => { }
    const handleFilterUserSal3rdHighest = () => {};
    const handleFilterUserSal3rdLowest = (e) => { }


    return (
        <div>
            <div className="card">
                <h1 id="output"></h1>
            </div>
            <hr />
            <table className='table table-striped text-center table-hover'>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Salary</th>
                        <th>Date of Joining</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.age}</td>
                            <td>{user.sal}</td>
                            <td>{user.doj}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <table className='table table-striped text-center table-hover'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Experience</th>
                    </tr>
                </thead>
                <tbody>
                    {userExp.map((user) => (
                        <tr key={user.user_id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.exp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <div className="d-flex flex-wrap overflow-y-scroll justify-content-center" style={{ maxHeight: '200px' }} aria-label="Basic example">
                <button type="button" onClick={handleSortAgeDesc} className="btn btn-primary mx-1 my-1 flex-grow-1"><strong>Task 1.1: </strong>Sort all Users by their age in descending order.</button>
                <button type="button" onClick={handleSortAgeAsc} className="btn btn-primary mx-1 my-1 flex-grow-1"><strong>Task 1.2 : </strong>Sort all Users by their age in ascending order.</button>
                <button type="button" onClick={handleSortSalaryDesc} className="btn btn-primary mx-1 my-1 flex-grow-1"><strong>Task 2 : </strong>Sort all Users by their salary in descending order.</button>
                <button type="button" onClick={handleSortDojDesc} className="btn btn-primary mx-1 my-1 flex-grow-1"><strong>Task 3.1 : </strong>Sort all Users by their doj from most recent to Past.</button>
                <button type="button" onClick={handleSortDojAsc} className="btn btn-primary mx-1 my-1 flex-grow-1"><strong>Task 3.2 : </strong>Sort all Users by their doj from older to newer.</button>
                <button type="button" onClick={handleAverageSalary} className="btn btn-primary mx-1 my-1 flex-grow-1"><strong>Task 4 : </strong>Find Out average salary of all users.</button>
            </div>
            <hr />
            <div className="d-flex flex-wrap overflow-y-scroll justify-content-center" style={{ maxHeight: '200px' }} aria-label="Basic example">
                <button type="button" onClick={handleShowUserEXP} className="btn btn-primary mx-1 my-1 flex-grow-1"><strong>Task 5: </strong>Show all users work exp in yrs in separate array</button>
                <button type="button" onClick={handleShowUsersNamedDoe} className="btn btn-primary mx-1 my-1 flex-grow-1"><strong>Task 6 : </strong>Show those user's whose fullName contains 'Doe'.</button>
                <button type="button" onClick={handleShowFilterdUsers} className="btn btn-primary mx-1 my-1 flex-grow-1"><strong>Task 7 : </strong>Show those users whose age is between 20-30.</button>
                <button type="button" onClick={handleShowFilterdExpUsers} className="btn btn-primary mx-1 my-1 flex-grow-1"><strong>Task 8 : </strong>Show those users who are working more than 2 yrs .</button>
                <button type="button" onClick={handleTaDA} className="btn btn-primary mx-1 my-1 flex-grow-1"><strong>Task 9 : </strong>Provide DA as 2% , TDS =>1% , HRA =>3% to all users and calculate their gross salary in separate array.</button>
                <button type="button" onClick={handleFilterUserSal3rdHighest} className="btn btn-primary mx-1 my-1 flex-grow-1"><strong>Task 10.1 : </strong>Find Out third highest Salary getter from the JSON.</button>
                <button type="button" onClick={handleFilterUserSal3rdLowest} className="btn btn-primary mx-1 my-1 flex-grow-1"><strong>Task 10.2 : </strong>Find Out third lowest Salary getter from the JSON.</button>
            </div>

        </div>
    );
};

export default Home;
