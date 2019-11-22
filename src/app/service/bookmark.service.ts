import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  constructor() {  }

  add(id: string): void {
    const bookmarks = (localStorage.getItem('bookmarks')) ? JSON.parse(localStorage.getItem('bookmarks')) : [];
    if (bookmarks.findIndex(bookmark => bookmark === id) === -1) {
      bookmarks.push(id);
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  isBookmarked(id: string): boolean {
    const bookmarks = (localStorage.getItem('bookmarks')) ? JSON.parse(localStorage.getItem('bookmarks')) : [];
    return (bookmarks.findIndex(bookmark => bookmark === id) !== -1);
  }

  list(): Observable<string[]> {
    const bookmarks = (localStorage.getItem('bookmarks')) ? JSON.parse(localStorage.getItem('bookmarks')) : [];
    return of(bookmarks);
  }

  remove(id: string): void {
    const bookmarks = (localStorage.getItem('bookmarks')) ? JSON.parse(localStorage.getItem('bookmarks')) : [];
    const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark === id);

    if (bookmarkIndex !== -1) {
      bookmarks.splice(bookmarkIndex, 1);
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
}
