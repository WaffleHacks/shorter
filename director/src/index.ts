async function handle(request: Request, { LINKS }: Bindings): Promise<Response> {
  return new Response("hello");
}

const worker: ExportedHandler<Bindings> = { fetch: handle };
export default worker;
