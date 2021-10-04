import * as DataStore from 'nedb';

export default class Repository<T> {
  dataSource = new DataStore({
    inMemoryOnly: true,
  });

  save(data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.dataSource.insert(data, (error, document) => {
        if (error) {
          reject(error);
        }

        resolve(document);
      });
    });
  }

  getById(_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dataSource.findOne({ _id }, (error, document) => {
        if (error) {
          reject(error);
        }

        resolve(document);
      });
    });
  }

  getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.dataSource.find({}, {}, (error, documents) => {
        if (error) {
          reject(error);
        }

        resolve(documents);
      });
    });
  }

  updateById(_id: string, data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.dataSource.update({ _id }, data, {}, error => {
        if (error) {
          reject(error);
        }

        this.getById(_id).then(value => resolve(value));
      });
    });
  }

  deleteById(_id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.dataSource.remove({ _id }, error => {
        if (error) {
          reject(error);
        }

        resolve(_id);
      });
    });
  }
}
