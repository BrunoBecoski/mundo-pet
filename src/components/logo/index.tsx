
import { Dog } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-4 bg-[#2E2C30] w-fit p-3 rounded-br-lg"
    >
      <div className="size-8 text-background-brand rounded-bl flex items-center justify-center">
        <Dog />
      </div>

      <strong className="text-md text-content-brand uppercase">
        Mundo Pet
      </strong>
    </Link>
  )
}