"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import npm packages
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
    email: { type: String, required: [true, 'Email is required'],
        validate: {
            validator: (email) => {
                return mongoose_1.default.models.User.findOne({ email })
                    .then((user) => !user);
            },
            message: 'Email already exists'
        }
    },
    password: { type: String, required: [true, 'Password is required'] },
}, { timestamps: true });
// Execute before each user.save() call
UserSchema.pre('save', function (callback) {
    const user = this;
    // Break out if the password hasn't changed
    if (!user.isModified('password'))
        return callback();
    // Password changed so we need to hash it
    bcrypt_1.default.genSalt(5, (err, salt) => {
        if (err)
            return callback(err);
        bcrypt_1.default.hash(user.password, salt, (err, hash) => {
            if (err)
                return callback(err);
            user.password = hash;
            callback();
        });
    });
}); // Execute before each user.save() call
UserSchema.methods.verifyPassword = function (password, cb) {
    bcrypt_1.default.compare(password, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};
// Export the model and return your IUser interface
exports.default = mongoose_1.default.model('User', UserSchema);
