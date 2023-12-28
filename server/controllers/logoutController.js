const CLIENT_URL = "http://localhost:3000/";
module.exports = function (req, res) {
  req.logout(); // Passport.js function to logout the user
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
      return res.redirect("/logout/failed"); // Redirect to homepage or another route
    }
    res.redirect(CLIENT_URL); // Redirect to homepage or another route after successful logout
  });
};
