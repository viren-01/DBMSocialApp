"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var connect_1 = require("./db/connect");
try {
    var port = process.env.PORT || 3000;
    var app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.listen(port, function () {
        (0, connect_1.connect)();
    });
}
catch (error) {
    console.log(error);
}
