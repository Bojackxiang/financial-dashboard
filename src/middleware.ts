import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import auth_routes from "../config/auth_routes";


const isProtectedRoute = createRouteMatcher(auth_routes);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};