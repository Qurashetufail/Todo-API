var person = {
	name: 'Tufail',
	age:21
};

function updatePerson (obj){
	// obj = {
	// 	name:'Tufail',
	// 	age : 24
	// }
	obj.age=24
}

updatePerson(person);
console.log(person)

//Array Example

grade=[15,37];

function updateGrade(grade){
	grade.push(36)
	debugger;
	// grade = [12,37,55];
}

updateGrade(grade);
console.log(grade);