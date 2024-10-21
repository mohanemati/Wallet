import React from "react";
import TransactionDebit from "./TransactionDebit";
import TransactionCredit from "./TransactionCredit";

function Transaction() {
  return (
    <div className="w-full bg-primary-100 min-h-screen p-5">
      <div className="w-full flex ">
        <div className="w-1/2 h-[500px]">
          <TransactionDebit />
        </div>
        <div className="w-1/2  h-[500px]">
          <TransactionCredit />
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Transaction;
