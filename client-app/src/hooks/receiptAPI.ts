import { useQuery } from "@tanstack/react-query";

const source = "http://localhost:8100";

export default function Receipt(userId: string) {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["receipt"],
        queryFn: async () => {
            const res = await fetch(`${source}/receipt/allReceipts/${userId}`, {
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

