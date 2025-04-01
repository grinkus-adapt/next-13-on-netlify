import { useSearchParams } from "next/navigation"

export default function Page() {
  const searchParams = useSearchParams()

  console.log(`searchParams`, searchParams);
  console.log(`searchParams.get('q')`, searchParams.get('q'));

  return <div>
  <div>Careers page</div>
  <pre>{JSON.stringify(searchParams, null, 2)}</pre>
  <hr style={{margin: 50}}/>
  <pre>searchParams.get(`q`): {JSON.stringify(searchParams.get(`q`))}</pre>
  </div>
}
