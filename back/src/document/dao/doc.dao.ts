import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {Doc, DocDocument} from '../doc.schema';
import {defaultIfEmpty, from, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {SearchParams} from '../../validators/search-params';
import {DocDto} from '../dto/doc.dto';
import {Link} from '../../link/link.schema';

@Injectable()
export class DocDao {
  /**
   * Class constructor
   *
   * @param {Model<DocDocument>} _docModel instance of the model representing a document
   */
  constructor(
    @InjectModel(Doc.name)
    private readonly _docModel: Model<DocDocument>,
  ) {}

  /**
   * Returns one Link of the list matching id in parameter
   *
   * @param {string} id of the Link in the db
   *
   * @return {Observable<Doc | void>}
   */
  findById = (id: string): Observable<Doc | void> =>
    from(this._docModel.findById(id)).pipe(
      filter((doc: DocDocument) => !!doc),
      map((doc: DocDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Returns docs of the list matching type in parameter
   *
   * @param {SearchParams} query type/name of the doc in the db
   *
   * @return {Observable<Doc | void>}
   */
  find = (query: SearchParams): Observable<Doc[] | void> => {
    const search = {};
    if (query.name) search['name'] = { $regex: query.name, $options: 'i' };
    if (query.type) search['type'] = { $regex: query.type, $options: 'i' };
    return from(this._docModel.find(search)).pipe(
      filter((docs: DocDocument[]) => !!docs && docs.length > 0),
      map((docs: DocDocument[]) => docs.map((_: DocDocument) => _.toJSON())),
      defaultIfEmpty([]),
    );
  };

  /**
   * Check if name already exists with index and add it in doc list
   *
   * @param {DocDto} document to create
   *
   * @return {Observable<Link>}
   */
  add = (document: DocDto): Observable<Doc> =>
    from(new this._docModel(document).save()).pipe(
      map((doc: DocDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Update
   *
   * @param {string} id
   * @param {DocDto} document
   *
   * @return {Observable<Doc | void>}
   */
  update = (id: string, document: DocDto): Observable<Doc | void> =>
    from(
      this._docModel.findByIdAndUpdate(id, document, {
        new: true,
        runValidators: true,
      }),
    ).pipe(
      filter((doc: DocDocument) => !!doc),
      map((doc: DocDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );

  /**
   * Delete
   *
   * @param {string} id
   *
   * @return {Observable<Doc | void>}
   */
  delete = (id: string): Observable<Doc | void> =>
    from(this._docModel.findByIdAndRemove(id)).pipe(
      filter((doc: DocDocument) => !!doc),
      map((doc: DocDocument) => doc.toJSON()),
      defaultIfEmpty(undefined),
    );
}
