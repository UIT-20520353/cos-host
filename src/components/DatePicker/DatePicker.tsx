function DatePicker() {
  const handleClick = () => {
  };

  return (
    <div className="mb-5 w-64">
      <label htmlFor="datepicker" className="mb-1 block font-bold text-gray-700">
        Select Date
      </label>
      <div className="relative">
        <input type="hidden" name="date" />
        <input
          type="text"
          className="w-full rounded-lg py-3 pl-4 pr-10 font-medium leading-none text-gray-600 shadow-sm focus:outline-none focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          placeholder="Select date"
          readOnly={true}
          onClick={handleClick}
        />

        <div className="absolute right-0 top-0 px-3 py-2">
          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
