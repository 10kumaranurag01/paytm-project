const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middlewares/auth")

const router = express.Router();

const userSchema = zod.object({
    username: zod.string().email().min(3).max(30),
    password: zod.string().min(6),
    firstName: zod.string().max(50),
    lastName: zod.string().max(50)
});

router.post("/signup", async (req, res) => {
    const input = req.body;

    const response = userSchema.safeParse(input);

    if (!response.success) {
        res.status(411).json({
            msg: "Input is invalid"
        });
        return;
    }

    const { username, password, firstName, lastName } = input;


    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.status(411).json({ msg: "Email already taken / Incorrect inputs" });
    }

    const user = await User.create({ username, password, firstName, lastName });

    const userId = user._id
    await Account.create({ userId, balance: Math.floor(Math.random() * 10000) + 1 })

    const token = jwt.sign({ username }, JWT_SECRET);

    res.json({
        message: "User created successfully.",
        userId: token
    });

});

router.post("/signin", async (req, res) => {
    const { username, password } = req.body

    const existingUser = await User.findOne({ username, password });
    if (existingUser) {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({
            token
        });
    } else {
        res.status(411).json({
            message: "Error while logging in"
        })
    }
})

router.put("/", authMiddleware, async (req, res) => {
    const { password, lastName, firstName } = req.body
    const username = req.username

    if (password || lastName || firstName) {
        if (password && password.length >= 6) {
            await User.findOneAndUpdate({ username }, { password }, { new: true })
        }

        if (firstName) {
            await User.findOneAndUpdate({ username }, { firstName }, { new: true })
        }

        if (lastName) {
            await User.findOneAndUpdate({ username }, { lastName }, { new: true })
        }
    } else {
        res.status(411).json({
            message: "Error while updating information"
        })
        return
    }

    res.json(
        {
            message: "Updated successfully"
        }
    )
})

router.get("/bulk", async (req, res) => {
    const filterValue = req.query.filter || ""
    console.log(filterValue)

    if (!filterValue) {
        res.status(400).json({ message: 'Filter parameter is required' });
        return
    }

    const filteredUsers = await User.find({
        $or: [
            { firstName: { $regex: filterValue } }, // Case-insensitive regex match for first name
            { lastName: { $regex: filterValue } }  // Case-insensitive regex match for last name
        ]
    });

    if (filteredUsers.length == 0) {
        res.json({ msg: "No users found!" })
        return
    }
    let users = filteredUsers.map((user) => {
        let res = {
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }
        return res
    })

    res.json({
        users: users
    });
})

module.exports = router;