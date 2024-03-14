const express = require("express")
const { User, Account } = require("../db")
const { authMiddleware } = require("../middlewares/auth")
const mongoose = require("mongoose")

const router = express.Router()

router.get("/balance", authMiddleware, async (req, res) => {
    const username = req.username

    const user = await User.findOne({ username })
    const userId = user._id

    const userAccount = await Account.findOne({ userId })

    res.status(200).json({ balance: userAccount.balance })
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const ToAccountId = req.body.to
    const amount = parseInt(req.body.amount)

    const fronAccountUsername = req.username

    try {
        const FromAccountUser = await User.findOne({ username: fronAccountUsername }).session(session)

        const FromUserId = FromAccountUser._id
        const FromAccountUser_Account = await Account.findOne({ userId: FromUserId }).session(session)
        if (!FromAccountUser_Account.balance >= amount) {
            await session.abortTransaction();
            res.status(400).json({
                message: "Insufficient Balance"
            })
            return
        }
        FromAccountUser_Account.balance -= amount
        await FromAccountUser_Account.save()

        const ToAccountUser = await Account.findOne({ userId: ToAccountId }).session(session)
        if (!ToAccountUser) {
            await session.abortTransaction();
            res.status(400).json({
                message: "Invalid account"
            })
            return
        }
        ToAccountUser.balance += amount
        await ToAccountUser.save()

        await session.commitTransaction();

        session.endSession();

        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        res.status(400).json({
            message: error
        })
    }
})

module.exports = router