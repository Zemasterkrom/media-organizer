import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { catchError, defaultIfEmpty, Observable, of, throwError } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { NoteDao } from './dao/note.dao';
import { NoteEntity } from './entities/note.entity';
import { Note } from './note.schema';
import { NoteDto } from './dto/note.dto';

@Injectable()
export class NoteService {
  /**
   * Class constructor
   *
   * @param {NoteDao} _noteDao instance of the DAO
   */
  constructor(private readonly _noteDao: NoteDao) {}

  /**
   * Returns all existing notes in the list
   *
   * @returns {Observable<NoteEntity[] | void>}
   */
  All = (): Observable<NoteEntity[] | void> =>
    this._noteDao.all().pipe(
      filter((_: Note[]) => !!_),
      map((_: Note[]) => _.map((__: Note) => new NoteEntity(__))),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns one note of the list matching id in parameter
   *
   * @param {string} id of the note
   *
   * @returns {Observable<NoteEntity>}
   */
  findById = (id: string): Observable<NoteEntity> =>
    this._noteDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Note) =>
        !!_
          ? of(new NoteEntity(_))
          : throwError(
              () => new NotFoundException(`note with id '${id}' not found`),
            ),
      ),
    );

  /**
   * Check if  already exists and add it in list
   *
   * @param note to create
   *
   * @returns {Observable<NoteEntity>}
   */
  add = (note: NoteDto): Observable<NoteEntity> =>
    this._noteDao.add(note).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((_: Note) => new NoteEntity(_)),
    );

  /**
   * Update
   *
   * @param {string} id
   * @param note data to update
   *
   * @returns {Observable<NoteEntity>}
   */
  update = (id: string, note: NoteDto): Observable<NoteEntity> =>
    this._noteDao.update(id, note).pipe(
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () =>
                new ConflictException(
                  `note with name '${note.name}' already exists`,
                ),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Note) =>
        !!_
          ? of(new NoteEntity(_))
          : throwError(
              () => new NotFoundException(`note with id '${id}' not found`),
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
    this._noteDao.delete(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((_: Note) =>
        !!_
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`Note with id '${id}' not found`),
            ),
      ),
    );

  private _parseDate = (date: string): number => {
    const dates = date.split('/');
    return new Date(dates[2] + '/' + dates[1] + '/' + dates[0]).getTime();
  };
}
