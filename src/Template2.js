import React from 'react';

const Template2 = ({ details }) => (
  <div className="template2">
    <header>
      <h1>{details.name}</h1>
      <p>{details.email} | {details.phone}</p>
    </header>
    <section>
      <h2>Experience</h2>
      <p>{details.experience}</p>
    </section>
    <section>
      <h2>Education</h2>
      <p>{details.education}</p>
    </section>
    <section>
      <h2>Skills</h2>
      <p>{details.skills}</p>
    </section>
  </div>
);

export default Template2;
