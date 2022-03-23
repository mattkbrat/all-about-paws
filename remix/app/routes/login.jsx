import {Form, json, NavLink, redirect, useActionData,} from "remix";
import {supabaseClient} from "~/utils/db.server";
import {commitSession, getSession} from "~/utils/session.server";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader = () => {
  let data = {};

  // https://remix.run/api/remix#json
  return json(data);
};

/**
 *
 * @param {*} param0
 * @returns
 */
export let action = async ({ request }) => {
  // get user credentials from form
  let form = await request.formData();
  let email = form.get("email");
  let password = form.get("password");

  // login using the credentials
  const { data: user, error } =
      await supabaseClient.auth.signIn({email, password,});

  if (!user) return {user, error}

  // Create cookie with auth token
  // Get session and set access_token
  let session = await getSession(request.headers.get("Cookie"));
  session.set("access_token", user.access_token);

  // Redirect to page with the cookie set in header
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

// https://remix.run/api/conventions#meta
export let meta = () => {
  return {
    title: "All About Paws",
    description: "Login Page",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Login() {
  const actionData = useActionData();

  return (
      <div className="remix__page">
        <main>
          <h2 className="font-bold text-2xl">
            Login
          </h2>
          <Form method="post">
            <div className="flex flex-1 items-center flex-col">
              <div className="form_item">
                <label htmlFor="email">EMAIL ADDRESS:</label>
                <input id="email" name="email" type="text"/>
              </div>
              <div className="form_item">
                <label htmlFor="password">PASSWORD:</label>
                <input id="password" name="password" type="password"/>
              </div>
              <div className="flex flex-1 items-center flex-row mt-8">
                <button
                    className="bg-slate-500 rounded-sm w-fit px-8 mr-4 text-white"
                    type="submit"
                >
                  LOGIN
                </button>
                <NavLink to="/create-account">
                  <button className="bg-slate-500 rounded-sm w-fit px-8 text-white">
                    CREATE ACCOUNT
                  </button>
                </NavLink>
              </div>
            </div>
          </Form>
          <div>{actionData?.error ? actionData?.error?.message : null}</div>
        </main>
      </div>

  );
}
