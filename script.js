const API_URL="https://inai-col1.fishrungames.com";
const form=document.getElementById("applicationForm");
const result=document.getElementById("result");

form.addEventListener("submit",async e=>{
e.preventDefault();
const studentId=document.getElementById("studentId").value;
const buildingNumber=document.getElementById("buildingNumber").value;
const roomNumber=document.getElementById("roomNumber").value;
result.className="result";
result.textContent="Проверяем данные...";
try{
const studentResponse=await fetch(`${API_URL}/students/${studentId}`);
const buildingResponse=await fetch(`${API_URL}/buildings/${buildingNumber}`);
const roomResponse=await fetch(`${API_URL}/rooms/${roomNumber}`);
if(!studentResponse.ok||!buildingResponse.ok||!roomResponse.ok)throw new Error("Студент, корпус или комната не найдены");
const student=await studentResponse.json();
const building=await buildingResponse.json();
const room=await roomResponse.json();
const isNonResident=student.resident===false;
const buildingForStudents=building.forStudents===true;
const roomIsAvailable=room.available===true;
const canMoveIn=isNonResident&&buildingForStudents&&roomIsAvailable;
if(canMoveIn){
result.className="result success";
result.innerHTML=`<strong>Заявка подходит.</strong><p>Студент: ${student.name}</p><p>Студент иногородний: да</p><p>Корпус для студентов: да</p><p>Комната свободна: да</p>`;
}else{
result.className="result error";
let reasons="";
if(!isNonResident)reasons+="<p>Студент не является иногородним.</p>";
if(!buildingForStudents)reasons+="<p>Корпус не предназначен для студентов.</p>";
if(!roomIsAvailable)reasons+="<p>Комната занята.</p>";
result.innerHTML=`<strong>Отказ.</strong><p>Студент: ${student.name}</p>${reasons}`;
}
}catch(error){
result.className="result error";
result.textContent="Ошибка: "+error.message;
}
});