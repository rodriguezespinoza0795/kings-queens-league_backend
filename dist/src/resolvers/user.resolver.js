"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.signIn = exports.createUser = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.EMAIL_API);
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'nunca pares de aprender';
const sendCode = async (email, code) => {
    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Code validation',
            html: `<strong>Code Verification: ${code}</strong>`,
        });
        console.log(data);
    }
    catch (error) {
        console.error(error);
    }
};
async function createUser(parent, { data, }, { orm }) {
    const { username, email, password } = data;
    let today = new Date();
    const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
    const code = Math.floor(100000 + Math.random() * 900000);
    const newEmail = email.trim().toLowerCase();
    const user = await orm.user.create({
        data: {
            username: username.trim().toLowerCase(),
            email: newEmail,
            password: hashedPassword,
            code: code,
            codeEffectiveDate: new Date(today.getTime() + (20 * 60 * 1000))
        },
    });
    sendCode(newEmail, code);
    return user;
}
exports.createUser = createUser;
async function signIn(parent, { data, }, { orm }) {
    const { email, password } = data;
    const user = await orm.user.findUnique({ where: { email: email } });
    if (!user)
        throw new Error('USER_NOT_FOUND');
    const isValid = await (0, bcrypt_1.compare)(password, user.password);
    if (!isValid)
        throw new Error('WRONG_PASSWORD');
    if (!user.verified)
        throw new Error('EMAIL_NOT_VERIFIED');
    const token = (0, jsonwebtoken_1.sign)({ userId: user.id }, JWT_SECRET_KEY, { expiresIn: '2h' });
    return { token };
}
exports.signIn = signIn;
async function validateEmail(parent, { data, }, { orm }) {
    const { email, code } = data;
    const user = await orm.user.findUnique({ where: { email: email } });
    if (!user)
        throw new Error('USER_NOT_FOUND');
    if (user.code !== code)
        throw new Error('WRONG_CODE');
    const userVerified = await orm.user.update({
        where: { email: email },
        data: {
            verified: true
        }
    });
    return userVerified;
}
exports.validateEmail = validateEmail;
