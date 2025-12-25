import { useState, FormEvent } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { db } from '@/lib/localStorage';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const user = db.getUserByEmail(email);
    
    if (!user || user.password !== password) {
      setError('Invalid email or password');
      return;
    }

    // Store user session (in a real app, use proper authentication)
    if (typeof window !== 'undefined') {
      localStorage.setItem('pos_current_user', JSON.stringify(user));
    }

    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Sign In - POS System</title>
      </Head>

      <div className="main-wrapper">
        <div className="account-content">
          <div className="login-wrapper">
            <div className="login-content">
              <div className="login-userset">
                <div className="login-logo">
                  <img src="/img/BABS-SOLUTIONS.svg" alt="Logo" />
                </div>
                <div className="login-userheading">
                  <h3>Sign In</h3>
                  <h4>Please login to your account</h4>
                </div>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-login">
                    <label>Email</label>
                    <div className="form-addons">
                      <input 
                        type="email" 
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <img src="/img/mail.svg" alt="Email" />
                    </div>
                  </div>
                  
                  <div className="form-login">
                    <label>Password</label>
                    <div className="pass-group">
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        className="pass-input" 
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span 
                        className={`fas toggle-password ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                        onClick={() => setShowPassword(!showPassword)}
                      ></span>
                    </div>
                  </div>
                  
                  <div className="form-login">
                    <div className="alreadyuser">
                      <h4>
                        <a href="/forgetpassword" className="hover-a">Forgot Password?</a>
                      </h4>
                    </div>
                  </div>
                  
                  <div className="form-login">
                    <button type="submit" className="btn btn-login">Sign In</button>
                  </div>
                </form>

                <div className="signinform text-center">
                  <h4>Don't have an account? <a href="/signup" className="hover-a">Sign Up</a></h4>
                </div>

                <div className="form-setlogin">
                  <h4>Default Credentials:</h4>
                  <p>Email: admin@pos.com</p>
                  <p>Password: admin123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
