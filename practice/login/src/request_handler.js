import { createUserPage } from "../pages/user_page.js";

const parseCookie = (req) => {
  const cookies = req.headers.get("cookie") || "";
  return Object.fromEntries(
    cookies.split(";")
      .map((cookie) => cookie.trim().split("=")),
  );
};

const createResponse = (content, type, status) => {
  return new Response(content, {
    headers: { "content-type": type },
    status,
  });
};

const redirectToProfile = (cookie) => {
  return new Response(null, {
    status: 303,
    headers: {
      location: `/profile?username=${cookie.username}`,
    },
  });
};

const serveHomePage = (request) => {
  const cookie = parseCookie(request);
  if (cookie.username) {
    return redirectToProfile(cookie);
  }
  const content = Deno.readTextFileSync("./pages/home.html");
  return createResponse(content, "text/html", 200);
};

const serveLoginPage = (request) => {
  const cookie = parseCookie(request);
  if (cookie.username) {
    return redirectToProfile(cookie);
  }
  const content = Deno.readTextFileSync("./pages/login.html");
  return createResponse(content, "text/html", 200);
};

const serveSignupPage = (request) => {
  const cookie = parseCookie(request);
  if (cookie.username) {
    return redirectToProfile(cookie);
  }
  const content = Deno.readTextFileSync("./pages/registation.html");
  return createResponse(content, "text/html", 200);
};

const serveProfileRequest = (url, db) => {
  const searchParams = new URLSearchParams(url.search);
  const username = searchParams.get("username");
  const customer = db.fetchCustomer(username);
  const profile = createUserPage(customer);

  return new Response(profile, {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
};

const serveGETRequest = (request, url, db) => {
  switch (url.pathname) {
    case "/":
      return serveHomePage(request);
    case "/login":
      return serveLoginPage(request);
    case "/signup":
      return serveSignupPage(request);
    case "/profile":
      return serveProfileRequest(url, db);
    default:
      return new Response("NOT FOUND");
  }
};

const isValidInput = (data) => 1;

const serveCreateRequest = (body, db) => {
  const params = new URLSearchParams(body);
  const data = Object.fromEntries(params);

  if (isValidInput(data)) {
    console.log(data);
    
    db.addCustomer(data.name, +data.age, data.password);
  }

  return new Response(null, {
    status: 303,
    headers: {
      "location": "login",
    },
  });
};

const isCorrectPassword = () => {
  return true;
};

const serveLoginRequest = (body, db) => {
  const params = new URLSearchParams(body);

  const data = Object.fromEntries(params);

  if (db.doesCustomerExists(data.username)) {
    const customer = db.fetchCustomer(data.username);
    if (isCorrectPassword(customer, data.password)) {
      return new Response(null, {
        status: 303,
        headers: {
          "Set-Cookie": `username=${data.username}`,
          location: `/profile?username=${data.username}`,
        },
      });
    }
  }

  return new Response(null, {
    status: 303,
    headers: {
      "location": "/login",
    },
  });
};

const servePOSTRequest = (url, body, db) => {
  switch (url.pathname) {
    case "/registor":
      return serveCreateRequest(body, db);
    case "/login":
      return serveLoginRequest(body, db);
    default:
      return new Response("NOT FOUND");
  }
};

const requestHandler = async (request, db) => {
  const method = request.method;
  const url = new URL(request.url);
  const body = await request.text();

  if (method === "GET") {
    return serveGETRequest(request, url, db);
  }
  if (method === "POST") {
    return servePOSTRequest(url, body, db);
  }

  return new Response("NOT FOUND");
};

export const createRequestHandler = (db) => {
  return (request) => requestHandler(request, db);
};
