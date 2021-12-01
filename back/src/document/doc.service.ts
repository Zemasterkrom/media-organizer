import {ConflictException, Injectable, NotFoundException, UnprocessableEntityException,} from '@nestjs/common';
import {DocDao} from './dao/doc.dao';
import {SearchParams} from '../validators/search-params';
import {catchError, defaultIfEmpty, Observable, of, throwError} from 'rxjs';
import {filter, map, mergeMap} from 'rxjs/operators';
import {Doc} from './doc.schema';
import {DocEntity} from './entities/doc.entity';
import * as moment from 'moment';
import {DocAddDto} from "./dto/doc-add.dto";

@Injectable()
export class DocService {
  /**
   * Class constructor
   *
   * @param {DocDao} _docDao instance of the DAO
   */
  constructor(private readonly _docDao: DocDao) {}

  /**
   * Returns docs matching query in parameter
   *
   * @param {SearchParams} query of the document
   *
   * @returns {Observable<DocEntity[] | void>}
   */
  find = (query: SearchParams): Observable<DocEntity[] | void> =>
    this._docDao.find(query).pipe(
      filter((_: Doc[]) => !!_),
      map((_: Doc[]) => _.map((__: Doc) => new DocEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one document of the list matching id in parameter
   *
   * @param {string} id of the document
   *
   * @returns {Observable<DocEntity>}
   */
  findById = (id: string): Observable<DocEntity> =>
    this._docDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Doc) =>
        !!_
          ? of(new DocEntity(_))
          : throwError(
              () => new NotFoundException(`doc with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Check if already exists and add it in list
   *
   * @param document to create
   *
   * @param file filename
   * @returns {Observable<DocEntity>}
   */
  add = (document: DocAddDto, file: string, ext: string): Observable<DocEntity> => {
    document.date = moment().utc().format();
    document.path = file;
    document.type = ext;
    return this._docDao.add(document).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Doc) => new DocEntity(_)),
    );
  };

  /**
   * Update
   *
   * @param {string} id
   * @param document data to update
   *
   * @param file
   * @Operation(consumes={"multipart/form-data"}),
   * @returns {Observable<DocEntity>}
   */
  update = (id: string, document: DocAddDto, file: string): Observable<DocEntity> => {
      document.date = moment().utc().format();
      document.path = file;

      return this._docDao.update(id, document).pipe(
          catchError((e) =>
              e.code === 11000
                  ? throwError(
                      () =>
                          new ConflictException(
                              `doc with name '${document.name}' already exists`,
                          ),
                  )
                  : throwError(() => new UnprocessableEntityException(e.message)),
          ),
          mergeMap((_: Doc) =>
              !!_
                  ? of(new DocEntity(_))
                  : throwError(
                      () => new NotFoundException(`Doc with id '${id}' not found`),
                  ),
          ),
      );
  }

  /**
   * Deletes one in list
   *
   * @param {string} id
   *
   * @returns {Observable<void>}
   */
  delete = (id: string): Observable<void> =>
    this._docDao.delete(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Doc) =>
        !!_
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`doc with id '${id}' not found`),
            ),
      ),
    );
}
