"use client"
import { useMsgInfo } from "@/state/messages"
import clsx from "clsx"
import { useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export default function Message() {
  const { title, desc, variante } = useMsgInfo((state) => state)
  const resetMessage = useMsgInfo((state) => state.reset)
  useEffect(() => {
    if (title) {
      setTimeout(() => {
        resetMessage()
      }, 3000)
    }
  })

  return (
    <Alert
      variant={variante}
      className={clsx(
        "max-w-fit fixed right-3 top-3 z-50 ml-6 mr-36 box-shaddow shadow-2xl"
      )}
    >
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <p>{desc}</p>
      </AlertDescription>
    </Alert>
  )
}
