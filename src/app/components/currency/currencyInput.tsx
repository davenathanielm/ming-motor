import { NumericFormat } from 'react-number-format';

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  readOnly?: boolean;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  readOnly = false,
}) => {
  return (
    <NumericFormat
      value={value}
      onValueChange={(values) => {
        const numericValue = values.floatValue || 0;
        onChange(numericValue);
      }}
      thousandSeparator="."
      decimalSeparator=","
      allowNegative={false}
      readOnly={readOnly}
      className="w-full p-2 rounded-xl bg-gray-100 border border-gray-300 text-sm"
      placeholder="0"
    />
  );
};

export default CurrencyInput;
