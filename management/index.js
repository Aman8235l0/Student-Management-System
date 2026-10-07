
 
        let students =[
{
        id:1,
        name:"Aranab kumar",
        age :20,
        course:"BCA",
        marks:86

        },
        {
        id:2,
        name:"Priya Verma",
        age :19,
        course:"BSC",
        marks:76


        },
        {
        id:3,
        name:"Rohit kumar",
        age :19,
        course:"BCA",
        marks:89


        },
        {
        id:4,
        name:"Sneha Patel",
        age :20,
        course:"BTECH",
        marks:91


        },
        {
         id:5,
        name:"Aditya kumar",
        age :23,
        course:"BCA",
        marks:46
 
        }
   ];
//  DOM
                let nameInput =document.querySelector("#name");
                let ageInput =document.querySelector("#age");
                let courseInput =document.querySelector("#course");
                let marksInput =document.querySelector("#marks");
                let addBtnInput =document.querySelector("#addBtn");
                let totalInputs =document.querySelector("#totalStudents");
                let averageInput =document.querySelector("#averagemarks");
                let highestInput= document.querySelector("#highestMarks");
                let searchInputt =document.querySelector("#searchInput");
                let courseFilters =document.querySelector("#courseFilter");
                let searchBtns =document.querySelector("#searchBtn");
                let filterBtns =document.querySelector("#filterBtn");
                let studentlist =document.querySelector("#studentlist")


    //   DISPLAY STUDENTS
   // -------------------- POOK----------------------//

    function displayStudents(data){

        studentlist.innerHTML="";
        data.map(function(student,index){
        const tr =document.createElement("tr");
        const status =student.marks>50?"pass":"fail";
        tr.innerHTML=`
        <td>${index+1}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.course}</td>
        <td>${student.marks}</td>
        <td class=${student.marks>50?"pass":"fail"} >${status}</td>
        <td>
         <button class="del" onclick="deleteStudent(${student.id})" >del</button>
          <button class="edit" onclick="editStudent(${student.id})">edit</button>

         </td>
        `;
        studentlist.appendChild(tr);
     });
    }
    //   ------------------------------------------------
                      // STATISTICS 
    //---------------------------------------------------

    function calculateState(data){
        //   TOTOAL STUDENSTS
        totalInputs.textContent=data.length;

        // AVERAGE MARKS 
        if(data.length ===0){
            averageInput.textContent=0;
            
        }else{
            const total =data.reduce(function(sum ,student){
               return  sum + student.marks;
            },0)
            const average =total/data.length;
             averageInput.textContent= average.toFixed(2)
        }

    
    // Highest Marks 
    if(data.length===0){
        highestInput.textContent=0;
    }else{
        const highest= data.reduce(function(max,student){
             return student.marks>max?student.marks:max;
        },0)
        highestInput.textContent=highest;
    }
} 







           //    ADD STUDENT
    addBtnInput.addEventListener("click",function(){
        const name=nameInput.value.trim();
        const age =Number(ageInput.value);
        const course =courseInput.value;
        const marks =Number(marksInput.value);
        if(!name||!age||!course||!marks){
            alert("Please fill all fields");
            return
        }
        const newStuedent={
            id:Date.now(),
            name:name,
            age:age,
            course:course,
            marks:marks
        }
        students.push(newStuedent);
        displayStudents(students);
        calculateState(students);

        nameInput.value="";
        ageInput.value="";
        courseInput.value="";
        marksInput.value="";



    });
    //-------------------------Search-------------------------------------//
    searchBtns.addEventListener("click", function(){
        const searchValue = searchInputt.value.toLowerCase().trim();
       
        const result = students.filter(function(student){
           return  student.name.toLowerCase().includes(searchValue);
         
        });
           displayStudents(result);
            calculateState(result);
    })

    //---------------------------- filter by courses-------------------------//
    filterBtns.addEventListener("click" ,function(){
        const selectCourse = courseFilters.value;
        if(selectCourse==="all"){
            displayStudents(students);
            calculateState(students);
            return ;
        }
        const result = students.filter(function(student){
           return  student.course===selectCourse;
        });
        displayStudents(result);
        calculateState(result);
    })



