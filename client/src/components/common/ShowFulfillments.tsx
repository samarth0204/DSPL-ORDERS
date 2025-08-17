import BillCard from "./BillCard";

const ShowFulfillments = ({
  fulfillments,
  filterStatus,
}: {
  fulfillments: any;
  filterStatus: "All" | "PAID" | "PENDING";
}) => {
  const filteredFulfillments =
    filterStatus === "All"
      ? fulfillments
      : fulfillments.filter(
          (fulfillment: any) => filterStatus === fulfillment.status
        );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 py-2">
      {filteredFulfillments.map((fulfillment: any, index: any) => (
        <BillCard fulfillment={fulfillment} key={index} />
      ))}
    </div>
  );
};

export default ShowFulfillments;
