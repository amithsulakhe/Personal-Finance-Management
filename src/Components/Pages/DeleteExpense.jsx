import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";

const DeleteExpense = ({ deletePage, setdeletePage }) => {
  const handleDelete = async (e, shouldDelete) => {
    e.preventDefault();

    if (shouldDelete) {
      setdeletePage({
        page: false,
        id: ""
      });
      await deleteDoc(doc(db, "formData", deletePage.id));
    } else {
      setdeletePage({
        page: false,
        id: ""
      });
    }
  };

  return (
    <div className='grid place-items-center'>
      <form className='border-4 bg-white border-black rounded-lg w-96 absolute top-[25%] p-4'>
        <h1 className='font-bold text-xl'>
          Are you sure you want to delete this Expense?
        </h1>
        <div className='flex justify-end gap-4 m-4'>
          <button className='px-6 py-2 rounded-md bg-red-600 text-white hover:shadow-lg' onClick={(e) => handleDelete(e, false)}>No</button>
          <button className='px-6 py-2 rounded-md bg-green-400 text-white hover:shadow-lg' onClick={(e) => handleDelete(e, true)}>Yes, Delete!</button>
        </div>
      </form>
    </div>
  );
};

export default DeleteExpense;
