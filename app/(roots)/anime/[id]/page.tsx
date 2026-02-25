import { redirect } from "next/navigation";

export default function AnimePage({ params }: { params: any }) {
  redirect(`/anime/${params.id}/overview`);
}
