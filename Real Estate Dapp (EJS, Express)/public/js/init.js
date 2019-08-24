function updateStatus(message)
{
    $('#statusID').append(message);
    $('#statusID').scrollTop($('#statusID')[0].scrollHeight); 
}

var isOkToCall = false;
var ethWeb3;

var realEstateContract;
var realEstateContractHook;
var realEstateContractEvent;

if (typeof web3 !== 'undefined')
{
    ethWeb3 = new Web3(web3.currentProvider);
    var message = $('<li><h5>Metamask detected</h5></li>');  
    $('#initialStatusID').append(message);          
    $('#initID').hide();
    $('#main').show();
    console.log("Metamask detected");
    updateStatus("\nMetamask detected successfully");   
    

    //set default account
    ethWeb3.eth.getAccounts((error, accounts) =>
        {
            console.log(accounts[0]);
            $('#currentAcntDisplayID').text(accounts[0]);
            ethWeb3.eth.defaultAccount = accounts[0];
            //updateStatus("\nMetaMask Selected Account: " + ethWeb3.eth.defaultAccount);
        }
    );

    //register and wait for contract events
    realEstateContract = ethWeb3.eth.contract(contractABI);
    realEstateContractHook = realEstateContract.at(contractAddress);
    realEstateContractAddEvent = realEstateContractHook.Add({},'latest');
    realEstateContractTransferEvent = realEstateContractHook.Transfer({},'latest');
    updateStatus("\nRegistered for events from Contract"); 
    realEstateContractAddEvent.watch(
        function(error, result)
        {
            if (!error)
            {
                updateStatus("\nAdd Event: Owner: " + result.args._owner + " , landID: " + result.args._landID);
                $('#loaderID2').hide(); 
            } else {
                updateStatus("\nAdd Event Error: " + error);
            }            
        }
    );
    realEstateContractTransferEvent.watch(
        function(error, result)
        {
            if (!error)
            {
                updateStatus("\nTransfer Event: From: " + result.args._from + " , To: " + result.args._to + " , landID: " + result.args._landID);
                $('#loaderID2').hide(); 
            } else {
                updateStatus("\nTransfer Event Error: " + error);
            }            
        }
    );    

    //registering for selected account change in metamask
    var account = web3.eth.accounts[0];
    var accountInterval = setInterval(function() {
        //console.log("Checking for Metamask account change: " + web3.eth.accounts[0]);        
        if (web3.eth.accounts[0] !== account) {
          account = web3.eth.accounts[0];
          updateStatus("\nCurrent Account: " + account);
          $('#currentAcntDisplayID').text(account);
        }
      }, 1000);
    updateStatus("\nRegistered for Selected Account Changes in Metamask");


    isOkToCall = true; 
}
else
{
    var message = $('<li><h5>Metamask Not available. Install and Try again</h5></li>');
    $('#initialStatusID').append(message);      
    console.log("Metamask not detected");    
}