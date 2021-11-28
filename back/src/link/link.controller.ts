import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HandlerParams} from "../validators/handler-params";

import {
    ApiBadRequestResponse,
    ApiBody,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import {LinkService} from "./link.service";
import {LinkEntity} from "./entities/link.entity";
import {LinkDto} from "./dto/link.dto";


@ApiTags('link')
@Controller('link')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class LinkController {

    /**
     * Class constructor
     * @param _linkService
     */
    constructor(private readonly _linkService: LinkService) {}


    /**
     * Handler to answer to GET /link/all route
     *
     * @returns Observable<LinkEntity[] | void>
     */
    @ApiOkResponse({
        description: 'Returns an array of links',
        type: LinkEntity,
        isArray: true,
    })
    @ApiNoContentResponse({ description: 'No link exists in database' })
    @Get('/all')
    findAll(): Observable<LinkEntity[] | void> {
        return this._linkService.All();
    }

    /**
     * Handler to answer to GET /link/findById/:id route
     *
     * @param {HandlerParams} params list of route params to take link id
     *
     * @returns Observable<LinkEntity>
     */
    @ApiOkResponse({
        description: 'Returns the link for the given "id"',
        type: LinkEntity,
    })
    @ApiNotFoundResponse({
        description: 'Link with the given "id" doesn\'t exist in the database',
    })
    @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
    @ApiUnprocessableEntityResponse({
        description: "The request can't be performed in the database",
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the link in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Get('findById/:id')
    findById(@Param() params: HandlerParams): Observable<LinkEntity> {
        return this._linkService.findById(params.id);
    }

    /**
     * Handler to answer to POST /link/add route
     *
     * @param linkDto data to create
     *
     * @returns Observable<PersonEntity>
     */
    @ApiCreatedResponse({
        description: 'The link has been successfully created',
        type: LinkEntity,
    })
    @ApiConflictResponse({
        description: 'The link already exists in the database',
    })
    @ApiBadRequestResponse({ description: 'Payload provided is not good' })
    @ApiUnprocessableEntityResponse({
        description: "The request can't be performed in the database",
    })
    @ApiBody({
        description: 'Payload to create a new link',
        type: LinkDto,
    })
    @Post('add')
    add(@Body() linkDto: LinkDto): Observable<LinkEntity> {
        return this._linkService.add(linkDto);
    }

    /**
     * Handler to answer to PUT /link/update/:id route
     *
     * @param {HandlerParams} params list of route params to take link id
     * @param linkDto data to update
     *
     * @returns Observable<LinkEntity>
     */
    @ApiOkResponse({
        description: 'The link has been successfully updated',
        type: LinkEntity,
    })
    @ApiNotFoundResponse({
        description: 'Person with the given "id" doesn\'t exist in the database',
    })
    @ApiConflictResponse({
        description: 'The link already exists in the database',
    })
    @ApiBadRequestResponse({
        description: 'Parameter and/or payload provided are not good',
    })
    @ApiUnprocessableEntityResponse({
        description: "The request can't be performed in the database",
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the link in the database',
        type: String,
        allowEmptyValue: false,
    })
    @ApiBody({ description: 'Payload to update a link', type: LinkDto })
    @Put('update/:id')
    update(
        @Param() params: HandlerParams,
        @Body() linkDto: LinkDto,
    ): Observable<LinkEntity> {
        return this._linkService.update(params.id, linkDto);
    }

    /**
     * Handler to answer to DELETE /link/delete/:id route
     *
     * @param {HandlerParams} params list of route params to take link id
     *
     * @returns Observable<void>
     */
    @ApiNoContentResponse({
        description: 'The link has been successfully deleted',
    })
    @ApiNotFoundResponse({
        description: 'Link with the given "id" doesn\'t exist in the database',
    })
    @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
    @ApiUnprocessableEntityResponse({
        description: "The request can't be performed in the database",
    })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the link in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Delete('delete/:id')
    delete(@Param() params: HandlerParams): Observable<void> {
        return this._linkService.delete(params.id);
    }

}
