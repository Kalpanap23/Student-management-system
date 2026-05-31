let editIndex = -1;

let students = JSON.parse(localStorage.getItem("students")) || [];

displayStudents();

/* ================= ADD / UPDATE STUDENT ================= */
function addStudent(){

    let id = document.getElementById("studentId").value;
    let name = document.getElementById("studentName").value;
    let department = document.getElementById("department").value;
    let year = document.getElementById("year").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    if(id==="" || name==="" || department==="" || year==="" || email==="" || phone===""){
        alert("Please fill all fields");
        return;
    }

    let student = {
    id: id.trim(),
    name: name.trim(),
    department: department.trim(),
    year: year.value.trim().toUpperCase().split(" ")[0],  // ✅ ADD HERE
    email: email.trim(),
    phone: phone.trim()
};
    if(editIndex === -1){
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
    }

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
    clearForm();
}

/* ================= DISPLAY ALL STUDENTS ================= */
function displayStudents(){

    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student,index)=>{
        table.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.year}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
}

/* ================= DELETE ================= */
function deleteStudent(index){

    students.splice(index,1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}

/* ================= SEARCH ================= */
function searchStudent() {

    let keyword = document.getElementById("searchInput").value.trim().toLowerCase();

    if(keyword === ""){
        displayStudents();
        return;
    }

    let filtered = students.filter((s) =>
        s.id.toLowerCase().includes(keyword) ||
        s.name.toLowerCase().includes(keyword) ||
        s.department.toLowerCase().includes(keyword) ||
        s.year.toLowerCase() === keyword   // ✅ FIX HERE
    );

    displayFilteredStudents(filtered);
}

/* ================= DISPLAY FILTERED ================= */
function displayFilteredStudents(list) {

    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    list.forEach((student)=>{

        let realIndex = students.indexOf(student);

        table.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.year}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>
                <button onclick="editStudent(${realIndex})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${realIndex})">Delete</button>
            </td>
        </tr>
        `;
    });
}

/* ================= EDIT ================= */
function editStudent(index){

    let s = students[index];

    document.getElementById("studentId").value = s.id;
    document.getElementById("studentName").value = s.name;
    document.getElementById("department").value = s.department;
    document.getElementById("year").value = s.year;
    document.getElementById("email").value = s.email;
    document.getElementById("phone").value = s.phone;

    editIndex = index;
}

/* ================= CLEAR FORM ================= */
function clearForm(){
    document.getElementById("studentId").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("department").value = "";
    document.getElementById("year").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}