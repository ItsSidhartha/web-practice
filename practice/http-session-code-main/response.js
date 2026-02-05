export class Response {
  constructor(protocol) {
    this.responseLine = { protocol };
    this.headers = {};
  }

  setHtmlBodyAndHeader(content) {
    this.headers["content-type"] = "text/html";
    this.headers["content-length"] = content.length;
    this.body = content;
  }

  setJSONBodyAndHeader(json) {
    this.body = JSON.stringify(json);
    this.headers["content-type"] = "application/json";
    this.headers["content-length"] = content.length;
  }

  setResponseLine(statusCode) {
    this.responseLine.statusCode = statusCode;
    this.responseLine.message = statusCode === 200 ? "OK" : "NOT FOUND";
  }
}
