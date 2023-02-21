const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Withdraw'];
  
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit"
       id="submit-input" disabled={!isValid}></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false)

  let status = `Account Balance $ ${totalState} `;
  const handleChange = (event) => {
    const value = Number(event.target.value)
    if (value <= 0) {
      setValidTransaction(false);
      return;
    } else if (atmMode == "Withdraw" && value > totalState) {
      setValidTransaction(false);
      return;
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(true);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    if (event.target.value == "Deposit") {
      setIsDeposit(true);
    } else if (event.target.value == "Withdraw") {
      setIsDeposit(false);
    }

    setAtmMode(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <div>
        <p>Select an action below to continue</p>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Withdraw">Withdraw</option>
        </select>
      </div>
      <div>
        {
          atmMode != "" && 
          <ATMDeposit onChange={handleChange} isValid={validTransaction}
          isDeposit={isDeposit}></ATMDeposit>
        }
      </div>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
