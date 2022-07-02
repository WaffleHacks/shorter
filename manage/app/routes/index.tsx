export default function Index() {
  return (
    <div className="font-sans leading-5">
      <h1 className="text-3xl font-bold">Welcome to Remix</h1>
      <ul className="list-disc list-inside">
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
            className="text-blue-500 underline hover:no-underline"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
            className="text-blue-500 underline hover:no-underline"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/docs"
            rel="noreferrer"
            className="text-blue-500 underline hover:no-underline"
          >
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
