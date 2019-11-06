import React, { useCallback ,useState } from 'react';
import { View } from 'react-native'
import MemberSearchItem from '../views/Group/components/UserSearchItem'
import { Text, SearchBar} from 'react-native-elements'
import axios from 'axios';

const SearchUsersForm = props => {
    const [query,setQuery] = useState("")
    const [searchResults,setSearchResults] = useState([])

    function searchUsers(query){
        setQuery(query)
        if(query === ""){
            setSearchResults([])
          }
          else{
            axios.get('/users/search/'+props.groupId+'/'+query).then(
              res => {
                  console.log(res.data)
                  setSearchResults(res.data)
              } 
            ).catch(err => console.log(err))
          }
    }

    updateSearchResults = userId => {
        let updated = searchResults.filter(result=> result.userId !== userId)
        setSearchResults(updated)
      }

    return (
        <View style={{display: "flex",justifyContent: "center"}}>
        <SearchBar
containerStyle={{width: "100%",backgroundColor: "white",borderBottomColor: "white",borderTopColor: "white"}}
inputContainerStyle={{width: "100%"}}
inputStyle={{width: "100%",height: 10,padding: "2%"}}
placeholder="Search..."
onChangeText={text => 
    searchUsers(text) }
value={query}
/>
{searchResults.length > 0 ? searchResults.map(
              result => {
                 return (
                  <MemberSearchItem 
                  key={result.userId}
                  userId={result.userId}
                  groupId={props.groupId}
                  onAdd={() => updateSearchResults(result.userId)}
                  name={result.fname}
                  emailHash={result.emailHash}
                />
                 )
              }   
            ): <Text style={{textAlign: "center",padding: "5%"}}>No results</Text>}
        </View>
    );
};

export default SearchUsersForm;