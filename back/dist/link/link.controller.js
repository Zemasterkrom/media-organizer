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
exports.LinkController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const handler_params_1 = require("../validators/handler-params");
const swagger_1 = require("@nestjs/swagger");
const http_interceptor_1 = require("../interceptors/http.interceptor");
const link_service_1 = require("./link.service");
const link_entity_1 = require("./entities/link.entity");
const link_dto_1 = require("./dto/link.dto");
let LinkController = class LinkController {
    constructor(_linkService) {
        this._linkService = _linkService;
    }
    findAll() {
        return this._linkService.All();
    }
    findById(params) {
        return this._linkService.findById(params.id);
    }
    add(linkDto) {
        return this._linkService.add(linkDto);
    }
    update(params, linkDto) {
        return this._linkService.update(params.id, linkDto);
    }
    delete(params) {
        return this._linkService.delete(params.id);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns an array of links',
        type: link_entity_1.LinkEntity,
        isArray: true,
    }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'No link exists in database' }),
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], LinkController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns the link for the given "id"',
        type: link_entity_1.LinkEntity,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Link with the given "id" doesn\'t exist in the database',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Parameter provided is not good' }),
    (0, swagger_1.ApiUnprocessableEntityResponse)({
        description: "The request can't be performed in the database",
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique identifier of the link in the database',
        type: String,
        allowEmptyValue: false,
    }),
    (0, common_1.Get)('findById/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [handler_params_1.HandlerParams]),
    __metadata("design:returntype", rxjs_1.Observable)
], LinkController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The link has been successfully created',
        type: link_entity_1.LinkEntity,
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'The link already exists in the database',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Payload provided is not good' }),
    (0, swagger_1.ApiUnprocessableEntityResponse)({
        description: "The request can't be performed in the database",
    }),
    (0, swagger_1.ApiBody)({
        description: 'Payload to create a new link',
        type: link_dto_1.LinkDto,
    }),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [link_dto_1.LinkDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], LinkController.prototype, "add", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'The link has been successfully updated',
        type: link_entity_1.LinkEntity,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Person with the given "id" doesn\'t exist in the database',
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'The link already exists in the database',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Parameter and/or payload provided are not good',
    }),
    (0, swagger_1.ApiUnprocessableEntityResponse)({
        description: "The request can't be performed in the database",
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique identifier of the link in the database',
        type: String,
        allowEmptyValue: false,
    }),
    (0, swagger_1.ApiBody)({ description: 'Payload to update a link', type: link_dto_1.LinkDto }),
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [handler_params_1.HandlerParams,
        link_dto_1.LinkDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], LinkController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiNoContentResponse)({
        description: 'The link has been successfully deleted',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Link with the given "id" doesn\'t exist in the database',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Parameter provided is not good' }),
    (0, swagger_1.ApiUnprocessableEntityResponse)({
        description: "The request can't be performed in the database",
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique identifier of the link in the database',
        type: String,
        allowEmptyValue: false,
    }),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [handler_params_1.HandlerParams]),
    __metadata("design:returntype", rxjs_1.Observable)
], LinkController.prototype, "delete", null);
LinkController = __decorate([
    (0, swagger_1.ApiTags)('link'),
    (0, common_1.Controller)('link'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseInterceptors)(http_interceptor_1.HttpInterceptor),
    __metadata("design:paramtypes", [link_service_1.LinkService])
], LinkController);
exports.LinkController = LinkController;
//# sourceMappingURL=link.controller.js.map