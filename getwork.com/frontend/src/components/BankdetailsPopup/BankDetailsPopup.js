import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "../../actions/EmplyeeActions";

const BankPopup = () => {
  const dispatch = useDispatch();

  //   ifsc.get('SBIN0005943').then(function(res){
  //     console.log(res);
  // })

  const userProfile = useSelector((state) => state.employeeData);
  const [ifsc, setIfsc] = useState("");
  const [acName, setacName] = useState("");
  const [acNumber, setacNumber] = useState("");
  const [ConfirmAcNumber, setCOnfirmAcNumber] = useState("");
  const [BankDetails, setBankDetaiks] = useState({});
  const { userData } = userProfile;
  const BankData = useSelector((state) => state.bankData)
  console.log(BankData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ifsc && acName && acNumber) {
        dispatch(addBankDetails(ifsc,acNumber ,acName))
    }else {
        alert("asdd")
    }
  }

  useEffect(() => {
    if (ifsc) {
      Ifsc.get(ifsc).then(function (res) {
        setBankDetaiks(res);
      });
    }
  }, [ifsc]);

  console.log(BankDetails);

  return (
    <div>
      <div className="educationPopup">
        <p
          className="common-heading"
          style={{ textAlign: "center", marginLeft: "-30px" }}
        >
          Add your bank details
        </p>

        <form> <input
            type="text"
            onChange={(e) => setIfsc(e.target.value)}
            placeholder="Ifcs code"
          />
          <button >Add</button>
         
        </form>

        <div>
          {BankDetails ? (
            <div className="bank-p" >
              <p> <strong>BANK NAME :</strong> {BankDetails.BANK}</p>
              <p> <strong>BRANCH :</strong> {BankDetails.BRANCH}</p>
              <p> <strong>CITY :</strong> {BankDetails.CITY}</p>
              <p> <strong>ADDRESS :</strong> {BankDetails.ADDRESS}</p>
              <p> <strong>MICR :</strong> {BankDetails.MICR}</p>
            </div>
          ) : (
            ""
          )}
        </div>

        <div>
          {BankDetails?.BRANCH ? (
            <div>
              <form onSubmit={handleSubmit} >
              <div>
                <div>
                  <label htmlFor="">Account name</label>
                  <input
                    onChange={(e) => setacName(e.target.value)}
                    type="text"
                  />
                </div>

                <div>
                  <label htmlFor="">Re-enter account number</label>
                  <input
                    onChange={(e) => setCOnfirmAcNumber(e.target.value)}
                    type="text"
                  />
                </div>

                <div>
                  <label htmlFor="">Account Number</label>
                  <input
                    onChange={(e) => setacNumber(e.target.value)}
                    type="text"
                  />
                </div>

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
