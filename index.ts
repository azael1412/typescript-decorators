//http://blog.wolksoftware.com/decorators-reflection-javascript-typescript
//https://codeburst.io/decorate-your-code-with-typescript-decorators-5be4a4ffecb4
export function logMethod(
    target: Object,
    propertyName: string,
    propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
    // target === Employee.prototype
    // propertyName === "greet"
    // propertyDesciptor === Object.getOwnPropertyDescriptor(Employee.prototype, "greet")
    const method = propertyDesciptor.value;

    propertyDesciptor.value = function (...args: any[]) {
       // console.log("descriptor: "+propertyDesciptor.value)
        // convert list of greet arguments to string
        const params = args.map(a => JSON.stringify(a)).join();
      console.log("parametros"+params)
        // invoke greet() and get its return value
        const result = method.apply(this, args);
        console.log("resultado: "+result)
        console.log(args)

        // convert result to string
        const r = JSON.stringify(result);

        // display in console the function call details
        console.log(`Call: ${propertyName}(${params}) => ${r}`);

        // return the result of invoking the method
        return result;
    }
    return propertyDesciptor;
};

class Employee {

    constructor(
        private firstName: string,
        private lastName: string
    ) {
    }

    @logMethod
    greet(message: string): string {
        return `${this.firstName} ${this.lastName} says: ${message}`;
    }

}

const emp = new Employee('Mohan Ram', 'Ratnakumar');
emp.greet('hello');