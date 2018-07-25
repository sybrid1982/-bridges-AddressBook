class Contact {
    constructor(name, email, phone, relation) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.relation = relation;
    }
}

class AddressBook {
    constructor(contact1, contact2, contact3){
        this.addressBook = [];
        this.addressBook.push(contact1);
        this.addressBook.push(contact2);
        this.addressBook.push(contact3);
    }
    add(name, email, phone, relation) {
        let newContact = new Contact(name, email, phone, relation);
        this.addressBook.push(newContact);
    }
    deleteAt(index) {
        if(index < this.addressBook.length) {
            this.addressBook.splice(index, 1);
        }
    }
    print() {
        for(let i = 0; i < this.addressBook.length; i++) {
            console.log(`${i}.  ${this.addressBook[i].name} P: ${this.addressBook[i].phone} E: ${this.addressBook[i].email} R: ${this.addressBook[i].relation}`);
        }
    }
    deleteByName(name) {
        let index = -1;
        for(let i = 0; i < this.addressBook.length; i++) {
            if(this.addressBook[i].name === name){
                index = i;
            }
        }
        if(index !== -1) {
            this.addressBook.splice(index, 1);
        }
    }
    updateAtIndex(index, name, email, phone, relation) {
        if(index < this.addressBook.length) {
            this.addressBook[index] = new Contact(name, email, phone, relation);
        }
    }
}
let contact1 = new Contact('Syd', 'notfake@totallylegit.real', '123-456-7890', 'me');
let contact2 = new Contact('Jon', "don'tknow@maybeshould.ask", "098-765-4321", 'classmate');
let contact3 = new Contact('Steve Buscemi', 'steve@busc@emi', '111-222-3333', 'none');


let addressBook = new AddressBook(contact1, contact2, contact3);

let getCommand = () => {
    return prompt("Add, Remove, Print, Modify, or Quit");
}

let getContactInfo = () => {
    let name = prompt("Name?");
    let phone = prompt("Phone?");
    let email = prompt("Email?");
    let relation = prompt("Relation?");
    return {
        name, phone, email, relation
    };
}

let getIndex = (actionString) => {
    let index = prompt(`Index to ${actionString}?`);
    return index;
}

(function(){
    let command = '';
    do {
        command = getCommand();
        if(command !== null){
            switch(command.toLowerCase()){
                case 'add':
                    let newInfo = getContactInfo();
                    addressBook.add(newInfo.name, newInfo.phone, newInfo.email, newInfo.relation);
                    break;
                case 'remove':
                    let choice = prompt('Index or Name');
                    if(choice.toLowerCase() === 'index') {
                        let index = getIndex('delete');
                        addressBook.deleteAt(index)
                    } else if (choice.toLowerCase() === 'name') {
                        let name = prompt('Name to delete?');
                        addressBook.deleteByName(name);
                    } else {
                        console.log(`${choice} not understood`);
                    }
                    break;
                case 'print':
                    addressBook.print();
                    break;
                case 'quit':
                    console.log('Goodbye!');
                    break;
                case 'modify':
                    let index = getIndex('modify');
                    if(index >= 0 && index < addressBook.addressBook.length){
                        let modInfo = getContactInfo();
                        addressBook.updateAtIndex(index, modInfo.name, modInfo.phone, modInfo.email, modInfo.relation);
                    } else {
                        console.log(`${index} is out of range for address book`)
                    }
                    break;
                default:
                    console.log(`${command} not understood`);
                    break;
            }
        }
    } while(command !== null && command.toLowerCase() !== 'quit')
})();