function getSalary() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(33000);
    }, 1000);
  });
}

function subtractTax(salary) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(salary * 0.75);
    }, 1000);
  });
}

function subtractRent(salary) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(salary - 5000);
    }, 1000);
  });
}

function getDisposableIncome(callback) {
  const salaryPromise = getSalary();
  const taxPromise = salaryPromise.then(salary_1 => {
    return subtractTax(salary_1);
  });
  const rentPromise = taxPromise.then(salary_2 => {
    return subtractRent(salary_2);
  });
  return rentPromise;
}

getDisposableIncome().then(disposable => {
  console.log(disposable);
});