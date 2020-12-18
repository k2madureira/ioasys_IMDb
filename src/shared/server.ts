import app from './app';

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`🚀 Server start on port ${port}`);
});
