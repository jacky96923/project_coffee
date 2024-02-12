import React from "react";

interface ProductSelectionPageProps {
  shopId: number;
}

export default function ProductSelection({
  shopId,
}: ProductSelectionPageProps) {
  // Fetch products for the selected shop using the shopId

  return (
    <div>
      <h2>Product Selection Page</h2>
      <p>Shop ID: {shopId}</p>
      {/* Render the products for the selected shop */}
    </div>
  );
}
