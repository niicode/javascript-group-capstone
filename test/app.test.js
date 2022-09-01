import { itemCount, movies } from '../__mocks__/itemsCount.js';
import { commentsCount } from '../src/modules/Comments.js';

const comment = [
  {
    item_id: 1,
    username: 'John Doe',
    comment: 'This is a comment',
  },
  {
    item_id: 2,
    username: 'John Doe',
    comment: 'This is a comment',
  },
  {
    item_id: 3,
    username: 'John Doe',
    comment: 'This is a comment',
  },
];

describe('count number of items', () => {
  test('count number of items', () => {
    expect(itemCount(movies)).toBe(3);
  });
});

describe('count number of comments', () => {
  test('count number of comments', () => {
    expect(commentsCount(comment)).toBe(3);
  });
});