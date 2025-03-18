const express = require("express")
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")
const {HfInference} = require("@huggingface/inference")

require("dotenv").config();
const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    },
});
app.use(express.json());
app.use(cors());

io.on("connection", (client) => {
    console.log("Clien id: ",client.id);

    client.on('frontend_message', (frontend_data) => {
        console.log(frontend_data)

        const backend_data = "This data is from backend";
        io.emit("backend_data",backend_data);
    })
})


app.get("/",(req, res) => {
    res.send("Backend Up")
})

app.get("/getData", (req,res) => {
    res.send("From backend");
})

app.get("/verify-backend", (req, res) => {
    res.send("Backend Up on port of backend")
})



async function getRecipeFromMistral(ingredientsArr) {
    const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page`
    const hf = new HfInference(process.env.HUGGING_API)
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}





// app.post("/sendRecipe", async (req,res) => {
//     const {ingredients} = req.body;

//     console.log(ingredients)

//     const fromAI = await getRecipeFromMistral(ingredients)


//     res.json({recipe:fromAI});
    
// })


app.post("/sendRecipe", async (req,res) => {
    const {ingredients} = req.body;

    console.log(ingredients)

    try {
        const fromAI = await getRecipeFromMistral(ingredients)

        io.emit("backend_recipe", fromAI);

        res.json({message: "Recipe Send via WebSocket"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed to get recipe"});
    }
})




server.listen(PORT, () => {
    console.log(`Backend Server running on ${PORT}`);
})