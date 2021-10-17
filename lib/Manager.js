const Employee = require('./Employee')

class manager extends Employee {
    constructor(name, id, email, phone) {
        super(name, id, email)
        this.phone = phone;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return 'Manager';
    }
    getPhone() {
        return this.phone;
    }
}