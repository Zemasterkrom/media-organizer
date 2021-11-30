import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Note, NoteDocument } from '../note.schema';
import { InjectModel } from '@nestjs/mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NoteDto } from '../dto/note.dto';
import { SearchParams } from '../../validators/search-params';

@Injectable()
export class NoteDao {
  /**
   * Class constructor
   *
   * @param {Model<NoteDocument>} _noteModel instance of the model representing a note
   */
  constructor(
    @InjectModel(Note.name)
    private readonly _noteModel: Model<NoteDocument>,
  ) {}

  /**
   * Call mongoose method, call toJSON on each result and returns NoteModel[] or undefined
   *
   * @param {SearchParams} query of the Note in the db
   *
   * @return {Observable<Note[] | void>}
   */
  find = (query: SearchParams): Observable<Note[] | void> => {
    const search = {};
    if (query.name) search['name'] = { $regex: query.name, $options: 'i' };
    return from(this._noteModel.find(search)).pipe(
      filter((docs: NoteDocument[]) => !!docs && docs.length > 0),
      map((docs: NoteDocument[]) => docs.map((_: NoteDocument) => _.toJSON())),
      defaultIfEmpty([]),
    );
  };

  /**
   * Returns one Note of the list matching id in parameter
   *
   * @param {string} id of the Note in the db
   *
   * @return {Observable<Note | void>}
   */
  findById = (id: string): Observable<Note | void> =>
    from(this._noteModel.findById(id)).pipe(
      filter((doc: NoteDocument) => !!doc),
      map((doc: NoteDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Check if name already exists with index and add it in note list
   *
   * @param {NoteDto} note to create
   *
   * @return {Observable<Note>}
   */
  add = (note: NoteDto): Observable<Note> =>
    from(new this._noteModel(note).save()).pipe(
      map((doc: NoteDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Update
   *
   * @param {string} id
   * @param {NoteDto} note
   *
   * @return {Observable<Note | void>}
   */
  update = (id: string, note: NoteDto): Observable<Note | void> =>
    from(
      this._noteModel.findByIdAndUpdate(id, note, {
        new: true,
        runValidators: true,
      }),
    ).pipe(
      filter((doc: NoteDocument) => !!doc),
      map((doc: NoteDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Delete
   *
   * @param {string} id
   *
   * @return {Observable<Note | void>}
   */
  delete = (id: string): Observable<Note | void> =>
    from(this._noteModel.findByIdAndRemove(id)).pipe(
      filter((doc: NoteDocument) => !!doc),
      map((doc: NoteDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
