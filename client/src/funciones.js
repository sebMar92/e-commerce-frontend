export function sortOrder(array, valueToCompare, optionalValue) {
    array.sort(function (a, b) {
      var dogA;
      var dogB;
      if (optionalValue !== undefined) {
        dogA = a[valueToCompare] + a[optionalValue];
        dogB = b[valueToCompare] + b[optionalValue];
      } else {
        dogA = a[valueToCompare].toLowerCase();
        dogB = b[valueToCompare].toLowerCase();
      }
      if (dogA < dogB) {
        return -1;
      }
      if (dogA > dogB) {
        return 1;
      }
      return 0;
    });
    return array;
  }