const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const path = require("path");

app.use(express.static("./styles"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join("views")));
app.use(express.static("source"));

const fs = require("fs");

app.engine("perscholas", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    const rendered = content
      .toString()
      .replaceAll("#title#", `${options.title}`)
      .replace("#content#", `${options.content}`);
    return callback(null, rendered);
  });
});

app.set("views", "./views");
app.set("view engine", "perscholas");

app.get("/perscholas", (req, res) => {
  const options = {
    title: "Rendering Views with Express",
    content:
      "Here, we've created a basic template engine using <code>app.engine()</code> \
      and the <code>fs</code> module, then used <code>res.render</code> to \
      render this page using custom content within the template.<br><br> \
      Generally, you won't want to create your own view engines, \
      but it important to understand how they work behind the scenes. \
      For a look at some popular view engines, check out the documentation for \
      <a href='https://pugjs.org/api/getting-started.html'>Pug</a>, \
      <a href='https://www.npmjs.com/package/mustache'>Mustache</a>, or \
      <a href='https://www.npmjs.com/package/ejs'>EJS</a>. \
      More complete front-end libraries like React, Angular, and Vue \
      also have Express integrations. Check out this additional view \
      <a href='http://localhost:3000/mumbojumbo'>Express View 2</a>."
  };

  res.render("index.perscholas", options);
});

app.engine("mumbojumbo", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    const rendered = content
      .toString()
      .replaceAll("#title#", `${options.title}`)
      .replace("#content#", `${options.content}`);
    return callback(null, rendered);
  });
});

app.set("views", "./views");
app.set("view engine", "mumbojumbo");

app.get("/mumbojumbo", (req, res) => {
  const options = {
    title: "An Additional View with Express",
    content:
      "Here is a bunch of <code>mumbo jumbo</code> \
        to fill the page. Raw denim JOMO <code>stumptown</code> artisan. Gluten-free drinking \
        vinegar jawn <code>hot chicken</code> whatever occupy street art palo \
        santo tote bag selvage irony.<br><br> \
        Praxis ethical iceland kitsch green juice. Wolf 3 wolf moon knausgaard, pork \
        belly cliche tofu taxidermy big mood waistcoat humblebrag migas tattooed \
        drinking vinegar venmo. Gochujang flexitarian edison bulb hoodie \
        whatever jawn umami. Selfies coloring book vaporware affogato paleo, hell \
        of pug marfa taxidermy. Check out this additional view \
        <a href='http://localhost:3000/perscholas'>Express View 1</a>."
  };

  res.render("index.mumbojumbo", options);
});

app.get('/form', (req, res) => {
  res.sendFile(path.join("views", "form.html"));
});

app.post("/submit", (req, res) => {
  const formData = req.body;
  console.log("Form Data:", formData);

  res.send(`<h1 style="text-align:center; color:green">Success!</h1>`);
});

app.get("/welcome/:username", (req, res) => {
  const username = req.params.username;
  res.send(`<h1>Welcome, ${username}!</h1>`);
});

app.get("/mumbojumbo", (req, res) => {
  res.sendFile(path.join("views", "index.mumbojumbo"));
  
});

app.get("/download/:filename", (req, res) => {
  // const filename = req.params.filename;
  const filePath = path.join("source", "Umbreon.png");
  res.download(filePath);
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});