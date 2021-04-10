localStorage.setItem('firstName', 'samim');
localStorage.setItem('lastName', 'Hasan');
console.log(localStorage.getItem('firstName'));
localStorage.setItem('age', 20);
console.log(typeof localStorage.getItem('age'));

const person = {
  firstName: 'samim',
  lastName: 'Hasan'
};

localStorage.setItem('person', JSON.stringify(person));
console.log(JSON.parse(localStorage.getItem('person', person)));

//clearing localStorage
localStorage.clear();
