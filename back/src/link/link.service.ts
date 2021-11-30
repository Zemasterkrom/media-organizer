import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { catchError, defaultIfEmpty, Observable, of, throwError } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { LinkDao } from './dao/link.dao';
import { LinkEntity } from './entities/link.entity';
import { Link } from './link.schema';
import { LinkDto } from './dto/link.dto';
import { SearchParams } from '../validators/search-params';
import * as moment from 'moment';

@Injectable()
export class LinkService {
  /**
   * Class constructor
   *
   * @param {LinkDao} _linkDao instance of the DAO
   */
  constructor(private readonly _linkDao: LinkDao) {}

  /**
   * Returns links matching query in parameter
   *
   * @param {SearchParams} query of the Link
   *
   * @returns {Observable<LinkEntity[] | void>}
   */
  find = (query: SearchParams): Observable<LinkEntity[] | void> =>
    this._linkDao.find(query).pipe(
      filter((_: Link[]) => !!_),
      map((_: Link[]) => _.map((__: Link) => new LinkEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one Link of the list matching id in parameter
   *
   * @param {string} id of the Link
   *
   * @returns {Observable<LinkEntity>}
   */
  findById = (id: string): Observable<LinkEntity> =>
    this._linkDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Link) =>
        !!_
          ? of(new LinkEntity(_))
          : throwError(
              () => new NotFoundException(`link with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Check if  already exists and add it in list
   *
   * @param link to create
   *
   * @returns {Observable<LinkEntity>}
   */
  add = (link: LinkDto): Observable<LinkEntity> => {
    link.date = moment().utc().format();
    return this._linkDao.add(link).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Link) => new LinkEntity(_)),
    );
  };

  /**
   * Update
   *
   * @param {string} id
   * @param link data to update
   *
   * @returns {Observable<LinkEntity>}
   */
  update = (id: string, link: LinkDto): Observable<LinkEntity> =>
    this._linkDao.update(id, link).pipe(
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () =>
                new ConflictException(
                  `link with name '${link.name}' already exists`,
                ),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Link) =>
        !!_
          ? of(new LinkEntity(_))
          : throwError(
              () => new NotFoundException(`Link with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Deletes one in list
   *
   * @param {string} id
   *
   * @returns {Observable<void>}
   */
  delete = (id: string): Observable<void> =>
    this._linkDao.delete(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Link) =>
        !!_
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`Link with id '${id}' not found`),
            ),
      ),
    );
}
