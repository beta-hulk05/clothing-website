// utils/mail.js
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";


export const sendOrderEmail = async (orderDetails) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"RnyClothing" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `🛒 New COD Order - ${orderDetails._id}`,
            text: `
A new COD order has been placed:

🧾 Order ID: ${orderDetails._id}
👤 User ID: ${orderDetails.userId}
💰 Amount: ₹${orderDetails.amount}
📦 Payment Method: ${orderDetails.paymentMethod}
🏠 Address: ${orderDetails.address}
🕒 Date: ${new Date(orderDetails.date).toLocaleString()}

🛍️ Items:
${orderDetails.items.map(item => `- ${item.name} x${item.quantity}`).join('\n')}
            `
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Failed to send order email:", error.message);
    }
};
