"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.contestSchema = void 0;
const Yup = __importStar(require("yup"));
exports.contestSchema = Yup.object({
    name: Yup.string().min(2).max(25).required(),
    website: Yup.string().url().max(255),
    email: Yup.string().email().max(255),
    description: Yup.string().min(20).max(10000).required(),
    instruction: Yup.string().max(255),
    form: Yup.array().of(Yup.object().shape({
        question: Yup.string()
            .max(200, "Label must be at most 25 characters")
            .required("Label is a required field"),
        type: Yup.string()
            .oneOf([
            "text",
            "number",
            "datetime",
            "date",
            "time",
            "checkbox",
            "telephone",
        ])
            .required(),
        required: Yup.bool().required(),
    })),
});
//# sourceMappingURL=contest.js.map