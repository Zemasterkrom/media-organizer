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
exports.LinkService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const link_dao_1 = require("./dao/link.dao");
const link_entity_1 = require("./entities/link.entity");
let LinkService = class LinkService {
    constructor(_linkDao) {
        this._linkDao = _linkDao;
        this.All = () => this._linkDao.all().pipe((0, operators_1.filter)((_) => !!_), (0, operators_1.map)((_) => _.map((__) => new link_entity_1.LinkEntity(__))), (0, rxjs_1.defaultIfEmpty)(undefined));
        this.findById = (id) => this._linkDao.findById(id).pipe((0, rxjs_1.catchError)((e) => (0, rxjs_1.throwError)(() => new common_1.UnprocessableEntityException(e.message))), (0, operators_1.mergeMap)((_) => !!_
            ? (0, rxjs_1.of)(new link_entity_1.LinkEntity(_))
            : (0, rxjs_1.throwError)(() => new common_1.NotFoundException(`link with id '${id}' not found`))));
        this.add = (link) => this._linkDao.add(link).pipe((0, rxjs_1.catchError)((e) => (0, rxjs_1.throwError)(() => new common_1.UnprocessableEntityException(e.message))), (0, operators_1.map)((_) => new link_entity_1.LinkEntity(_)));
        this.update = (id, link) => this._linkDao.update(id, link).pipe((0, rxjs_1.catchError)((e) => e.code === 11000
            ? (0, rxjs_1.throwError)(() => new common_1.ConflictException(`link with name '${link.name}' already exists`))
            : (0, rxjs_1.throwError)(() => new common_1.UnprocessableEntityException(e.message))), (0, operators_1.mergeMap)((_) => !!_
            ? (0, rxjs_1.of)(new link_entity_1.LinkEntity(_))
            : (0, rxjs_1.throwError)(() => new common_1.NotFoundException(`Link with id '${id}' not found`))));
        this.delete = (id) => this._linkDao.delete(id).pipe((0, rxjs_1.catchError)((e) => (0, rxjs_1.throwError)(() => new common_1.UnprocessableEntityException(e.message))), (0, operators_1.mergeMap)((_) => !!_
            ? (0, rxjs_1.of)(undefined)
            : (0, rxjs_1.throwError)(() => new common_1.NotFoundException(`Link with id '${id}' not found`))));
        this._parseDate = (date) => {
            const dates = date.split('/');
            return new Date(dates[2] + '/' + dates[1] + '/' + dates[0]).getTime();
        };
    }
};
LinkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [link_dao_1.LinkDao])
], LinkService);
exports.LinkService = LinkService;
//# sourceMappingURL=link.service.js.map