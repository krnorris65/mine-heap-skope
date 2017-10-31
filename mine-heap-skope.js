const gemHeapSkope = function () { // No parameter needed, resource contained inside

    const GemMines = {
    
        "GemMine1": {
            "Coal": {
                "kilograms": 5302
            },
            "Gold": {
                "kilograms": 2775
            }
        },
         
        "GemMine2": {
            "Iron": {
                "kilograms": 3928
            },
            "Copper": {
                "kilograms": 901
            }
        }
    }

    /*
    Hëap-skopes workshops can process 5 kilograms of a mineral with each work order. So every time the `process` function is invoked, subtract 5 from the amount of the requested mineral from the enclosed GemMine above.
    */
    return Object.create (null, {
        "process": {
            value: function(mine, requestedMineral) {

                let gemAmount = 0

                if (GemMines[mine][requestedMineral].kilograms >= 5 ) {
                    gemAmount = 5
                } else {
                    gemAmount = GemMines[mine][requestedMineral].kilograms
                }

                GemMines[mine][requestedMineral].kilograms -= gemAmount

                return {
                    "mineral": requestedMineral,
                    "amount": gemAmount
                }
            }
        }
    })
}

/*
The SkopeManager variable represents the object with the `process` method on it.
*/
const SkopeManager = gemHeapSkope()

/*
Process the gems in any order you like until there none left in the gem mine.
*/


//array that holds processed gems
const processedGems = []

let mineralProcessing = null
//coal
do {
    mineralProcessing = SkopeManager.process("GemMine1", "Coal")
    if(mineralProcessing.amount > 0) {
        processedGems.push(mineralProcessing)
    }
} while (mineralProcessing.amount === 5)
//gold
do {
    mineralProcessing = SkopeManager.process("GemMine1", "Gold")
    if(mineralProcessing.amount > 0) {
        processedGems.push(mineralProcessing)
    }
} while (mineralProcessing.amount === 5)
//iron
do {
    mineralProcessing = SkopeManager.process("GemMine2", "Iron")
    if(mineralProcessing.amount > 0) {
        processedGems.push(mineralProcessing)
    }
} while (mineralProcessing.amount === 5)
//copper
do {
    mineralProcessing = SkopeManager.process("GemMine2", "Copper")
    if(mineralProcessing.amount > 0) {
        processedGems.push(mineralProcessing)
    }
} while (mineralProcessing.amount === 5)


//generator for 30 storage containers
const gemContainerGenerator = function* () {
    let containerId = 1
    const maxContainers = 30

    while (containerId <= maxContainers) {
        yield { "id": containerId, "type": "Mineral", "orders": [] }
        containerId++
    }
}

//instance of gem container generator
const gemContainerFactory = gemContainerGenerator()


//array that contains the gemContainers
const gemContainers = []

//value of current container
let currentContainer = gemContainerFactory.next().value

processedGems.forEach(
    currentGem => {
        if(currentGem){
            currentContainer.orders.push(currentGem) //add the current gem to the order array in the currentContainer
            let capcity = 565/(currentContainer.orders.length * 5) //determines if the container is full by dividing the maximum capicity of the container (565 gems) by the current amount in the container assuming each order has 5 gems

            if(capcity === 1) { //if the container is full
                gemContainers.push(currentContainer) //add container to the gemContainers array
                currentContainer = gemContainerFactory.next().value //move on to the next container
            }
        }
    }
)

if(currentContainer.orders.length > 0) { //even if the container isn't full
    gemContainers.push(currentContainer) //add container to the gemContainers array
}

console.log(gemContainers)