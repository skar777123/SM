import nodemailer,{Transporter} from "nodemailer";
import ejs from "ejs";
import path from "path";
require('dotenv').config();


export default sendMail;