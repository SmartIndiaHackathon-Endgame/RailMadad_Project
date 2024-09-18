import PropTypes from "prop-types"; // Import PropTypes

export const Input = ({ name, placeholder, value, onChange, suffix, className }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-full p-4 rounded-lg bg-gray-200"
      />
      {suffix && <div className="absolute right-4 top-1/2 transform -translate-y-1/2">{suffix}</div>}
    </div>
  );
};

// Add propTypes for validation
Input.propTypes = {
  name: PropTypes.string.isRequired, // name is a required string
  placeholder: PropTypes.string, // placeholder is optional but should be a string
  value: PropTypes.string.isRequired, // value is a required string
  onChange: PropTypes.func.isRequired, // onChange is a required function
  suffix: PropTypes.node, // suffix is optional and should be a React node (could be an icon, text, etc.)
  className: PropTypes.string, // className is optional and should be a string
};

// Default props
Input.defaultProps = {
  placeholder: "", // Default placeholder is an empty string
  suffix: null, // Default suffix is null (optional)
  className: "", // Default className is an empty string
};
