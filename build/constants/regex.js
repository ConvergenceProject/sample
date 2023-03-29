"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regex = {
    specialCharRegex: /^[A-Za-z0-9]+$/,
    emailRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    passwordRegex: /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
};
exports.default = regex;
