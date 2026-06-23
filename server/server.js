//server.js

// Server Start Hot hi (Initialization Phase)

// Step 1: Jaise hi aap node server.js command chalate ho, toh app.listen(PORT) active hota hai. Aapka server live ho jata hai aur terminal me message aata hai: Server is running on port...

// Step 2: Iske turant baad seedDatabase() function automatic call hota hai. Yeh database me jaakar Restaurant collection ka purana data saaf karta hai aur naya seedData daal deta hai.

// Step 3: Saath hi saath insertDummyData() function bhi run hota hai. Yeh check karta hai ki agar database me pehle se koi orders nahi hain (length === 0), tabhi yeh 2 dummy orders database me insert karta hai. Agar pehle se data hai, toh yeh kuch nahi karta.

// 2. Frontend Se Data Mangne Par (GET Requests)

// Jab koi user aapki app open karega ya kisi page par jaayega:

// Scenario A (Restaurants Dekhne Ke Liye)

// Frontend se request aati hai GET /restaurants par.

// Server database se Restaurant.find({}) karke saare restaurants nikaalta hai.

// Aur response me saara data JSON format me frontend ko bhej deta hai taaki screen par dikh sake.

// Scenario B (Purane Orders Dekhne Ke Liye):
// Frontend se request aati hai GET /previousOrders par.
// Frontend se request aati hai GET /previousOrders par.

// Server database me jaakar PreviousOrder.find() chalata hai.

// Saare purane orders fetch karke frontend ko 200 OK status ke saath send kar deta hai.

// 3. Naya Order Place Karne Par (POST Request)

// Jab user app par koi naya order click ya submit karta hai:

// Step 1: Frontend ek POST /previousOrders request bhejta hai, jiske body me order details (orderId, dateOfOrder, amount) hoti hain.

// Step 2: Server is data ko pakadta hai (req.body) aur terminal me log (console.log) karta hai verification ke liye.

// Step 3: Server Mongoose ka use karke ek naya order object banata hai aur newOrder.save() karke usko database me hamesha ke liye save kar deta hai.

// Step 4: Sab sahi hone par server frontend ko 201 Created status ke saath success message bhej deta hai, aur user ko screen par "Order Saved" dikh jata hai.


const express = require("express");
// Express framework ko import kiya hai taaki hum server aur routes bana sakein.
const mongoose = require("mongoose");

const cors = require("cors");
// CORS package ko import kiya hai taaki different domains (jaise aapka frontend) is server se bina kisi error ke baat kar sakein.
const app = express();
// Express ka ek instance (object) banaya hai jiska naam app rakha hai. Isi se saara server handle hoga.
const PORT = process.env.PORT || 5000;
// Server chalane ke liye port number set kiya hai. Agar environment variable me koi port defined hai toh wo chalega, nahi toh default 5000 use hoga.
app.use(cors());
// Server me CORS middleware add kiya hai taaki frontend se aane wali requests block na hon.
app.use(express.json());
// Ye middleware server ko incoming request ke JSON data ko samajhne aur read karne me madad karta hai.

mongoose
    .connect("mongodb://localhost:27017/food-delivery-app",)
    // Local machine par chal rahe MongoDB database food-delivery-app se connection setup kiya hai. Purane connection code ke warnings se bachne ke liye options pass kiye hain.
    .then(() => console.log("Connected to db"))
    // Agar database se connection successfully ho jata hai, toh console me "Connected to db" print hoga.
    .catch((err) => console.log("Error connecting to db", err));
// Agar database se connect hone me koi gadbad ya error aati hai, toh ye error message console me dikhega.


const restaurantSchema = new mongoose.Schema({

    // Restaurant data ka ek structure (schema) define karna shuru kiya hai ki database me data kaisa dikhega.

    name: String,
    image: String,
    //  Restaurant ka naam aur uski image ka URL dono String type ke honge.
    menu: [
        {
            name: String,
            price: Number,
            image: String,
        },
        // menu ek array hoga jisme multiple food items honge. Har item ka naam (String), price (Number), aur image (String) hoga.
    ],
    rating: Number,
    // Restaurant ki rating Number format me hogi, aur yahan schema definition khatam hoti hai.
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
// restaurantSchema ko use karke database ke liye "Restaurant" naam ka ek model banaya hai. Ab isse data insert ya find kar sakte hain.
// Define the PreviousOrder schema
const previousOrderSchema = new mongoose.Schema({
    // Pichle orders (previous orders) ka structure tayyar karne ke liye naya schema shuru kiya hai.
    orderId: { type: String, required: true },
    // orderId String hogi aur isko dalna compulsory (required: true) hai.
    dateOfOrder: { type: Date, required: true },
    // Order ki date Date format me hogi aur ye field bhi compulsory hai.
    amount: { type: Number, required: true },
    // Total bill amount Number format me hoga, ye bhi compulsory hai. Yahan ye schema band hota hai.
});

const PreviousOrder = mongoose.model("PreviousOrder", previousOrderSchema);
// previousOrderSchema ko use karke database ke liye "PreviousOrder" naam ka model taiyar kar diya hai.
// Seed initial data
const seedData = [
    {
        name: "Italian Delight",
        image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
        menu: [
            {
                name: "Pasta Alfredo",
                price: 10,
                image:
                    "https://media.geeksforgeeks.org/wp-content/uploads/20240110004646/file.jpg",
            },
            {
                name: "Margherita Pizza",
                price: 15,
                image:
                    "https://media.geeksforgeeks.org/wp-content/uploads/20240110004646/file.jpg",
            },
            {
                name: "Chicken Parmesan",
                price: 20,
                image:
                    "https://media.geeksforgeeks.org/wp-content/uploads/20240110004646/file.jpg",
            },
        ],
        rating: 4.5,
    },
    {
        name: "Seafood Paradise",
        image:
            "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
        menu: [
            {
                name: "Grilled Salmon",
                price: 12,
                image:
                    "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
            {
                name: "Lobster Bisque",
                price: 18,
                image:
                    "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
            {
                name: "Shrimp Scampi",
                price: 25,
                image:
                    "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
        ],
        rating: 3.8,
    },
    {
        name: "Vegetarian Haven",
        image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
        menu: [
            {
                name: "Quinoa Salad",
                price: 8,
                image:
                    "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
            {
                name: "Eggplant Parmesan",
                price: 12,
                image:
                    "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
            {
                name: "Mushroom Risotto",
                price: 16,
                image:
                    "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
        ],
        rating: 4.2,
    },
    {
        name: "Sizzling Steakhouse",
        image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
        menu: [
            {
                name: "Filet Mignon",
                price: 22,
                image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
            {
                name: "New York Strip",
                price: 18,
                image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
            {
                name: "Ribeye Steak",
                price: 25,
                image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
        ],
        rating: 4.7,
    },
    {
        name: "Asian Fusion",
        image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
        menu: [
            {
                name: "Sushi Platter",
                price: 20,
                image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
            {
                name: "Pad Thai",
                price: 15,
                image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
            {
                name: "Mongolian Beef",
                price: 18,
                image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110004602/pexels-chan-walrus-958545-(1).jpg",
            },
        ],
        rating: 4.0,
    },
];

// Yeh code ek Node.js server ka hai jo Express aur MongoDB (Mongoose) use kar raha hai. Yeh basically database me data seed (insert) karne aur restaurants & orders ke liye API endpoints banane ke liye hai.

const seedDatabase = async () => {
    // Ek asynchronous function bana rahe hain database me initial data daalne ke liye.
    try {
        // Error handling start ho rahi hai taaki code crash na ho agar koi dikkat aaye.
        await Restaurant.deleteMany(); // Clear existing data
        // Pehle se jitna bhi data hai Restaurant collection me, sabko delete kar rahe hain taaki duplicates na hon.
        await Restaurant.insertMany(seedData);
        // seedData naam ke array se saara naya data ek saath database me insert kar rahe hain.
        console.log("Database seeded successfully.");
        // Terminal me message print kar rahe hain ki data successfully dal gaya.
    } catch (error) {
        // Agar try block me koi error aati hai, toh code yahan aayega.
        console.error("Error seeding the database:", error.message);
        // Jo bhi error aayi hai, usko terminal me show kar rahe hain.
    }
};

// Seed data when the server starts
seedDatabase();
// Is function ko call kar rahe hain taaki server start hote hi data seed ho jaye.

// Insert dummy data when the server starts
const insertDummyData = async () => {
    // Ek aur async function bana rahe hain dummy orders daalne ke liye.
    try {
        // Fir se error handling start ho rahi hai.
        const existingOrders = await PreviousOrder.find();
        // PreviousOrder table/collection me check kar rahe hain ki pehle se koi orders hain kya.

        // Insert dummy data only if the database is empty
        if (existingOrders.length === 0) {
            // Agar ek bhi order nahi mila (length === 0), tabhi andar ka code chalega.
            const dummyOrders = [
                // Ek array bana rahe hain jisme dummy orders ka data hoga.
                { orderId: "001", dateOfOrder: new Date(), amount: 30 },
                // Pehla dummy order jisme ID, aaj ki date aur amount 30 hai.
                { orderId: "002", dateOfOrder: new Date(), amount: 45 },
                // Doosra dummy order jisme amount 45 hai.
                // Add more dummy orders as needed
            ];

            await PreviousOrder.insertMany(dummyOrders);
            // In dummy orders ko database me insert kar rahe hain.
            console.log("Dummy data inserted successfully!");
        }
    } catch (error) {
        console.error("Error inserting dummy data:", error);
        // Error pakadne ke liye catch block.
        // Kuch dikkat aayi toh error print karega.
        // Success message console me print kar rahe hain.
    }
};
insertDummyData();
// Is function ko run kar rahe hain taaki dummy orders insert ho jayein.

app.get("/restaurants", async (req, res) => {
    // Ek GET route bana rahe hain /restaurants URL par restaurants ka data fetch karne ke liye.
    try {
        // Use the 'find' method of the 'Restaurant' model to retrieve all restaurants
        const restaurants = await Restaurant.find({});
        // Database se saare restaurants ka data nikaal rahe hain ({} matlab no filter).
        // Send the retrieved restaurants as a JSON response
        res.json(restaurants);
        // Jo data mila, usko JSON format me frontend ko bhej rahe hain.
    } catch (error) {
        // Handle any errors that may occur during the process and send a 500 Internal Server Error response
        // Agar query me koi dikkat aayi toh...
        res.status(500).json({ error: error.message });
        // Frontend ko 500 status code (Internal Server Error) aur error message bhej rahe hain.
    }
});

// Endpoint to retrieve previous orders
app.get("/previousOrders", async (req, res) => {
    // Ek GET route /previousOrders path par, taaki purane orders dekhe ja sakein.
    try {
        const orders = await PreviousOrder.find();
        // Database se saare purane orders fetch kar rahe hain.
        res.status(200).json(orders);
        // Status code 200 (OK) ke saath saare orders ka JSON response bhej rahe hain.
    } catch (error) {
        // Agar error aayi toh...
        res.status(500).json({ error: "Internal server error" });
        // Status 500 ke saath ek generic error message send kar rahe hain.
    }
});
// Endpoint to save order data
app.post("/previousOrders", async (req, res) => {
    // Ek POST route naya order save karne ke liye jab user order submit karega.
    try {
        // Error handling start.
        const { orderId, dateOfOrder, amount } = req.body;
        // Frontend se jo data (body) aaya hai, usme se orderId, dateOfOrder, aur amount nikaal rahe hain (Destructuring).
        console.log(orderId, dateOfOrder, amount);
        // Aaye hue data ko confirm karne ke liye terminal me print kar rahe hain.
        const newOrder = new PreviousOrder({
            // Mongoose model use karke ek naya order object create kar rahe hain.
            orderId,
            // Naye order me orderId set kar rahe hain.
            dateOfOrder: new Date(dateOfOrder),
            // Aayi hui date ko proper JavaScript Date object me convert karke save kar rahe hain.
            amount,
            // Order ka amount set kar rahe hain.
        });

        await newOrder.save();
        // Is naye order ko database me permanently save kar rahe hain.
        res.status(201).json({ message: "Dummy order saved successfully!" });
        // Status 201 (Created) ke saath success message frontend ko bhej rahe hain.
    } catch (error) {
        // Agar kuch gadbad hui toh...
        res.status(500).json({ error: "Internal server error" });
        // 500 status ke saath error response bhej rahe hain.
    }
});

app.listen(PORT, () => {
    // Express server ko specify kiye gaye PORT par start kar rahe hain.
    console.log(`Server is running on port ${PORT}`);
    // Server successfully chalne par terminal me message dikha rahe hain ki kis port par live hai
});