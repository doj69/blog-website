const express = require("express");
const bodyParser = require("body-parser");
const model = require("./controller/helper/mongoUtil");
const { render } = require("ejs");

//Constant variable
const port = process.env.PORT || 3000;
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const route = ["/", "/about", "/contact", "/compose"];

//Local variable
let message = "";
let journals = [];

//Set the config
const app = express();

app.use(express.urlencoded({ extended: true }), express.static("public"));

app.set("view engine", "ejs");

//Dynamic Item List Type Route
route.forEach((element) => {
  let pathName =
    element === "/" ? "HOME" : element.replace("/", "").toUpperCase();
  switch (element) {
    case "/":
      break;
    case "/about":
      contentType = aboutContent;
      break;
    case "/contact":
      contentType = contactContent;
      break;
    default:
      break;
  }
});

app.get("/", (req, res) => {
  model.Publish.findAll((result) => {
    if (result.length > 0) {
      journals = result;
    }
    res.render("home", {
      content: homeStartingContent,
      heading: "HOME",
      route: "/",
      journals: journals,
    });
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    content: aboutContent,
    heading: "ABOUT",
    route: "/About",
  });
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    content: contactContent,
    heading: "CONTACT",
    route: "/Contact",
  });
});

app.get("/compose", (req, res) => {
  res.render("compose", {
    heading: "COMPOSE",
    route: "/Compose",
  });
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postText,
  };
  if (post !== null) {
    model.Publish.add(post);
    res.redirect("/");
  }
});

app.get("/journal/:id", (req, res) => {
  let id = req.params.id;
  model.Publish.findById(id, (data) => {
    if (data !== "") {
      res.render("post", { heading: data.title, content: data.content });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
