pragma solidity ^0.4.17;

contract ChoreChart {
    struct Chore {
        string description;
        bool complete;
    }

    Chore[] public chores;      //defining variables
    address public parent;
    uint public choreChange;

    function ChoreChart(address creator) public {
        parent = creator;
    }

    modifier restricted() {
        require(msg.sender == parent);
        _;
    }


    function addChoreChange() public payable {
        choreChange += msg.value;
    }


    function addChore(string description) public {
        Chore memory newChore = Chore({ //memory, creating a new variable, so doesn't exist in storage yet.  //Chore => saying we are going to make a new Chore struct. newChore => variable name. =Chore({}) => create new instance of Chore.
            description: description,
            complete: false
        });
        chores.push(newChore);
    }


    function completeChore(uint index) public {
        Chore storage chore = chores[index]; //setting the variable chore to use in the function. Storage because want to be looking at SAME COPY of chore already in storage.
        chore.complete = true;
    }

    function transferChange(address recipient) public payable {
        require(msg.sender == parent);
        recipient.transfer(choreChange);
        choreChange = 0;
    }


    function getChoreCount() public view returns(uint) {
        return chores.length;
    }

    function completeChoreCount() public view returns(uint) {
        uint count;
        for(uint8 i=0; i < chores.length; i++) {
            if(chores[i].complete) count++;
        }
        return count;
    }

     function incompleteChoreCount() public view returns(uint) {
        uint count;
        for(uint8 i=0; i < chores.length; i++) {
            if(!chores[i].complete) count++;
        }
        return count;
    }


    // function getChoreChartTotal() public view returns(uint) {
    //     uint total;
    //     for(uint8 i=0; i< chores.length; i++) {
    //         if(!chores[i].complete) total+=chores[i].value;
    //     }
    //     return total;
    // }
}



// pragma solidity ^0.4.17;

// contract ChoreChart {
//     struct Chore {
//         string description;
//         uint value;
//         bool complete;
//     }

//     Chore[] public chores;      //defining variables
//     address public parent;
//     uint public choreChange;

//     function ChoreChart(address creator) public {
//         parent = creator;
//     }

//     modifier restricted() {
//         require(msg.sender == parent);
//         _;
//     }


//     // function addChoreChange() public payable {
//     //     choreChange = msg.value;
//     // }


//     function addChore(string description) public payable {
//         Chore memory newChore = Chore({ //memory, creating a new variable, so doesn't exist in storage yet.  //Chore => saying we are going to make a new Chore struct. newChore => variable name. =Chore({}) => create new instance of Chore.
//             description: description,
//             value: msg.value,
//             complete: false
//         });
//         chores.push(newChore);
//     }


//     function completeChore(uint index, address recipient) public {
//         Chore storage chore = chores[index]; //setting the variable chore to use in the function. Storage because want to be looking at SAME COPY of chore already in storage.
//         recipient.transfer(chore.value);
//         chore.complete = true;
//     }

//     // function transferChange(address recipient) public {
//     //     recipient.transfer(choreChange);
//     //     choreChange = 0;
//     // }


//     function getChoreCount() public view returns(uint) {
//         return chores.length;
//     }

//     function completeChoreCount() public view returns(uint) {
//         uint count;
//         for(uint8 i=0; i < chores.length; i++) {
//             if(chores[i].complete) count++;
//         }
//         return count;
//     }

//      function incompleteChoreCount() public view returns(uint) {
//         uint count;
//         for(uint8 i=0; i < chores.length; i++) {
//             if(!chores[i].complete) count++;
//         }
//         return count;
//     }


//     // function getChoreChartTotal() public view returns(uint) {
//     //     uint total;
//     //     for(uint8 i=0; i< chores.length; i++) {
//     //         if(!chores[i].complete) total+=chores[i].value;
//     //     }
//     //     return total;
//     // }
// }
