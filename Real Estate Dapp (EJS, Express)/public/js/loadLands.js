//update land records from current selected account..
//loadLand();

$('#updateLandsButtonID').click(function()
{
    loadLand();
    return false;
});

//Wait for land list to load
$(document).arrive('input[type=radio][name=inlineRadioOptions]', function() {
    // 'this' refers to the newly created element
    //var $newElem = $(this);
    //console.log('New land updated in Display');
    //register for land selection
    $('input[type=radio][name=inlineRadioOptions]').on('change', function() 
    {
        var landID = $(this).val();
        updateStatus("\nLand ID selected: " + landID);
        $('#selectedLandID').text(landID); //update selected land for transfer op
    });
});




function loadLand()
{
    if (isOkToCall)    //we could update only if accounts accessible via metamask..
    {
        //clear display if already showing list
        $('#contentPanel').empty();

        //get the contract hook and call the function
        realEstateContractHook.getNoOfLands.call(ethWeb3.eth.defaultAccount,
            (error, noOfLandsOfCurrentAccount) =>
            {
                console.log("No of lands of Current Account: " + noOfLandsOfCurrentAccount);
                for(index = 0; index < noOfLandsOfCurrentAccount; index++)
                {
                    realEstateContractHook.getLand.call(ethWeb3.eth.defaultAccount, index, 
                        (error, land) =>
                        {
                            if (land[3] != 0)
                            {
                                console.log("Land ID: " + land[3] + ":");
                                console.log("Location: " + land[0]);
                                console.log("Cost: " + land[1]);
                                console.log("Owner: " + land[2]);  
                                updateListDisplay(land);  
                             
                            }
                        }
                    );
                }
                   
            }
        );        

    }    
    else
    {
        console.log("web3 init not ok. please ensure that before this operation");
    }
}


function updateListDisplay(land)
{
    var i = land[3];
    var location = land[0];
    var cost = land[1];
    var myLabel = $('<label class="form-check-label"></label>');
    var myInput = $('<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio' + i +'" value="' + i + '">');
    var myCard = $('<div class="card" id="inlineCard' + i + '"width: 250px"><img src="./images/belltown.jpg"=><h5>Land ID '+ i +'</h5><span>Location: '+ location +'</span><span>Cost: '+ cost +'</span></div>');
    myInput.appendTo(myLabel);
    myCard.appendTo(myLabel);
    $('<br>').appendTo(myLabel);
    myLabel.appendTo('#contentPanel');
};