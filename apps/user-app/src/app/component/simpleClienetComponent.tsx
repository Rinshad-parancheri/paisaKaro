"use client";

import { useBalance } from "@rinshadp014/store/useBalance";

export default function () {
  const balance = useBalance()
  return <div>
    hi there {balance}
  </div>
}