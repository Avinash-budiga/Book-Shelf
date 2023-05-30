import { Book } from './book';

export interface AuthState {
  userId: string;
  error: string;
}

export interface SharedState {
  showLoader: boolean;
}

export interface BookshelfState {
  currentlyReadingBooks: Book[];
  wantToReadBooks: Book[];
  readDoneBooks: Book[];
  error: string;
}
