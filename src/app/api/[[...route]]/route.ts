import { Hono } from "hono";
import { handle } from "hono/vercel";
// hono/clerk
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
// zod
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
// routes
import account from "./account";
import { HTTPException } from "hono/http-exception";

// export const runtime = "edge";

const app = new Hono().basePath("/api");
// app.use("*", clerkMiddleware());

// global error handler
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({
    error: err.message,
  });
});

const routes = app.route("/account", account);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);

export type AppType = typeof routes;
