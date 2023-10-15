import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { COMMON_INPUT_CSS } from '../../utils/constants';
const CreateExpensePage = ({ showExpensePage, setShowExpensePage, editPageId }) => {
  const day = new Date()
  const time = String(day.getHours()) + ":" + String(day.getMinutes()) + ":" + String(day.getSeconds())
  const [dateTime] = useState(day.getFullYear() + "/" + day.getMonth() + "/" + day.getDate() + "/" + time)
  console.log(String(day.getHours()));
 
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    amount: '',
    option: 'Health',
    dateAndTime: dateTime// Provide a default value for option
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, date, amount, dateAndTime } = formData;
    setShowExpensePage({
      show: false,
      editPage: false
    });
    if (name && description && date && amount && dateAndTime) {
      if (!showExpensePage.editPage && formData !== null) {
        await addDoc(collection(db, 'formData'), {
          formData,
        });
        setFormData({
          name: '',
          description: '',
          date: '',
          amount: '',
          option: 'Health',
          dateAndTime: dateAndTime// Reset option to default
        });
      } else if (showExpensePage.editPage) {
        await updateDoc(doc(db, 'formData', editPageId), { formData });
      }
    }


  };

  const handleRemoveExpensePage = () => {
    setShowExpensePage({
      show: false,
      editPage: false
    });
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const docRef = doc(db, 'formData', editPageId);
    //     const docSnap = await getDoc(docRef);

    //     if (docSnap.exists()) {
    //       setFormData(docSnap.data().formData);
    //     } else {
    //       console.log('No such document!');
    //     }
    //   } catch (error) {
    //     console.error('Error getting document:', error);
    //   }
    // };

    // if (editPageId && showExpensePage.editPage) {
    //   fetchData();
    // } else {
    //   setFormData({
    //     name: '',
    //     description: '',
    //     date: '',
    //     amount: '',
    //     option: 'Health',
    //     dateAndTime: dateTime // Reset option to default
    //   });
    // }
  }, []);

  return (
    <div className="w-full h-[100vh] grid place-items-center absolute top-0">
      <div className="bg-sky-50 w-[330px] leading-8 p-4 border-black border-4 rounded-lg shadow-lg md:w-96">
        <form action="" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-2xl font-bold">
              {showExpensePage.editPage ? 'Edit Expense' : 'Create new Expense'}
            </h1>
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="name" className="font-bold">
              Name
            </label>
            <input
              className={COMMON_INPUT_CSS}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              placeholder="Name the Expense"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="description" className="font-bold">
              Description
            </label>
            <input
              className={COMMON_INPUT_CSS}
              value={formData.description}
              name="description"
              onChange={handleChange}
              placeholder="Describe the Expense"
              required
            />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="category" className="font-bold">
              Category
            </label>
            <select
              name="option"
              className={COMMON_INPUT_CSS}
              value={formData.option}
              onChange={handleChange}
              id="category"
              placeholder="Select category (drop-down)"
            >
              <option value="Health">Health</option>
              <option value="Electronics">Electronics</option>
              <option value="Travel">Travel</option>
              <option value="Education">Education</option>
              <option value="Books">Books</option>
              <option value="Others">Others</option>

            </select>
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="date" className="font-bold">
              Date of Expense
            </label>
            <input
              className={COMMON_INPUT_CSS}
              onChange={handleChange}
              value={formData.date}
              name="date"
              type="date"
              id="date"
              placeholder="Date of Expense (date-picker)"
              required
            />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="price" className="font-bold">
              Expense Amount
            </label>
            <input
              className={COMMON_INPUT_CSS}
              onChange={handleChange}
              value={formData.amount}
              name="amount"
              type="number"
              maxLength={5}
              id="price"
              placeholder="Expense Amount in INR"
              required
            />
          </div>
          <div className="text-white py-2 flex justify-between">
            <button
              className="bg-gray-600 w-36 rounded-sm px-4 hover:shadow-lg"
              onClick={handleRemoveExpensePage}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 w-36 rounded-sm px-4 hover:shadow-lg"
              type="submit"
            >
              Create Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExpensePage;
