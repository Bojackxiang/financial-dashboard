import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";
import { prismadb } from "@/lib/prisma";
import { formatResponse } from "@/utils/ApiFormatResponse";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    // == AUTH CHECKING ==
    if (!auth?.userId) {
      throw new HTTPException(401, {
        message: "Invalid User Id",
      });
    }

    // == DB QUERY ==
    const accounts = await prismadb.account.findFirst({
      where: {
        userId: auth.userId,
      },
    });

    // == SUCCESS ==
    return formatResponse(c, accounts, 1);
  })
  .post("/", (c) => c.json("create a book", 201))
  .get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export default app;
