
const port = 8000;

const listener = Deno.listen({ port });
console.log(`TCP server listening on port ${port}...`);

for await (const conn of listener) {
  handleConnection(conn);
}

async function handleConnection(conn) {
  const decoder = new TextDecoder();
  const buffer = new Uint8Array(1024 * 1024);

  try {
    while (true) {
      const bytesRead = await conn.read(buffer);
      console.log(bytesRead)
      if (bytesRead === null) break;
      const b = buffer.subarray(0, bytesRead);

      console.log(decoder.decode(b));
      console.log("Looping back.....")
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    conn.close();
  }
}