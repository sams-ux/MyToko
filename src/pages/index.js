import Layout from "@/components/Layout";
import Loginform from "@/components/Loginform";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';


export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/product');
    } else if (status === 'unauthenticated') {
      router.push('/');
    }
    }, 
    [session]
  );

  return (
    <Layout> 
      <div className="items-center justify-center min-h-screen">
        <Loginform/>
      </div>
    </Layout>
  );
}

