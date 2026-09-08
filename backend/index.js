import express from 'express'
import 'dotenv/config'
import conn from './database/db.js'
import bcrypt from 'bcrypt'

const app = express()
app.use(express.json())

//sign up

app.post("/register", async(req,res) => {
    //gufata input
    const { name,email,password } = req.body;
    //kureba email niba idatuye iri muri db
    const checkEmail = "SELECT * FROM users WHERE email = ?";
    conn.query(checkEmail,[email],(err,result) => {
        if(err){
            return res.status(501).json({ message : "internal server error"})
        }

        if(result.length > 0){
            return res.status(400).json({ message : "Email Alread Exist"})
        }

    })
    //gukora hashing kuri password
    const hashedpassword = await bcrypt.hash(password, 10);
    //gushyira umu user muri db
    const sql = 'INSERT INTO users(name,email,password) VALUES(?,?,?)';

    conn.query(sql,[name,email,hashedpassword],(err,result) => {
        if(err){
            return res.status(400).json({ message: "try again" })
        }
        res.status(200).json({message : "welcome"})
    })

})

//login

app.post("/login", async(req,res) => {
    //gufata input
    const { email,password } = req.body;
    //kumenya niba email iri muri db
    const sql = "SELECT * FROM users WHERE email = ?"

    conn.query(sql,[email],async(err,result) => {
        if(err){
            return res.status(501).json({ message : "internal server error"})
        }
        if(result.length === 0){
            return res.status(404).json({ message : "Wrong Email or Password"})
        }
        //gufata umu user wambere
        const user = result[0]
        //kujyenzura password niba zisa
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({ message : "Check Password"})
        }
        res.status(200).json({message : "welcome back!!"})
    })
})
//________________CAR FOR RENTAL__________________\\
//Add car for rental
app.post("/cfr/instert", (req,res) => {
    const { car_name,available_seat,price_per_day,price_per_week,price_per_month} = req.body;
    const sql = "INSERT INTO car_for_rental(car_name,available_seat,price_per_day,price_per_week,price_per_month) VALUES(?,?,?,?,?)";
    conn.query(sql,[car_name,available_seat,price_per_day,price_per_week,price_per_month], (err,result) => {
        if(err){
            return res.status(500).json({message : "internal server error"})
        }
        return res.status(200).json({message : "car inserted well"})
    })
})
//Read car for rental

app.get("/cfr/read", (req,res) => {
    const sql = "SELECT * FROM car_for_rental";
    conn.query(sql,(err,result) => {
        if(err){
            return res.status(500).json({message : "Internal Server Error"})
        }
        return res.status(201).json({massage : "See All Car", result})
    })
})
//Read one car for rental 

app.get("/cfr/read/:id",(req,res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM car_for_rental WHERE car_id = ?";
    conn.query(sql,[id],(err,result) => {
        if(err){
            console.log(err)
            return res.status(500).json({message : "internal server error"})
        }

        if(result.length === 0){
            return res.status(404).json({message : "car no found"})
        }
        return res.status(200).json({message : "car found",result})
    })
})

//Update car for rentel

app.put("/cfr/update/:id",(req,res) => {
    const id = req.params.id;
    const { car_name,available_seat,price_per_day,price_per_week,price_per_month} = req.body;
    const sql = `UPDATE car_for_rental SET car_name = ?,available_seat = ?,price_per_day = ?,price_per_week = ?,price_per_month = ? WHERE car_id = ? `;
    conn.query(sql,[car_name,available_seat,price_per_day,price_per_week,price_per_month,id],(err,result) => {
        if(err){
            console.log(err)
            return res.status(500).json({message : "internal server error"})
        }
        if(result.affectedRows === 0){
            return res.status(404).json({message : "Car not found to update"})
        }
        return res.status(201).json({message : "Car updated successfully"})
    })
})
//Delete car for rental

app.delete("/cfr/delete/:id", (req,res) => {
    const id = req.params.id;
    const sql = "DELETE FROM car_for_rental WHERE car_id = ?";
    conn.query(sql,[id],(err,result) => {
        if(err){
            console.log(err)
            return res.status(500).json({message : "internal server error"})
        }
        if(result.affectedRows === 0){
            return res.status(404).json({message : "car not found"})
        }
        return res.status(201).json({message : "Car deleted successfully"})
    })
})

//_____________CAR FOR SALE______________\\
//Add a car for sale

app.post("/cfs/insert",(req,res) => {
    const {car_name,available_seat,price_per_car} = req.body;
    const sql = "INSERT INTO car_for_sale(car_name,available_seat,price_per_car) VALUES(?,?,?)";
    conn.query(sql,[car_name,available_seat,price_per_car],(err,result) => {
        if(err){
            return res.status(500).json({ message : "Internal Server Error"})
        }
        return res.status(200).json({ message : "Upload was sucussesful"})
    })
})
//Read All car for sale

app.get("/cfs/read",(req,res) => {
    const sql = "SELECT * FROM car_for_sale";
    conn.query(sql,(err,result) => {
        if(err){
            return res.status(500).json({ message : "Internal Server Error"})
        }
        if(result.length === 0){
            return res.status(404).json({ message : "Empty db please add car on db"})
        }
        return res.status(200).json({ message : "View All Car"})
    })
})
//Update car for sale

app.put("/cfs/update/:id",(req,res) => {
    const id = req.params.id;
    const {car_name,available_seat,price_per_car} = req.body;
    const sql = "UPDATE car_for_sale SET car_name = ?,available_seat = ?,price_per_car = ? WHERE car_id = id";
    conn.query(sql,[car_name,available_seat,price_per_car,id],(err,result) => {
        if(err){
            return res.status(500).json({ message : "Internal Server Error"})
        }
        if(result.affectedRows === 0){
            return res.status(404).json({message : "Car not found to update"})
        }
        return res.status(201).json({message : "Car updated successfully"})
    }) 
})
//Delete car for sale

app.delete("/cfs/delete/:id",(req,res) => {
    const id = req.params.id;
    const sql = "DELETE FROM car_for_sale WHERE car_id = ?";
    conn.query(sql,[id],(err,result) => {
        if(err){
            console.log(err)
            return res.status(500).json({message : "Internal Server Error"})
        }
        if(result.affectedRows === 0){
            return res.status(404).json({message : "Car can not found"})
        }
        return res.status(201).json({message : "Deleted successfully"})
    })
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => { console.log("server is running on 3000 port") }) 
