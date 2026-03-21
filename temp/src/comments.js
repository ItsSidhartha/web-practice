export class Comments {
  constructor(filePath) {
    this.filePath = filePath;
  }

  addComment(name, comment) {
    const rawData = Deno.readTextFileSync(this.filePath) || "[]";

    const comments = JSON.parse(rawData);
    comments.unshift({ name, comment });
    Deno.writeTextFileSync(this.filePath, JSON.stringify(comments, null, 2));
  }

  fetchComments() {
    const rawData = Deno.readTextFileSync(this.filePath) || "[]";
    return JSON.parse(rawData);
  }
}
