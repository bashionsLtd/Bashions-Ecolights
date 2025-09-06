// src/app/api/send-email/route.ts
import { Resend } from "resend";
import { CartItem } from "@/redux/store/slices/cartSlice";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name, surname, items, total } = await req.json();

    await resend.emails.send({
      from: "Bashions Ecolights <orders@yourdomain.com>",
      to: email,
      subject: "Your Order Confirmation ✅",
      html: `
        <h2>Thank you for your order, ${name} ${surname}!</h2>
        <p>We’ve received your order and will process it shortly.</p>
        <h3>Order Summary:</h3>
        <ul>
          ${items
            .map(
              (item: CartItem) =>
                `<li>${item.quantity} × ${item.name} — Rwf ${(item.price * item.quantity).toFixed(2)}</li>`
            )
            .join("")}
        </ul>
        <p><strong>Total: Rwf ${total.toFixed(2)}</strong></p>
        <p>We’ll contact you once your order is shipped.</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }
}
