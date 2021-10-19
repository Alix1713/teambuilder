//https://jestjs.io/docs/mock-functions

const employeeTest = require('../lib/Employee');


describe('employee', () => {
    it('should return the name', () => {
        const newEmployee = new employeeTest('greg')
        console.log(newEmployee.getName())
        expect(newEmployee.getName()).toEqual('greg')
    });

    it('should return an id', () => {
        const newEmployee = new employeeTest('greg', '3743')
        console.log(newEmployee.getId())
        expect(newEmployee.getId()).toEqual('3743')
    })
    it('should return an email', () => {
        const newEmployee = new employeeTest('greg', '3743', 'me@me.com')
        console.log(newEmployee.getEmail())
        expect(newEmployee.getEmail()).toEqual('me@me.com')
    })
})


// class employee {
//     constructor(name, id, email) {
//         this.name = name;
//         this.id = id;
//         this.email = email;
//     }
//     getName() {
//         return this.name;
//     }
//     getId() {
//         return this.id;
//     }
//     getEmail() {
//         return this.email;
//     }
//     getRole() {
//         return 'Employee';
//     }
// }

console.log(employeeTest)