import { ChangeEvent, useState } from 'react';

type pickupModalProps = {
  show: boolean,
  onClose: () => void
}

export function PickupModal(props: pickupModalProps) {
  const [pickupTime, setPickupTime] = useState("10:00")
  const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")as string)
  const onSelectTimeHandler = (e: ChangeEvent<HTMLSelectElement>) =>{
    setPickupTime(e.target.value);
    //shoppingCart.pickupTime = pickupTime
    //localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
    props.onClose();
  }
  return (
    <>
      <dialog id="my_modal_1" className={props.show === true? "modal modal-open":"modal"}>
        <div className="modal-box w-11/12 max-w-xs">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={props.onClose}>✕</button>
          <h3 className="font-bold text-lg">自取時間</h3>
          <select className="modal-action select w-full max-w-sm" defaultValue={pickupTime} onChange={(e)=>onSelectTimeHandler(e)}>
            <option value="10:00">10:00</option>
            <option value="10:15">10:15</option>
            <option value="10:30">10:30</option>
            <option value="10:45">10:45</option>
            <option value="11:00">11:00</option>
            <option value="11:15">11:15</option>
            <option value="11:30">11:30</option>
            <option value="11:45">11:45</option>
            <option value="12:00">12:00</option>
          </select>
        </div>
          {/* <Modal.Footer>
            <Button color="gray" onClick={props.onClose}>I accept</Button>
            <Button color="gray" onClick={props.onClose}>
              Decline
            </Button>
          </Modal.Footer> */}
      </dialog>
    </>
  );
}

// export default function Modal(open: boolean, onClose: ()=>void, children: string) {
//   return (
//     // backdrop
//     <div
//       onClick={onClose}
//       className={`
//         fixed inset-0 flex justify-center items-center transition-colors
//         ${open ? "visible bg-black/20" : "invisible"}
//       `}
//     >
//       {/* modal */}
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className={`
//           bg-white rounded-xl shadow p-6 transition-all
//           ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
//         `}
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
//         >

//         </button>
//         {children}
//       </div>
//     </div>
//   )
// }