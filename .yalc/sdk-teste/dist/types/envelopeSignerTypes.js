"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureType = exports.SignatureStatus = void 0;
var SignatureStatus;
(function (SignatureStatus) {
    SignatureStatus["REJECTED"] = "reject";
    SignatureStatus["SIGNED"] = "signed";
    SignatureStatus["COMPLETED"] = "completed";
    SignatureStatus["PENDING"] = "pending";
})(SignatureStatus || (exports.SignatureStatus = SignatureStatus = {}));
var SignatureType;
(function (SignatureType) {
    SignatureType["PARTY"] = "party";
    SignatureType["APPROVER"] = "approver";
    SignatureType["WITNESS"] = "witness";
    SignatureType["CLIENT"] = "client";
    SignatureType["SELLER"] = "seller";
    SignatureType["MANAGER"] = "manager";
    SignatureType["ACKNOWLEDGE"] = "acknowledge";
    SignatureType["ACKNOWLEDGE_RECEIPT"] = "acknowledge_receipt";
})(SignatureType || (exports.SignatureType = SignatureType = {}));
