import API from "../api/api";
import { useState } from "react";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        monthly_income: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/users/", formData);
            alert("User Registered Successfully");
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data);
            alert(JSON.stringify(error.response.data));
        }
    };

    return (
        <div>
            <h1>User Registration</h1>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Email"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            email: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Monthly Income"
                    type="number"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            monthly_income: e.target.value
                        })
                    }
                />

                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;