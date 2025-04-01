import type { GetServerSideProps } from 'next';
import { useSearchParams } from "next/navigation"

export default function Page() {
  const searchParams = useSearchParams()

  console.log(`searchParams`, searchParams);
  console.log(`searchParams.get('q')`, searchParams.get('q'));
  console.log(`searchParams.get('query')`, searchParams.get('query'));
  console.log(`searchParams.get('location')`, searchParams.get('location'));

  return <div>
  <div>Careers page</div>
  <pre>{JSON.stringify(searchParams, null, 2)}</pre>
  <hr style={{margin: 50}}/>
  <pre>searchParams.get(`q`): {JSON.stringify(searchParams.get(`q`))}</pre>
  <pre>searchParams.get(`query`): {JSON.stringify(searchParams.get(`query`))}</pre>
  <pre>searchParams.get(`location`): {JSON.stringify(searchParams.get(`location`))}</pre>
  </div>
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  // Extract relevant query parameters
  const q = query.q as string;
  const locationId = query.location as string;
  const teamId = query.team as string;
  const searchQuery = query.searchQuery ? (query.searchQuery as string) : null;

  console.log(`q`, q);
  console.log(`locationId`, locationId);
  console.log(`teamId`, teamId);
  console.log(`searchQuery`, searchQuery);

  try {
    res.setHeader('Netlify-Vary', 'query=team|location|searchQuery|pageNumber');

    return {
      props: {},
    };
  } catch (error) {
    console.error('Failed to fetch job postings:', error);
    return {
      props: {},
    };
  }
};
