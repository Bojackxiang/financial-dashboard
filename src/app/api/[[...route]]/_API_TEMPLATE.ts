import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.json(""));
app.post("/", (c) => c.json("create a book", 201));
app.put("/:id", (c) => c.json(`put request`));

export default app;
