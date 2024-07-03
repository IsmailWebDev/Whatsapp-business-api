import { FC, useState } from 'react';

interface Recipient {
  id: string;
  phoneNumber: string;
  name: string;
}

interface RecipientManagerProps {
  recipients: Recipient[];
  onAddRecipient: (recipient: Recipient) => void;
  onSelectRecipients: (phoneNumbers: string[]) => void;
  selectedRecipients: string[];
}

const RecipientManager: FC<RecipientManagerProps> = ({
  recipients,
  onAddRecipient,
  onSelectRecipients,
  selectedRecipients,
}) => {
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newName, setNewName] = useState('');

  const handleAddRecipient = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPhoneNumber && newName) {
      onAddRecipient({
        id: Date.now().toString(),
        phoneNumber: newPhoneNumber,
        name: newName,
      });
      setNewPhoneNumber('');
      setNewName('');
    }
  };

  const handleSelectRecipient = (phoneNumber: string) => {
    const updatedSelection = selectedRecipients.includes(phoneNumber)
      ? selectedRecipients.filter((num) => num !== phoneNumber)
      : [...selectedRecipients, phoneNumber];
    onSelectRecipients(updatedSelection);
  };

  return (
    <div className="p-4 border-b">
      <h2 className="text-xl font-bold mb-4">Manage Recipients</h2>
      <form onSubmit={handleAddRecipient} className="mb-4">
        <input
          type="text"
          value={newPhoneNumber}
          onChange={(e) => setNewPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className="p-2 border rounded-lg mr-2 text-blue-700"
        />
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Name"
          className="p-2 border rounded-lg mr-2 text-blue-700"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-lg"
        >
          Add Recipient
        </button>
      </form>
      <div className="space-y-2">
        {recipients.map((recipient) => (
          <div key={recipient.id} className="flex items-center">
            <input
              type="checkbox"
              id={recipient.id}
              checked={selectedRecipients.includes(
                recipient.phoneNumber
              )}
              onChange={() =>
                handleSelectRecipient(recipient.phoneNumber)
              }
              className="mr-2"
            />
            <label htmlFor={recipient.id}>
              {recipient.name} ({recipient.phoneNumber})
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipientManager;
