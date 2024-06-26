import { Hono } from "hono";
import { handle } from "hono/vercel";
// hono/clerk
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
// zod
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
// routes
import account from "./account";

// export const runtime = "edge";

const app = new Hono().basePath("/api");
// app.use("*", clerkMiddleware());

const routes = app.route("/account", account);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);

export type AppType = typeof routes;
