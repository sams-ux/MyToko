import { getCsrfToken, signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Loginform({csrfToken}) {
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: true,
      email: e.target.email.value,
      password: e.target.password.value,
      callbackUrl: '/product',
    });

    if (res?.error) {
      setError('Login gagal');
    }
  };
  
  return ( 
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit}>
      <fieldset className="bg-base-200 border-base-300 rounded-box w-full max-w-xs border p-4">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <legend className="text-lg font-semibold mb-2">Login</legend>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        
        <label className="label" htmlFor="email">Email</label>
        <input type="email" id="email" className="input input-bordered w-full" placeholder="Email" />

        <label className="label" htmlFor="password">Password</label>
        <input type="password" id="password" className="input input-bordered w-full" placeholder="Password" />

        <button className="btn btn-neutral mt-4 w-full" type='submit'>Login</button>
      </fieldset>
      </form>
    </div>
    
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

