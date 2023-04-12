import Link from 'next/link';
import { NavStyles, NavItems } from '../styles/NavStyle';
import { fetcher } from '../lib/api';
import { setToken, unsetToken } from '../lib/auth';
import { useUser } from '../lib/authContext';
import { useState } from 'react';
import { useRouter } from 'next/router';





export default function Nav(){
    const router = useRouter();

    const handleButtonClick = () => {
      router.push('/register');
    };

    const [data, setData] = useState({
      identifier: '',
      password: '',
    });

    const { user, loading } = useUser();

    const handleSubmit = async (e) => {
      e.preventDefault();

    const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: data.identifier,
            password: data.password,
          }),
        }
      );
      setToken(responseData);
    };

    const logout = () => {
      unsetToken();
    };

    const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };

      
    return(
        <NavStyles>
            <Link href={`/`}>
                <img src="https://app.greenrope.com/users/myteam46998/Media241.png?202106240524" alt="" />
            </Link>
            <NavItems>
                <Link className= "hover-underline-animation" href={`/travel-members`}>Travelers</Link>
                <Link className= "hover-underline-animation" href={`/`}>Trips</Link>
                {!loading &&
                  (user ? (
                      <Link class= "hover-underline-animation" href="/profile">
                          Profile
                      </Link>
                  ) : (
                    ''
                  ))}
                {!loading &&
                  (user ? (
                      <a
                        className= "hover-underline-animation"
                        onClick={logout}
                        style={{ cursor: 'pointer' }}
                      >
                        Logout
                      </a>
                  ) : (
                    ''
                  ))}
                {!loading && !user ? (
                  <>
                    <form onSubmit={handleSubmit} className="form-inline">
                      <input
                        type="text"
                        name="identifier"
                        onChange={handleChange}
                        placeholder="Username"
                        className="md:p-2 form-input py-2 rounded mx-2"
                        required
                      />
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                        className="md:p-2 form-input py-2 rounded mx-2"
                        required
                      />

                      <button
                        className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                        type="submit"
                      >
                        Login
                      </button>
                      <button onClick={handleButtonClick}>
                        Register
                      </button>
                    </form>
                  </>
                ) : (
                  ''
                )}
            </NavItems>
        </NavStyles>
    );
}