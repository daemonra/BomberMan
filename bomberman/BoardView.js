import MapElement from './MapElement.js';
import Invincible from './Invincible.js';

export default class BoardView {
    
    constructor() {}

    showModule(moduleId) {
        const module = document.getElementById(moduleId);
        if (module) {
            module.classList.remove('hidden'); 
        }
    }
    
    hideModule(moduleId) {
        const module = document.getElementById(moduleId);
        if (module) {
            module.classList.add('hidden'); 
        }
    }

    renderMatrix(matrix) {
        let str = ""
    
        for (let i = 0 ; i < matrix.length; i++) {
            
            str+="<tr>"
    
            for (let j = 0 ; j < matrix[i].length; j++) {
                let extraClasses = "" 
                if (matrix[i][j].extraClasses !== null) {
                    extraClasses = matrix[i][j].extraClasses.join(" ")
                }
                str+="<td class='grid "+matrix[i][j].classType+" "+extraClasses+"' data-i='"+i+"' data-j='"+j+"'><span></span></td>"
            }
    
            str+="</tr>"
        }
        document.querySelector('table#map').innerHTML = str;
    }

    formatedTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        const formattedMinutes = minutes.toString().padStart(1, '0'); // Ensure at least one digit
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
        
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    updateGameTimer(s) {
        document.getElementById("gameTimer").innerHTML = this.formatedTime(s);
    }

    updateBattleRoyaleTime(s) {
        document.getElementById("BattleRoyaleTimer").innerHTML = this.formatedTime(s);
    }

    displayExitPopUp() {} // continue like this 
}