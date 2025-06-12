import React from 'react';

const Template1 = ({ details }) => (
  <div className="template1">
    <h1>{details.name}</h1>
    <p>Email: {details.email}</p>
    <p>Phone: {details.phone}</p>
    <h2>Experience</h2>
    <p>{details.experience}</p>
    <h2>Education</h2>
    <p>{details.education}</p>
    <h2>Skills</h2>
    <p>{details.skills}</p>
  </div>
);

export default Template1;
