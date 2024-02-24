import { useQuery } from "@tanstack/react-query";

const source = "http://localhost:8100";

export function AllReceiptAPI(userId: string) {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["allReceipts"],
        queryFn: async () => {
            const res = await fetch(`${source}/receipt/allReceipts/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await res.json();
            console.log("AllReceipt API result", result);
            return result;
        },
    });

    if (isLoading || isFetching) return "Incoming Data ...";

    if (error) {
        return "Error occured";
    }

    if (!data) {
        return [];
    }

    return data;
}

export function ReceiptAPI(transactionId: string) {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["receipt"],
        queryFn: async () => {
            console.log("starting receipt api....")
            const res = await fetch(`${source}/receipt/${transactionId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await res.json();
            console.log("Receipt API result", result);
            return result;
        },
    });

    if (isLoading || isFetching) return "Incoming Data ...";

    if (error) {
        return "Error occured";
    }

    if (!data) {
        return [];
    }

    return data;
}
