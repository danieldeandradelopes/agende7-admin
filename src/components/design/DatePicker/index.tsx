import React from "react";
import {
  formatDateWithUserTimezone,
  formatDateForInput,
  parseDateFromInput,
} from "@/utils/date";

type DatePickerProps = {
  selectedDate: Date;
  onDateSelect?: (date: Date) => void;
  onChange?: (date: Date, dateString: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  minDate?: Date;
};

import s from "./datepicker.module.scss";

const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  selectedDate,
  onDateSelect,
  placeholder = "Selecione a data",
  className,
  disabled = false,
  required = false,
  name,
  id,
  minDate,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value) {
      // Converte a data do input considerando o timezone do usuário
      const date = parseDateFromInput(value);

      if (minDate && date < minDate) {
        return;
      }

      // Formata a data no timezone do usuário para exibição
      const dateString = formatDateWithUserTimezone(date);

      if (onChange) {
        onChange(date, dateString);
      }
      if (onDateSelect) {
        onDateSelect(date);
      }
    } else {
      if (onChange) {
        onChange(new Date(), "");
      }
    }
  };

  return (
    <input
      type="date"
      value={formatDateForInput(selectedDate)}
      onChange={handleChange}
      placeholder={placeholder}
      className={`${s.container} ${className || ""}`}
      disabled={disabled}
      required={required}
      name={name}
      id={id}
      min={minDate ? formatDateForInput(minDate) : undefined}
      {...props}
    />
  );
};

export default DatePicker;
