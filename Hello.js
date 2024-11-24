export default function Hello(app) {
  app.get("/hello", (req, res) => {
    res.send("Hello Beans!");
  });

  app.get("/", (req, res) => {
    res.send("Welcome to Web Development!");
  });
}
