function calculation(){
    try{
        let W = document.getElementById("weight").value; //get weight value from html input
        let H = document.getElementById("high").value; //get high value from html input
        let A = document.getElementById("age").value; //get age value from html input
        //f input is optional value       
        let F = 0;
        if(document.getElementById("fat").value.length == 0){
            F = 0;        
        }else{
            F = document.getElementById("fat").value; //get fat value from html input
        }
        let gender = document.getElementById("gender"); //get gender option from html select
        let G = gender.options[gender.selectedIndex].value;

        let active_index = document.getElementById("activity");
        let I = active_index.options[active_index.selectedIndex].value;

        //check if any input is empty
        if(W == '' || H == '' || A == ''){
            alert("Fill inputs!");
        }else{
            let bmr = calculateBMR(W,H,A,F,G,I);
            calculateBMI(W, H);
            calculateMacros(bmr + 500, W);
        }
    } catch(err) {
        console.log(err);
    }
}

function calculateBMR(W,H,A,F,G,I){
    let bmr = 0;
    let c_bmr = 0;

    try {
        if(F != 0){
            //Katch-McArdle Formula
            bmr = 370 + 21.6 * (1 - F / 100) * W;
        }else{
            //Mifflin-St Jeor Equation
            if(G == "man"){
                //male
                bmr = (10 * W) + (6.25 * H) - (5 * A) + 5;
                console.log(bmr);
            }else if(G == "woman"){
                //female
                bmr = (10 * W) + (6.25 * H) - (5 * A) - 161;
                console.log(bmr);
            }else{
                console.log("Error with gender value!");
            }
        }
        // Add activity %
        c_bmr = bmr;
        c_bmr_kj = c_bmr * 4.184;
        bmr = bmr * I;
        bmr_kj = bmr * 4.184;

        document.getElementById("c_bmr").innerHTML = "BMR: " + c_bmr.toFixed(2) + " kcal";
        document.getElementById("c_bmr_kj").innerHTML = " (" + bmr_kj.toFixed(2) + " kJ)";
        document.getElementById("bmr").innerHTML = "Active: " + bmr.toFixed(2) + " kcal";
        document.getElementById("bmr_kj").innerHTML = " (" + bmr_kj.toFixed(2) + " kJ)";
        return bmr;

    } catch (error) {
        console.log(error);
    }
}

function calculateBMI(W, H){
    let BMI = 0;
    
    // BMI index BMI = weight / hight ^ 2
    BMI = W / (H*H) * 10000;    //high should be in meters or multiply by 10000
    
    document.getElementById("bmi").innerHTML = BMI.toFixed(2);
}

function calculateMacros(bmr, W){

    let p_cal = 4; //protein 1g = 4kcal
    let c_cal = 4; //carbohydrate 1g = 4kcal
    let f_cal = 9; //fat 1g = 9kcal

    let p = 0; //protein
    let c = 0; //carbohydrate
    let f = 0; //fat

    //proteins in grams: 1.5g * W(kg)
    p = 1.3 * W;
    p_max = 2 * W;
    //fats in grams: 35% of BMR(kcal)
    f = (0.25 * bmr) / f_cal;
    f_max = (0.4 * bmr) / f_cal;
    //carbohydretes in gram: (bmr - SUM_cal(p+f)) / carb_calories
    c_max = (bmr - (p * p_cal + f * f_cal)) / c_cal;
    c = (bmr - (p_max * p_cal + f_max * f_cal)) / c_cal;

    //protein
    document.getElementById("protein").innerHTML = "Protein: " + p.toFixed(0) + " g ( " + p.toFixed(0) * 4 + " kcal ) - " + p_max.toFixed(0) + " g ( " + p_max.toFixed(0) * 4 + " kcal )";
    //fats
    document.getElementById("fats").innerHTML = "Fats: " + f.toFixed(0) + " g ( " + f.toFixed(0) * 9 + " kcal ) - " + f_max.toFixed(0) + " g ( " + f_max.toFixed(0) * 9 + " kcal )";
    //carbohydrates
    document.getElementById("carbos").innerHTML = "Carbohydrates: " + c.toFixed(0) + " g ( " + c.toFixed(0) * 4 + " kcal ) - " + c_max.toFixed(0) + " g ( " + c_max.toFixed(0) * 4 + " kcal )";
}