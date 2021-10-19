//https://jestjs.io/docs/mock-functions

const employeeTest = require('..employee.js');

describe('employee', () => {
    it('should return the name, id, email', () => {
        expect(employeeTest.getMockName()).toBe('a mock name');
        expect(employeeTest.getMockid()).toBe('a mock id');
        expect(employeeTest.getMockemail()).toBe('a mock email');
    });

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

    console.log(employeeTest);