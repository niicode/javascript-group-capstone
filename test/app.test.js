import { itemCount, movies } from '../__mocks__/itemsCount.js';
import { comment} from '../__mocks__/commentCount.js';
import { commentsCount } from '../src/modules/Comments.js';

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