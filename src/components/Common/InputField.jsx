
import React from 'react';
import { Input } from 'reactstrap';

const InputField = ({ label, name, value, error, onChange, type = "text", isRequired = false }) => (
  <>
    <td >{isRequired && <span className="mandatory">*</span>}{label}</td>
    <td >
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
export default InputField;

// export const inputText = ({ name, value, error, onChange, type = "text", isRequired = false }) => (
//  <>
//   <input
//     type={type}
//     name={name}
//     value={value}
//     onChange={onChange}
//   />
//   </>
// )
export const InputSelect = ({ label, colSpan, name, value, error, onChange, style, options = [], valueKey = 'value', labelKey = 'label', select = false, isRequired = false }) => (
  <>
    <td >{isRequired && <span className="mandatory">*</span>}{label}</td>
    <td >
      <select
        name={name}
        value={value}
        style={style}
        className={`${error ? 'error-input' : ''}`}
        onChange={onChange}
      >
        {select && <option value="">Select</option>}
        {options.map(option => (
          <option key={option[valueKey]} value={option[valueKey]}>{option[labelKey]}</option>
        ))}
      </select>

    </td>
  </>
);


export const InputRadioBtn = ({ label, name, value, error, defaultChecked, checked, onChange, id, isRequired = false }) => (
  <>

    <Input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      id={id}
      defaultChecked={defaultChecked}
      onChange={onChange}
      className={`${error ? 'error-input' : ''}`}
    />
    <label>{label} &nbsp;&nbsp;</label>
  </>
);





export const InputCheckField = ({ label, name, value, error, onChange, type = "checkbox",checked, isRequired = false, style }) => (
  <>
    <td  style={style}>{isRequired && <span className="mandatory">*</span>}{label}</td>
    <td  >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        className={`${error ? 'error-input' : ''}`}
        onChange={onChange}
      />
    </td>
  </>
);
