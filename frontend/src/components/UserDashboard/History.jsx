import React from 'react';

const History = () => {
  // Sample data to simulate user history
  const historyData = [
    { id: 1, date: '2024-07-10', action: 'Purchased Kashmiri Saffron 2g', quantity: 1, amount: '₹525' },
    { id: 2, date: '2024-07-15', action: 'Purchased Premium Spain Saffron 2g', quantity: 2, amount: '₹1150' },
    { id: 3, date: '2024-07-20', action: 'Purchased Kashmiri Saffron 5g', quantity: 1, amount: '₹2575' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">History</h2>
      <div className="bg-white p-6 rounded-lg space-y-6">
        {historyData.length === 0 ? (
          <p className="text-gray-500">No history available.</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 text-left">Date</th>
                <th className="py-2 text-left">Action</th>
                <th className="py-2 text-left">Quantity</th>
                <th className="py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((entry) => (
                <tr key={entry.id}>
                  <td className="py-2 border-b">{entry.date}</td>
                  <td className="py-2 border-b">{entry.action}</td>
                  <td className="py-2 border-b">{entry.quantity}</td>
                  <td className="py-2 border-b">{entry.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default History;
