import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {HttpInterceptor} from '../interceptors/http.interceptor';
import {DocService} from './doc.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {HandlerParams} from '../validators/handler-params';
import {Observable} from 'rxjs';
import {DocDto} from './dto/doc.dto';
import {DocEntity} from './entities/doc.entity';
import {SearchParams} from '../validators/search-params';
import {diskStorage} from 'multer';
import {editFileName} from '../interceptors/file.interceptor';
import {DocAddDto} from "./dto/doc-add.dto";
import {extname} from "path";

@ApiTags('document')
@Controller('document')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class DocController {
  /**
   * Class constructor
   * @param _docService
   */
  constructor(private readonly _docService: DocService) {}

  /**
   * Handler to answer to GET /Doc/find?query route
   *
   * @returns Observable<NoteEntity[] | void>
   */
  @ApiOkResponse({
    description: 'Returns an array of Docs that match query',
    type: DocEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No Doc exists in database' })
  @Get('/all')
  find(@Query() query: SearchParams): Observable<DocEntity[] | void> {
    return this._docService.find(query);
  }

  /**
   * Handler to answer to GET /Doc/findById/:id route
   *
   * @param {HandlerParams} params list of route params to take Doc id
   *
   * @returns Observable<DocEntity>
   */
  @ApiOkResponse({
    description: 'Returns the Doc for the given "id"',
    type: DocEntity,
  })
  @ApiNotFoundResponse({
    description: 'Doc with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the Doc in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('findById/:id')
  findById(@Param() params: HandlerParams): Observable<DocEntity> {
    return this._docService.findById(params.id);
  }

  /**
   * Handler to answer to POST /Doc/add route
   *
   *
   * @UploadedFile file to upload
   *
   * @returns Observable<DocEntity>
   * @param docAddDto
   * @param file
   */
  @ApiCreatedResponse({
    description: 'The Doc has been successfully created',
    type: DocEntity,
  })
  @ApiConflictResponse({
    description: 'The Doc already exists in the database',
  })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to create a new Doc',
    type: DocDto,
  })
  @Post('add')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
    }),
  )
  uploadFile(
    @Body() docAddDto: DocAddDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this._docService.add(docAddDto, file.filename, extname(file.originalname));
  }

  /**
   * Handler to answer to PUT /Doc/update/:id route
   *
   * @param {HandlerParams} params list of route params to take Doc id
   * @param DocDto data to update
   *
   * @param file
   * @returns Observable<DocEntity>
   */
  @ApiOkResponse({
    description: 'The Doc has been successfully updated',
    type: DocEntity,
  })
  @ApiNotFoundResponse({
    description: 'Doc with the given "id" doesn\'t exist in the database',
  })
  @ApiConflictResponse({
    description: 'The Doc already exists in the database',
  })
  @ApiBadRequestResponse({
    description: 'Parameter and/or payload provided are not good',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBody({
    description: 'Payload to update a new Doc',
    type: DocAddDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the Doc in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Payload to update a Doc', type: DocDto })
  @Put('update/:id')
  @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './public',
          filename: editFileName,
        }),
      }),
  )
  update(
    @Param() params: HandlerParams,
    @Body() DocDto: DocAddDto,
    @UploadedFile() file: Express.Multer.File
  ): Observable<DocEntity> {
    return this._docService.update(params.id, DocDto, file.filename, extname(file.originalname));
  }

  /**
   * Handler to answer to DELETE /Doc/delete/:id route
   *
   * @param {HandlerParams} params list of route params to take Doc id
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({
    description: 'The Doc has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Doc with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the Doc in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete('delete/:id')
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._docService.delete(params.id);
  }
}
