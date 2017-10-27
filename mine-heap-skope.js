//per container: 565 kilograms of minerals & gems
//heap skopes: 30 containers
//process 5 kg at a time


const gemHeapSkope = function () {
    //generator of gem containers
    const gemContainerGenerator = function* () {
        let currentContainer = 1
        const maximumContainers = 30
    
        while (currentContainer <= maximumContainers) {
            yield { "id": currentContainer, "type": "Mineral", "orders": [] }
            currentContainer++
        }
    }
    //instance of gem container generator
    const gemContainerFactory = gemContainerGenerator()
    
    //two gem mines with two types of gems in each
    const gemMine1 = {
        "Coal": {
            "kilograms": 5302
        },
        "Gold": {
            "kilograms": 2775
        }
    }
    
    const gemMine2 = {
        "Iron": {
            "kilograms": 3928
        },
        "Cooper": {
            "kilograms": 901
        }
    }
    
    //holds all the seperate gem containers
    const gemContainers = []
    
    //current container
    const currentContainer = gemContainerFactory.next().value

    return { 
        "process": function (requestedMineral) {
            let currentAmount = gemMine1[requestedMineral].kilograms

            if(currentAmount >= 5) {
                //if the current amount is greater than or equal to 5, then add 5kg of the mineral to the container
                const addMineral = {
                    "mineral": requestedMineral,
                    "amount": 5
                }
                currentContainer.orders.push(addMineral)

                //subtract 5 from current amount
                currentAmount - 5
                
            } else if (currentAmount > 0) {
                //if it is less than 5 then add the current amount but greater than 0
                const addMineral = {
                    "mineral": requestedMineral,
                    "amount": currentAmount
                }
                currentContainer.orders.push(addMineral)
            }


            return {
                "mineral": requestedMineral,
                "amount": //correct amount
            }
            
            //once the the sum of amount in the orders array of current container reaches 565kg then move on to the next container

            //how many gem containers were created?


        }//end of process function

    }//end of return1
    
   
}//end of gemHeapSkope function

console.log(gemHeapSkope())