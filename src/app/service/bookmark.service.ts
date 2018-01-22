import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class BookmarkService {
  constructor() {  }

  add(id): Observable<string> {
    const bookmarks = (localStorage.getItem('bookmarks')) ? JSON.parse(localStorage.getItem('bookmarks')) : [];
    if (bookmarks.findIndex(bookmark => bookmark === id) === -1) {
      bookmarks.push(id);
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    return Observable.of(id);
  }

  isBookmarked(id) {
    const bookmarks = (localStorage.getItem('bookmarks')) ? JSON.parse(localStorage.getItem('bookmarks')) : [];
    return (bookmarks.findIndex(bookmark => bookmark === id) !== -1);
  }

  list(): Observable<any> {
    const bookmarks = (localStorage.getItem('bookmarks')) ? JSON.parse(localStorage.getItem('bookmarks')) : [];
    return Observable.of(bookmarks);
  }

  remove(id): Observable<string> {
    const bookmarks = (localStorage.getItem('bookmarks')) ? JSON.parse(localStorage.getItem('bookmarks')) : [];
    const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark === id);

    if (bookmarkIndex !== -1) {
      bookmarks.splice(bookmarkIndex, 1);
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    return Observable.of(id);
  }
}
