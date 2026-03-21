import { deleteCookie, getCookie, setCookie } from "hono/cookie";

export const addComment = async (context) => {
  const body = await context.req.parseBody();
  const comment = body.comment;
  const username = getCookie(context, "username");
  const comments = context.get("comments");
  comments.addComment(username, comment);

  return context.redirect("/guest-book.html", 303);
};

export const login = async (context) => {
  const body = await context.req.parseBody();
  const username = body.username;
  setCookie(context, "username", username);
  return context.redirect("/guest-book.html", 303);
};

export const logout = (context) => {
  deleteCookie(context, "username");
  return context.redirect("/guest-book.html", 303);
};

const guestBookPage = (context) => {
  const username = getCookie(context, "username");
  const isLoggedIn = Boolean(username);
  const comments = context.get("comments");
  const renderPage = context.get("renderPage");
  return renderPage("./guest_book.html", {
    isLoggedIn,
    username,
    comments: comments.fetchComments(),
  });
};

export const serveGuestbook = (context) => {
  const content = guestBookPage(context);
  return context.html(content);
};
