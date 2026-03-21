import { getCookie } from "hono/cookie";

export const allowOnlyLoggedInUsers = async (context, next) => {
  const username = getCookie(context, "username");
  if (!username) {
    return context.redirect("/guest-book.html", 303);
  }

  await next();
};

export const rejectLoggedinUsers = async (context, next) => {
  const username = getCookie(context, "username");
  if (username) {
    return context.redirect("/guest-book.html", 303);
  }

  await next();
};
