import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file
import "react-date-range/dist/theme/default.css"; // Default theme CSS file
import { format } from "date-fns";
import "tailwindcss/tailwind.css";

const DateRangePickerComponent = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-5 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Select Date Range</h2>

        {/* Button to toggle the calendar */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={toggleCalendar}
        >
          {showCalendar ? "Hide Calendar" : "Pick Date Range"}
        </button>

        {/* Conditionally show the calendar */}
        {showCalendar && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
            className="mt-4 rounded-lg"
          />
        )}

        <div className="mt-4">
          <p className="text-lg">
            Start Date: {format(state[0].startDate, "yyyy-MM-dd")}
          </p>
          <p className="text-lg">
            End Date: {format(state[0].endDate, "dd/MM/yy")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DateRangePickerComponent;
