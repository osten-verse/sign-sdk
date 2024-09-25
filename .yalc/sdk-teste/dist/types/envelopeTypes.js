"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvelopStatus = void 0;
var EnvelopStatus;
(function (EnvelopStatus) {
    EnvelopStatus["WAITING"] = "WAITING_SIGNATURE";
    EnvelopStatus["COMPLETED"] = "COMPLETED";
    EnvelopStatus["CANCELED"] = "CANCELED";
    EnvelopStatus["DRAFT"] = "DRAFT";
    EnvelopStatus["ERROR"] = "ERROR";
    EnvelopStatus["GENERATING_SIGNATURE"] = "GENERATING_SIGNATURE";
    EnvelopStatus["CREATED"] = "CREATED";
})(EnvelopStatus || (exports.EnvelopStatus = EnvelopStatus = {}));
