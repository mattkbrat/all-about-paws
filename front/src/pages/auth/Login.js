import React, { useContext, useEffect, useState } from "react";
import {supabase} from "../../client";
import { useNavigate } from "react-router-dom";
import {SupabaseContext} from "../../SupabaseContext";
import '../../components/form.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const { loading, logIn } = useContext(SupabaseContext);

  let navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(email);
    setLoggedIn(true);
  };

  useEffect(() => {
    console.log(supabase.auth.user())
    if (supabase.auth.user() !== null) {
      return navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="content">
            <div className="input-field">
              <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  required
                  placeholder="Email"
                  tooltip="Enter your email"
              />
            </div>
          </div>
          <div className="action">
            <button disabled={loading} type="submit">
            {loading ? "Sending magic link..." : "Send magic link"}
            </button>
          </div>
        </form>
      </div>

    // <div className="container">
    //   <div className="row justify-content-center mt-5">
    //     <div className=" col-12 col-lg-6">
    //       <div className="card">
    //         <div className="card-header">
    //           <h5 className="text-center text-uppercase">Log In</h5>
    //         </div>
    //         <div className="card-body">
    //           <form onSubmit={handleSubmit}>
    //             <div className="mb-4">
    //               <label htmlFor="exampleInputEmail1" className="form-label">
    //                 Email address
    //               </label>
    //               <input
    //                 type="email"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 name="email"
    //                 required
    //                 className="form-control form-control-lg w-100 mt-1"
    //               />
    //               <div className="form-text">
    //                 Enter your email to get your magic link
    //               </div>
    //             </div>
    //             <button disabled={loading} type="submit" className="btn btn-primary btn-lg w-100 ">
    //               {loading ? "Loading..." : "Submit"}
    //             </button>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
