pragma solidity  >= 0.7.0 < 0.9.0;

contract Upload {

    struct Access {
        address user;
        bool access;
    }

    mapping(address=>string[]) value;   //to store the URL of the images of the uploaded images
    mapping(address=>mapping(address=>bool)) ownership;  //2-d array for storing which address as given access to which address
    mapping(address=>Access[]) accessList;  //same as above
    mapping(address=>mapping(address=>bool)) previousData;  //to the store information about previous state

    function add(address _user, string memory url) external {
        value[_user].push(url);
        //to add the url of the images to the array
    }

    function allow(address user) external {
        ownership[msg.sender][user] = true;
        if(previousData[msg.sender][user]){
            for(uint i = 0; i < accessList[msg.sender].length; i++){
                if(accessList[msg.sender][i].user == user){
                    accessList[msg.sender][i].access = true;
                }
            }
        }
        else {
            accessList[msg.sender].push(Access(user,true));
            previousData[msg.sender][user]= true;

        }
        // for setting the access as true
    }

    function disallow(address user) public {
        ownership[msg.sender][user] = false;
        for(uint i = 0; i < accessList[msg.sender].length; i++){
            if(accessList[msg.sender][i].user == user){
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns(string[] memory){
        require(_user == msg.sender || ownership[_user][msg.sender], "You don't have access");
        return value[_user];
    }

    function shareAccess() public view returns(Access[] memory) {
        return accessList[msg.sender];
        // returns the list of addresses who havr  access to the files of the particular address
    }
}