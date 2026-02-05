class Response {
  constructor(protocol) {
    this.responseLine = { protocol };
    this.headers = {};
  }

  setHtmlHeaderAndContent(content) {
    this.headers["content-type"] = "text/html";
    this.headers["content-length"] = content.length;
    this.body = content;
  }

  setJsonHeaderAndContent(json) {
    this.body = JSON.stringify(json);
    this.headers["content-type"] = "application/json";
    this.headers["content-length"] = content.length;
  }

  setResponseLine(statusCode) {
    this.responseLine.statusCode = statusCode;
    this.responseLine.message = statusCode === 200 ? "OK" : "NOT FOUND";
  }
}

const routes = {
  "/": "./greeting.html",
  "/greeting.html": "./greeting.html",
  "/sagnik.html": "./sagnik.html",
  "/jana.html": "./jana.html",
  "/whatnext.html": "./whatnext.html",
};

const getContent = async (path) => {
  try {
    const content = await Deno.readTextFile(routes[path]);
    return { status: 200, body: content };
  } catch {
    const content = await Deno.readTextFile("./not_found.html");
    return { status: 404, body: content };
  }
};

export const handleRequest = async (request) => {
  const path = request.path;
  const content = await getContent(path);
  const response = new Response(request.protocol);
  response.setHtmlHeaderAndContent(content.body);
  response.setResponseLine(content.status);
  // const mockResponse = {
  //   responseLine: {
  //     protocol: "HTTP/1.1",
  //     statusCode: 200,
  //     message: "OK",
  //   },
  //   body: content.body,
  //   headers: {
  //     "content-type": "text/html",
  //     "content-length": content.length,
  //   },
  // };

  return response;
};
