import "/web3.js";

window.onload=function()
/*(window).load = function() */{
    console.log("start of window.load")
    const friendship_lookup_button = document.getElementById("Lookup Friendship");
    const create_Friendship = document.getElementById("create friendship");

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3 = new Web3(web3.currentProvider);
        } else {
          // Handle the case where the user doesn't have web3. 
          console.log("Get web3, download MetaMask")
         }

        const myAbi = [
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "input_name1",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "input_name2",
                        "type": "string"
                    }
                ],
                "name": "create_friendship",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "input_address",
                        "type": "address"
                    }
                ],
                "name": "get_address_to_friends",
                "outputs": [
                    {
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getArray",
                "outputs": [
                    {
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        const myContractAddress = "0xc428080c0a76e5d6764cb427e7261e5a52cbcac3";
        // initializing the contract
        var myContract = new web3.eth.Contract(myAbi, myContractAddress);

        function view_friendships() {
         return myContract.methods.getArray().call()
        }
        function view_friendships_by_person(input) {
         let results = myContract.methods.get_address_to_friends(input).call()
         return results;
        }
        function create_friendship_js()
        {
            let input1 = document.getElementById("yourname").value;
            let input2 = document.getElementById("friendname").value;

            myContract.methods.create_friendship(input1, input2) /*.then(()=>
            {*/
              console.log("A 4Ever Friendship was created!!!")
           // }, console.log("Error"));
           document.getElementById("blockchainoutput").innerHTML = "A 4Ever Friendship was created!!!";
        }



    function main()
        {
            console.log("Main function called")
            friendship_lookup_button.addEventListener('click', function()
            {
                console.log("friendship_lookup_button clicked");
                let input = document.getElementById("searchinput").value;
                let result = view_friendships_by_person(input) 
                console.log("The address had these friendships: " + JSON.stringify(result)); //display this
            })

            //button to look at list of friendships
            /*
               view_friendships()
               .then(function(result) {
            console.log("The friendship array is : " + JSON.stringify(result));
            });
            */

            create_Friendship.addEventListener('click', function(){
                console.log("create friendship button clicked")
                create_friendship_js() /*.then(()=>
                {
                    console.log("A 4Ever Friendship was created!!!")
                }, console.log("Error"));*/
            })


              //checks if the account is changed
            /*var accountInterval = setInterval(function() {
                // Check if account has changed
                if (web3.eth.accounts[0] !== userAccount) {
                  userAccount = web3.eth.accounts[0];
                  // Call some function to update the UI with the new account
                  updateInterface();
                }
              }, 100);*/
        }
    main()
}
