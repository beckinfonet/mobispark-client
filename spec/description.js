describe('addition', function() {
  it('should add two valid integers and return a valid result', function() {
    expect(addNumbers(2, 5)).toEqual(7);
  });
})

describe('multiplication', function() {
  it('should multiply two valid integers and return a valid result', function() {
    expect(multiplyNumbers(2, 5)).toEqual(10);
  });
})

describe('division', function() {
  it('should divide integer by another integer', function() {
    expect(divideNumbers(20, 5)).toEqual(4);
  });
})


describe('division', function() {
  it('should substract integer from another integer', function() {
    expect(substractNumber(20, 5)).toEqual(15);
  });
})

// describe('if drinking age is legal, it should return true', function() {
//   it('should substract integer from another integer', function() {
//     expect(legalAge(result)).toBeGreaterThan(21);
//   });
// })