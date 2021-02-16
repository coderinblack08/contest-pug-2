"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV === "production";
exports.port = process.env.PORT || 4000;
//# sourceMappingURL=constants.js.map