import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import InputDetail from "../InputDetail/InputDetail";
import "./form.css";

const Form = ({ cart, totalPrice, clearCart, handleId }) => {
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        confirmEmail: "",
    });

    const [formErrors, setFormErrors] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        confirmEmail: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const order = {
            buyer: {
                name: formData.name,
                lastName: formData.lastName,
                phone: formData.phone,
                email: formData.email,
            },
            items: cart,
            totalPrice: totalPrice(),
            date: serverTimestamp(),
        };

        const ordersCollection = collection(db, "orders");

        addDoc(ordersCollection, order)
            .then((resp) => {
                handleId(resp.id);
                clearCart();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        const error = validateFormData(e.target.name, e.target.value);

        setFormErrors({ ...formErrors, [e.target.name]: error });
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateFormData = (key, value) => {
        switch (key) {
            case "name":
                if (value.length === 0) {
                    return "Name required!";
                }
                if (value.length < 3) {
                    return "Name too short!";
                }
                if (value.length > 20) {
                    return "Name too long!";
                }
                if (!value.match(/^[a-zA-Z\s]{3,20}$/)) {
                    return "Your name must contain only letters";
                }
                break;
            case "lastName":
                if (value.length === 0) {
                    return "Last name required!";
                }
                if (value.length < 3) {
                    return "Last name too short!";
                }
                if (value.length > 20) {
                    return "Last name too long!";
                }
                if (!value.match(/^[a-zA-Z\s]{3,20}$/)) {
                    return "Your last name must contain only letters";
                }
                break;
            case "phone":
                if (value.length === 0) {
                    return "Phone required!";
                }
                if (value.length < 8) {
                    return "Your phone number must contain at least 8 numbers";
                }
                break;
            case "email":
                if (value.length === 0) {
                    return "Email required!";
                }
                if (
                    !value.match(
                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                    )
                ) {
                    return "Invalid email please try again";
                }
                break;
            case "confirmEmail":
                if (value.length === 0) {
                    return "Email confirm is required!";
                }
                if (value !== formData.email) {
                    return "Please verify your email";
                }
                break;
            default:
        }
    };

    const enableForm = () => {
        const data = Object.values(formData).some((el) => el === "");

        const error = Object.values(formErrors).some((el) => el);

        return !data && !error;
    };

    return (
        <div className="container">
            <form onSubmit={ handleSubmit } className="contentForm">
                <InputDetail
                    input="text"
                    placeholder="Name"
                    name="name"
                    value={ formData.name }
                    onChange={ handleChange }
                    error={ formErrors.name }
                />

                <InputDetail
                    input="text"
                    placeholder="LastName"
                    name="lastName"
                    value={ formData.lastName }
                    onChange={ handleChange }
                    error={ formErrors.lastName }
                />

                <InputDetail
                    input="number"
                    placeholder="Phone"
                    name="phone"
                    value={ formData.phone }
                    onChange={ handleChange }
                    error={ formErrors.phone }
                />

                <InputDetail
                    input="text"
                    placeholder="Email"
                    name="email"
                    value={ formData.email }
                    onChange={handleChange }
                    error={ formErrors.email }
                />

                <InputDetail
                    input="text"
                    placeholder="Confirm Email"
                    name="confirmEmail"
                    value={ formData.confirmEmail }
                    onChange={ handleChange }
                    error={ formErrors.confirmEmail }
                />

                <button disabled={ !enableForm() } className="primaryButton">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Form;