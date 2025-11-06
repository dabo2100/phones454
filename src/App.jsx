import { useRef, useState } from 'react';
import Swal from 'sweetalert2';

export default function App() {
  const nameInput = useRef();
  const priceInput = useRef();
  const qtyInput = useRef();
  const [editPhoneIndex, setEditPhoneIndex] = useState();
  const [newPhoneModalIndex, setNewPhoneModalIndex] = useState(false);
  const [phones, setPhones] = useState(JSON.parse(localStorage.getItem('phones')) || []);

  const addNewPhone = () => {
    let newPhone = {
      name: nameInput.current.value,
      price: +priceInput.current.value,
      qty: +qtyInput.current.value,
    };
    let copy = [...phones];
    copy.push(newPhone);
    setPhones(copy);
    Swal.fire({
      icon: 'success',
      text: 'Phone Added Succsussfuly !',
    });
    setNewPhoneModalIndex(false);
    localStorage.setItem('phones', JSON.stringify(copy));
  };

  const removePhone = (index) => {
    Swal.fire({
      icon: 'question',
      text: 'Are you sure you want to delete ',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: 'green',
      confirmButtonText: 'نعم امسح ',
      cancelButtonText: 'لا متمتسحش حاجة ',
    }).then((res) => {
      if (res.isConfirmed) {
        let copy = [...phones];
        copy.splice(index, 1);
        setPhones(copy);
        localStorage.setItem('phones', JSON.stringify(copy));
        Swal.fire({
          icon: 'success',
          text: 'Phone Deleted Successfully !',
        });
      }
    });
  };

  const openEditModal = (index) => {
    setEditPhoneIndex(index);
    document.getElementById('my_modal_1').showModal();
    let oldData = phones[index];
    nameInput.current.value = oldData.name;
    priceInput.current.value = oldData.price;
    qtyInput.current.value = oldData.qty;
  };

  const saveNewData = () => {
    let newPhoneData = {
      name: nameInput.current.value,
      price: +priceInput.current.value,
      qty: +qtyInput.current.value,
    };
    let copy = [...phones];
    copy[editPhoneIndex] = newPhoneData;
    setPhones(copy);
    alert('Phone Data Edit Success');
    console.log('I Edit Phone Index : ' + editPhoneIndex);
    localStorage.setItem('phones', JSON.stringify(copy));
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
                      <button className="btn btn-warning" onClick={() => openEditModal(index)}>
                        Edit
                      </button>
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

      <dialog id="my_modal_1" className="modal" onClick={() => document.querySelector('#my_modal_1').close()}>
        <div className="modal-box" onClick={(event) => event.stopPropagation()}>
          <h3 className="font-bold text-lg">Edit Phone Data</h3>
          <div className="modal-action">
            <form method="dialog" className="flex flex-col gap-4 w-full">
              <input ref={nameInput} type="text" className="w-full input" placeholder="Enter new phone Name" />
              <input ref={priceInput} type="text" className="w-full input" placeholder="Enter new phone Price" />
              <input ref={qtyInput} type="text" className="w-full input" placeholder="Enter new phone Qty" />
              <button className="btn" onClick={saveNewData}>
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
