import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";
import { v4 as uuidv4 } from "uuid";
import { omit } from "lodash";
import { prismadb } from "@/lib/prisma";
import { formatResponse } from "@/utils/ApiFormatResponse";
import { zValidator } from "@hono/zod-validator";
import { accountSchema } from "@/z-schemas/accountSchema";

const app = new Hono()
  // GET SINGLE ACCOUNT
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
  // CREATE ACCOUNT
  .post("/", zValidator("json", accountSchema), async (c) => {
    // -- AUTH CHECK --
    // const auth = getAuth(c);
    // if (!auth?.userId) {
    //   throw new HTTPException(401, {
    //     message: "Invalid User Id",
    //   });
    // }

    // -- CREATE ACCOUNT --
    const { name, plaidId, userId } = c.req.valid("json");
    const createdAccount = await prismadb.account.create({
      data: {
        id: uuidv4(),
        name,
        plaidId,
        userId,
      },
    });

    return formatResponse(c, omit(createdAccount, ["id", "userId"]), 1);
  })
  .get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export default app;
