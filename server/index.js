const app = require('./app.js');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server now listening on port ', 3000));
