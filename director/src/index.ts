import Link from "@/link";

async function handle(request: Request, { LINKS }: Bindings): Promise<Response> {
  // Get the link id
  const { pathname } = new URL(request.url);
  const id = decodeURIComponent(pathname.substring(1));

  // Retrieve the link
  const link = await LINKS.get<Link>(id, { type: "json" });
  if (link === null || !link.enabled) return new Response("not found", { status: 404 });

  // Increment the usages
  link.usages += 1;
  await LINKS.put(id, JSON.stringify(link));

  return Response.redirect(link.url);
}

const worker: ExportedHandler<Bindings> = { fetch: handle };
export default worker;
