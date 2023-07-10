//require models here when needed

//export functions here
module.exports = {
  index,
};

function index(req, res) {
  res.render("podcasts/index");
}
