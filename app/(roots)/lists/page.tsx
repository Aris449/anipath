import Link from "next/link";
import { headers } from "next/headers";


async function getLists() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/lists`, {
    cache: "no-store",
    headers: {
      cookie: headersList.get("cookie") ?? "",
    },
  });

  if (!res.ok) {
    return []; 
  }

  return res.json();
}

export default async function ListsPage() {
    const lists = await getLists()

  return (
    <div>
      {lists.map((list: any) => (
        <Link key={list._id} href={`/lists/${list._id}`}>{list.name}</Link>
      ))}
    </div>
  )
}

