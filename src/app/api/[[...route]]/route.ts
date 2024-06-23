import { Hono } from "hono";
import { handle } from "hono/vercel";
// hono/clerk
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
// zod
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
// routes
import auth from "./auth";
import books from "./books";

// export const runtime = "edge";

const app = new Hono().basePath("/api");
app.use("*", clerkMiddleware());

app.route("/auth", auth);
app.route("/books", books);

app
  .get("/hello", (ctx) => {
    const auth = getAuth(ctx);

    if (!auth?.userId) {
      return ctx.json({
        message: "You are not logged in.",
      });
    }

    return ctx.json({
      message: "You are logged in!",
      userId: auth.userId,
    });
  })
  .get(
    "/hello/:test",
    zValidator(
      "param",
      z.object({
        test: z.string(),
      })
    ),
    (ctx) => {
      const { test } = ctx.req.valid("param");

      return ctx.json({
        message: test,
      });
    }
  )
  .post(
    "/hono",
    zValidator(
      "json",
      z.object({
        name: z.string(),
        age: z.number(),
      })
    ),
    (ctx) => {
      const { name, age } = ctx.req.valid("json");
      console.log("name", name, age);
      return ctx.json({
        message: "success",
      });
    }
  );

export const GET = handle(app);
export const POST = handle(app);
