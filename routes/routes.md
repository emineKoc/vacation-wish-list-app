
- attractions.route('/')
 - .get(function(req, res) {
 -   res.send('GET This view will show all attractions');
 -  })
.post(function(req, res) {
  res.send('POST this will come from "/new" and add attraction');
})

attractions.route('/new')
.get(function(req, res) {
  res.send(' GET this will show the form to add attractions to "/" ');
})

attractions.route('/:id')
.get(function(req, res) {
  res.send('this is the view to show one attraction');
})
.put(function(req, res) {
  res.send('this is the view to edit one attraction');
})
.delete(function(req, res) {
  res.send('this will delete one attraction');
})

attractions.route('/:id/edit')
.get(function(req, res) {
  res.send('this will be a form which edits one attraction');
})
