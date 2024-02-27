import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getReceivedOrders, {
  updateCompletedOrder,
  updatePickupedOrder,
} from "../../hooks/receivedOrdersAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

type transaction = {
  transactionId: number;
  orderTime: string;
  pickupTime: string;
  pickupStatus: boolean;
  doneStatus: boolean;
  orders: Array<{
    orderId: number;
    itemName: string;
    itemSize: string | null;
    quantity: number;
    options: string[];
  }>;
};

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      // Code to be executed every second
      let currentTime = moment().format("HH:mm:ss");
      setTime(currentTime);
      //console.log("time in effect", time)
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
  //console.log("time", time)
  return time;
}

function NavButtons() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center fixed bottom-2 w-2/3">
      <button
        onClick={() => navigate("/")}
        className="block mx-auto w-40 h-14 my-1.5 bg-black rounded-2xl font-bold text-white"
      >
        返回主頁
      </button>
      <button
        onClick={() => navigate("/AllItem")}
        className="block mx-auto w-40 h-14 my-1.5 bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl font-bold text-white"
      >
        更新商品狀態
      </button>
    </div>
  );
}

export default function ReceivedOrders() {
  const queryClient = useQueryClient();
  // query for orders data
  const transactions: Array<transaction> = getReceivedOrders();
  const [pendingOrders, setPendingOrders] = useState([] as transaction[]);
  const [doneOrders, setDoneOrders] = useState([] as transaction[]);

  useEffect(() => {
    if (Array.isArray(transactions)) {
      let pendingOrdersInEffect = [];
      let doneOrdersInEffect = [];
      for (let order of transactions) {
        if (!order.doneStatus) {
          pendingOrdersInEffect.push(order);
        } else {
          doneOrdersInEffect.push(order);
        }
      }
      setPendingOrders(pendingOrdersInEffect);
      setDoneOrders(doneOrdersInEffect);
      //console.log("pendingOrdersInEffect", pendingOrdersInEffect)
      //console.log("doneOrdersInEffect", doneOrdersInEffect)
      pendingOrdersInEffect = [];
      doneOrdersInEffect = [];
    }
  }, [transactions]);
  //console.log("pendingOrders", pendingOrders)
  //console.log("doneOrders", doneOrders)

  // for completing order & pickup order
  const doneMutation = useMutation({
    mutationFn: (transactionId: number) => updateCompletedOrder(transactionId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getReceivedOrders"],
        exact: true,
      }),
  });

  const collectedMutation = useMutation({
    mutationFn: (transactionId: number) => updatePickupedOrder(transactionId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getReceivedOrders"],
        exact: true,
      }),
  });

  const onCompleteOrderHandler = () => {
    doneMutation.mutate(orderIdChosen);
    // change order details side
    setShowDoneOrder(true);
  };

  const onPickupOrderHandler = () => {
    collectedMutation.mutate(orderIdChosen);
    // change order details side
    setShowDoneOrder(false);
    setOrderIdChosen(0);
    setOrderChosen(null);
  };

  // clock
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      // Code to be executed every second
      let currentTime = moment().format("HH:mm:ss");
      setTime(currentTime);
      queryClient.invalidateQueries({
        queryKey: ["getReceivedOrders"],
        exact: true,
      });
      //console.log("time in effect", time)
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  // for showing order details on right side of the screen (false=pending, true=done)
  const [showDoneOrder, setShowDoneOrder] = useState(false);

  // for choosing order
  const [orderIdChosen, setOrderIdChosen] = useState(0);
  const [orderChosen, setOrderChosen] = useState(null as transaction | null);
  useEffect(() => {
    if (Array.isArray(transactions)) {
      let chosenTransaction: transaction = transactions.find(
        (entry: any) => entry.transactionId === orderIdChosen
      )!;
      setOrderChosen(chosenTransaction);
    }
  }, [orderIdChosen]);

  const onChoosePendingOrderHandler = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowDoneOrder(false);
    const buttonClicked = e.currentTarget as HTMLButtonElement;
    console.log(buttonClicked.id);
    setOrderIdChosen(Number(buttonClicked.id));
  };

  const onChooseDoneOrderHandler = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowDoneOrder(true);
    const buttonClicked = e.currentTarget as HTMLButtonElement;
    console.log(buttonClicked.id);
    setOrderIdChosen(Number(buttonClicked.id));
  };

  return (
    <>
      <div className="flex w-full">
        <div className="relative h-screen w-2/3 mb-20">
          <div className="h-1/2 overflow-auto border-b-2 border-black">
            {Array.isArray(pendingOrders)
              ? pendingOrders.map((entry) => (
                  <button
                    key={entry.transactionId}
                    id={String(entry.transactionId)}
                    onClick={(e) => onChoosePendingOrderHandler(e)}
                    className="m-1.5 w-40 h-14 bg-yellow-500 font-bold text-black"
                  >
                    <div
                      id={String(entry.transactionId)}
                      onClick={(e) => onChoosePendingOrderHandler(e)}
                    >
                      <div
                        className={`badge ${
                          entry.transactionId !== orderIdChosen
                            ? "badge-primary"
                            : "badge-secondary"
                        }`}
                      >
                        {/* {transactionId?.padStart(4, "0")} */}
                        {String(entry.transactionId).padStart(4, "0")}
                      </div>
                      <br />
                      OT: <span>{entry.orderTime}</span>
                    </div>
                  </button>
                ))
              : ""}
          </div>

          <div className="h-1/2 overflow-auto">
            {Array.isArray(doneOrders)
              ? doneOrders.map((entry) => (
                  <button
                    key={entry.transactionId}
                    id={String(entry.transactionId)}
                    onClick={(e) => onChooseDoneOrderHandler(e)}
                    className="m-1.5 w-40 h-14 bg-green-500 font-bold text-black"
                  >
                    <div
                      id={String(entry.transactionId)}
                      onClick={(e) => onChooseDoneOrderHandler(e)}
                    >
                      <div
                        className={`badge ${
                          entry.transactionId !== orderIdChosen
                            ? "badge-primary"
                            : "badge-secondary"
                        }`}
                      >
                        {/* {transactionId?.padStart(4, "0")} */}
                        {String(entry.transactionId).padStart(4, "0")}
                      </div>
                      <br />
                      PT: <span>{entry.pickupTime}</span>
                    </div>
                  </button>
                ))
              : ""}
            {/* <button onClick={()=>{}} className="m-1.5 w-40 h-14 bg-green-500 font-bold text-black">
                            <div className="badge badge-primary">
                                0001
                            </div>
                            <br/>
                            PT: 11:35
                        </button> */}
          </div>

          <NavButtons />
        </div>
        <div className="w-1/3 border-l-2">
          <div className="flex flex-col overflow-auto">
            <h1 className="text-center my-5 font-bold">
              現在時間 <span>{Clock()}</span>
            </h1>
            <button
              className="btn text-2xl mx-auto w-1/2 flex"
              style={{ minWidth: "fit-content" }}
            >
              <h1>單號</h1>
              <div className="badge badge-lg badge-secondary">
                {/* {transactionId?.padStart(4, "0")} */}
                {String(orderIdChosen).padStart(4, "0")}
              </div>
            </button>
            {showDoneOrder ? (
              <div>
                <h1 className="bg-green-500 text-blue-800 text-center text-xl mt-5 font-bold">
                  請取餐
                </h1>
                <h1 className="text-center mt-5 font-bold">
                  取餐時間: <span>{orderChosen?.pickupTime}</span>
                </h1>
              </div>
            ) : orderIdChosen === 0 ? (
              ""
            ) : (
              <div>
                <h1 className="bg-yellow-500 text-red-600 text-center text-xl mt-5 font-bold">
                  未完成
                </h1>
                <h1 className="text-center mt-5 font-bold">
                  下單時間: <span>{orderChosen?.orderTime}</span>
                </h1>
              </div>
            )}
            <div id="orderList">
              {orderChosen?.orders.map((entry, idx) => (
                <>
                  <div
                    key={entry.orderId}
                    id={String(entry.orderId)}
                    className="flex justify-center my-5"
                  >
                    <h4 className="text-lg fond-bold mr-16">#{idx + 1}</h4>
                    <div className="w-2/5">
                      <h4 className="text-lg fond-bold">
                        {entry.itemName}
                        {entry.itemSize !== null ? `(${entry.itemSize})` : ""}
                      </h4>
                      {entry.options.map((option) => (
                        <p>{option}</p>
                      ))}
                    </div>
                    <h4 className="text-lg fond-bold ml-4">
                      x{entry.quantity}
                    </h4>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="flex justify-center fixed bottom-2 w-1/3">
            {/* show 1 of the 2 buttons according to state */}
            {!showDoneOrder ? (
              orderIdChosen === 0 ? (
                ""
              ) : (
                <button
                  onClick={onCompleteOrderHandler}
                  className="block mx-auto w-40 h-14 my-1.5 bg-green-500 rounded-2xl font-bold text-black"
                >
                  完成製作
                </button>
              )
            ) : (
              <button
                onClick={onPickupOrderHandler}
                className="block mx-auto w-40 h-14 my-1.5 bg-indigo-200 rounded-2xl font-bold text-black"
              >
                訂單已取
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
