import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { toast } from "react-toastify";

const UserDetailsForm = ({ setUserDetails }) => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    education: "",
    workExperience: "",
    skills: "",
    Certification: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserDetails(details);
    toast.success("Data Saved");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={details.name}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={details.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={details.phone}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Experience"
            name="experience"
            value={details.experience}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Education"
            name="education"
            value={details.education}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Skills"
            name="skills"
            value={details.skills}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Certification"
            name="Certification"
            value={details.Certification}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Save Details
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserDetailsForm;
