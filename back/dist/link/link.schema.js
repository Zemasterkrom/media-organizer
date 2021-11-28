"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkSchema = exports.Link = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
let Link = class Link {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    }),
    __metadata("design:type", Object)
], Link.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        trim: false,
    }),
    __metadata("design:type", String)
], Link.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        trim: true,
    }),
    __metadata("design:type", String)
], Link.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        trim: true,
    }),
    __metadata("design:type", String)
], Link.prototype, "link", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        required: true,
    }),
    __metadata("design:type", String)
], Link.prototype, "date", void 0);
Link = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret._id;
            },
        },
        versionKey: false,
    })
], Link);
exports.Link = Link;
exports.LinkSchema = mongoose_1.SchemaFactory.createForClass(Link);
//# sourceMappingURL=link.schema.js.map