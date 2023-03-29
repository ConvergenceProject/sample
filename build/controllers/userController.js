"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import datas from exported data
const userModel_1 = __importDefault(require("../models/userModel"));
const staticData_1 = __importDefault(require("../constants/staticData"));
// Create endpoint /users for POST
/*
Method Name: postUser
Request Type: POST
Author: Salim
Description: This method is used for inserting data to user table with validation.
*/
exports.postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().required().messages({
            'string.base': 'First name should be a string',
            'string.empty': 'First name is required',
            'any.required': `"a" is a required field`
        }),
        lastName: joi_1.default.string().required().messages({
            'string.base': 'Last name should be a string',
            'string.empty': 'Last name is required',
            'any.required': `"a" is a required field`
        }),
        email: joi_1.default.string().email().required().messages({
            'string.email': 'Email should be a valid email address',
            'string.empty': 'Email is required',
        }),
        password: joi_1.default.string().min(6).required().messages({
            'string.min': 'Password should be at least {#limit} characters long',
            'string.empty': 'Password cannot be empty',
            'any.required': 'Password is required',
        }),
    });
    try {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ status: 400, message: 'Invalid request', data: errors });
        }
        let users = new userModel_1.default(req.body);
        let userData = yield users.save();
        const token = jsonwebtoken_1.default.sign({ _id: (_a = userData._id) === null || _a === void 0 ? void 0 : _a.toString(), firstName: userData.firstName, lastName: userData.lastName }, staticData_1.default.secretKey, {
            expiresIn: '2 days',
        });
        res.status(200).json({ status: 200, message: 'Success', data: {
                user: userData,
                token: token
            } });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ status: 402, message: error.message, data: {} });
    }
});
exports.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    console.log("res", (_b = res.user) === null || _b === void 0 ? void 0 : _b._id);
    res.status(200).json({ status: 402, message: "", data: {} });
});
