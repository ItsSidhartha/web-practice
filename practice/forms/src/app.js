const createResponse = (content, type, status) => {
  return new Response(content, {
    headers: { "content-type": type },
    status,
  });
};

const serveHomePage = () => {
  const homepage = Deno.readTextFileSync("public/html/index.html");
  return createResponse(homepage, "text/html", 200);
};

const isValid = (name, password) => {
  return true;
};

const createProfile = (name) => {
  return `<p>Wellcome ${name}</p>`;
};

const serveProfilePage = (url) => {
  const searchParams = new URLSearchParams(url.search);
  const name = searchParams.get("name");
  const profile = createProfile(name);
  return new Response(profile, {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
};

const redirectToProfile = (name) => {
  return new Response(null, {
    status: 303,
    headers: {
      location: `/profile?name=${name}`,
    },
  });
};

const login = (url) => {
  const searchParams = new URLSearchParams(url.search);
  const name = searchParams.get("name");
  const password = searchParams.get("password");
  if (isValid(name, password)) {
    return redirectToProfile(name);
  }

  return redirectToErrorPage();
};

export const handleRequest = (request) => {
  const url = new URL(request.url);
  const { pathname } = url;
  console.log("request", pathname);

  if (pathname === "/") return serveHomePage();
  if (pathname === "/login") return login(url);
  if (pathname === "/profile") return serveProfilePage(url);
  return createResponse("NOT FOUND", "text/html", 404);
};
