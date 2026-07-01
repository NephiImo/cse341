const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/professional", (req, res) => {
  res.json({
    professionalName: "Nephi Imo",

    base64Image: "PUT_BASE64_IMAGE_HERE",

    nameLink: {
      firstName: "Nephi",
      url: "https://www.linkedin.com"
    },

    primaryDescription:
      " is a software development student and IT Support Specialist.",

    workDescription1:
      "Nephi enjoys building web applications, solving technical problems, and learning new technologies.",

    workDescription2:
      "He has experience with JavaScript, Node.js, GitHub, APIs, and frontend development.",

    linkTitleText: "Professional Links",

    linkedInLink: {
      text: "LinkedIn",
      link: "https://www.linkedin.com"
    },

    githubLink: {
      text: "GitHub",
      link: "https://github.com/NephiImo"
    }
  });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});