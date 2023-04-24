export function calc(a, b, operation) {
  const operations = {
    add: { action: a + b, sign: "+" },
    sub: { action: a - b, sign: "-" },
    mul: { action: a * b, sign: "*" },
    div: { action: a / b, sign: "/" },
  };

  const validation = {
    isValidOperation: Object.keys(operations).includes(operation),

    isValidNumbers(...numbers) {
      return numbers.filter(Number.isFinite).length === numbers.length;
    },
  };

  if (validation.isValidNumbers(a, b) && validation.isValidOperation) {
    let result = operations[operation].action;

    if (!Number.isFinite(result)) return {sign: operations[operation].sign, value: "Error"};
    if (!Number.isInteger(result)) {
      result = result.toFixed(2);
    }

    return { sign: operations[operation].sign, value: result.toString().slice(0, 30) };
  }
  return {sign: operations[operation].sign, value: "Error"};
}