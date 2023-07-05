export async function DiscoverPage() {
  return (
    <div className="mx-auto max-w-screen-lg">
      <h1 className="my-8 text-4xl font-bold tracking-tight">
        Discover
      </h1>
      <div className="space-y-1 mt-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Recent Sender
        </h2>
        <p className="text-sm text-muted-foreground">
          Top picks for you. Updated daily.
        </p>
      </div>
      <div className="space-y-1 mt-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Recent Receiver
        </h2>
        <p className="text-sm text-muted-foreground">
          Top picks for you. Updated daily.
        </p>
      </div>
    </div>
  );
}

export default DiscoverPage;