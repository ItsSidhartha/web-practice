export const requestHandler = (req) => {
  const url = new URL(req.url);
  req.pathname = url.pathname;

  logRequest(req);

  if (url.pathname === "/" && req.method === "GET") {
    return servePage("index.html");
  }

  if (url.pathname === "/profile" && req.method === "GET") {
    return serveProfile(req);
  }

  if (url.pathname === "/login" && req.method === "GET") {
    return serveLoginPage(req);
  }

  if (url.pathname === "/login" && req.method === "POST") {
    return login(req);
  }
  
  if (url.pathname === "/logout" && req.method === "POST") {
    return logout(req);
  }


  return notFoundPage();
};

const logRequest = (req) => {
  console.log(`${req.method} ${req.pathname}`);
};

const notFoundPage = (_req) => {
  return new Response("<h1>NOT FOUND</h1>", { status: 404 });
};

const servePage = async (path) => {
  const page = await Deno.readTextFile(`./public/html/${path}`);

  return new Response(page, {
    headers: {
      "content-type": "text/html",
    },
  });
};

const knownUsers = [
  "Himanshu",
  "Shivaji",
  "Vikash",
  "Priyanshu",
  "Ashish",
];

const login = async (req) => {
  const formData = await req.formData();
  const user = formData.get("username");

  if (!knownUsers.includes(user)) {
    return new Response("BAD HACKER " + user);
  }
  const headers = new Headers();
  headers.append("set-cookie", `username=${user}`);
  headers.append("set-cookie", `foo=bar`);
  headers.append("location", "/profile");

  return new Response("GOOD USER " + user, {
    status: 303,
    headers,
  });
};

const parseCookie = (req) => {
  const cookies = req.headers.get("cookie") || "";
  return Object.fromEntries(
    cookies.split(";")
      .map((cookie) => cookie.trim().split("=")),
  );
};

const serveProfile = (req) => {
  const cookie = parseCookie(req)

  if (knownUsers.includes(cookie["username"])) {
    return servePage("profile.html");
  }

  return new Response(null, {
    status: 303,
    headers: {
      location: "/login",
    },
  });
};

const logout = (_req) => {
  const headers = new Headers();

  headers.append("set-cookie", `username=Champak_Chacha; Max-Age=-1`);
  headers.append("location", "/login");

  return new Response(null, {
    status: 303,
    headers
  })
}

const serveLoginPage = (req) => {
  const {username} = parseCookie(req);
  const headers = new Headers();
  headers.append("location", "/profile");

  if(knownUsers.includes(username)) {
    return new Response(null, {
      status: 303,
      headers,
    });
  }

  return servePage("login.html");
}