import { useState } from "react";
import API from "../api/api";

function AddLoan() {
  const [loanData, setLoanData] = useState({
    loan_type: "",
    lender_name: "",
    loan_amount: "",
    outstanding_amount: "",
    emi_amount: "",
    interest_rate: "",
    overdue_months: "",
    user_id: ""
  });

  const handleChange = (e) => {
    setLoanData({
      ...loanData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/loans/", {
        loan_type: loanData.loan_type,
        lender_name: loanData.lender_name,
        loan_amount: Number(loanData.loan_amount),
        outstanding_amount: Number(loanData.outstanding_amount),
        emi_amount: Number(loanData.emi_amount),
        interest_rate: Number(loanData.interest_rate),
        overdue_months: Number(loanData.overdue_months),
        user_id: Number(loanData.user_id)
      });

      alert("Loan Added Successfully");
      console.log(response.data);

      // Reset form after successful submission
      setLoanData({
        loan_type: "",
        lender_name: "",
        loan_amount: "",
        outstanding_amount: "",
        emi_amount: "",
        interest_rate: "",
        overdue_months: "",
        user_id: ""
      });

    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to add loan");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Add Loan</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "350px",
          margin: "auto",
          gap: "10px"
        }}
      >
        <input
          name="loan_type"
          placeholder="Loan Type"
          value={loanData.loan_type}
          onChange={handleChange}
          required
        />

        <input
          name="lender_name"
          placeholder="Lender Name"
          value={loanData.lender_name}
          onChange={handleChange}
          required
        />

        <input
          name="loan_amount"
          placeholder="Loan Amount"
          type="number"
          value={loanData.loan_amount}
          onChange={handleChange}
          required
        />

        <input
          name="outstanding_amount"
          placeholder="Outstanding Amount"
          type="number"
          value={loanData.outstanding_amount}
          onChange={handleChange}
          required
        />

        <input
          name="emi_amount"
          placeholder="EMI Amount"
          type="number"
          value={loanData.emi_amount}
          onChange={handleChange}
          required
        />

        <input
          name="interest_rate"
          placeholder="Interest Rate (%)"
          type="number"
          step="0.01"
          value={loanData.interest_rate}
          onChange={handleChange}
          required
        />

        <input
          name="overdue_months"
          placeholder="Overdue Months"
          type="number"
          value={loanData.overdue_months}
          onChange={handleChange}
          required
        />

        <input
          name="user_id"
          placeholder="User ID"
          type="number"
          value={loanData.user_id}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Add Loan
        </button>
      </form>
    </div>
  );
}

export default AddLoan;