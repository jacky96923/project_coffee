import { useQuery } from "@tanstack/react-query";

const source = "http://localhost:8080"

export default function getReceivedOrders() {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["getReceivedOrders"],
        queryFn: async () => {
            const res = await fetch(
                `${source}/orders/getReceivedOrders`
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