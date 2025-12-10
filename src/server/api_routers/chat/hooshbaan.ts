import Elysia from "elysia";

export const hooshbaan = (app: Elysia) => {
  return app.post("/hooshbaan", () => "hi")
}
