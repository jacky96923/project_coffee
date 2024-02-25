import { useQuery } from "@tanstack/react-query";

const source = "http://localhost:8100"

export default function getReceivedOrders() {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["getReceivedOrders"],
        queryFn: async () => {
            const res = await fetch(
                `${source}/orders/getReceivedOrders`, {
                    headers:{
                        authorization: `Bearer ${localStorage.getItem("token")}` 
                    }
                }
            );
            const result = await res.json();
            console.log("-------getReceivedOrders API---------", result);
            return result;

        },
    }
    );
    if (isLoading || isFetching) return "Incoming data ...";

  if (error) {
    return "Error occured";
  }

  if (!data) {
    return "";
  }

  return data;
}

export async function updateCompletedOrder(transactionId: number){
    const res = await fetch(
        `${source}/orders/completeOrder/${transactionId}`, {
            method: "PUT",
            headers:{
                authorization: `Bearer ${localStorage.getItem("token")}` 
            }
        }
    );
    const result = await res.json();
    console.log("-------updateCompletedOrder API---------", result);
    return result;
}

export async function updatePickupedOrder(transactionId: number){
    const res = await fetch(
        `${source}/orders/pickupOrder/${transactionId}`, {
            method: "PUT",
            headers:{
                authorization: `Bearer ${localStorage.getItem("token")}` 
            }
        }
    );
    const result = await res.json();
    console.log("-------updatePickupedOrder API---------", result);
    return result;
}