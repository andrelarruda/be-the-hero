const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
   it('should generate an unique ID', () => {
      const id = generateUniqueId();
      // ver quais são os métodos de expect, na documentação (https://jestjs.io/docs/en/expect)
      expect(id).toHaveLength(8);
   })
});