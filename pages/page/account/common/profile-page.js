import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Container, Row, Form, Input, Label, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import { getStoredUser, saveAuth } from '../../../../helpers/auth';

const ME = gql`
  query Me {
    me {
      id
      firstName
      lastName
      email
      phone
      emailVerified
      addresses {
        id
        fullName
        phone
        address1
        address2
        city
        province
        postalCode
        country
        isDefault
      }
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: ProfileInput!) {
    updateProfile(input: $input) {
      id
      firstName
      lastName
      email
      phone
      emailVerified
    }
  }
`;

const SAVE_DEFAULT_ADDRESS = gql`
  mutation SaveDefaultAddress($input: AddressInput!) {
    saveDefaultAddress(input: $input) {
      id
      fullName
      phone
      address1
      address2
      city
      province
      postalCode
      country
      isDefault
    }
  }
`;

const ProfilePage = () => {
    const router = useRouter();
    const { data, loading, refetch } = useQuery(ME, { fetchPolicy: "network-only" });
    const [updateProfile, { loading: savingProfile }] = useMutation(UPDATE_PROFILE);
    const [saveAddress, { loading: savingAddress }] = useMutation(SAVE_DEFAULT_ADDRESS);
    const storedUser = getStoredUser();
    const user = data?.me || storedUser;
    const defaultAddress = data?.me?.addresses?.find((address) => address.isDefault) || data?.me?.addresses?.[0];
    const [profile, setProfile] = useState({ firstName: "", lastName: "", phone: "" });
    const [address, setAddress] = useState({ fullName: "", phone: "", address1: "", address2: "", city: "", province: "", postalCode: "", country: "Pakistan" });

    useEffect(() => {
        if (!loading && !data?.me && !storedUser) {
            router.push("/page/account/login");
        }
    }, [loading, data, storedUser, router]);

    useEffect(() => {
        if (user) {
            setProfile({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                phone: user.phone || "",
            });
        }
    }, [user?.id]);

    useEffect(() => {
        if (defaultAddress) {
            setAddress({
                fullName: defaultAddress.fullName || "",
                phone: defaultAddress.phone || "",
                address1: defaultAddress.address1 || "",
                address2: defaultAddress.address2 || "",
                city: defaultAddress.city || "",
                province: defaultAddress.province || "",
                postalCode: defaultAddress.postalCode || "",
                country: defaultAddress.country || "Pakistan",
            });
        }
    }, [defaultAddress?.id]);

    const handleProfileChange = (event) => setProfile({ ...profile, [event.target.name]: event.target.value });
    const handleAddressChange = (event) => setAddress({ ...address, [event.target.name]: event.target.value });

    const submitProfile = async (event) => {
        event.preventDefault();
        try {
            const { data: result } = await updateProfile({ variables: { input: profile } });
            saveAuth({ token: localStorage.getItem("dreamStitchToken"), user: result.updateProfile });
            toast.success("Profile updated.");
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const submitAddress = async (event) => {
        event.preventDefault();
        try {
            await saveAddress({ variables: { input: { ...address, isDefault: true } } });
            toast.success("Address saved.");
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <section className="contact-page register-page">
                <Container>
                    <Row>
                        <Col sm="12">
                            <h3>PERSONAL DETAIL</h3>
                            <Form className="theme-form" onSubmit={submitProfile}>
                                <Row>
                                    <Col md="6">
                                        <Label className="form-label" for="name">First Name</Label>
                                        <Input type="text" name="firstName" className="form-control" id="name" placeholder="Enter your first name" value={profile.firstName} onChange={handleProfileChange} required />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="email">Last Name</Label>
                                        <Input type="text" name="lastName" className="form-control" id="last-name" placeholder="Enter your last name" value={profile.lastName} onChange={handleProfileChange} required />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="review">Phone number</Label>
                                        <Input type="tel" name="phone" className="form-control" id="review" placeholder="Enter your number" value={profile.phone} onChange={handleProfileChange} />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="email">Email</Label>
                                        <Input type="email" className="form-control" id="email" placeholder="Email" value={user?.email || ""} disabled />
                                    </Col>
                                    <Col md="12">
                                        <button className="btn btn-sm btn-solid" type="submit" disabled={savingProfile}>{savingProfile ? "Saving..." : "Save Profile"}</button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="contact-page register-page section-b-space">
                <Container>
                    <Row>
                        <Col sm="12">
                            <h3>SHIPPING ADDRESS</h3>
                            <Form className="theme-form" onSubmit={submitAddress}>
                                <Row>
                                    <Col md="6">
                                        <Label className="form-label" for="fullName">Full Name</Label>
                                        <Input type="text" name="fullName" className="form-control" id="fullName" placeholder="Receiver name" value={address.fullName} onChange={handleAddressChange} />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="addressPhone">Phone</Label>
                                        <Input type="tel" name="phone" className="form-control" id="addressPhone" placeholder="Receiver phone" value={address.phone} onChange={handleAddressChange} />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="address1">Address *</Label>
                                        <Input type="text" name="address1" className="form-control" id="address1" placeholder="Street address" value={address.address1} onChange={handleAddressChange} required />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="address2">Address 2</Label>
                                        <Input type="text" name="address2" className="form-control" id="address2" placeholder="Apartment, suite, landmark" value={address.address2} onChange={handleAddressChange} />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="postalCode">Postal Code</Label>
                                        <Input type="text" name="postalCode" className="form-control" id="postalCode" placeholder="Postal code" value={address.postalCode} onChange={handleAddressChange} />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="country">Country *</Label>
                                        <Input type="select" name="country" id="country" value={address.country} onChange={handleAddressChange}>
                                            <option value="Pakistan">Pakistan</option>
                                        </Input>
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="review">City *</Label>
                                        <Input type="text" name="city" className="form-control" id="city" placeholder="City" value={address.city} onChange={handleAddressChange} required />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="province">Province</Label>
                                        <Input type="text" name="province" className="form-control" id="province" placeholder="Province" value={address.province} onChange={handleAddressChange} />
                                    </Col>
                                    <div className="col-md-12">
                                        <button className="btn btn-sm btn-solid" type="submit" disabled={savingAddress}>{savingAddress ? "Saving..." : "Save Address"}</button>
                                    </div>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ProfilePage;
