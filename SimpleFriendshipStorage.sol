pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract SimpleFriendshipStorage {

    struct friendship {
   // string name1;
    address first_address;
    //string name2;
    string friend_string;
  }

  friendship[] private friendship_list;
  string[] private friendship_strings;
 // mapping ( => string) address_to_friends;

  function create_friendship(string memory input_name1, string memory input_name2) public returns(uint)
  {
    string memory temp1 = " and ";
    string memory temp2 = " are best Friends 4Ever!!!";
    string memory input_string = string(abi.encodePacked(input_name1,temp1));
    string memory input_string2 = string(abi.encodePacked(input_name2,temp2));
    string memory final_input_string = string(abi.encodePacked(input_string,input_string2));
    friendship_strings.push(final_input_string);
    //friendship_list.push(friendship(input_name1, msg.sender, input_name2, (friendship_strings.length -1)));
    friendship_list.push(friendship(msg.sender, final_input_string));
    uint output = uint256(msg.sender);
    return output;
  }
  function get_address_to_friends(address input_address) public view returns (string[] memory) {
    string[] memory result;
    uint counter = 0;
    for (uint i = 0; i < friendship_list.length; i++) {
      if (friendship_list[i].first_address == input_address) {
        result[counter] = friendship_list[i].friend_string;
        counter++;
      }
    }
    return result;
  }
   function getArray() public view returns (string[] memory) {
        return friendship_strings;
    }
}





