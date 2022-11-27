const server = Deno.listen({ port: 8000 });
console.log("File server running on http://localhost:8000/");

for await (const conn of server) {
  handleHttp(conn).catch(console.error);
}

async function handleHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);

  for await (const requestEvent of httpConn) {
    const url = new URL(requestEvent.request.url);
    var filepath = decodeURIComponent(url.pathname.slice(1));
    if (filepath == "") { filepath = "index.html"; }

    // Try opening the file
    let file;
    try {
      console.log(`Loading ${filepath}`);
      file = await Deno.open(filepath);
    } catch {
      const notFound = new Response("404 not found", { status: 404 });
      await requestEvent.respondWith(notFound);
      return;
    }

    // Use a readableStream so the file doesn't have to be read into memory all at once
    const readableStream = file.readable;
    const response = new Response(readableStream);
    await requestEvent.respondWith(response);
  }
}
