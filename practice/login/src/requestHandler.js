const requestHandler = (request, db) => {
  console.log(request);

  return new Response("Hello");
};

export const createRequestHandler = (db) => {
  return (request) => requestHandler(request, db);
};
