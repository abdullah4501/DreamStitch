import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CommonLayout from '../../../components/shop/common-layout';
import { Input, Container, Row, Form, Label ,Col} from 'reactstrap';
import { toast } from 'react-toastify';
import { saveAuth } from '../../../helpers/auth';

const REQUEST_REGISTRATION_OTP = gql`
  mutation RequestRegistrationOtp($input: RegisterInput!) {
    requestRegistrationOtp(input: $input) {
      success
      message
      expiresAt
    }
  }
`;

const VERIFY_REGISTRATION_OTP = gql`
  mutation VerifyRegistrationOtp($email: String!, $otp: String!) {
    verifyRegistrationOtp(email: $email, otp: $otp) {
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

const passwordRules = [
    { key: "length", label: "At least 8 characters", test: (value) => value.length >= 8 },
    { key: "upper", label: "One uppercase letter", test: (value) => /[A-Z]/.test(value) },
    { key: "lower", label: "One lowercase letter", test: (value) => /[a-z]/.test(value) },
    { key: "number", label: "One number", test: (value) => /\d/.test(value) },
    { key: "special", label: "One special character", test: (value) => /[^A-Za-z0-9]/.test(value) },
];

const getPasswordStrength = (password) => {
    const passed = passwordRules.filter((rule) => rule.test(password)).length;
    if (!password) return { passed, label: "", className: "" };
    if (passed <= 2) return { passed, label: "Weak", className: "weak" };
    if (passed <= 4) return { passed, label: "Good", className: "good" };
    return { passed, label: "Strong", className: "strong" };
};

const Register = () => {
    const router = useRouter();
    const [step, setStep] = useState("details");
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "" });
    const [otp, setOtp] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const passwordStrength = getPasswordStrength(form.password);
    const passwordValid = passwordStrength.passed === passwordRules.length;
    const [requestOtp, { loading: requesting }] = useMutation(REQUEST_REGISTRATION_OTP);
    const [verifyOtp, { loading: verifying }] = useMutation(VERIFY_REGISTRATION_OTP);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const submitRegistration = async (event) => {
        event.preventDefault();
        if (form.password !== form.confirmPassword) {
            toast.error("Password and confirm password do not match.");
            return;
        }
        if (!passwordValid) {
            toast.error("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
            return;
        }

        try {
            const { data } = await requestOtp({
                variables: {
                    input: {
                        firstName: form.firstName,
                        lastName: form.lastName,
                        email: form.email,
                        phone: form.phone || null,
                        password: form.password,
                    },
                },
            });
            toast.success(data.requestRegistrationOtp.message);
            setStep("otp");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const submitOtp = async (event) => {
        event.preventDefault();
        try {
            const { data } = await verifyOtp({ variables: { email: form.email, otp } });
            saveAuth(data.verifyRegistrationOtp);
            toast.success("Account verified successfully.");
            router.push("/page/account/profile");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <CommonLayout parent="home" title="register">
            <section className="register-page section-b-space">
                <Container>
                    <Row>
                        <Col lg="12">
                            <h3>Create Account</h3>
                            <p className="mb-3">
                                Already have an account?{" "}
                                <Link href="/page/account/login" className="text-decoration-underline">
                                    Login here
                                </Link>
                            </p>
                            <div className="theme-card">
                                {step === "details" ? (
                                    <Form className="theme-form" onSubmit={submitRegistration}>
                                        <Row>
                                            <Col md="6">
                                                <Label className="form-label" for="firstName">First Name</Label>
                                                <Input type="text" name="firstName" id="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="lastName">Last Name</Label>
                                                <Input type="text" name="lastName" id="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="email">Email</Label>
                                                <Input type="email" name="email" id="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="phone">Phone</Label>
                                                <Input type="tel" name="phone" id="phone" placeholder="+92 329 8386422" value={form.phone} onChange={handleChange} />
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="password">Password</Label>
                                                <div className="position-relative">
                                                    <Input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Enter your password" value={form.password} onChange={handleChange} minLength="8" required />
                                                    <button
                                                        type="button"
                                                        className="btn p-0 position-absolute"
                                                        style={{ right: "14px", top: "50%", transform: "translateY(-50%)", color: "#777" }}
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                                    >
                                                        <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                                    </button>
                                                </div>
                                                {form.password ? (
                                                    <div className={`mb-3 password-strength ${passwordStrength.className}`}>
                                                        <div className="password-strength-top">
                                                            <span>Password strength</span>
                                                            <strong>{passwordStrength.label}</strong>
                                                        </div>
                                                        <div className="password-strength-track">
                                                            <span style={{ width: `${(passwordStrength.passed / passwordRules.length) * 100}%` }}></span>
                                                        </div>
                                                        <ul>
                                                            {passwordRules.map((rule) => {
                                                                const passed = rule.test(form.password);
                                                                return (
                                                                    <li key={rule.key} className={passed ? "passed" : ""}>
                                                                        <i className={`fa ${passed ? "fa-check-circle" : "fa-circle-o"}`}></i>
                                                                        {rule.label}
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                ) : null}
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="confirmPassword">Confirm Password</Label>
                                                <div className="position-relative">
                                                    <Input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" value={form.confirmPassword} onChange={handleChange} minLength="8" required />
                                                    <button
                                                        type="button"
                                                        className="btn p-0 position-absolute"
                                                        style={{ right: "14px", top: "50%", transform: "translateY(-50%)", color: "#777" }}
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                                    >
                                                        <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                                    </button>
                                                </div>
                                            </Col>
                                            <Col md="12">
                                                <button type="submit" className="btn btn-solid w-auto" disabled={requesting}>{requesting ? "Sending OTP..." : "Send Verification OTP"}</button>
                                            </Col>
                                        </Row>
                                    </Form>
                                ) : (
                                    <Form className="theme-form" onSubmit={submitOtp}>
                                        <Row>
                                            <Col md="12">
                                                <p>We sent a six-digit OTP to <strong>{form.email}</strong>. Enter it below to verify your account.</p>
                                            </Col>
                                            <Col md="6">
                                                <Label className="form-label" for="otp">Email OTP</Label>
                                                <Input type="text" name="otp" id="otp" placeholder="Enter OTP" value={otp} onChange={(event) => setOtp(event.target.value)} maxLength="6" required />
                                            </Col>
                                            <Col md="12">
                                                <button type="submit" className="btn btn-solid w-auto" disabled={verifying}>{verifying ? "Verifying..." : "Verify & Create Account"}</button>
                                                <button type="button" className="btn btn-outline ms-2" onClick={() => setStep("details")}>Edit Details</button>
                                            </Col>
                                        </Row>
                                    </Form>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}

export default Register
