import React, { useState } from 'react';

const SplitExpenses = () => {
  // State to store the expenses
  const [expenses, setExpenses] = useState([]);

  // State to store the form inputs
  const [name, setName] = useState('');
  const [total, setTotal] = useState('');

  // Handles form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setExpenses([...expenses, { name, total: parseFloat(total) }]);
    setName('');
    setTotal('');
  };

  // Handles the split calculation
  const handleSplit = () => {
    // Calculate total amount spent
    const totalAmount = expenses.reduce(
      (acc, expense) => acc + expense.total,
      0
    );
    // Divide total amount by the number of people
    const amountPerPerson = totalAmount / expenses.length;
    // Calculate amountToPay for each person
    const payers = expenses.map((expense) => {
      return {
        name: expense.name,
        total: expense.total,
        amountToPay: (amountPerPerson - expense.total).toFixed(2),
      };
    });
    setExpenses(payers);
  };

  // Handles the clear action
  const handleClear = () => {
    setExpenses([]);
  };

  return (
    <div className="m-auto flex min-h-screen w-full max-w-2xl flex-col py-6 px-4 text-slate-900">
      <main className="flex flex-col flex-1 items-stretch gap-6 justify-between">
        <div>
          <header className="flex flex-col space-y-4 my-5">
            <div className="flex">
              <h1 className="text-4xl font-bold">split</h1>
              <span className="text-4xl text-slate-400 font-light">.it</span>
            </div>
            <p className="self-start">
              The simplest way to split expenses with friends!
            </p>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="flex mb-4">
              <input
                className="border rounded-md w-full py-2 px-3"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <input
                className="border rounded-md w-full py-2 px-3 ml-4"
                type="number"
                placeholder="Total"
                value={total}
                onChange={(event) => setTotal(event.target.value)}
              />
              <button className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md ml-4">
                Add
              </button>
            </div>
          </form>
        </div>
        {expenses.length === 0 ? (
          <div className="text-center text-gray-600 my-10">
            No expenses added yet.
          </div>
        ) : (
          <table className="w-full text-left table-collapse">
            <thead>
              <tr>
                <th className="text-xs font-medium text-gray-600 p-2 bg-gray-100">
                  Name
                </th>
                <th className="text-xs font-medium text-gray-600 p-2 bg-gray-100">
                  Total
                </th>
                <th className="text-xs font-medium text-gray-600 p-2 bg-gray-100">
                  Amount To Pay
                </th>
                <th className="text-xs font-medium text-gray-600 p-2 bg-gray-100">
                  Payee
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => {
                let payee = '';
                if (expense.amountToPay > 0) {
                  payee = expenses.find((e) => e.amountToPay < 0).name;
                } else if (expense.amountToPay < 0) {
                  payee = expenses.find((e) => e.amountToPay > 0).name;
                }
                return (
                  <tr key={index}>
                    <td className="p-2 border-t">{expense.name}</td>
                    <td className="p-2 border-t">{expense.total}</td>
                    <td className="p-2 border-t">
                      {Math.abs(expense.amountToPay)}
                    </td>
                    <td className="p-2 border-t">{payee}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md mr-4"
            onClick={handleSplit}
          >
            Calculate
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </main>

      <footer className="items-center justify-center pt-20">
        <a href="https://mkpang.space/" target="__blank">
          <span className="font-medium border border-slate-300 px-3 py-0.5 rounded cursor-pointer select-none md:hover:bg-slate-200 text-sm">
            by Mingkai Pang ❤️
          </span>
        </a>
      </footer>
    </div>
  );
};

export default SplitExpenses;
