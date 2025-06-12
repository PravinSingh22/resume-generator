import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import html2pdf from "html2pdf.js";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TemplateSelector from "./TemplateSelector";
import UserDetailsForm from "./UserDetailsForm";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import LoadingSpinner from "./LoadingSpinner ";
import "./App.css";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";


const App = () => {
  const [template, setTemplate] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [style, setStyle] = useState("modern");
  const [color, setColor] = useState("blue");
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [Font, setFont] = useState("");
  const [Additionaldetails, setAdditionaldetails] = useState("");
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const handleGenerateResume = async () => {
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.post(
        "http://localhost:5000/generate-resume",
        {
          template,
          userDetails,
          style,
          color,
          Font,
          Additionaldetails,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      setResume(response.data.data);
      setError("");
      toast.success("Resume generated successfully!");
    } catch (error) {
      console.error("Error generating resume:", error.message);
      setError(error.response ? error.response.data.error : error.message);
      toast.error("Error generating resume.");
    }
    setLoading(false);
  };

  const handleDownloadResume = async () => {
    try {
      // Create a new HTML element
      const element = document.createElement("div");
      element.innerHTML = resume;

      // Define the options for html2pdf
      const options = {
        margin: 1,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      // Add delay before download
      setLoading(true);
      setTimeout(async () => {
        await html2pdf().from(element).set(options).save();
        setLoading(false);
        toast.success("Resume downloaded successfully!");
      }, 2000); // 2 seconds delay
    } catch (error) {
      console.error("Error downloading resume:", error.message);
      setLoading(false);
      toast.error("Error downloading resume.");
    }
  };

  const handleChange = (e) => {
    setAdditionaldetails(e.target.value);
  };
  // const renderTemplate = () => {
  //   switch (template) {
  //     case 'Template1':
  //       return <Template1 details={userDetails} />;
  //     case 'Template2':
  //       return <Template2 details={userDetails} />;
  //     case 'Template3':
  //       return <Template3 details={userDetails} />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="App">
      <h1>Resume Generator</h1>
      {isAuthenticated ? (
    <>
    <LogoutButton/>
      <Profile/>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={5}>
          {/* <TemplateSelector setTemplate={setTemplate} /> */}
          <UserDetailsForm setUserDetails={setUserDetails} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Style</InputLabel>
            <Select value={style} onChange={(e) => setStyle(e.target.value)}>
              <MenuItem value="modern">Modern</MenuItem>
              <MenuItem value="classic">Classic</MenuItem>
              <MenuItem value="creative">Creative</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Color</InputLabel>
            <Select value={color} onChange={(e) => setColor(e.target.value)}>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="black">Black</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Font</InputLabel>
            <Select value={Font} onChange={(e) => setFont(e.target.value)}>
              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Calibri">Calibri</MenuItem>
              <MenuItem value="Garamond">Garamond</MenuItem>
              <MenuItem value="Georgia">Georgia</MenuItem>
            </Select>
          </FormControl>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Additional Details"
              name="Additional Details"
              value={Additionaldetails}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateResume}
            disabled={loading}
          >
            Generate Resume
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {resume && (
                <Paper className="resume-preview">
                  <Typography variant="h5" gutterBottom>
                    Generated Resume
                  </Typography>
                  <iframe
                    srcDoc={resume}
                    title="Resume Preview"
                    style={{ width: "100%", height: "500px", border: "none" }}
                  ></iframe>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDownloadResume}
                    style={{ marginTop: "20px" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Download Resume"
                    )}
                  </Button>
                </Paper>
              )}
            </>
          )}
        </Grid>
      </Grid>
      {error && <p className="error">{error}</p>}
      <ToastContainer />
      </>
    ) : (
      <LoginButton />
    )}
    </div>
  );
};

export default App;
