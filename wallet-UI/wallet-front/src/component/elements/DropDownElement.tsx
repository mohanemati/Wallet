import React, { useState } from "react";

interface DropDownComponentProps {
  onChange: (value: string) => void;
}

const DropDownComponent: React.FC<DropDownComponentProps> = ({ onChange }) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const militaryStatuses = [
    { value: "completed", label: "پایان خدمت" },
    { value: "exempt", label: "معافیت" },
    { value: "in-progress", label: "در حال خدمت" },
    { value: "not-required", label: "مشمول نیست" },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(value);
    onChange(value);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="militaryStatus">وضعیت نظام وظیفه:</label>
      <select
        id="militaryStatus"
        value={selectedStatus}
        onChange={handleChange}
        style={{
          padding: "8px",
          margin: "8px 0",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">انتخاب وضعیت</option>
        {militaryStatuses.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>

      {/* {selectedStatus && (
        <p>وضعیت انتخاب شده: {militaryStatuses.find(status => status.value === selectedStatus).label}</p>
      )} */}
    </div>
  );
};

export default DropDownComponent;
