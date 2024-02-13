import { Button, Modal, Select } from 'flowbite-react';
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
      <Modal dismissible size={'sm'} show={props.show} onClose={props.onClose}>
        <Modal.Header>自取時間</Modal.Header>
        <Modal.Body>
          <Select defaultValue={pickupTime} onChange={(e)=>onSelectTimeHandler(e)}>
            <option value="10:00">10:00</option>
            <option value="10:15">10:15</option>
            <option value="10:30">10:30</option>
            <option value="10:45">10:45</option>
            <option value="11:00">11:00</option>
            <option value="11:15">11:15</option>
            <option value="11:30">11:30</option>
            <option value="11:45">11:45</option>
            <option value="12:00">12:00</option>
          </Select>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button color="gray" onClick={props.onClose}>I accept</Button>
          <Button color="gray" onClick={props.onClose}>
            Decline
          </Button>
        </Modal.Footer> */}
      </Modal>
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