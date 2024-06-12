import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Input } from 'reactstrap';

const InputField = ({ label, name, value, error, onChange, type = "text", isRequired = false }) => (
  <>
    <td>{isRequired && <span className="mandatory">*</span>}{label}</td>
    <td>
      <Input
        type={type}
        name={name}
        value={value}
        className={`${error ? 'error-input' : ''}`}
        onChange={onChange}
      />
    </td>
  </>
);

InputField.propTypes = { // Define prop types
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  isRequired: PropTypes.bool
};

// Define propTypes for other components in a similar manner
export const InputSelect = ({ label, colSpan, name, value, error, onChange, style, options = [], valueKey = 'value', labelKey = 'label', select = false, isRequired = false }) => (
  <>
    <td  style={{font:"21px san-serief"}}>{isRequired && <span className="mandatory" >*</span>}{label}</td>
    <td >
      <select
        name={name}
        value={value}
        style={style}
        className={`${error ? 'error-input' : ''}`}
        onChange={onChange}
      >
        {select && <option value="" >Select</option>}
        {options.map(option => (
          <option key={option[valueKey]} value={option[valueKey]}>{option[labelKey]}</option>
        ))}
      </select>

    </td>
  </>
);

export default InputField;
