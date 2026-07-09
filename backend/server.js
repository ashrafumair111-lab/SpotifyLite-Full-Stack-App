require('dotenv').config();
const app=require("./src/app");
const connectdb=require("./src/db/db")

connectdb();

// Render injects process.env.PORT; fall back to 3000 for local dev
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is running at port:${PORT}`);
})
