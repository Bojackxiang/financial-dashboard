// responseFormatter.js
import { Context, Hono } from "hono";

export function formatResponse<T>(
  c: Context<any, any, any>,
  data: T,
  status = 1,
  message = "success",
  error: string = ""
) {
  return c.json({
    data,
    status,
    message,
    error,
  });
}
