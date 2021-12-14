// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract EventFactory {
    
	// Address of 10 latest events
    address[] public allEvents;
	
	// Max Array Size
	uint public MAX_SIZE = 10;

	// current Array Index
	uint public INDEX = 0;

	event ContractCreated(address newAddress);
    
    function createEvent(string memory _description, uint _minimumAmount, uint _eventEndDate) public returns (address eventAddress){
        address newEvent = address(new Event(_description, _minimumAmount, _eventEndDate, msg.sender));

		if(allEvents.length<MAX_SIZE)
		{
			allEvents.push(newEvent);
		}
		else{
			allEvents[INDEX] = newEvent;
			INDEX = INDEX + 1;
			INDEX = INDEX%MAX_SIZE;
		}

        emit ContractCreated(newEvent);
		return newEvent;
    }
    
    function getEvents() public view returns(address[] memory _allEvents) {
        return allEvents;
    }
    
}

contract Event{
    // Address of the person who created instantiated this contract
    address public manager;

    // Description of this contract
    string public description;
    
    // List of requests that are created by manager
    Request[] public requests;
    
    // List of contributors address
    address[] public contributorsAddressList;
    
    // map containing addresses of contributors and their total contributions
    mapping(address => uint) public contributors;
    
    // minimum amount that must be contributed (wei)
    uint public minimumAmount;
    
    // The date after which contract won't accept any funds and refund is possible
    uint public eventEndDate;
    
    // Total money recived by this contract since creation (wei)
    uint public totalAmountCollected;
    
    constructor(string memory _description, uint _minimumAmount, uint _eventEndDate, address creator) {
        // minimum amount should be greater than zero, because of contributors map (wei)
        require(_minimumAmount!=0);
        
        // ending date for even must be greater than time at which being instantiated
        require(_eventEndDate > block.timestamp);
        manager = creator;
        description = _description;
        minimumAmount = _minimumAmount;
        eventEndDate = _eventEndDate;
    }
    
    function createRequest(string memory _description, uint amountToTransfer, address recieversAddress) public managerOnly {
        Request storage newRequest = requests.push();
        newRequest.description = _description;
        newRequest.amount = amountToTransfer;
        newRequest.to = recieversAddress;
        newRequest.approversCount = 0;
        newRequest.finalized = false;
    }
    
    function getEventDetails() public view returns (address _manager, string memory _description, uint _numRequests, uint _contributorsCount, uint _totalAmountCollected, uint _remainingBalance, uint _minimumAmount, uint _eventEndDate){
        return (
            manager,
            description,
            requests.length,
            contributorsAddressList.length,
            totalAmountCollected,
            address(this).balance,
			minimumAmount,
			eventEndDate
        );
    }
    
    function getRequestDetails(uint index) public view returns (string memory _description, uint _amount, address _to, bool _finalized, uint _approversCount) {
        require(index<requests.length);
        Request storage req = requests[index];
        return (
            req.description,
            req.amount,
            req.to,
            req.finalized,
            req.approversCount
        );
    }
    
    function isContributor(address toCheck) public view returns (bool _isContributor){
        // if contributors map return 0 means never contributed
        return (
            contributors[toCheck]!=0
        );
    }
    
    function pay() public payable{
        // event must not have ended
        require(block.timestamp < eventEndDate);
        
        // sent amount must be atleast minimumAmount
        require(msg.value >= minimumAmount);
        
        // total amount collected upto today (balance may not necessary be equal to this)
        totalAmountCollected+=msg.value;
        
        // Contributing for the first time
        if(contributors[msg.sender]==0){
            contributorsAddressList.push(msg.sender);
        }
        
        // Keeping track of total contribution by this user
        contributors[msg.sender]+=msg.value;
    }
    
    function approveRequest(uint index) public contributorsOnly{
        // The request should exist
        require(index<requests.length);
        
        Request storage request = requests[index];
        
        // must not have approved already
        require(!request.approvers[msg.sender]);
        
        // request must not be already finalized
        require(!request.finalized);
        
        // Marking the request as approved by this user
        request.approvers[msg.sender]=true;
        request.approversCount+=1;
    }
    
    function finalize(uint index) public managerOnly{
        // request must exist
        require(index < requests.length);
        
        Request storage request = requests[index];
        
        // request must not have been finalized
        require(!request.finalized);
        
        // 50% people must have approved this request
        require(request.approversCount > uint(contributorsAddressList.length/2));
        
        // transfer money to the vendor
        payable(request.to).transfer(request.amount);
        
        // mark this request as approved
        request.finalized=true;
    }
    
    function refundAll() public contributorsOnly{
        // Event must have ended
        require(block.timestamp > eventEndDate);
        
        // return everyone funds one by one
        for(uint i = 0; i<contributorsAddressList.length;i++)
        {
            // select addresses one by one
            address currentAddress = contributorsAddressList[i];
            
            // get total amount contributed by this address
            uint totalAmountContributed = contributors[currentAddress];
            
            // calculate amount to refund that is in proportion to this user's contribution to the event
            // Note: current balance may not be equal to amount contributed by everyone (may have been spent)
            // so the amount returned must be in proportion to what they contributed but still within wallet limit
            uint amountToTransfer = uint((address(this).balance/totalAmountCollected) * totalAmountContributed);
            
            // send back calculated amount (wei)
            payable(currentAddress).transfer(amountToTransfer);
        }
    }
    
    // Can only be executed by the person who instantiated the contract (manager)
    modifier managerOnly {
        require(msg.sender == manager);
        _;
    }
    
    // Can only be executed by those who have contributed to the contract
    modifier contributorsOnly {
        require(contributors[msg.sender] > 0);
        _;
    }
}

struct Request{
    string description;
    uint amount;
    address to;
    mapping(address => bool) approvers;
    uint approversCount;
    bool finalized;
}