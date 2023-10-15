import React, { useEffect, useState } from 'react';
import CreateExpensePage from './CreateExpensePage';
import { auth, db } from '../Firebase/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import DeleteExpense from './DeleteExpense';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
function isUserLoggedIn(str1, str2) {
  return str1?.replace(/\s+/g, '').toLowerCase() === str2?.replace(/\s+/g, '').toLowerCase();
}

const MyExpenseManagerPage = () => {
  const navigate = useNavigate();
  const [showExpensePage, setShowExpensePage] = useState({
    show: false,
    editPage: false,
  });
  const [filterData, setFilterData] = useState({ byDate: '', byName: '' });
  const [todos, setTodos] = useState([]);
  const [editPageId, setEditPageId] = useState(null);
  const [deletePage, setDeletePage] = useState({
    page: false,
    id: '',
  });

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        navigate('error');
      });
  };

  const openExpensePage = () => {
    setShowExpensePage({
      show: true,
      editPage: false,
    });
  };

  const handleDelete = (id) => {
    setDeletePage({
      page: true,
      id: id,
    });
  };

  const fetchExistingData = (id) => {
    setEditPageId(id);
  };

  const handleEdit = (id) => {
    setShowExpensePage({
      show: true,
      editPage: true,
    });
    fetchExistingData(id);
  };

  const handleFilterChange = (e, name) => {
    setFilterData({ ...filterData, [name]: e.target.value });
  };
  useEffect(() => {
    const q = query(collection(db, 'formData'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []); // eslint-disable-next-line
  useEffect(() => {
    const timer = setTimeout(() => {
      setTodos((prevTodos) => {
        return prevTodos.filter((data) => {
          console.log(data?.formData);
          return (
            data?.formData?.name.toLowerCase().includes(filterData.byName.toLowerCase()) &&
            data?.formData?.date.toLowerCase().includes(filterData.byDate.toLowerCase())
          );
        });
      });
    }, 250);
    return () => clearTimeout(timer);
  }, [filterData]);

  return (
    <>
      <div className="p-1 rounded-md border-4 m-2 border-black h-[95vh] md:p-6 md:h-[98vh]">
        <h1 className="text-center text-2xl font-bold">Welcome</h1>
        <div className="p-2 md:p-4">
          <div className="flex justify-between w-full">
            <h1 className="grid place-items-center font-bold text-lg md:flex md:justify-start">
              MY EXPENSE MANAGER
            </h1>
            <div className="flex flex-col md:flex-row gap-3">
              <button
                className="bg-purple-600 px-4 py-1 text-white rounded-lg md:py-2"
                onClick={() => window.location.reload()}
              >
                All Data
              </button>
              <button className="bg-red-600 rounded-md text-white p-2" onClick={signOutHandler}>
                Sign Out
              </button>
              <input
                type="date"
                className="border-2 placeholder:text-black placeholder:font-bold placeholder:text-sm placeholder:text-center px-3 border-black rounded-sm"
                onChange={(e) => handleFilterChange(e, 'byDate')}
                placeholder="Filter by Date of Expense"
              />
              <input
                type="text"
                className="border-2 placeholder:text-black placeholder:font-bold placeholder:text-center placeholder:text-sm px-3 border-black rounded-sm"
                onChange={(e) => handleFilterChange(e, 'byName')}
                placeholder="Search Expense by Name"
              />
              <button className="bg-green-500 px-2 py-1 rounded-sm hover:shadow-lg text-white" onClick={openExpensePage}>
                + New Expense
              </button>
            </div>
          </div>
          <div className="w-full py-2  h-92 overflow-y-scroll md:h-[500px]">
            <table className="w-full ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Date of Expense</th>
                  <th>Amount</th>
                  <th>Updated At</th>
                  <th>Created by</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {todos && (
                  todos.map((data, _) => {
                    const { name, option, date, amount, dateAndTime} = data?.formData;
                    return (
                      <tr key={data?.id}>
                        <td>{name}</td>
                        <td>{option}</td>
                        <td>{date}</td>
                        <td>INR{amount}</td>
                        <td>{dateAndTime}</td>
                        <td>{isUserLoggedIn(name, loggedInUser?.displayName) ? 'Me' : name}</td>
                        <td className="text-center">
                          <i className="fa-solid fa-pen  mr-3 cursor-pointer" onClick={() => handleEdit(data?.id)}></i>
                          <i
                            className="fa-solid fa-trash text-orange-500 cursor-pointer"
                            onClick={() => handleDelete(data?.id)}
                          ></i>
                        </td>
                      </tr>
                    );
                  })
                ) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showExpensePage?.show && <CreateExpensePage editPageId={editPageId} showExpensePage={showExpensePage} setShowExpensePage={setShowExpensePage} />}
      {deletePage.page && <DeleteExpense setdeletePage={setDeletePage} deletePage={deletePage} />}
    </>
  );
};

export default MyExpenseManagerPage;
