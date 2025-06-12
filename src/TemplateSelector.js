import React from 'react';

const TemplateSelector = ({ setTemplate }) => {
  const handleSelect = (event) => {
    setTemplate(event.target.value);
  };

  return (
    <div>
      <h2>Select Resume Template</h2>
      <select onChange={handleSelect}>
        <option value="Template1">Template 1</option>
        <option value="Template2">Template 2</option>
        <option value="Template3">Template 3</option>
      </select>
    </div>
  );
};

export default TemplateSelector;
