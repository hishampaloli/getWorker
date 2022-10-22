import React, { useEffect, useState } from "react";
import { useDispatch, useSelector,  } from "react-redux";
import Ifsc from "ifsc-finder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import Spinner from "react-bootstrap/Spinner";
import {
  addBankDetails,
  addEducation,
  addLanguageOrSkill,
  deleteEducation,
  deleteLanguageOrSkill,
  getEmployeeProfile,
} from "../../../actions/EmplyeeActions";
import { useNavigate } from "react-router-dom";

const BankPopup = ({ bankData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   ifsc.get('SBIN0005943').then(function(res){
  //     console.log(res);
  // })

  const userProfile = useSelector((state) => state.employeeData);
  const [ifsc, setIfsc] = useState("");
  const [acName, setacName] = useState("");
  const [acNumber, setacNumber] = useState("");
  const [ConfirmAcNumber, setCOnfirmAcNumber] = useState(null);
  const [BankDetails, setBankDetaiks] = useState({});
  const [err, setErr] = useState("");

  const { userData } = userProfile;
  const BankData = useSelector((state) => state.bankData);

  console.log(BankData);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (acNumber != ConfirmAcNumber) {
      setErr("Account number does'nt match");
      return;
    } else {
      dispatch(addBankDetails(ifsc, acNumber, acName));
      
    navigate('/user/profile')
    }
  };

  useEffect(() => {
    if (ifsc.match(/[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/)) {
      Ifsc.get(ifsc).then(function (res) {
        setBankDetaiks(res);
        console.log("evuofvfuesr");
      });
    } else {
      setBankDetaiks({});
    }
  }, [ifsc]);

  return (
    <div>
      <div className="educationPopup">
        <p
          className="common-heading"
          style={{ textAlign: "center", marginLeft: "-30px" }}
        >
          Add your bank details
        </p>

        {bankData ? (
          <div style={{display: 'flex', flexDirection: 'column'}} className="bank-info-div mt-5">
            <p>
              {" "}
              <strong>IFSC CODE :</strong> {bankData?.ifsc}
            </p>
            <p>
              {" "}
              <strong>Account Name :</strong> {bankData?.accountName}
            </p>
            <p>
              {" "}
              <strong>Account Number :</strong> {bankData?.accountNumber}
            </p>
          </div>
        ) : (
          <form >
            {" "}
            <input
              type="text"
              onChange={(e) => setIfsc(e.target.value)}
              placeholder="Ifcs code"
            />
            <button>Add</button>
          </form>
        )}

        <div className="bank-info-div">
          {ifsc.match(/[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/) && ifsc.length == 11 ? (
            <div className="bank-p">
              <p>
                {" "}
                <strong>BANK NAME :</strong> {BankDetails.BANK}
              </p>
              <p>
                {" "}
                <strong>BRANCH :</strong> {BankDetails.BRANCH}
              </p>
              <p>
                {" "}
                <strong>CITY :</strong> {BankDetails.CITY}
              </p>
              <p>
                {" "}
                <strong>ADDRESS :</strong> {BankDetails.ADDRESS}
              </p>
              <p>
                {" "}
                <strong>MICR :</strong> {BankDetails.MICR}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="bank-lt-fm">
          {BankDetails?.BRANCH ? (
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <div>
                    <label htmlFor="">Account name</label>
                    <input
                      onChange={(e) => setacName(e.target.value)}
                      type="text"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="">Re-enter account number</label>
                    <input
                      onChange={(e) => setCOnfirmAcNumber(e.target.value)}
                      required
                      type="number"
                    />
                  </div>

                  <div>
                    <label htmlFor="">Account Number</label>
                    <input
                      onChange={(e) => setacNumber(e.target.value)}
                      required
                      type="number"
                    />
                  </div>
                  <p className="mt-3 " style={{ color: "#ff6c6c" }}>
                    {err ? err : ""}
                  </p>
                  <button type="submit">Add Bank Details</button>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default BankPopup;
