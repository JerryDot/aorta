import Realm from 'realm';

export type RecordType = Calorie | Weight | Mood | Activity;
export type RecordString = 'Calorie' | 'Weight' | 'Mood' | 'Activity';

export class Mood {
  public static schema: Realm.ObjectSchema = {
    name: 'Mood',
    properties: {
      recordID: 'string',
      rating: 'int',
      flavour: 'string?',
      comment: 'string?',
      date: {type: 'date', indexed: true},
    },
    primaryKey: 'recordID',
  };

  public date: Date;
  public rating: number;
  public flavour: string | null;
  public comment: string | null;
  public recordID: string;

  get values() {
    return {
      recordID: this.recordID,
      rating: this.rating,
      flavour: this.flavour,
      comment: this.comment,
      date: this.date,
    };
  }

  constructor(date: Date, rating: number, recordID: string, flavour: string | null, comment: string | null) {
    this.date = date;
    this.rating = rating;
    this.flavour = flavour;
    this.comment = comment;
    this.recordID = recordID;
  }
}

export class Calorie {
  public static schema: Realm.ObjectSchema = {
    name: 'Calorie',
    properties: {
      date: {type: 'date', indexed: true},
      amount: 'int',
      recordID: 'string',
    },
    primaryKey: 'recordID',
  };

  public date: Date;
  public amount: number;
  public recordID: string;

  get values() {
    return {
      recordID: this.recordID,
      amount: this.amount,
      date: this.date,
    };
  }

  constructor(date: Date, amount: number, recordID: string) {
    this.date = date;
    this.amount = amount;
    this.recordID = recordID;
  }
}

export class Weight {
  public static schema: Realm.ObjectSchema = {
    name: 'Weight',
    properties: {
      date: {type: 'date', indexed: true},
      amount: 'float',
      recordID: 'string',
    },
    primaryKey: 'recordID',
  };

  public date: Date;
  public amount: number;
  public recordID: string;

  get values() {
    return {
      recordID: this.recordID,
      amount: this.amount,
      date: this.date,
    };
  }

  constructor(date: Date, amount: number, recordID: string) {
    this.date = date;
    this.amount = amount;
    this.recordID = recordID;
  }
}

export class Activity {
  public static schema: Realm.ObjectSchema = {
    name: 'Activity',
    properties: {
      date: {type: 'date', indexed: true},
      type: 'string',
      recordID: 'string',
    },
    primaryKey: 'recordID',
  };

  public date: Date;
  public type: string;
  public recordID: string;

  get values() {
    return {
      recordID: this.recordID,
      type: this.type,
      date: this.date,
    };
  }

  constructor(date: Date, type: string, recordID: string) {
    this.date = date;
    this.type = type;
    this.recordID = recordID;
  }
}

export default new Realm({schema: [Mood.schema, Calorie.schema, Weight.schema, Activity.schema]});
