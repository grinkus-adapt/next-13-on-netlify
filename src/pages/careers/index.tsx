import { useSearchParams } from "next/navigation"

export default function Page() {
  const searchParams = useSearchParams()

  console.log(`searchParams`, searchParams);
  console.log(`searchParams.get('q')`, searchParams.get('q'));

  return <div>Careers page</div>
}
