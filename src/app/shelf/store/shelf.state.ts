import { BookshelfState } from "src/interfaces/states";

  export const initialState: BookshelfState = {
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readDoneBooks: [],
    error: ''
  };