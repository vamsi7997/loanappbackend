import { log } from "console";

export const cibilScoreValidqation=async(report:any)=>{
    console.log(report,"ppp");
    
    let creditCount=0;
    let debitCount=0;
    report.map((ele:any)=>{
        console.log(ele);
        
        ele?.credit_history?.map((element: any) => {
            console.log(element);
            
            if (element === 'credit') {
                creditCount += 1
            }
            else {
                debitCount += 1
            }

        });

    })
    console.log("condition Satisfied");
    if (creditCount > debitCount && report[0].cibil_score>720){
        console.log("condition Satisfied");
        
        return ({
            "approve":true,
            "pan": report[0]?.pan,
            "partial_approve": true,
            "is_requier_security":false,
            "approvalLimit":30000
        })
    }
    else if(creditCount===debitCount){
        return ({
            "approve": false,
            "partial_approve":true,
            "pan": report[0]?.pan,
            "is_requier_security": false,
            "approvalLimit": 15000
        })
    }
    else{
        return ({
            "approve": false,
            "partial_approve": true,
            "pan": report[0]?.pan,
            "is_requier_security": true,
            "approvalLimit": 5000
        })

    }

}