import { FC } from 'react';

interface PhoneNumber {
  id: string;
  display_phone_number: string;
  verified_name: string;
}

interface PhoneNumberSelectorProps {
  phoneNumbers: PhoneNumber[];
  selectedNumber: string;
  onSelectNumber: (number: string) => void;
}

const PhoneNumberSelector: FC<PhoneNumberSelectorProps> = ({
  phoneNumbers,
  selectedNumber,
  onSelectNumber,
}) => {
  return (
    <div className="p-4 border-b">
      <h2 className="text-xl font-bold mb-4">Select Phone Number</h2>
      <select
        value={selectedNumber}
        onChange={(e) => onSelectNumber(e.target.value)}
        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
      >
        <option value="">Select a phone number</option>
        {phoneNumbers.map((number) => (
          <option key={number.id} value={number.display_phone_number}>
            {number.display_phone_number} - {number.verified_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PhoneNumberSelector;
