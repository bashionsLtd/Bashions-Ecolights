import OrderOverview from "./components/dashboard/OrderOverview";
import LatestOrders from "./components/orders/LatestOrders";

export default function Page() {
  return (
      <div>
        <OrderOverview />
        <LatestOrders/>
      </div>
  );
}
