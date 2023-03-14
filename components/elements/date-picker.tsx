import { useEffect, useState } from 'react';

interface IDateTimePickerProps {
  id?: string;
  value?: Date;
  minDate?: Date;
  onChange: (newDate: Date) => void;
  required?: boolean;
}

const DateTimePicker = ({
  id = 'date-time-id',
  value = new Date(),
  minDate,
  onChange,
  required = false,
}: IDateTimePickerProps) => {
  const [date, setDate] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    setDate(newDate);
    onChange(newDate);
  };

  useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <input
      id={id}
      type="datetime-local"
      value={date.toISOString().substring(0, 16)}
      min={minDate?.toISOString().substring(0, 16)}
      onChange={handleChange}
      required={required}
    />
  );
};

export default DateTimePicker;
