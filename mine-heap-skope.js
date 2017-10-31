const gemHeapSkope = function () { // No parameter needed, resource contained inside

    const GemMine1 = {
        "Coal": 5302,
        "Gold": 2775
    }

    const GemMine2 = {
        "Iron": 3928,
        "Copper": 901
    }

    /*
    Hëap-skopes workshops can process 5 kilograms of a mineral with each work order. So every time the `process` function is invoked, subtract 5 from the amount of the requested mineral from the enclosed GemMine above.
    */
    return Object.create (null, {
        "products": {
            get: () => Object.keys(GemMine1, GemMine2) 
        }
        // "process": {
        //     value: requestedMineral => {

        //         if ( /* 5kg, or more, of the mineral remaining? */ ) {
        //             /*
        //             You can reference the `GemMine` variable here because it lives in an outer scope: e.g. GemMine[requestedMineral].kilograms
        //             */
        //         }

        //         return {
        //             "mineral": requestedMineral,
        //             "amount": 0 // Change this to the correct amount
        //         }
        //     }
        // }
    })
}

/*
The SkopeManager variable represents the object with the `process` method on it.
*/
const SkopeManager = gemHeapSkope()

/*
Process the gems in any order you like until there none left in the gem mine.
*/
console.log(SkopeManager.products)

//array that holds processed gems
const processedGems = []


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
const currentContainer = gemContainerFactory.next().value

// processedGems.forEach(
//     currentGem => {
//         if(currentGem){
//             currentContainer.orders.push(currentGem) //add the current gem to the order array in the currentContainer
//             let capcity = 565/(currentContainer.orders.length * 5) //determines if the container is full by dividing the maximum capicity of the container (565 gems) by the current amount in the container assuming each order has 5 gems
//         }
//         if(capcity === 1) { //if the container is full
//             gemContainers.push(currentContainer) //add container to the gemContainers array
//             currentContainer = gemContainerFactory.next().value //move on to the next container
//         }
//     }
// )

// if(currentContainer.orders.length > 0) { //even if the container isn't full
//     gemContainers.push(currentContainer) //add container to the gemContainers array
// }