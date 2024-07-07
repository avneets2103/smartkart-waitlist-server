import ApiError from "../Utils/ApiError.js";
import {WaitList} from "../Models/waitlist.model.js";
import {sendingMail} from "../Utils/sendMail.js";

const addUserToWaitList = async (req, res) => {
    const { email } = req.body;
    let alreadyExists = false;
    try {
        const user = await WaitList.findOne({ email });
        if (user) {
            alreadyExists = true;
            throw new ApiError(400, 'User already exists in waitlist');
        }
        const newUser = await WaitList.create({
            email
        });
        sendingMail(email, "We love you", "", `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>We Love You!</title>
                <style>
                    body, html {
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                    }
                    /* Container */
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        border: 1px solid #333; /* Dark border */
                        border-radius: 8px;
                        background-color: #413F3F; /* Slightly lighter background */
                    }
                    /* Header */
                    .header {
                        background-color: #0F0F0F; /* Red header */
                        color: #D6223A;
                        padding: 10px;
                        text-align: center;
                        border-radius: 8px 8px 0 0;
                    }
                    /* Content */
                    .content {
                        padding: 20px;
                        background-color: #0F0F0F; /* Dark content background */
                        border-radius: 0 0 8px 8px;
                        color: #bbbbbb;
                    }
                    /* Footer */
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        color: #07070; /* Lighter footer text */
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://imagetolink.com/ib/7dkyAlRsIn.png" alt="SmartKart Logo" width="60px" height="60px">
                        <h2>We are equally thrilled and excited to have you here!</h2>
                    </div>
                    <div class="content" style="text-align: center;">
                        <p>We wanted to take a moment to express our heartfelt gratitude for your interest in SmartKart. Your decision to join our waitlist means a lot to us!</p>
                        <p>Thank you once again for choosing SmartKart. </p>
                        <p>We love you! ❤️</p>
                    </div>
                    <div class="footer">
                        <p>You are receiving this email because you are awesome!</p>
                    </div>
                </div>
            </body>
            </html>
        `);
           
        return res.status(201).json({
            message: "User added to waitlist",
            data: newUser
        });
    } catch (err) {
        if (alreadyExists) {
            return res.status(400).json({
                message: "User already exists in waitlist",
                error: err
            });
        }
        return res.status(500).json({
            message: "Error adding user to waitlist",
            error: err
        });
    }
};

const removeUserFromWaitList = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await WaitList.findOne({ email });
        if (user) {
            await WaitList.deleteOne({ email });
            return res.status(200).json({
                message: "User removed from waitlist",
                data: user
            });
        } else {
            throw new ApiError(400, 'User not found in waitlist');
        }
    } catch (err) {
        throw new ApiError(400, 'Deletion failed');
    }
};

export { addUserToWaitList, removeUserFromWaitList };