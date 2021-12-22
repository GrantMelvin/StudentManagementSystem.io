let students = [] ; // Creates empty student array to store entered students
var x = 1 ; // Used for ID of students

var arr = new Array() ;

const form = document.getElementById('SEIForm') ; // Transfers SEI form to JS
const errorElement = document.getElementById('error') ; 

var n = 1 ;
var list1 = [] ;
var list2 = [] ;
var list3 = [] ;
var list4 = [] ;
var list5 = [] ;          

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('submit').addEventListener('click', addStudent) ;
}) ;

function TorF(val){

    if(val.checked == true)
    {
        return true ;
    }
    else
    {
        return false ; 
    }
}

function enrolledClasses(val){

    if(val.checked == true)
    {
        return " " + val.id ;
    }
    else
    {
        return "";
    }
}

const addStudent = (stu) => {

    stu.preventDefault() ;

    if(document.getElementById('SEIname').value != '' && document.getElementById('SEIgpa').value != '')
    {
        // Student object for each submission
        let student = {
            ID: x++,
            Name: document.getElementById('SEIname').value,
            GPA: document.getElementById('SEIgpa').value,
            math: TorF(document.getElementById('mathematics')),
            eng: TorF(document.getElementById('english')),
            sci: TorF(document.getElementById('science')),
            hist: TorF(document.getElementById('history')),
            art: TorF(document.getElementById('artist')),
            thea: TorF(document.getElementById('theatre'))

        }  

        students.push(student) ; // Pushes entry into array
       
        document.querySelector('form').reset() ; // Clears form post-submission

        localStorage.setItem('studentList', JSON.stringify(students) ) ; // Saves entries into local storage as a string
    }
    else
    {
        alert("Please enter a name and GPA") ;
    }
}   

function deleteStudent(val){
    var s = val.parentNode.parentNode ;
    s.parentNode.removeChild(s) ;
    n-- ;
}

function addRow(){


    var AddRown = document.getElementById('table') ;
    var NewRow = AddRown.insertRow(n) ;

    if(document.getElementById('SEIname').value != '' && document.getElementById('SEIgpa').value != '')
    {   
        list1[x] = x ;
    
        list2[x] = document.getElementById('SEIname').value ;

        list3[x] = document.getElementById('SEIgpa').value ;

        list4[x] = enrolledClasses(document.getElementById('mathematics')) ;
        list4[x] += enrolledClasses(document.getElementById('english')) ;
        list4[x] += enrolledClasses(document.getElementById('science')) ;
        list4[x] += enrolledClasses(document.getElementById('history')) ;
        list4[x] += enrolledClasses(document.getElementById('artist')) ;
        list4[x] += enrolledClasses(document.getElementById('theatre')) ;

        var cell1 = NewRow.insertCell(0) ;
        var cell2 = NewRow.insertCell(1) ;
        var cell3 = NewRow.insertCell(2) ;
        var cell4 = NewRow.insertCell(3) ;
        var cell5 = NewRow.insertCell(4) ;

        cell1.innerHTML = list1[x] ;
        cell2.innerHTML = list2[x] ;
        cell3.innerHTML = list3[x] ;
        cell4.innerHTML = list4[x] ;
        cell5.innerHTML = '<input type="submit" name="Delete" value="Delete" class="submit" onclick="deleteStudent(this) ;">' ;

        n++ ;
    }
}

