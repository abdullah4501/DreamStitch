import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import CommonLayout from "../../../components/shop/common-layout";
import { Container, Row, Form, Label, Input, Col } from "reactstrap";
import { toast } from "react-toastify";
import { saveAuth } from "../../../helpers/auth";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        email
        phone
        emailVerified
      }
    }
  }
`;

const GOOGLE_LOGIN = gql`
  mutation LoginWithGoogle($idToken: String!) {
    loginWithGoogle(idToken: $idToken) {
      token
      user {
        id
        firstName
        lastName
        email
        phone
        emailVerified
      }
    }
  }
`;

const Login = () => {
  const router = useRouter();
  const [login, { loading }] = useMutation(LOGIN);
  const [googleLogin] = useMutation(GOOGLE_LOGIN);
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!googleClientId || typeof window === "undefined") return;

    const existingScript = document.querySelector("script[src='https://accounts.google.com/gsi/client']");
    const initialize = () => {
      if (!window.google) return;
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: async (response) => {
          try {
            const { data } = await googleLogin({ variables: { idToken: response.credential } });
            saveAuth(data.loginWithGoogle);
            toast.success("Logged in with Google.");
            router.push("/page/account/profile");
          } catch (error) {
            toast.error(error.message);
          }
        },
      });
      window.google.accounts.id.renderButton(document.getElementById("google-login-button"), {
        theme: "outline",
        size: "large",
        width: 280,
      });
    };

    if (existingScript) {
      initialize();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initialize;
    document.body.appendChild(script);
  }, [googleClientId, googleLogin, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const { data } = await login({
        variables: {
          email: formData.get("email"),
          password: formData.get("password"),
        },
      });
      saveAuth(data.login);
      toast.success("Logged in successfully.");
      router.push("/page/account/profile");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <CommonLayout parent="home" title="login">
      <section className="login-page section-b-space">
        <Container>
          <Row>
            <Col lg="6">
              <h3>Login</h3>
              <div className="theme-card">
                <Form className="theme-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <Label className="form-label" for="email">
                      Email
                    </Label>
                    <Input type="email" name="email" className="form-control" id="email" placeholder="Email" required />
                  </div>
                  <div className="form-group">
                    <Label className="form-label" for="review">
                      Password
                    </Label>
                    <Input type="password" name="password" className="form-control" id="review" placeholder="Enter your password" required />
                  </div>
                  <button type="submit" className="btn btn-solid" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
                  <div className="mt-3" id="google-login-button"></div>
                  {!googleClientId ? <small className="d-block mt-2 text-muted">Google login needs NEXT_PUBLIC_GOOGLE_CLIENT_ID.</small> : null}
                  <p className="mt-3 mb-0">
                    Don't have an account?{" "}
                    <Link href="/page/account/register" className="text-decoration-underline">
                      Register here
                    </Link>
                  </p>
                </Form>
              </div>
            </Col>
            <Col lg="6" className="right-login">
              <h3>New Customer</h3>
              <div className="theme-card authentication-right">
                <h6 className="title-font">Create A Account</h6>
                <p>Sign up for a free account at our store. Registration is quick and easy. It allows you to be able to order from our shop. To start shopping click register.</p>
                <Link href="/page/account/register" className="btn btn-solid">
                  Create an Account
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Login;
