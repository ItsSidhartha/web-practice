import { url } from "node:inspector";
import { createUserPage } from "../pages/user_page.js";

const createResponse = (content, type, status) => {
  return new Response(content, {
    headers: { "content-type": type },
    status,
  });
};

const serveHomePage = () => {
  const content = Deno.readTextFileSync("./pages/home.html");
  return createResponse(content, "text/html", 200);
};

const serveLoginPage = () => {
  const content = Deno.readTextFileSync("./pages/login.html");
  return createResponse(content, "text/html", 200);
};

const serveSignupPage = () => {
  const content = Deno.readTextFileSync("./pages/registation.html");
  return createResponse(content, "text/html", 200);
};

const serveProfileRequest = (url, db) => {
  const searchParams = new URLSearchParams(url.search);
  const name = searchParams.get("name");
  const customer = db.fetchCustomer(name);
  const profile = createUserPage(customer);

  return new Response(profile, {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
};

const serveGETRequest = (url, db) => {
  switch (url.pathname) {
    case "/":
      return serveHomePage();
    case "/login":
      return serveLoginPage();
    case "/signup":
      return serveSignupPage();
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

  if (db.doesCustomerExists(data.name)) {
    const customer = db.fetchCustomer(data.name);
    if (isCorrectPassword(customer, data.password)) {
      return new Response(null, {
        status: 303,
        headers: {
          "Set-Cookie": `name=${data.name}`,
          location: `/profile?name=${data.name}`,
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
    return serveGETRequest(url, db);
  }
  if (method === "POST") {
    return servePOSTRequest(url, body, db);
  }

  return new Response("NOT FOUND");
};

export const createRequestHandler = (db) => {
  return (request) => requestHandler(request, db);
};
