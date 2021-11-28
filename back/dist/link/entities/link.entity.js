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
exports.LinkEntity = void 0;
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
let LinkEntity = class LinkEntity {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'id', description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], LinkEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'name', description: 'name', example: 'name' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], LinkEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'link', description: 'URL', example: 'https://google.com/' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], LinkEntity.prototype, "link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'type', description: 'type', example: 'type' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], LinkEntity.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'date',
        description: 'Created At',
        example: '2021-11-27T13:41:48.229Z',
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", String)
], LinkEntity.prototype, "date", void 0);
LinkEntity = __decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:paramtypes", [Object])
], LinkEntity);
exports.LinkEntity = LinkEntity;
//# sourceMappingURL=link.entity.js.map