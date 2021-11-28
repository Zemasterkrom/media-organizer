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
import { HandlerParams } from '../validators/handler-params';

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
import { NoteService } from './note.service';
import { NoteEntity } from './entities/note.entity';
import { NoteDto } from './dto/note.dto';

@ApiTags('note')
@Controller('note')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class NoteController {
  /**
   * Class constructor
   * @param _noteService
   */
  constructor(private readonly _noteService: NoteService) {}

  /**
   * Handler to answer to GET /note/all route
   *
   * @returns Observable<NoteEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of notes',
    type: NoteEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No note exists in database' })
  @Get('/all')
  findAll(): Observable<NoteEntity[] | void> {
    return this._noteService.All();
  }

  /**
   * Handler to answer to GET /note/findById/:id route
   *
   * @param {HandlerParams} params list of route params to take note id
   *
   * @returns Observable<NoteEntity>
   */
  @ApiOkResponse({
    description: 'Returns the note for the given "id"',
    type: NoteEntity,
  })
  @ApiNotFoundResponse({
    description: 'note with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the note in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('findById/:id')
  findById(@Param() params: HandlerParams): Observable<NoteEntity> {
    return this._noteService.findById(params.id);
  }

  /**
   * Handler to answer to POST /note/add route
   *
   * @param noteDto data to create
   *
   * @returns Observable<NoteEntity>
   */
  @ApiCreatedResponse({
    description: 'The note has been successfully created',
    type: NoteEntity,
  })
  @ApiConflictResponse({
    description: 'The note already exists in the database',
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new note',
    type: NoteDto,
  })
  @Post('add')
  add(@Body() noteDto: NoteDto): Observable<NoteEntity> {
    return this._noteService.add(noteDto);
  }

  /**
   * Handler to answer to PUT /note/update/:id route
   *
   * @param {HandlerParams} params list of route params to take note id
   * @param noteDto data to update
   *
   * @returns Observable<NoteEntity>
   */
  @ApiOkResponse({
    description: 'The note has been successfully updated',
    type: NoteEntity,
  })
  @ApiNotFoundResponse({
    description: 'Note with the given "id" doesn\'t exist in the database',
  })
  @ApiConflictResponse({
    description: 'The note already exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'Parameter and/or payload provided are not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the note in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({ description: 'Payload to update a note', type: NoteDto })
  @Put('update/:id')
  update(
    @Param() params: HandlerParams,
    @Body() noteDto: NoteDto,
  ): Observable<NoteEntity> {
    return this._noteService.update(params.id, noteDto);
  }

  /**
   * Handler to answer to DELETE /note/delete/:id route
   *
   * @param {HandlerParams} params list of route params to take note id
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({
    description: 'The note has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'note with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the note in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete('delete/:id')
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._noteService.delete(params.id);
  }
}
