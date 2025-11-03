import { useRef, useState } from 'react';

export default function App() {
  // ref
  const nameInput = useRef();
  const priceInput = useRef();
  const qtyInput = useRef();

  const [newPhoneModalIndex, setNewPhoneModalIndex] = useState(false);

  const [phones, setPhones] = useState([
    { name: 'iPhone x', price: 400, qty: 3 },
    { name: 'iPhone 11', price: 500, qty: 4 },
    { name: 'iPhone 12', price: 600, qty: 5 },
    { name: 'iPhone 13', price: 700, qty: 2 },
  ]);

  const removePhone = (index) => {
    let isConfirm = confirm('Are you sure ?');
    if (isConfirm) {
      let copy = [...phones];
      copy.splice(index, 1);
      setPhones(copy);
    }
  };

  const addNewPhone = () => {
    let newPhone = {
      name: nameInput.current.value,
      price: +priceInput.current.value,
      qty: +qtyInput.current.value,
    };

    let copy = [...phones];
    copy.push(newPhone);
    setPhones(copy);
    alert('Phone New Added');
    setNewPhoneModalIndex(false);
  };

  return (
    <div className="w-full h-dvh flex justify-center">
      <div className="container">
        <div className="w-full flex py-4">
          <button className="btn btn-primary" onClick={() => setNewPhoneModalIndex(true)}>
            Add New Phone
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Item Price</th>
              <th>Item Qty</th>
              <th>Item Total</th>
            </tr>
          </thead>
          <tbody>
            {phones.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el.name}</td>
                  <td>{el.price}</td>
                  <td>{el.qty}</td>
                  <td>{el.price * el.qty}</td>
                  <td>
                    <div className="w-full flex justify-center gap-3">
                      <button className="btn btn-warning">Edit</button>
                      <button className="btn btn-error" onClick={() => removePhone(index)}>
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {newPhoneModalIndex && (
        <div
          className="w-full h-dvh fixed top-0 left-0 bg-black/80 flex justify-center items-center"
          onClick={() => {
            let conf = confirm('Are you sure you want to exit ?');
            conf && setNewPhoneModalIndex(false);
          }}
        >
          <div onClick={(event) => event.stopPropagation()} className="w-[500px] p-4 rounded animate__animated animate__fadeInDown bg-gray-900 shadow border flex flex-col gap-4">
            <h1>Add New Phone</h1>
            <input ref={nameInput} type="text" className="w-full input" placeholder="Enter new phone Name" />
            <input ref={priceInput} type="text" className="w-full input" placeholder="Enter new phone Price" />
            <input ref={qtyInput} type="text" className="w-full input" placeholder="Enter new phone Qty" />
            <button className="btn btn-primary w-full" onClick={addNewPhone}>
              Add New Phone
            </button>
          </div>
        </div>
      )}

      {/* <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>
        open modal
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Phone Data</h3>
          <div className="modal-action">
            <form method="dialog" className="flex flex-col gap-4 w-full">
              <input ref={nameInput} type="text" className="w-full input" placeholder="Enter new phone Name" />
              <input ref={priceInput} type="text" className="w-full input" placeholder="Enter new phone Price" />
              <input ref={qtyInput} type="text" className="w-full input" placeholder="Enter new phone Qty" />
              <button className="btn">Save</button>
            </form>
          </div>
        </div>
      </dialog> */}
    </div>
  );
}

// Read
// Delete
// props - state managet
// Add
// Update
