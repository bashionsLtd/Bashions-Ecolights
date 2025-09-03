"use client";

import dynamic from "next/dynamic";

const CartSidebar = dynamic(() => import("./pages/homepage/cartSidebar"), {
  ssr: false,
});

export default CartSidebar;
