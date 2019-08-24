//1. ADD LAND OPERATION..
$('#addLandButtonID').click(function()
{
    addLand();
    return false;
});

function addLand()
{
    if(isOkToCall) //we could update only if accounts accessible via metamask..
    {
        var location = $('#newLocationID').val();
        var cost = $('#newCostID').val();
        $('#loaderID2').show(); //implying start of operations..
        realEstateContractHook.addLand(location, cost,
            (error) =>
            {
                if(error)
                {
                    updateStatus("\nAdd Land failed. Error: " + error);
                    $('#loaderID2').hide(); 
                }                
            }
        );
        updateStatus("\nAdd Land called. Please wait.");
    }
    else
    {
        updateStatus("\nweb3 init not ok. please ensure that before this operation");
        
    }
}

//1. TRANSFER LAND OPERATION..
$('#transferLandButtonID').click(function()
{
    transferLand();
    return false;
});

function transferLand()
{
    if (isOkToCall)    //we could update only if accounts accessible via metamask..
    {
        var buyer = $('#buyerAccountID').val();
        var landID = $('#selectedLandID').text();
        if (landID != 0)
        {
            $('#loaderID2').show(); //implying start of operations..
            realEstateContractHook.transferLand(buyer, landID,
                (error) =>
                {
                    if (error)
                    {
                        updateStatus("\nTransfer Land failed. Error: " + error);
                        $('#loaderID2').hide(); 
                    }                
                }
            );
            updateStatus("\nTransfer Land called. Please wait.");
            
        }
        else
        {
            updateStatus('\nERROR: Please select a land first');
        }

    }
    else
    {
        console.log("web3 init not ok. please ensure that before this operation");
    }
}