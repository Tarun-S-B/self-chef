const express = require("express")
const cors = require("cors")
const {WebSocketServer} = require('ws');
const {HfInference} = require("@huggingface/inference")

require("dotenv").config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());


const server = app.listen(PORT, () => {
    console.log(`Server started at Port ${PORT}`)
})

const wss = new WebSocketServer({server})

wss.on("connection", (ws) => {
    ws.on("message", (data) => {
        console.log("From client in ws ",data)
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





app.post("/sendRecipe", async (req,res) => {
    const {ingredients} = req.body;

    console.log(ingredients)

    const fromAI = await getRecipeFromMistral(ingredients)


    res.json({recipe:fromAI});
    
})


