function getSalary(salary) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(salary);
    }, 1000);
  });
}

function getSalarySum() {
  return Promise.all([
    getSalary(10000),
    getSalary(20000),
    getSalary(40000),
    getSalary(80000),
    getSalary(160000),
    getSalary(320000),
  ]).then(salaries => {
    return salaries.reduce((prev, cur) => prev + cur, 0);
  });
}


function subtractTax(salary) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(salary * 0.75);
    }, 200);
  });
}

function subtractRent(salary) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(salary - 5000);
    }, 200);
  });
}

function getDisposableIncome(callback) {
  return getSalarySum().then(subtractTax).then(subtractRent);
}

getDisposableIncome().then(disposable => {
  console.log(disposable);
});