import OrderOverview from "./components/dashboard/OrderOverview";
import LatestOrders from "./components/orders/LatestOrders";
import { OverviewStats } from "./types/overview";
// import { Order } from "./types/order";
// import { format } from "date-fns";

// const orders: Order[] = [
//   {
//     id: "#95647",
//     date: format(new Date("2021-05-25T00:00:00.000Z"), "yyyy-MM-dd"), // keep as ISO string
//     time: "01:25 AM",
//     name: "Anthony Jensen",
//     address: "260 W. Storm Street New York, NY 10001",
//     phone: "+1 917-555-0123",
//     orderStatus: "Rejected",
//     paymentStatus: "Not paid",
//     total: 2654,
//   },
//   {
//     id: "#84895",
//     date: format(new Date("2021-05-03T00:00:00.000Z"), "yyyy-MM-dd"),
//     time: "09:44 AM",
//     name: "John Due",
//     address: "13811 Gimbert Ln Santa Ana, CA 92705",
//     phone: "+1 949-555-0167",
//     orderStatus: "Processing",
//     paymentStatus: "Paid",
//     total: 3654,
//   },
//   {
//     id: "#49756",
//     date: format(new Date("2021-06-19T00:00:00.000Z"), "yyyy-MM-dd"),
//     time: "5:43 AM",
//     name: "Tom Robert",
//     address: "3803 Fox Rd Huron, Ohio (OH) 44839",
//     phone: "+1 419-555-0234",
//     orderStatus: "Completed",
//     paymentStatus: "Paid",
//     total: 6156,
//   },
//   {
//     id: "#79632",
//     date: format(new Date("2021-06-03T00:00:00.000Z"), "yyyy-MM-dd"),
//     time: "4:54 AM",
//     name: "Nolan Doe",
//     address: "1805 Jackson Ave Seaford, NY 11783",
//     phone: "+1 516-555-0556",
//     orderStatus: "Pending",
//     paymentStatus: "Paid",
//     total: 7621,
//   },
//   {
//     id:"#12668",
//     date: format(new Date("2021-06-09T00:00:00.000Z"), "yyyy-MM-dd"),
//     time: "2:03 AM",
//     name: "Henry Curtis",
//     address: "421 Basswood Ln Haysville, KS 67060",
//     phone: "+1 316-555-0789",
//     orderStatus: "Rejected",
//     paymentStatus: "Not paid",
//     total: 456,
//   },
//   {
//     id: "#66463",
//     date: format(new Date("2021-07-23T00:00:00.000Z"), "yyyy-MM-dd"),
//     time: "9:11 AM",
//     name: "Katrina West",
//     address: "205 Hope Rd Helena, Montana 59602",
//     phone: "+1 406-555-0345",
//     orderStatus: "Pending",
//     paymentStatus: "Paid",
//     total: 5116,
//   },
// ];

const overviewStats: OverviewStats = {
  income: "67.6k",
  completed: "12.6K",
  pending: 143,
  rejected: 651,
};

export default function Page() {
  return (
      <div>
        <OrderOverview stats={overviewStats} />
        <LatestOrders/>
      </div>
  );
}
