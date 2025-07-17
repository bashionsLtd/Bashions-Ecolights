// app/checkout/page.tsx
import OrderSummary from "../components/pages/order/OrderSummary";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4">
      <OrderSummary />
    </div>
  );
}
