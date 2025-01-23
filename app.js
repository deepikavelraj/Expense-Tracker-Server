


const express=require("express") //imported express
const app = express() //instance of express
 //parse incoming JSON request
const mongoose=require("mongoose")//import mongoose
const{v4:uuidv4}=require("uuid")
app.use(express.json())//parse json data
const PORT=8000
const mongourl= "mongodb://0.0.0.0:27017/demo";


mongoose
.connect("mongodb+srv://deepikavel:9787@cluster0.uvxbd.mongodb.net/sample_mflix")
.then(()=>{
    console.log("Db connected")
    app.listen(PORT,()=>{
        console.log("My server is running")
    })
})



const expenseSchema = new mongoose.Schema({
    id:{type:String,required:true,unique:true},
    title:{type:String,required:true},
    amount:{type:Number,required:true},
});
const expenseModel = mongoose.model("startup_log",expenseSchema);//collection name,schema name

app.get('/api/expense',async(req,res)=>{
    
    const data= await expenseModel.find({});        ///get whole data
    res.json(data)
})


app.put("/api/expenses/:id", async(req, res) => {
    const {id} = req.params;
    const { title , amount } = req.body;
    const updatedExpense = await expenseModel.findOneAndUpdate(
        {
            id : id,
        },
        {
            title: title,
            amount: amount,
        }
    )
    res.status(200).json(updatedExpense);
})


app.delete('/api/expensess/:id' , async(req, res) => {
    const {id}  = req.params;
    const deleteExpense =  await expenseModel.findOneAndDelete(id)
        if(deleteExpense)
        {
            res.status(200).json(deleteExpense);
        }
})
   

app.post('/api/expensse',async(req,res) => {
    const { title, amount } = req.body;
    const newExpense = new expenseModel( {
        id: uuidv4(),
        title: title,
        amount: amount,
    });
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense);
});

app.get("/api/expenseById/:_id",async(req,res)=>{
    const {id}=req.params;
    const getid=await expenseModel.findOne({id});    
    res.status(200).json(getid)
})



    // rest api la 9 methods








   