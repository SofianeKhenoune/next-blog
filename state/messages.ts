import { create } from "zustand"

type Message = {
  title: string
  desc: string
  variante?: "error" | "success" | "info" | "warning"
}

type MsgAction = {
  setMsg: (msg: Message) => void
  reset: () => void
}

export const useMsgInfo = create<Message & MsgAction>()((set) => ({
  title: "",
  desc: "",
  variante: "info",
  setMsg: (msg) => set(msg),
  reset: () =>
    set({
      title: "",
      desc: "",
      variante: "info",
    }),
}))
