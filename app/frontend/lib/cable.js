import { createConsumer } from "@rails/actioncable"

let consumer

export function getCableConsumer() {
  if (typeof window === "undefined") return null

  consumer ||= createConsumer()
  return consumer
}
