
const lastPassword=document.getElementById('last-password'),
 inputPassword=document.getElementById('user-password'),
 strengthLabel=document.getElementById('strength-label'),
 togglePassword=document.getElementById('showButton'),
 togglePassword2=document.getElementById('showButton2');

 function updateStrengthIndicator(password) {
   let strength = checkStrength(password);
   let width = '0%';
   let label = 'Strength: Easy';

   switch (strength) {
       case 1: 
           width = '25%'; label = 'Strength: Easy'; break;
       case 2:
           width = '50%'; label = 'Strength: Medium'; break;
       case 3:
           width = '75%'; label = 'Strength: Strong'; break;
       case 4:
           width = '100%'; label = 'Strength: Very Strong'; break;
   }

   document.getElementById('strength-indicator').style.width = width;
   strengthLabel.textContent = label;
}

function checkStrength(password) {
   let strength = 0;

   if (password.length >= 8) strength++;
   if (password.length >= 12) strength++;
   if (password.length >= 16) strength++;
   if (password.length >= 20) strength++;

   let upper = /[A-Z]/.test(password);
   let lower = /[a-z]/.test(password);
   let numbers = /\d/.test(password);
   let symbols = /[\W_]/.test(password);

   if (upper) strength++;
   if (lower) strength++;
   if (numbers) strength++;
   if (symbols) strength++;

   let types = [upper, lower, numbers, symbols].filter(Boolean).length;
   if (types >= 3) strength++;
   if (types === 4) strength++;

   if (/(\w)\1\1/.test(password)) strength--;
   if (/012|123|234|345|456|567|678|789/.test(password) || /abc|bcd|cde|def/.test(password)) {
       strength--;
   }

   const commonPasswords = ["password", "123456", "qwerty", "abc123"];
   if (commonPasswords.includes(password.toLowerCase())) {
       strength = 1;
   }

   const repeatingPattern = password.split('').reduce((acc, char) => {
       acc[char] = (acc[char] || 0) + 1;
       return acc;
   }, {});
   if (Object.values(repeatingPattern).some(count => count > password.length / 2)) {
       strength--;
   }

   return Math.min(strength, 4);
}

 inputPassword.addEventListener('input', () => {
   updateStrengthIndicator(inputPassword.value)
});

let upperCase = 'ABCDEFGHIJKLMNOPQRSTVWXYZ'; 
let lowerCase='abcdefghijklmnopqrstuvwxyz';
let numbers = '0123456789';
let symbol ='!@#$%^&*()_+?|{}[]=~';

var chars = upperCase+lowerCase+numbers+symbol;

function generatePassword(passwordLength){
   let password ='';
      for(let i=0;i < passwordLength.value;i++){
      password+=chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return password;
}

document.getElementById('generate').addEventListener('click',()=>{
   const passwordLength=document.getElementById('length')
   if (passwordLength.value < 8 || passwordLength.value > 20) {
      alert("Please choose a password length between 8 and 20.");
      return;
  }
  let newPassword =  generatePassword(passwordLength);
  inputPassword.value='';
  inputPassword.value=newPassword;
  lastPassword.value=inputPassword.value;
  updateStrengthIndicator(newPassword);

})
  
let show=false;
togglePassword.addEventListener('click',()=>{
   show=!show;
   if(show){
     inputPassword.type ='text'
     togglePassword.innerHTML='<i class="fas fa-eye-slash"></i>'
   }else{
     inputPassword.type='password'
     togglePassword.innerHTML='<i class="fas fa-eye"></i>'
   }
})

let show2=false;
togglePassword2.addEventListener('click',()=>{
   show2=!show2;
   if(show2){
     lastPassword.type ='text'
     togglePassword2.innerHTML='<i class="fas fa-eye-slash"></i>'
   }else{
     lastPassword.type='password'
     togglePassword2.innerHTML='<i class="fas fa-eye"></i>'
   }
})


