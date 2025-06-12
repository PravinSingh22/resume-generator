import React from 'react';

const Template3 = ({ details }) => (
  <div className="template3">
    <div className="header">
      <h1>{details.name}</h1>
      <p>Email: {details.email}</p>
      <p>Phone: {details.phone}</p>
    </div>
    <div className="content">
      <div className="left">
        <h2>Skills</h2>
        <p>{details.skills}</p>
      </div>
      <div className="right">
        <h2>Experience</h2>
        <p>{details.experience}</p>
        <h2>Education</h2>
        <p>{details.education}</p>
      </div>
    </div>
  </div>
);

export default Template3;
