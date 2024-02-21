import { useQuery } from "@tanstack/react-query";

const source = "http://localhost:8100";

export default function Checkout(itemId: string) {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["checkout"],
        queryFn: async () => {
            const res = await fetch(`${source}/stripe/create`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await res.json();
            console.log("-------checkoutAPI---------", result);
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

