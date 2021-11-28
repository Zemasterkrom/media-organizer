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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkDao = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const link_schema_1 = require("../link.schema");
const mongoose_2 = require("@nestjs/mongoose");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let LinkDao = class LinkDao {
    constructor(_linkModel) {
        this._linkModel = _linkModel;
        this.all = () => (0, rxjs_1.from)(this._linkModel.find()).pipe((0, operators_1.filter)((docs) => !!docs && docs.length > 0), (0, operators_1.map)((docs) => docs.map((_) => _.toJSON())), (0, rxjs_1.defaultIfEmpty)(undefined));
        this.findById = (id) => (0, rxjs_1.from)(this._linkModel.findById(id)).pipe((0, operators_1.filter)((doc) => !!doc), (0, operators_1.map)((doc) => doc.toJSON()), (0, rxjs_1.defaultIfEmpty)(undefined));
        this.add = (link) => (0, rxjs_1.from)(new this._linkModel(link).save()).pipe((0, operators_1.map)((doc) => doc.toJSON()), (0, rxjs_1.defaultIfEmpty)(undefined));
        this.update = (id, link) => (0, rxjs_1.from)(this._linkModel.findByIdAndUpdate(id, link, {
            new: true,
            runValidators: true,
        })).pipe((0, operators_1.filter)((doc) => !!doc), (0, operators_1.map)((doc) => doc.toJSON()), (0, rxjs_1.defaultIfEmpty)(undefined));
        this.delete = (id) => (0, rxjs_1.from)(this._linkModel.findByIdAndRemove(id)).pipe((0, operators_1.filter)((doc) => !!doc), (0, operators_1.map)((doc) => doc.toJSON()), (0, rxjs_1.defaultIfEmpty)(undefined));
    }
};
LinkDao = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(link_schema_1.Link.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], LinkDao);
exports.LinkDao = LinkDao;
//# sourceMappingURL=link.dao.js.map